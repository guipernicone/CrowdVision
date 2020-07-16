import React, { useEffect, memo } from 'react';
import GoogleMapReact from 'google-map-react'
import MarkerClusterer from '@google/markerclusterer'

const ClusterMap = ({coordinates, zoom, ...props}) => {

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'
        script.async = true
        document.body.appendChild(script)
    },[]);

    const setGoogleMapRef = (map, maps) => {
        let googleMapRef = map
        let googleRef = maps
        let markers = coordinates && coordinates.map((location) => {
          return new googleRef.Marker({position: location})
        })
        let markerCluster = new MarkerClusterer(map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          gridSize: 10,
          minimumClusterSize: 2
        })
      }
    
    //   const defaultProps = {
    //     center: {
    //       lat: 59.95,
    //       lng: 30.33
    //     },
    //     zoom: 11
    //   }

    return (
        <GoogleMapReact
            bootstrapURLKeys={"AIzaSyBTpKuKxoJ4N1v13ndFkjjhvbDVGPyTGuE"}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map, maps}) => setGoogleMapRef(map, maps)}
            defaultCenter={{lat: -31.563910, lng: 147.154312}}
            defaultZoom={10}
            options={{streetViewControl: true}}
        >
        </GoogleMapReact>
    );
}

export default memo(ClusterMap);

// AIzaSyBTpKuKxoJ4N1v13ndFkjjhvbDVGPyTGuE