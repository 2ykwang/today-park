import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import GwanakMap from "../../json/gwanak.json";

const geoUrl = GwanakMap;
const markerOff = 2;
const Map = ({ setTooltipContent, parks }) => {
  const parklist = parks ? parks : [];
  const markers = parklist.map((item) => {
    return {
      markerOffset: markerOff,
      name: item.park_name,
      coordinates: [Number(item.longitude), Number(item.latitude)],
    };
  });
  return (
    <div className="mapContainer">
      {/*
      width, height = 캔버스 사이즈
      projection
      projectionConfig - > 그대로 두면 됨
      */}
      <ComposableMap
        width={800}
        height={500}
        projection="geoMercator"
        projectionConfig={{ rotate: [-60, 0, 5], scale: 35000 }}
        data-tip=""
      >
        {/* 
            줌 컴포넌트 ( 확대 축소 ) 
            center = 중심좌표
            zoom = 확대
          */}
        <ZoomableGroup
          center={[126.91197508981351, 37.46122474964353]}
          zoom={7}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  onMouseEnter={() => {
                    const { name } = geo.properties;
                    setTooltipContent(`${name}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#fff",
                      stroke: "#aaa",
                      strokeWidth: 0.06,
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
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }, i) => {
            return (
              <>
                <Marker
                  key={i}
                  coordinates={coordinates}
                  onMouseEnter={() => {
                    setTooltipContent(name);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                >
                  <g
                    fill="#5BC691"
                    stroke="#5BC691"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(0, -1.5)"
                  >
                    <svg width="10px" height="10px" viewBox="0 0 100 100">
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </svg>
                  </g>
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    x={markerOff}
                    style={{
                      fontFamily: "system-ui",
                      fill: "#5D5A6D",
                      fontSize: 1,
                      fontWeight: "500",
                    }}
                  >
                    {name}
                  </text>
                </Marker>
              </>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
