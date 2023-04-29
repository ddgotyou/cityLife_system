import React, { useState } from 'react';
import './index.css'
import { Map, Marker } from 'react-amap'
const mapKey = '8d3bca3ab314ebde8cbf1ffcfd0f40a9' //需要自己去高德官网上去申请

function MapComponent(props) {
    const [state, setMapState] = useState({});
    return (
        <div id='mapContainer'>
            <Map amapkey={mapKey}
                zoom={15}></Map>
        </div>
    )

}

export default MapComponent
