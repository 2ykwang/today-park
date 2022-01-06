import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export const MyMarker = (props) => {
  return (
    <IconContext.Provider value={{ color: "red", size: "3em" }}>
      <div>
        <FaMapMarkerAlt />
      </div>
    </IconContext.Provider>
  );
};
export class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.55105648528907,
      lng: 126.98820917938465,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_SECRET_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MyMarker lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}
export default SimpleMap;
