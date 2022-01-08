"""
park_equipment master Data ETL
"""
# import numpy as np
import re

import pandas as pd
from core import *
from utill import *

# import os
from sqlalchemy import create_engine
# dir = os.path.dirname(os.path.realpath(__file__))
engine = create_engine('mysql+pymysql://root:root@127.0.0.1:3306/test_db')

class Park_Equipment_Gwanak:
    def __init__(self, engine, file_path, table_name):
        self.engine = engine
        self.file_path = file_path
        self.arr_ParkEquip = []
        self.table_name = table_name

    # 운동기구 나누기 <- equipClass와 조금 다르다
    # 전체행을 가지고온다.
    def split_re_for_gwanak(self, x):

        # 워킹머신 (4개) 처럼 수량이 적혀있는 entity patten
        # return g1:워킹머신, g2:(몇개)
        # 개수가 적혀져있는 머신들도 머신+머신이 있을수 있기때문에 패턴 변경
        # p1 = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)0-9]+)\S?(\([0-9]개\))')
        p1 = re.compile(
            "([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)[\+]?\s?([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)?\S?(\([0-9]개\))"
        )

        # p1 외 모든 entity patten
        # 워킹머신 , 워킹머신+사이클  등등
        # 개수가 적혀있지 않다면 1개
        p2 = re.compile("([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)[\+]?\s?([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)]+)?")

        spl = x["설치기구종류"].split(",")
        for s in spl:
            # p1의 패턴 매칭
            regexStr = p1.search(s)
            # 매칭된 패턴이 없으면
            if regexStr is None:
                regexStr = p2.match(s)
                # 0 : 원천 text
                # 1~ : 그룹 1~
                # p2 저장
                self.arr_ParkEquip.append(
                    [x["명칭"], (str(regexStr.group(1)).strip()), 1]
                )
                # + 로 두개의 운동기가 엮이는 경우가 있음 그런 경우
                if regexStr.group(2) is not None:
                    self.arr_ParkEquip.append(
                        [x["명칭"], (str(regexStr.group(2)).strip()), 1]
                    )
            else:
                # p1저장
                # g1~g2 : 운동기구, g3 : 수량
                self.arr_ParkEquip.append(
                    [
                        x["명칭"],
                        (str(regexStr.group(1)).strip()),
                        int(str(regexStr.group(3)).strip()[1:-2]),
                    ]
                )
                if regexStr.group(2) is not None:
                    self.arr_ParkEquip.append(
                        [
                            x["명칭"],
                            (str(regexStr.group(2)).strip()),
                            int(str(regexStr.group(3)).strip()[1:-2]),
                        ]
                    )

    def attach_park_id(self, x, df_master):
        return df_master[df_master["park_name"] == x]["id"].values[0]

    def attach_equip_id(self, x, df_master):
        return df_master[df_master["equipment_name"] == x]["id"].values[0]

    def etl_data(self):
        # 관악구 공원 데이터 불러오기
        df = pd.read_csv(self.file_path, encoding="cp949")
        # df = pd.read_csv(f'{dir}/data.csv', encoding='cp949')

        # 현재 필요한 건 2개
        df_park = df[["명칭", "설치기구종류"]]
        # 각 공원들의 운동시설, 개수 뽑기 array로 만들꺼임
        df_park.apply(self.split_re_for_gwanak, axis=1)
        # 추출한 arr_ParkEquip DataFrame으로 변환
        df_park_equip = pd.DataFrame(self.arr_ParkEquip)
        # columns rename
        df_park_equip.rename(
            columns={0: "park_name", 1: "before_equipment_name", 2: "quantity"},
            inplace=True,
        )

        # 운동 기기명 변환
        df_park_equip["equipment_name"] = df_park_equip[
            "before_equipment_name"
        ].replace(fitness_equipment)

        # 공원id, 운동기기id 붙이기
        # etl을 구 단위로 하고 있기 때문에 그냥 공원이름으로만 찾아도 되겠다
        df_serach_park, ex = search_table(
            self.engine, "park_park", False, ["gu_address='관악구'"]
        )

        if ex is not None:
            pass

        df_serach_equip, ex = search_table(self.engine, "park_equipment", False)

        if ex is not None:
            pass

        df_park_equip["park_id"] = df_park_equip["park_name"].apply(
            lambda x: self.attach_park_id(x, df_serach_park)
        )
        df_park_equip["equipment_parks"] = df_park_equip["equipment_name"].apply(
            lambda x: self.attach_equip_id(x, df_serach_equip)
        )

        # 필요 없는 컬럼 삭제
        df_park_equip.drop(
            columns=["before_equipment_name", "park_name", "equipment_name"],
            inplace=True,
        )

        # 중복 체크도 중복체크지만.. 수량이 변경되서 올경우에는 어떻게 해야하나???
        # 수량이 바뀌어있는 data, 새로운 데이터로 나눈다 일단 새로운 데이터는 기존 method 불러오자
        # 수량 update는 추후
        return load_data(
            self.engine,
            self.table_name,
            ["park_id", "equipment_parks"],
            df_park_equip,
        )


# flake8: noqa
