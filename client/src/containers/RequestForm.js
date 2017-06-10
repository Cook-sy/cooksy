import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import {
  renderDateField,
  renderTextField,
  renderAutoComplete
} from '../utils/FormHelper';
import RaisedButton from 'material-ui/RaisedButton';
import { createRequest, fetchMealsByChef } from '../actions';

class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    values.mealId = _.findLast(
      this.props.meals,
      meal => meal.name === values.meal
    ).id;
    this.props.createRequest(values);
  }

  componentDidMount() {
    this.props.fetchMealsByChef();
  }

  render() {
    const { meals, handleSubmit, pristine, submitting } = this.props;
    const uniqueMeals =
      meals && _.uniqBy(meals, meal => meal.name).map(meal => meal.name);
    const dataSource = uniqueMeals || [];

    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <div>
          <Field
            name="meal"
            component={renderAutoComplete}
            floatingLabelText="Meal"
            dataSource={dataSource}
          />
        </div>
        <div>
          <Field
            hintText="Deadline"
            name="deadline"
            component={renderDateField}
            autoOk={true}
          />
        </div>
        <div>
          <Field
            name="numRequired"
            component={renderTextField}
            floatingLabelText="Required Number"
            label="20"
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

function mapStateToProps({ meals }) {
  return {
    meals: meals
  };
}

export const validate = values => {
  const errors = {};
  if (!values.meal) {
    errors.meal = 'Meal is required';
  }

  if (!values.deadline) {
    errors.deadline = 'Deadline is required';
  }

  if (!values.numRequired) {
    errors.numRequired = 'This field is required';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'RequestForm'
})(
  connect(mapStateToProps, {
    createRequest,
    fetchMealsByChef
  })(RequestForm)
);
