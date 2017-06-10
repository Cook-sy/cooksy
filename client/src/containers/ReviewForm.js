import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
  renderTextAreaField,
  renderTextField,
  renderRatingField
} from '../utils/FormHelper';
import RaisedButton from 'material-ui/RaisedButton';
import { reviewMeal, rateMeal, successfullReview } from '../actions';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    values.mealId = this.props.currentMeal.id;
    values.rating = values.rating || 5;  
    this.props.reviewMeal(values);
    this.props.successfullReview()
  }

  render() {
    const { review, handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className={`no-border ${review.addReview && !review.didReview ? 'show' : 'hidden'}`} 
        onSubmit={handleSubmit(this.submitForm)}
      >
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
    );
  }
}

function mapStateToProps({ review, currentMeal }, ownProps) {
  return {
    review: review,
    currentMeal: currentMeal
  };
}

export const validate = values => {
  const errors = {};
  if (!values.title) {
  	errors.title = 'Title is required';
  }

  if (!values.review) {
  	errors.review = 'Review is required';
  }

  return errors;
};

export default reduxForm({
	validate,
  form: 'ReviewsForm'
})(
  connect(mapStateToProps, {
    reviewMeal,
    rateMeal,
    successfullReview
  })(ReviewForm)
);
