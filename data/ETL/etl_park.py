'''
park master Data ETL
'''
from core import *
from utill import *

import pandas as pd
import re

# import os
# from sqlalchemy import create_engine
# dir = os.path.dirname(os.path.realpath(__file__))
# engine = create_engine('mysql+pymysql://root:root@127.0.0.1:3306/test_db')

class Park_Gwanak() :
    def __init__(self, engine, filePath) :
        self.engine = engine
        self.filePath = filePath

    def set_coordinate(self, x) :
        tude = x
        decimal = x.split('.')[1]
  
        for _ in range(13-len(decimal)) :
            tude += '0'

        return tude

    def etl_data(self) :
        #관악구 공원 데이터 불러오기
        df = pd.read_csv(self.filePath, encoding='cp949')

        df_park = df[['명칭','위치','동이름','위도','경도']]

        #위도, 경도 float > object 후, 소수점 13자리로 만들어주기
        #type변경
        df_park[['위도','경도']] = df_park[['위도','경도']].astype(str)
        #소수점 13자리 까지 표현하기
        df_park['위도'] = df_park['위도'].apply(self.set_coordinate)
        df_park['경도'] = df_park['경도'].apply(self.set_coordinate)

        #주소, 시, 구, 동 : 주소랑, 동은 존재
        #서울특별시, 관악구 
        #각 구청들의 데이터들이 정리가 제대로 되어있지 않아서 regex로 하기에는 한계가 있다..
        df_park['si_address'] = pd.DataFrame(['서울특별시' for _ in range(df_park.shape[0])])
        df_park['gu_address'] = pd.DataFrame(['관악구' for _ in range(df_park.shape[0])])

        #구id : utill.py seoul_code 활용
        df_park['gu_id'] = df_park['gu_address'].apply(lambda x : seoul_code[x])
        # 기존 컬럼 변경
        df_park.rename(columns={'명칭':'park_name','위치':'full_address','동이름':'dong_address','위도':'latitude','경도':'longitude'}, inplace=True)

        return load_data(self.engine, 'park', 'park_name', df_park)
