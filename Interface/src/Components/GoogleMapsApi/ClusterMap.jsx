import React, { memo, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import {GoogleMaps_KEY} from 'Config/Config'

const ClusterMap = ({zoom, coordinates, ...props}) => {
    return (
        <Map
            google={props.google}
            zoom={zoom}
            // style={style}
            initialCenter={coordinates[0]}
        >
                <Marker position={coordinates[0]} />
        </Map>
    );
}

export default memo(GoogleApiWrapper({
    apiKey: GoogleMaps_KEY
})(ClusterMap));

