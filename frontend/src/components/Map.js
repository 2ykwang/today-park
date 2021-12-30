import React, { useState } from "react";
import { Header } from './Header';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Spring, config } from "react-spring";
import { geoCentroid } from "d3-geo";

// 관악 지도 데이터
import GwanakMap from "../json/gwanak.json";
// 서울 전체 지도 데이터
import SeoulMap from "../json/seoul.json";
/*
  "code": "구역 코드",
  "name": "구역 이름",
  "name_eng": "구역 영문이름",
*/

// 지도 캔버스 사이즈
const mapWidth = 600;
const mapHeight = 300;

// 구역을 클릭했을 때 줌 배율
const MAX_ZOOM = 5;

// 맨 처음 지도가 렌더링 됐을때 센터 값
const DEFAULT_COORDINATION = [126.98820917938465, 37.55105648528907];

const Map = ({ setTooltipContent }) => {
  //
  const [map, setMap] = useState(SeoulMap);
  // 줌 상태인지 check
  const [isZoom, setIsZoom] = useState(false);
  // FIXME: 현재 작동 안됨.
  const [zoomLevel, setZoomLevel] = useState(1);
  // 지도 중심 좌표
  const [center, setCenter] = useState(DEFAULT_COORDINATION);

  return (<>
  <Header />
    <div className="jido">
      <Spring from={{ zoom: 1 }} to={{ zoom: zoomLevel }} config={config.slow}>
        {(styles) => (
          <ComposableMap
            width={mapWidth}
            height={mapHeight}
            projection="geoMercator"
            projectionConfig={{ rotate: [-60, 0, 5], scale: 35000 }}
            data-tip=""
          >
            <ZoomableGroup center={center} zoom={styles.zoom}>
              <Geographies geography={map}>
                {({ geographies }) =>
                  geographies.map((geo, i) => {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "#fff",
                            stroke: "#aaa",
                            strokeWidth: 0.15,
                            outline: "none",
                          },
                          hover: {
                            fill: "#B1D6AE",
                            outline: "none",
                          },
                          pressed: {
                            fill: "fff",
                            outline: "#333",
                          },
                        }}
                        onMouseEnter={() => {
                          const { name, code } = geo.properties;
                          setTooltipContent(`${name} : ${code}`);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        onClick={() => {
                          // 관악 code
                          if (!isZoom && geo.properties.code!=="11210") return;

                          if (!isZoom) {
                            const centroid = geoCentroid(geo);
                            setMap(GwanakMap);
                            setCenter(centroid);
                            setIsZoom(!isZoom);
                            setZoomLevel(MAX_ZOOM);
                          } else {
                            setIsZoom(!isZoom);
                            setMap(SeoulMap);
                            setCenter(DEFAULT_COORDINATION);
                            setZoomLevel(1);
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </Spring>
    </div>
  </>);
};

export default Map;