import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import _ from 'lodash';
import { Media } from 'react-bootstrap';
import NearByMap from './NearByMap'
import NearByMealsListItem from './NearByMealsListItem';
import NearBySearch from './NearBySearch';

import { getNearbyMeals, getUserDetails } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './NearByMeals.css';

// eslint-disable-next-line
const geocoder = new google.maps.Geocoder();

const defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
const selectedIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

const styles = {
  smallIcon: {
    width: 12,
    height: 12
  },
  small: {
    width: 24,
    height: 24,
    padding: 4
  },
};

class NearByMeals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      currentMarkerId: null,
      hoverId: null,
      zipcode: this.props.user.zipcode || '',
      radius: 20
    };
  }

  componentDidMount() {
    this.props.getUserDetails();
    this.props.getNearbyMeals(this.props.user.zipcode, this.state.radius * 1609);
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
              icon: defaultIcon,
              position: meal.location,
              showInfo: false,
              infoContent: this.renderInfoContent(meal)
            }
          ));
          this.setState({markers});
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentMarkerId !== this.state.currentMarkerId) {
      // Scroll meal list to clicked meal.
      if (this._node) {
        ReactDOM.findDOMNode(this._node)
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }

  geocodeMeal = meal => {
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

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const currentLoc = { lat, lng };

        geocoder.geocode({location: currentLoc}, (results, status) => {
          if (status === 'OK') {
            let postalCode = results[0].address_components.find((component) => {
              return component.types[0] === 'postal_code';
            });
            this.props.getNearbyMeals(postalCode.short_name, this.state.zipcode * 1609);
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      });
    }
    else {
      alert('This browser doesn\'t support HTML5 geolocation');
    }
  }

  handleMarkerClick = (targetMarker) => {
    this.setState((prevState, props) => ({
      markers: prevState.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            icon: selectedIcon,
            showInfo: true
          };
        }
        return {
          ...marker,
          icon: defaultIcon,
          showInfo: false
        };
      }),
      currentMarkerId: targetMarker ? targetMarker.id : null
    }));
  }

  handleMarkerClose = (targetMarker) => {
    this.setState((prevState, props) => ({
      markers: prevState.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            icon: defaultIcon,
            showInfo: false
          };
        }
        return marker;
      }),
      currentMarkerId: null
    }));
  }

  handleMarkerOver = (targetMarker) => {
    this.setState((prevState, props) => ({
      markers: prevState.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true
          };
        }
        return marker;
      }),
      hoverId: targetMarker ? targetMarker.id : null
    }));
  }

  handleMarkerOut = (targetMarker) => {
    this.setState((prevState, props) => ({
      markers: prevState.markers.map(marker => {
        // Only remove the info window if it is not the current marker's info window
        if (marker === targetMarker && targetMarker.id !== prevState.currentMarkerId) {
          return {
            ...marker,
            showInfo: false
          };
        }
        return marker;
      }),
      hoverId: null
    }));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { zipcode, radius } = this.state;
    // Reset UI state for new search
    this.setState({
      markers: [],
      currentMarkerId: null,
      hoverId: null
    }, () => {
      this.props.getNearbyMeals(zipcode, radius * 1609);
    });
  }

  highlightMeal = (mealId) => {
    if (this.state.hoverId === mealId && this.state.currentMarkerId !== mealId) {
      return 'NearByMeals-hover-meal';
    } else if (this.state.currentMarkerId === mealId) {
      return 'NearByMeals-select-meal';
    } else {
      return '';
    }
  }

  renderInfoContent = (meal) => {
    return (
      <p>
        <Link
          to={`/meals/${meal.id}`}
          className="NearByMeals-meal-heading"
        >
          {meal.name}
        </Link>

        <Rating
          value={Math.ceil(meal.rating)}
          max={5}
          readOnly={true}
          itemStyle={styles.small}
          itemIconStyle={styles.smallIcon}
        />

        <span className="NearByMeals-meal-chef">{meal.chef.username}</span>
        <p className="NearByMeals-meal-address">
          {`${meal.address}, ${meal.city}`}
        </p>
      </p>
    );
  }

  render() {
    const style = { marginRight: 8 };

    // Get a reference to the node of the meal in the list that is currently selected
    const createRef = (mealId) => {
      const selected = mealId === this.state.currentMarkerId;
      let ref = null;
      if (selected) {
        ref = (el) => { this._node = el; };
      }
      return ref;
    };

    return (
      <div className="root">
        <div style={{ marginLeft: 20 }}>
          <Link to="/meals">
            <RaisedButton style={style} label="ALL Meals" />
          </Link>

          <Link to="/nearby-meals">
            <RaisedButton style={style} label="Nearby Meals" primary={true} />
          </Link>
        </div>

        <NearBySearch
          radius={this.state.radius}
          zipcode={this.state.zipcode}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />

        <div className="NearByMeals-container">
          <div className="NearByMeals-resultsContainer">
            <Media.List>
              { _.size(this.props.meals) === 0
                ? <div style={{ margin: 20 }}>
                    <p>Sorry, no meals found around here!</p>
                    <p>Try searching a zipcode.</p>
                  </div>
                : _.map(this.props.meals, meal => (
                    <NearByMealsListItem
                      key={meal.id}
                      ref={createRef(meal.id)}
                      className={this.highlightMeal(meal.id)}
                      meal={meal}
                      markers={this.state.markers}
                      handleMarkerClick={this.handleMarkerClick}
                      handleMarkerOver={this.handleMarkerOver}
                      handleMarkerOut={this.handleMarkerOut}
                    />
                  ))
              }
            </Media.List>
          </div>

          <div className="NearByMeals-mapView">
            <NearByMap
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
              onMarkerOver={this.handleMarkerOver}
              onMarkerOut={this.handleMarkerOut}
            />
          </div>
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
