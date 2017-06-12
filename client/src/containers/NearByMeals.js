import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';

import { getNearbyMeals, getUserDetails } from '../actions/index';
import './MealList.css';
import SearchBar from './SearchBar';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 37.783697, lng: -122.408966 }}
  >
    { props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
        />
      ))
    }
  </GoogleMap>
));

class NearByMap extends Component {
  handleMapLoad = (map) => {
    this._map = map;
  }

  componentWillReceiveProps(nextProps) {
    if (this._map && nextProps.markers.length !== 0) {
      // eslint-disable-next-line
      let bounds = new google.maps.LatLngBounds();
      nextProps.markers.forEach(function(marker) {
        bounds.extend(marker.position);
      });
      this._map.fitBounds(bounds);
    }
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

// eslint-disable-next-line
const geocoder = new google.maps.Geocoder();

class NearByMeals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    };
  }

  componentDidMount() {
    this.props.getUserDetails();
    this.props.getNearbyMeals(this.props.user.zipcode);
  }

  componentWillReceiveProps(nextProps) {
    let latLngs = [];
    let markers = [];

    if (this.props.meals !== nextProps.meals && _.size(nextProps.meals) !== 0) {
      _.each(nextProps.meals, meal => {
        const address = `${meal.address}, ${meal.city} ${meal.state}, ${meal.zipcode}`;
        latLngs.push(this.geocodeAddress(address));
      });

      Promise.all(latLngs)
        .then(res => {
          markers = res.map(latLng => (
            {
              position: { lat: latLng.lat, lng: latLng.lng },
              showInfo: false
            }
          ));
          this.setState({markers});
        });
    }
  }

  geocodeAddress = address => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({address}, (results, status) => {
        if (status === 'OK') {
          const latLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          resolve(latLng);
        } else {
          reject(status);
        }
      });
    });
  }

  render() {
    const style = { marginRight: 8 };

    return (
      <div className="root">
        <Link to="/meals">
          <RaisedButton style={style} label="ALL Meals" />
        </Link>

        <Link to="/nearby-meals">
          <RaisedButton style={style} label="Nearby Meals" primary={true} />
        </Link>

        <SearchBar />

        <div>
          { _.map(this.props.meals, meal => (
              <div key={meal.id}>
                <p>
                  {`${meal.name} - ${meal.chef.username} - ${meal.deliveryDateTime} - ${meal.distance}`}
                </p>
              </div>
            ))
          }
        </div>

        <div style={{ width: 600, height: 600 }}>
          <NearByMap
            markers={this.state.markers}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meals, auth: { user } }) {
  return {
    meals: meals,
    user: user
  };
}

export default connect(mapStateToProps, { getNearbyMeals, getUserDetails })(NearByMeals);
