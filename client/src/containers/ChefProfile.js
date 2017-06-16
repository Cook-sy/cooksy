import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rating } from 'material-ui-rating';
import {
  fetchChefDetails,
  getChefsRequests,
  orderRequestedMeal,
  fetchOrderedMealsByChef
} from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle
} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RequestCard from '../components/RequestCard';
import { Media } from 'react-bootstrap';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './ChefProfile.css';
import './UserProfile.css';

const styles = {
  smallIcon: {
    width: 16,
    height: 16
  },
  small: {
    width: 36,
    height: 36,
    padding: 6
  },
};

class ChefProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchChefDetails(id);
    this.props.fetchOrderedMealsByChef(id);
    this.props.getChefsRequests(id);
  }

  render() {
    const { chef, requests, upcomingMeals } = this.props;
    let dates = Object.keys(upcomingMeals).sort(function(a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return (
      <div className="chef-root">
        <Media>
          <Media.Left>
            <img className="img-circle" src={chef.image} width="128" alt={chef.username} />
          </Media.Left>

          <Media.Body>
            <Media.Heading>
              {chef.username}
            </Media.Heading>

            <Rating value={Math.ceil(chef.rating)} max={5} readOnly={true} />
            <a href={`mailto:${chef.email}`}>
              <RaisedButton className="request" label="Contact" primary={true} />
            </a>
          </Media.Body>
        </Media>

        <div className="user-requests">
          <h2 className="user-heading">Requests</h2>

          <div className="user-requests-list">
            { _.map(requests, (request) => (
                <div key={request.id} className="user-request-card">
                  <RequestCard
                    requestId={request.requestId}
                    numRequired={request.numRequired}
                    numOrdered={request.numOrdered}
                    orderRequestedMeal={this.props.orderRequestedMeal}
                    deadline={request.deadline}
                    meal={request.meal}
                  />
                </div>
              ))
            }
          </div>
        </div>

        <h2 className="chef-upcoming">Upcoming Meals</h2>
          { dates.length !== 0 && _.map(dates, (date) => (
            <div key={date}>
              <span className="homepage-date">
                {moment(new Date(date).toISOString()).format('dddd, MMMM D')}
              </span>

              <div className="homepage-meal-upcoming">
                { _.map(upcomingMeals[date], (meal) => (
                    <Card
                      key={meal.id}
                      className="homepage-meal-item"
                    >
                      <CardHeader
                        title={meal.chef.username}
                        subtitle={`${meal.city}, ${meal.state}`}
                        avatar={meal.chef.image}
                    />

                      <CardMedia>
                        <img
                          className="homepage-meal-item-image"
                          src={meal.images}
                          alt={meal.name}
                        />
                      </CardMedia>

                      <CardTitle
                        title={
                          <Link to={`/meals/${meal.id}`} className="homepage-meal-item-name">
                            {meal.name}
                          </Link>
                        }
                        titleColor="#00bcd4"
                        titleStyle={{ fontSize: 20 }}
                      >
                        <span className="review-rating">
                          <Rating
                            value={Math.ceil(meal.rating)}
                            max={5}
                            readOnly={true}
                            itemStyle={styles.small}
                            itemIconStyle={styles.smallIcon}
                          />
                        </span>
                      </CardTitle>
                    </Card>
                  ))
                }
              </div>
            </div>
            ))
          }
      </div>
    );
  }
}

function mapStateToProps({ meals, chef, requests, upcomingMeals }) {
  return {
    meals: meals,
    chef: chef,
    requests: requests,
    upcomingMeals: upcomingMeals
  };
}

export default connect(mapStateToProps, { fetchChefDetails, getChefsRequests, orderRequestedMeal, fetchOrderedMealsByChef })(ChefProfile);
