import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
  renderTextAreaField,
  renderTextField,
  renderRatingField
} from '../utils/FormHelper';
import RaisedButton from 'material-ui/RaisedButton';
import { reviewMeal, rateMeal } from '../actions';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    values.mealId = this.props.meal.id;
    values.rating = values.rating || 5;  
    this.props.reviewMeal(values);
  }

  render() {
    const { review, handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className={`no-border ${review.addReview ? 'show' : 'hidden'}`} 
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

function mapStateToProps({ review, meals }, ownProps) {
  const id = ownProps.id;
  return {
    review: review,
    meal: meals[id]
  };
}

export default reduxForm({
  form: 'ReviewsForm'
})(
  connect(mapStateToProps, {
    reviewMeal,
    rateMeal
  })(ReviewForm)
);
