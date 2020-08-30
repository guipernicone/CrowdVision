import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import {GoogleMaps_KEY} from 'Config/Config'

class SimpleMap extends Component {
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
    apiKey: GoogleMaps_KEY
})(SimpleMap);

