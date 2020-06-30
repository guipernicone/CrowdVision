import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class GoogleMapsApi extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={this.props.zoom}
                style={this.props.style}
                initialCenter={this.props.coordinates}
            >
                 <Marker position={this.props.coordinates} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBTpKuKxoJ4N1v13ndFkjjhvbDVGPyTGuE'
})(GoogleMapsApi);

