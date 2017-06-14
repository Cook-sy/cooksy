import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Rating } from 'material-ui-rating';
import _ from 'lodash';
import { Media } from 'react-bootstrap';
import moment from 'moment';
import Truncate from 'react-truncate';

import { getNearbyMeals, getUserDetails } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './NearByMeals.css';
import SearchBar from './SearchBar';

// eslint-disable-next-line
const geocoder = new google.maps.Geocoder();

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
  handleMapLoad = (map) => {
    this._map = map;
  }

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

const defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
const selectedIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

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
              infoContent: meal.name
            }
          ));
          this.setState({markers});
        });
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
      alert('This Browser doesn\'t support HTML5 geolocation');
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
      currentMarkerId: targetMarker.id
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
      hoverId: targetMarker.id
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

  render() {
    const style = { marginRight: 8 };
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

    return (
      <div className="root">
        <Link to="/meals">
          <RaisedButton style={style} label="ALL Meals" />
        </Link>

        <Link to="/nearby-meals">
          <RaisedButton style={style} label="Nearby Meals" primary={true} />
        </Link>

        <SearchBar />

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="zipcode"
            value={this.state.zipcode}
            onChange={this.handleInputChange}
            placeholder="Zipcode"
          />
          <input
            type="text"
            name="radius"
            value={this.state.radius}
            onChange={this.handleInputChange}
            placeholder="Radius (miles)"
          />
          <button type="submit">Submit</button>
        </form>

        <div className="NearByMeals-container">
          <div className="NearByMeals-resultsContainer">
            <Media.List>
              { _.map(this.props.meals, meal => (
                  <Media.ListItem
                    key={meal.id}
                    className={this.highlightMeal(meal.id)}
                  >
                    <Media
                      onClick={() => this.handleMarkerClick(this.state.markers.find(marker => marker.id === meal.id))}
                      onMouseEnter={() => this.handleMarkerOver(this.state.markers.find(marker => marker.id === meal.id))}
                      onMouseLeave={() => this.handleMarkerOut(this.state.markers.find(marker => marker.id === meal.id))}
                      >
                      <Media.Body>
                        <Media.Heading>
                          <Link
                            to={`/meals/${meal.id}`}
                            className="NearByMeals-meal-heading"
                          >
                            {meal.name}
                          </Link>

                          <span className="pull-right NearByMeals-meal-date">
                            {moment(meal.deliveryDateTime).format('MMMM D, YYYY')}
                          </span>
                        </Media.Heading>

                        <span>
                          <Rating
                            value={Math.ceil(meal.rating)}
                            max={5}
                            readOnly={true}
                            itemStyle={styles.small}
                            itemIconStyle={styles.smallIcon}
                            style={{ display: 'inline' }}
                            />
                          <span className="pull-right NearByMeals-meal-price">${meal.price}</span>
                        </span>

                        <Media className="NearByMeals-meal-aux">
                          <Media.Left>
                            <img height="36" src={meal.chef.image} />
                          </Media.Left>

                          <Media.Body>
                            <span className="NearByMeals-meal-chef">{meal.chef.username}</span>
                            <p className="NearByMeals-meal-address">
                              {`${meal.address}, ${meal.city}`}
                            </p>
                          </Media.Body>
                        </Media>

                        <Truncate
                          className="NearByMeals-meal-desc"
                          lines={2}
                          ellipsis={<span>... <Link to={`/meals/${meal.id}`}>Read more</Link></span>}
                        >
                          {meal.description}
                        </Truncate>
                      </Media.Body>

                      <Media.Right>
                        <img width="96" src={meal.images} alt={meal.name} className="img-rounded" />
                      </Media.Right>
                    </Media>
                  </Media.ListItem>
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
