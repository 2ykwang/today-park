import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
  Markers,
} from "react-simple-maps";
import GwanakMap from "../json/gwanak.json";

//const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const geoUrl = GwanakMap;
const markerOff = 2;
const markers = [
  {
    markerOffset: markerOff,
    name: "도림천",
    coordinates: [126.9474365, 37.45922056],
  },
  {
    markerOffset: markerOff,
    name: "관악산 야외식물원",
    coordinates: [126.948224, 37.46117532],
  },
  {
    markerOffset: markerOff,
    name: "관악산 샘말공원",
    coordinates: [126.9384872, 37.46490032],
  },
  {
    markerOffset: markerOff,
    name: "맨발공원",
    coordinates: [126.944350815504, 37.4665302234076],
  },
  {
    markerOffset: markerOff,
    name: "제2구민운동장",
    coordinates: [126.933653774099, 37.4581915973847],
  },
];
const SeoulChart = ({ setTooltipContent }) => {
  return (
    <div>
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
          center={[126.93213889807498, 37.46122474964353]}
          zoom={7}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  onMouseEnter={() => {
                    const { name, code } = geo.properties;
                    setTooltipContent(`${name} : ${code}`);
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
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, i }) => (
            <Marker key={i} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#5BC691"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, 5)"
              >
                <circle cx="15" cy="-2" r={3 / 35000} scale="0.001" />
                <svg viewBox="0 0 645.698 136.753">
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
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default SeoulChart;
