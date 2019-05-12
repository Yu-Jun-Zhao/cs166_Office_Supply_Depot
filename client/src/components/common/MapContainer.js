import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "../../style/map.css";

const style = {
  width: "50%",
  height: "50%",
  position: "relative"
};

const wh = [
  {
    lat: 37.335187,
    lng: -121.881072
  },
  {
    lat: 37.7212,
    lng: -122.476844
  }
];

/*
    Props required
    zoom: Integer
    origin: object of this form: { lat: x, lng: y }
    destination: 0 or 1
 */
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.handleMapReady = this.handleMapReady.bind(this);
  }

  handleMapReady(mapProps, map) {
    this.calculateAndDisplayRoute(map);
  }

  calculateAndDisplayRoute(map) {
    const { origin, destination } = this.props;
    let destinationLL;
    if (destination === 0) destinationLL = wh[0];
    if (destination === 1) destinationLL = wh[1];
    const directionsService = new this.props.google.maps.DirectionsService();
    const directionsDisplay = new this.props.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsService.route(
      {
        origin: origin,
        destination: destinationLL,
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  render() {
    return (
      <div className="map-container">
        <Map
          style={style}
          google={this.props.google}
          className={"map"}
          zoom={this.props.zoom}
          onReady={this.handleMapReady}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB6bOePa__5vSd4Ri5ogaaN8Dw-k_plH-M"
})(MapContainer);
