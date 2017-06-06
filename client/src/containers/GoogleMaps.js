import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';


class Map extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    // eslint-disable-next-line
    const geocoder = new google.maps.Geocoder();

    function getCoordinates (address, callback) {
      var coordinates;
      geocoder.geocode({address: address}, function (results, status) {
        var coordObj = results[0].geometry.location;
        coordinates = {lat:coordObj.lat(), lng:coordObj.lng()}
        callback(coordinates)
      })
    }
  }

    render() {
      // eslint-disable-next-line
      const markers = this.props.markers || []
      return (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 49.2844, lng: -123.1164 }}>
          {markers.map((marker, index) => (
              <Marker />
            )
          )}
        </GoogleMap>
      )
    }
}


export default withGoogleMap(Map);