"""
 1. 구별 공원
 2. 관악구 운동기구 
 3. 운동기구

"""
import logging
import os

import dotenv
import etl_equipment as equip
import etl_park as park
import etl_prak_equipment as park_equip
import etl_nearby_park as nearby_park
import pymysql
import settings
from sqlalchemy import create_engine
from utill import *

pymysql.install_as_MySQLdb()

"""
로그
"""


def get_files(directory):
    # ETL 파일 path
    return os.listdir(f"{directory}/etl_files")


def init_logger():

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    # log 출력 형식
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    # log 출력
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    # log를 파일에 출력
    file_handler = logging.FileHandler("error.log")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return logger


engine = create_engine(settings.DATABASE_URI)

logger = init_logger()


def main():
    base_dir = settings.BASE_DIR

    file_lst = get_files(base_dir)

    for file in file_lst:
        # start logging
        gu_name = file.split(".")[0]
        if gu_name == "Gwanak":
            ex = park.Park_Gwanak(
                engine=engine,
                table_name="park_park",
                file_path=f"{base_dir}/etl_files/{file}",
            ).etl_data()
            if ex is not None:
                # error logging
                break

            ex = equip.Equipment_Gwanak(
                engine=engine,
                table_name="park_equipment",
                file_path=f"{base_dir}/etl_files/{file}",
            ).etl_data()
            if ex is not None:
                # error logging
                break

            ex = park_equip.Park_Equipment_Gwanak(
                table_name="park_parkequipment",
                engine=engine,
                file_path=f"{base_dir}/etl_files/{file}",
            ).etl_data()
            if ex is not None:
                # error logging
                break

            ex = nearby_park.Nearby_Park(
                engine=engine
            ).load_nearby_park()
            if ex is not None:
                # error logging
                break

        # end logging


if __name__ == "__main__":
    main()

# flake8: noqa
