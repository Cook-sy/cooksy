import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchMealDetail,
  reviewMeal,
  rateMeal,
  toggleReview,
  didReview
} from '../actions';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';

import ReviewForm from './ReviewForm';
import './MealDetails.css';
import Map from './GoogleMaps';

class MealDetails extends Component {
  constructor(props) {
    super(props);
    this.addReview = this.addReview.bind(this);
    this.didReview = this.didReview.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMealDetail(id);
  }

  addReview(e) {
    this.props.toggleReview();
  }

  didReview(meal) {
    this.props.didReview(this.props.meal);
  }

  render() {
    const { meal, review } = this.props;
    if (!meal) {
      return <div>Loading...</div>;
    }

    return (
      <div onLoad={this.didReview}>
        <Card>
          <CardHeader
            title={meal.chef.username}
            subtitle="Chef"
            avatar={meal.chef.image}
          />
          <CardMedia
            overlay={
              <CardTitle
                title={this.props.meal.name}
                subtitle={meal.chef.username}
              />
            }
          >
            <img
              src={this.props.meal.images}
              alt="meal"
              width="500"
              height="500"
            />
          </CardMedia>
          <CardTitle title="Meal Details" subtitle="Description" />
          <CardText>
            {this.props.meal.description}
          </CardText>
          <CardTitle subtitle="Pickup Information" />
          <CardText>
            <p>{this.props.meal.pickupInfo}</p>
            <p>{`${this.props.meal.address}, ${this.props.meal.city}, ${this.props.meal.state} ${this.props.meal.zipcode}`}</p>
            <div style={{width:300, height:300}}>
              <Map
                address={this.props.meal.address}
                city={this.props.meal.city}
                state={this.props.meal.state}
                containerElement={<div style={{height: `100%`}} />}
                mapElement={<div style={{height: `100%`}} />}
              />
            </div>
          </CardText>
          <CardActions>
            <RaisedButton label="Purchase" />
            <RaisedButton
              label={
                <Link
                  to={'/meals'}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Back To Meals
                </Link>
              }
            />
            {!review.didReview && <RaisedButton  label="Add a review" onClick={this.addReview} /> }
          </CardActions>
        </Card>
        <ReviewForm id={this.props.match.params.id} />
        <div className="reviews">
          {meal.mealReviews.reverse().map(review =>
            <div className="review" key={review.id}>
              <div>
                <Rating value={Math.ceil(review.rating)} max={5} readOnly={true} />
              </div>
              <p className="review-title">{review.title}</p>
              <p className="review-text">{review.review}</p>
              <p className="reviewer">{review.user.username}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meals, review }, ownProps) {
  return {
    meals: meals,
    meal: meals[ownProps.match.params.id],
    review: review
  };
}

export default connect(mapStateToProps, {
  fetchMealDetail,
  reviewMeal,
  rateMeal,
  toggleReview,
  didReview
})(MealDetails);
