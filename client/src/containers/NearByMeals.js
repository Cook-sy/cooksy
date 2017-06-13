import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
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
  handleMapLoad = (map) => {
    this._map = map;
  }

  componentWillReceiveProps(nextProps) {
    // Resize map to fit markers only if the number of markers has changed
    if (this._map && this.props.markers.length !== nextProps.markers.length) {
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

class NearByMeals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      currentMarker: null
    };
  }

  componentDidMount() {
    this.props.getUserDetails();
    this.props.getNearbyMeals(this.props.user.zipcode);
  }

  componentWillReceiveProps(nextProps) {
    let geocodedMeals = [];
    let markers = [];

    if (this.props.meals !== nextProps.meals && _.size(nextProps.meals) !== 0) {
      _.each(nextProps.meals, meal => {
        geocodedMeals.push(this.geocodeMeal(meal));
      });

      Promise.all(geocodedMeals)
        .then(res => {
          markers = res.map(meal => (
            {
              id: meal.id,
              position: meal.location,
              showInfo: false,
              infoContent: meal.name
            }
          ));
          this.setState({markers});
        });
    }
  }

  geocodeMeal = meal => {
    // eslint-disable-next-line
    const geocoder = new google.maps.Geocoder();
    const address = `${meal.address}, ${meal.city} ${meal.state}, ${meal.zipcode}`;

    return new Promise((resolve, reject) => {
      geocoder.geocode({address}, (results, status) => {
        if (status === 'OK') {
          const geocodedMeal = {
            ...meal,
            location: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            }
          };
          resolve(geocodedMeal);
        } else {
          reject(status);
        }
      });
    });
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return { ...marker, showInfo: true };
        }
        return { ...marker, showInfo: false };
      }),
      currentMarker: targetMarker
    });
  }

  handleMarkerClose = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return { ...marker, showInfo: false };
        }
        return marker;
      }),
      currentMarker: null
    });
  }

  handleMarkerOver = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return { ...marker, showInfo: true };
        }
        return marker;
      })
    });
  }

  handleMarkerOut = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        // Only remove the info window if it is not the current marker's info window
        if (marker === targetMarker && !_.isEqual(targetMarker, this.state.currentMarker)) {
          return { ...marker, showInfo: false };
        }
        return marker;
      })
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

        <ul>
          { _.map(this.props.meals, meal => (
              <li
                key={meal.id}
                onClick={() => this.handleMarkerClick(this.state.markers.find(marker => marker.id === meal.id))}
              >
                {`${meal.name} - ${meal.chef.username} - ${meal.deliveryDateTime} - ${meal.distance}`}
              </li>
            ))
          }
        </ul>

        <div style={{ width: 600, height: 600 }}>
          <NearByMap
            markers={this.state.markers}
            onMarkerClick={this.handleMarkerClick}
            onMarkerClose={this.handleMarkerClose}
            onMarkerOver={this.handleMarkerOver}
            onMarkerOut={this.handleMarkerOut}
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
