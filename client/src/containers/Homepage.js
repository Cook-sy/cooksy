import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle
} from 'material-ui/Card';

import { connect } from 'react-redux';
import { fetchUpcomingMeals, getAllRequests, orderRequestedMeal } from '../actions';
import RequestGridElement from '../components/RequestGridElement';
import { getTopRequests } from '../utils/RequestHelper';
import './Homepage.css';

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

class Homepage extends Component {
  componentDidMount() {
    this.props.getAllRequests();
    this.props.fetchUpcomingMeals();
  }

  render() {
    const { upcomingMeals, requests } = this.props;
    const topRequests = requests && getTopRequests(requests, 3);
    console.log(topRequests)
    let dates = Object.keys(upcomingMeals).sort(function(a, b) {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return (
      <div>
        <div className="homepage-hero">
          <div className="homepage-hero-inner">
            <h1 className="homepage-name">Cooksy</h1>

            <div className="homepage-hero-btn">
              <Link to="/nearby-meals">
                <RaisedButton label="Find your next meal" />
              </Link>
            </div>
          </div>
        </div>

        <div className="homepage-meals">
          <h2 className="homepage-upcoming">Hot Requests</h2>

          <div className="homepage-requests">
            { Object.keys(topRequests).length > 0 && _.map(topRequests, (req) => (
              <div key={req.id} className="homepage-requests-card">
                <RequestGridElement
                  key={req.id}
                  gridItem={req}
                  orderRequestedMeal={this.props.orderRequestedMeal}
                />
              </div>
              ))
            }
          </div>

          <br />

          <h2 className="homepage-upcoming">Upcoming Meals</h2>

          <div className="homepage-upcoming-list">
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
        </div>
      </div>
    );
  };
};

function mapStateToProps({ requests, upcomingMeals }) {
  return {
    upcomingMeals,
    requests
  };
};

export default connect(mapStateToProps, { fetchUpcomingMeals, getAllRequests, orderRequestedMeal })(Homepage);
