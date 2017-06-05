import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMealDetail, reviewMeal, rateMeal } from '../actions';
import { Field, reduxForm } from 'redux-form';
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

import {
  renderTextAreaField,
  renderTextField,
  renderRatingField
} from '../utils/FormHelper';
import './MealDetails.css';

class MealDetails extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    values.mealId = this.props.meal.id;
    this.props.reviewMeal(values);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMealDetail(id);
  }

  render() {
    const { meal, handleSubmit, pristine, submitting } = this.props;
    if (!meal) {
      return <div>Loading...</div>;
    }

    return (
      <div>
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
            {this.props.meal.pickupInfo}
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
            <RaisedButton label="Add a review" />
          </CardActions>
        </Card>
        <form className="review-block" onSubmit={handleSubmit(this.submitForm)}>
          <div>
            <Field
              name="rating"
              label="Rating"
              max={5}
              value={5}
              onChange={this.props.rateMeal}
              component={renderRatingField}
            />
          </div>
          <div>
            <Field name="title" component={renderTextField} label="Title" />
          </div>
          <div>
            <Field
              name="review"
              component={renderTextAreaField}
              label="Review"
              multiLine={true}
              rows={2}
            />
          </div>
          <div>
            <RaisedButton type="submit" disabled={pristine || submitting}>
              Submit
            </RaisedButton>
          </div>
        </form>
        <div className="reviews">
          {meal.mealReviews.map(review =>
            <div className="review" key={review.id}>
              <div>
                <Rating value={review.rating} max={5} readOnly={true} />
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

function mapStateToProps({ meals }, ownProps) {
  return {
    meals: meals,
    meal: meals[ownProps.match.params.id]
  };
}

export default reduxForm({
  form: 'ReviewsForm'
})(
  connect(mapStateToProps, {
    fetchMealDetail,
    reviewMeal,
    rateMeal
  })(MealDetails)
);
