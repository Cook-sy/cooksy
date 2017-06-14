import React, { Component } from 'react';
import _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 37.783697, lng: -122.408966 }}
  >
    { props.markers.map((marker, index) => (
        <Marker
          key={index}
          icon={marker.icon}
          position={marker.position}
          onClick={() => props.onMarkerClick(marker)}
          onMouseOver={() => props.onMarkerOver(marker)}
          onMouseOut={() => props.onMarkerOut(marker)}
        >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
        </Marker>
      ))
    }
  </GoogleMap>
));

class NearByMap extends Component {
  componentWillReceiveProps(nextProps) {
    // Resize map to fit markers only if the markers has changed
    if (this._map && !_.isEqual(_.map(this.props.markers, 'id'), _.map(nextProps.markers, 'id'))) {
      // eslint-disable-next-line
      let bounds = new google.maps.LatLngBounds();
      nextProps.markers.forEach(function(marker) {
        bounds.extend(marker.position);
      });
      this._map.fitBounds(bounds);
    }
  }

  handleMapLoad = (map) => {
    this._map = map;
  }

  render() {
    return (
      <GoogleMapWrapper
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        onMapLoad={this.handleMapLoad}
        { ...this.props }
      />
    );
  }
}

export default NearByMap;
