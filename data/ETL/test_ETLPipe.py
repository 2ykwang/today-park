from typing import final
import pandas as pd
import re
from sqlalchemy import create_engine
# import pymysql

from utill import *

import os
dir = os.path.dirname(os.path.realpath(__file__))

# con = pymysql.connect(
#             user = 'root',
#             passwd = 'root',
#             host = 'localhost',
#             port = 3306,
#             db = 'test_db',
#             charset = 'utf8mb4'
#         )


engine = create_engine('mysql+pymysql://root:root@127.0.0.1:3306/test_db')
# conn = engine.connect()


#관악구 공원 데이터 불러오기
df = pd.read_csv(f'{dir}/관악구 산스장 데이터.csv').set_index('번호')

columns = ['공원명', '구id', '주소', '시', '구', '동', '위도', '경도', '공원 이미지']
each_park = pd.DataFrame(columns=columns)
each_park['공원명'] = df['명칭']
each_park['구id'] = 1162000000
each_park['주소'] = df['위치']
each_park['시'] = '서울시'
each_park['구'] = '관악구'
each_park['동'] = df['동이름']
each_park['위도'] = df['위도'].apply(lambda x: format(float(x.replace(',', ''))*10**-13, '.15g'))
each_park['경도'] = df['경도'].apply(lambda x: format(float(x.replace(',', ''))*10**-13, '.15g'))
# each_park['위도'] = df['위도'].apply(lambda x: str(round(float(x.replace(',', ''))*10**-13, 13)))
# each_park['경도'] = df['경도'].apply(lambda x: str(round(float(x.replace(',', ''))*10**-13, 13)))

print(each_park)

# try :
#     conn = engine.connect()

#     query = 'SELECT * FROM equipment'

#     df_sql = pd.read_sql(query,con=conn)

#     df_sql.drop(columns=['id'], inplace=True)

#     df_concat = pd.concat([df_sql, df_a]).reset_index(drop=true)

#     # print(df_sql.info())
#     # print('-------')
#     # print(df_a.info())
#     # print('-------')
#     print(df_concat['equipment_name'].value_counts())

#     # df_concat = df_concat.drop_duplicates('equipment_name')

#     # df_concat.to_sql(name='equipment',con=engine, if_exists='replace', index=False)
#     # df_a.to_sql(name='equipment',con=engine, if_exists='append', index=False)
# except Exception as e :
#     print(e)
# finally :
#     conn.close()




