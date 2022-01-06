import os

import dotenv
import pymysql

dotenv.load_dotenv(".env")


class MysqlPool:
    def __init__(self):
        """
        환경 설정 파일에서 불러옵니다.
        """
        self.conn = pymysql.connect(
            user="root",
            passwd="root",
            host="localhost",
            port=3306,
            db="api_vaccine",
            charset="utf8mb4",
        )

    def cursor(self):
        return self.conn.cursor(pymysql.cursors.DictCursor)

    def commit(self):
        self.conn.commit()

    def close(self):
        self.conn.close()

    # def get_db(self):
    #     return MysqlPool()


# flake8: noqa
