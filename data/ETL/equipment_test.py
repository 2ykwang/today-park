from typing import final
import pandas as pd
import re
from sqlalchemy import create_engine
# import pymysql

from utill import *

import os
dir = os.path.dirname(os.path.realpath(__file__))

arr = set()

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

#운동기구 나누기
def split_re_for_gwanak(x) :
    
    # p = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)[0-9])+(?=\([0-9]개\))')  
    # p = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)])+([\+][ㄱ-ㅎㅏ-ㅣ-가-힣\s]+)?')  
    # p = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)[0-9])+?(?=\([0-9]개\))|([ㄱ-ㅎㅏ-ㅣ-가-힣\s])+([\+][ㄱ-ㅎㅏ-ㅣ-가-힣\s]+)?')
    
    p1 = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s\(\)[0-9])+(?=\([0-9]개\))')
    p2 = re.compile('([ㄱ-ㅎㅏ-ㅣ-가-힣\s0-9\(\)])+([\+][ㄱ-ㅎㅏ-ㅣ-가-힣\s]+)?')

    spl = x.split(',')
    for s in spl :
        regexStr = p1.match(s)

        if regexStr is None :
            regexStr = p2.match(s)

        arr.add(str(regexStr[0]).strip())

#2번째 type 저장
def split_type(x) :
    t_lst = x['type1'].split(',')
    if len(t_lst) == 2 :
        x['type1'] = t_lst[0]
        x['type2'] = t_lst[1]
    else :
        x['type2'] = ''

    return x

#운동기구 master Data 넣기
df = pd.read_csv(f'{dir}/data.csv', encoding='cp949')

df_sp = df[['설치기구종류','운동기구 총계']]
df_sp['설치기구종류'].apply(split_re_for_gwanak)

data = {'운동기구': list(arr)}

df_a = pd.DataFrame(data=data)

df_a['운동기구_T'] = df_a['운동기구'].replace(fitness_equipment)

# 상체, 하체, 기타 나누기
df_a['type1'] = df_a['운동기구_T'].apply(lambda x : weight_type[x])

df_a['type2'] = pd.Series(['' for _ in range(len(df_a))])
df_a.apply(split_type, axis=1)

#columns 맞춰주기
#첫번째 컬럼 삭제
df_a.drop(columns=['운동기구'], inplace=True)
df_a.rename(columns={'운동기구_T':'equipment_name','type1':'equipment_type1','type2':'equipment_type2'}, inplace=True)

#중복제거

df_a = df_a.drop_duplicates('equipment_name').reset_index(drop=True)

try :
    conn = engine.connect()

    query = 'SELECT * FROM equipment'

    df_sql = pd.read_sql(query,con=conn)

    df_sql.drop(columns=['id'], inplace=True)

    df_concat = pd.concat([df_sql, df_a]).reset_index(drop=true)

    # print(df_sql.info())
    # print('-------')
    # print(df_a.info())
    # print('-------')
    print(df_concat['equipment_name'].value_counts())

    # df_concat = df_concat.drop_duplicates('equipment_name')

    # df_concat.to_sql(name='equipment',con=engine, if_exists='replace', index=False)
    # df_a.to_sql(name='equipment',con=engine, if_exists='append', index=False)
except Exception as e :
    print(e)
finally :
    conn.close()




