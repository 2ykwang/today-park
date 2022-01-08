"""
nearby park master Data ETL
"""
import re

import numpy as np
import pandas as pd
from core import *
from scipy.spatial import distance_matrix
from sqlalchemy import create_engine
from utill import *


class Nearby_Park:
    def __init__(self, engine):
        self.engine = engine

    def load_nearby_park(self):

        df_park_t, ex = search_table(self.engine, "park_park", id_delete=False)

        if ex is not None:
            pass

        # target
        df_park_t = df_park_t[["id", "latitude", "longitude"]]
        df_park_t[["latitude", "longitude"]] = df_park_t[
            ["latitude", "longitude"]
        ].astype(float)
        # source
        # 거리 계산에 필요한 경도, 위도만 가지고와 numpy array로 만들어준다
        np_park_loc = np.array(df_park_t.copy()[["latitude", "longitude"]])

        near_park = {}
        for idx, row in df_park_t.iterrows():
            dist = distance_matrix(
                [[row["latitude"], row["longitude"]]], np.array(np_park_loc)
            )
            dist_sorted = np.sort(dist)[0][:4]
            park_index = [np.where(dist == dist_sorted[i])[1][0] for i in range(1, 4)]

            near_park[int(row["id"])] = [
                df_park_t.loc[i_arr, "id"] for i_arr in park_index
            ]

        df_nearby_park = (
            pd.DataFrame.from_dict(near_park, orient="index")
            .reset_index()
            .rename(columns={"index": "from_park_id"})
        )

        df_nearby_park_save = (
            pd.melt(
                df_nearby_park,
                id_vars=["from_park_id"],
                var_name="idx",
                value_name="to_park_id",
            )
            .sort_values(by="from_park_id")[["from_park_id", "to_park_id"]]
            .reset_index(drop=True)
        )

        return delete_load_data(
            self.engine, "park_park_nearby_parks", df_nearby_park_save
        )
