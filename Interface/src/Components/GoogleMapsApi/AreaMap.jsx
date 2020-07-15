import React, { memo } from 'react';
import { Map, GoogleApiWrapper, Circle, Marker } from 'google-maps-react'

/**
 * A map with a explicit radius zone
 * 
 * @param {Number} zoom - The initial zoom of the map
 * @param {Array} coordinates - An array of objects of coordinates 
 * @param {Object} centerCoordinate - An object of coordinates lat, lng for the center of the map
 * @param {Number} radius - The radius of the area
 */
const AreaMap = ({zoom, coordinates, centerCoordinate, radius, ...props}) => {

    const buildMarkers = () => {
        let markers = coordinates.map((coordinate, index) =>{
            return(
                <Marker 
                    key={"marker_" + index}
                    position={{lat:coordinate.lat, lng: coordinate.lng}}
                    title={coordinate.title}
                    icon={{
                        url: coordinate.urlIcon,
                        anchor: new props.google.maps.Point(32,32),
                        scaledSize: new props.google.maps.Size(64,64)
                    }}
                    label={coordinate.number.toString()}
                >
                </Marker>
            )
        });
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

