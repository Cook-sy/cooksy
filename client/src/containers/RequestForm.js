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
  	console.log('here')
  	values.mealId = 12;
  	this.props.createRequest(values);
  }

  handleUpdateInput(e) {
  	console.log(e)
  }

  componentDidMount() {
  	this.props.fetchMealsByChef();
  }

  render() {
    const { meals, handleSubmit, pristine, submitting } = this.props;
    const dataSource = Object.keys(meals).length && _.uniqBy(meals, 'name').map(meal => meal.name) || [];

    return (
      <form
        onSubmit={handleSubmit(this.submitForm)}
      >
        <div>
          <Field
            name="meal" 
            component={renderAutoComplete} 
            floatingLabelText="Meal" 
            dataSource={dataSource}
            onUpdateInput={this.handleUpdateInput}
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
