"""
equipment master Data ETL
"""
import re

import pandas as pd
from core import *
from utill import *

# import os
# from sqlalcemy import create_engine
# dir = os.path.dirname(os.path.realpath(__file__))
# engine = create_engine('mysql+pymysql://root:root@127.0.0.1:3306/test_db')
# conn = engine.connect()


class Equipment_Gwanak:

    # connection info, filePath
    def __init__(self, engine, filePath):
        self.engine = engine
        self.filePath = filePath
        self.set_equip = set()

    # 운동기구 나누기
    def split_re_for_gwanak(self, x):

        # ([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)0-9]+)\S?(\([0-9]개\)) <-- 운동기구 수량 구할떄 필요 여기서 필요없음

        # 워킹머신 (4개) 처럼 수량이 적혀있는 entity patten
        # return 워킹머신
        # 개수가 적혀져있는 머신들도 머신+머신이 있을수 있기때문에 패턴 변경
        # p1 = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)0-9]+)(?=\([0-9]개\))')
        p1 = re.compile(
            "([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)[\+]?\s?([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)?(?=\([0-9]개\))"
        )
        # p1 외 모든 entity patten
        # 워킹머신 , 워킹머신+사이클  등등
        p2 = re.compile("([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)[\+]?\s?([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)?")

        spl = x.split(",")
        for s in spl:
            # p1의 패턴 매칭
            regexStr = p1.match(s)

            # 매칭된 패턴이 없으면
            if regexStr is None:
                regexStr = p2.match(s)
                # 0 : 원천 text
                # 1~ : 그룹 1~
                # p2 저장
                self.set_equip.add(str(regexStr.group(1)).strip())
                # + 로 두개의 운동기가 엮이는 경우가 있음 그런 경우
                if regexStr.group(2) is not None:
                    self.set_equip.add(str(regexStr.group(2)).strip())
            else:
                # p1저장
                self.set_equip.add(str(regexStr.group(1)).strip())
                if regexStr.group(2) is not None:
                    self.set_equip.add(str(regexStr.group(2)).strip())

    def etl_data(self):

        # 운동기구 master Data 넣기
        df = pd.read_csv(self.filePath, encoding="cp949")

        df_park = df[["설치기구종류", "운동기구 총계"]]
        df_park["설치기구종류"].apply(self.split_re_for_gwanak)

        lst_equip = {"before_equipment_name": list(self.set_equip)}

        # 운동기구 list dataframe
        df_equip = pd.DataFrame(data=lst_equip)

        df_equip["equipment_name"] = df_equip["before_equipment_name"].replace(
            fitness_equipment
        )

        # 상체, 하체, 기타 나누기
        df_equip["equipment_type"] = df_equip["equipment_name"].apply(
            lambda x: weight_type[x]
        )

        # columns 맞춰주기
        # 첫번째 컬럼 삭제
        df_equip.drop(columns=["before_equipment_name"], inplace=True)

        # 중복제거
        df_equip = df_equip.drop_duplicates("equipment_name").reset_index(drop=True)

        # DB 처리
        return load_data(self.engine, "park_equipment", "equipment_name", df_equip)

        # try :
        #     conn = self.engine.connect()

        #     #기존 data search
        #     query = 'SELECT * FROM equipment'
        #     df_sql = pd.read_sql(query,con=conn)

        #     #id(pk) 컬럼 삭제
        #     df_sql.drop(columns=['id'], inplace=True)

        #     #병합 후 인덱스 재정렬
        #     df_concat = pd.concat([df_sql, df_transforma]).reset_index(drop=True)

        #     # equipment_name 그룹핑
        #     df_grp = df_concat.groupby(by='equipment_name')
        #     # 그룹핑 결과 dict 만들기
        #     df_eq = df_grp.groups

        #     # dict 요소가 하나인놈 뽑기
        #     idx = [x[0] for x in df_eq.values() if len(x) == 1]

        #     # 저장해야할 새로운 data가 있다면
        #     if len(idx) > 0 :
        #         df_save = df_concat.loc[idx,:]
        #         df_save.to_sql(name='equipment',con=self.engine, if_exists='append', index=False)

        # except Exception as e :
        #     conn.close()
        #     return e,False
        # finally :
        #     conn.close()

        # return None,True


# flake8: noqa
