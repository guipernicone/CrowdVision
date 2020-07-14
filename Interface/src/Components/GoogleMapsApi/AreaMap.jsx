import React, { memo, useEffect } from 'react';
import { Map, GoogleApiWrapper, Circle, Marker } from 'google-maps-react'

const AreaMap = ({zoom, coordinates, centerCoordinate, radius, ...props}) => {

    const buildMarkers = () => {
        let markers = coordinates.map((coordinate) =>{
            return <Marker position={coordinate} />
        });
        console.log(markers);
        return markers
    }

    return (
        <Map
            google={props.google}
            zoom={zoom}
            // style={style}
            initialCenter={centerCoordinate}
        >
            {buildMarkers()}
            <Circle
                radius={radius}
                center={centerCoordinate}
                onMouseover={() => console.log('mouseover')}
                onClick={() => console.log('click')}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='blue'
                fillOpacity={0.2}
            />
        </Map>
    );
}

export default memo(GoogleApiWrapper({
    apiKey: 'AIzaSyBTpKuKxoJ4N1v13ndFkjjhvbDVGPyTGuE'
})(AreaMap));

