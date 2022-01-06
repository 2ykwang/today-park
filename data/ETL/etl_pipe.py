"""
 1. 구별 공원
 2. 관악구 운동기구 
 3. 운동기구

"""
import etl_equipment as equip
import etl_park as park
import etl_prak_equipment as park_equip
import pandas as pd
from db_connect import MysqlPool
from utill import *

"""
로그
"""
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
# log 출력 형식
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# log 출력
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

# log를 파일에 출력
file_handler = logging.FileHandler("error.log")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

import os

dir = os.path.dirname(os.path.realpath(__file__))

import dotenv

dotenv.load_dotenv(f"{dir}/.env")

from sqlalchemy import create_engine

engine = create_engine(os.environ.get("DATABASE_URI"))


def get_files():
    # ETL 파일 path
    return os.listdir(f"{dir}/etl_files")


def main():
    file_lst = get_files()

    for file in file_lst:
        # start logging
        gu_name = file.split(".")[0]
        if gu_name == "Gwanak":
            ex = park.Park_Gwanak(engine, f"{dir}/etl_files/{file}").etl_data()
            if ex is not None:
                # error logging
                break

            ex = equip.Equipment_Gwanak(engine, f"{dir}/etl_files/{file}").etl_data()
            if ex is not None:
                # error logging
                break

            ex = park_equip.Park_Equipment_Gwanak(
                engine, f"{dir}/etl_files/{file}"
            ).etl_data()
            if ex is not None:
                # error logging
                break

        # end logging


if __name__ == "__main__":
    main()

# flake8: noqa
