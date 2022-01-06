"""
공통으로 쓰이는 함수들의 집합
"""
import pandas as pd


def load_data(engine, table_name, group_column, df_trans):
    with engine.connect() as conn:
        try:
            print("load start")
            # 기존 data search
            query = f"SELECT * FROM {table_name}"
            df_sql = pd.read_sql(query, con=conn)
            # id(pk) 컬럼 삭제
            df_sql.drop(columns=["id"], inplace=True)
            # 병합 후 인덱스 재정렬
            df_concat = pd.concat([df_sql, df_trans]).reset_index(drop=True)
            # equipment_name 그룹핑
            df_grp = df_concat.groupby(by=group_column)
            # 그룹핑 결과 dict 만들기
            df_di = df_grp.groups
            # dict 요소가 하나인놈 뽑기
            idx = [x[0] for x in df_di.values() if len(x) == 1]
            # 저장해야할 새로운 data가 있다면
            if len(idx) > 0:
                df_save = df_concat.loc[idx, :]
                df_save.to_sql(
                    name=table_name, con=engine, if_exists="append", index=False
                )

        except Exception as ex:
            print("load Exception")
            conn.close()
            return ex
        finally:
            print("load end")
            conn.close()

    return None


def search_table(engine, table_name, id_delete=True, option=None):
    with engine.connect() as conn:

        try:
            # 기존 data search
            query = f"SELECT * FROM {table_name}"

            if option is not None:
                query += " WHERE "
                for idx, op in enumerate(option):
                    query += f"{op} " if idx == 0 else f"AND {op} "

            df_sql = pd.read_sql(query, con=conn)

            # id(pk) 컬럼 삭제
            if id_delete:
                df_sql.drop(columns=["id"], inplace=True)

            return df_sql, None
        except Exception as ex:
            conn.close()
            return None, ex
        finally:
            conn.close()


# flake8: noqa
