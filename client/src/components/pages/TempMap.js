import React, { Component } from "react";
import "../../style/homepage.css";
import MenuBar from "../common/MenuBar";
import MapContainer from "../common/MapContainer"

const data = [
    {
        lat: 37.311013,
        lng: -121.931334
    },
    {
        lat: 37.335187,
        lng: -121.881072
    },
];

class TempMap extends Component {

    render() {
        return (
            <div className="homepage">
                <div>
                    <MapContainer zoom={4} origin={data[0]} destination={data[1]}/>
                </div>
            </div>
        );
    }
}

export default TempMap;
