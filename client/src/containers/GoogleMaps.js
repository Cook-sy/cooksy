import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// eslint-disable-next-line
const geocoder = new google.maps.Geocoder();

class Map extends Component {
  constructor(props){
    super(props)

    this.getCoordinates=this.getCoordinates.bind(this);
    this.state = {location: null, zoom: 12}
  }

  componentDidMount() {
    this.getCoordinates('1 Infinite Loop, Cupertino') //{this.state.address} (cannot load with fake data)
    this.setState({zoom: 16})
  }


  getCoordinates (address, callback) {
    let coordinates;
    geocoder.geocode({address: address}, function (results, status) {
      if (status === "OK") {
        let coordObj = results[0].geometry.location;
        coordinates = ({lat:coordObj.lat(), lng:coordObj.lng()})
        this.setState({location: coordinates})
      }
    }.bind(this))
  }

  render() {
    const markers = this.props.markers || []
    if (this.state.location === null) {
      return <div>Loading...</div>
    }
    return (
      <GoogleMap
        defaultZoom={this.state.zoom}
        defaultCenter={ this.state.location }>
        {markers.map((marker, index) => (
            <Marker />
          )
        )}
      </GoogleMap>
    )
  }
}


export default withGoogleMap(Map);