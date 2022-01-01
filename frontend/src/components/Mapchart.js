import React, { useState } from "react";
import { Header } from "./Header";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";
import GwanakMap from "../json/gwanak.json";
import SeoulMap from "../json/seoul.json";
import MapchartOrigin from "./Mapchart(origin)";

//const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const geoUrl = SeoulMap;

const Mapchart = ({ setTooltipContent }) => {
  return (
    <div>
      <Header />
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
          center={[126.98820917938465, 37.55105648528907]}
          zoom={1.5}
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
                      strokeWidth: 0.5,
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Mapchart;
