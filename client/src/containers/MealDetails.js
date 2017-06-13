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
import FlatButton from 'material-ui/FlatButton';
import { Rating } from 'material-ui-rating';
import Dialog from 'material-ui/Dialog';
import ReviewForm from './ReviewForm';
import './MealDetails.css';
import Map from './GoogleMaps';

class MealDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.addReview = this.addReview.bind(this);
    this.didReview = this.didReview.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMealDetail(id);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
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

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div onLoad={this.didReview}>
        <Card>
          <CardHeader
            title={currentMeal.chef.username}
            subtitle="Chef"
            avatar={currentMeal.chef.image}
          />
          <CardMedia
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
          <CardTitle title="Meal Details" subtitle="Description" />
          <CardText>
            {currentMeal.description}
          </CardText>
          <CardTitle subtitle="Pickup Information" />
          <CardText>
            <p>{currentMeal.pickupInfo}</p>
            <p>{`${currentMeal.address}, ${currentMeal.city}, ${currentMeal.state} ${currentMeal.zipcode}`}</p>
            <div style={{width:300, height:300}}>
              <Map
                address={currentMeal.address}
                city={currentMeal.city}
                state={currentMeal.state}
                containerElement={<div style={{height: `100%`}} />}
                mapElement={<div style={{height: `100%`}} />}
              />
            </div>
          </CardText>
          <CardActions>
            <RaisedButton label="Purchase" onTouchTap={this.handleOpen} />
            <Dialog
              title="Please confirm your purchase details"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Lebron sucks
            </Dialog>
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