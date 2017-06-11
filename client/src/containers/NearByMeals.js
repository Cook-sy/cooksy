import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

import { getNearbyMeals, getUserDetails } from '../actions/index';
import './MealList.css';
import SearchBar from './SearchBar';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 37.783697, lng: -122.408966 }}
  />
));

class NearByMeals extends Component {
  componentDidMount() {
    this.props.getUserDetails();
    this.props.getNearbyMeals(this.props.user.zipcode);
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
