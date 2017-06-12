import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import _ from 'lodash';

import { getNearbyMeals, getUserDetails } from '../actions/index';
import './MealList.css';
import SearchBar from './SearchBar';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 37.783697, lng: -122.408966 }}
  />
));

// eslint-disable-next-line
const geocoder = new google.maps.Geocoder();

class NearByMeals extends Component {
  componentDidMount() {
    this.props.getUserDetails();
    this.props.getNearbyMeals(this.props.user.zipcode);
  }

  componentWillReceiveProps(nextProps) {
    let markers = [];

    if (!_.isEqual(this.props.meals, nextProps.meals) && _.size(nextProps.meals) !== 0) {
      _.each(nextProps.meals, meal => {
        const address = `${meal.address}, ${meal.city} ${meal.state}, ${meal.zipcode}`;
        markers.push(this.geocodeAddress(address));
      });

      Promise.all(markers)
        .then(markers => console.log(markers));
    }
  }

  geocodeAddress = address => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({address}, (results, status) => {
        if (status === 'OK') {
          resolve(results);
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
          <GoogleMapWrapper
            containerElement={
              <div style={{ height: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
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
