'''
 1. 구별 공원
 2. 관악구 운동기구 

'''
from db_connect import MysqlPool
from utill import *

import numpy as np
import pandas as pd

import os
dir = os.path.dirname(os.path.realpath(__file__))

def read_data(fileName:str) :
    return pd.read_csv(f"{dir}\{fileName}")

def transform_data(data:pd.DataFrame, type:TransType) :
    pass 

def load_data(data:pd.DataFrame, type:TransType) :
    pass

def main():
    file_lst = get_files()

    for fileName in file_lst :
        df = read_data(fileName)

        if 'park' in fileName :
            df_t = transform_data(df,TransType.park)
            load_data(df,TransType.park)
        else :
            df_t = transform_data(df,TransType.equipment)
            load_data(df,TransType.equipment)

def get_files() :
    #ETL 파일 path
    return os.listdir(f"{dir}\etl_files")

if __name__ == "__main__":
	main()