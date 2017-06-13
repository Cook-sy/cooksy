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

  addReview() {
    this.props.toggleReview();
  }

  didReview() {
    this.props.didReview(this.props.currentMeal);
  }

  render() {
    const { currentMeal, review } = this.props;

    if (Object.keys(currentMeal).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div onLoad={this.didReview} className="flex-grid">
          <div className="col">
            <Card>
              <CardHeader
                title={currentMeal.chef.username}
                subtitle="Chef"
                avatar={currentMeal.chef.image}
              />
              <CardMedia
                className="details-image"
                overlay={
                  <CardTitle
                    title={currentMeal.name}
                    subtitle={currentMeal.chef.username}
                  />
                }
              >
                <img
                  src={currentMeal.images}
                  alt={currentMeal.name}
                  width="500"
                  height="500"
                />
              </CardMedia>
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
            <CardText>
              <p className="details-titles">Pickup information:</p>
              <p className="details-text">Food will be availabe for pick up at {new Date(currentMeal.deliveryDateTime).toLocaleTimeString().substr(0, 5) +
                new Date(currentMeal.deliveryDateTime).toLocaleTimeString().substr(8, 10)}
              </p>
              <p className="details-text">{currentMeal.pickupInfo}</p>
              <p className="details-text">
                {currentMeal.address}<br/>
                {currentMeal.city}, {currentMeal.state}<br/>
                {currentMeal.zipcode}
              </p>
              <div style={{width:400, height:400}}>
                <Map
                  address={currentMeal.address}
                  city={currentMeal.city}
                  state={currentMeal.state}
                  containerElement={<div style={{height: `100%`}} />}
                  mapElement={<div style={{height: `100%`}} />}
                />
              </div>
            </CardText>
          </div>
          <div className="col">
            <CardText>
              <p className="details-titles">Available On:</p>
              <p className="delivery-date">{new Date(currentMeal.deliveryDateTime).toString().substr(4, 11)}
              </p>
            </CardText>
            <CardText>
              <p className="details-titles">Meal Description:</p>
              <p className="details-text">{currentMeal.description}</p>
            </CardText>
          </div>
        </div>
        <ReviewForm id={this.props.match.params.id} />
          <div className="reviews">
            {review.currentReviews.reverse().map(review =>
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

function mapStateToProps({ review, currentMeal }, ownProps) {
  return {
    currentMeal: currentMeal,
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
