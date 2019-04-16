import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const style = {
    width: '50%',
    height: '50%',
    position: 'relative'
};

/*
    Props required
    zoom: Integer
    origin: object of this form: { lat: x, lng: y }
    destination: object of this form: { lat: x, lng: y }
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
        const { origin, destination } = this.props
        const directionsService = new this.props.google.maps.DirectionsService();
        const directionsDisplay = new this.props.google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
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
    apiKey: 'AIzaSyB6bOePa__5vSd4Ri5ogaaN8Dw-k_plH-M'
})(MapContainer)