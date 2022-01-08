import React from "react";
import { ReactComponent as StarIcon } from "../../image/star.svg";
import { BasicLink } from "../BasicLink";

export function ParkList({ item, idx, park_id }) {
  return (
    <div key={idx} className="park">
      <BasicLink to={"/search/detail/" + park_id} className="parklink">
        <h3>
          {item.park_name}
          <div className="rate">
            <StarIcon className="star" width="24" height="24" />
            {item.avg_score}
          </div>
        </h3>
        <p>{item.full_address}</p>
        <p>
          운동기구: {item.total_equipments} / 리뷰: {item.total_reviews}
        </p>
      </BasicLink>
    </div>
  );
}
