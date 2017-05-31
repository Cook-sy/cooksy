import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { createMeal } from '../actions';
import {
  renderTextAreaField,
  renderTimeField,
  renderTextField,
  renderDateField
} from '../utils/FormHelper';
import './SignUpForm.css';
import './NewMealForm.css';


export class SignUpForm extends Component {
  submitForm(values) {
	createMeal(values, this.props.history.push("/"));
  }

  render() {
		const { handleSubmit, pristine, submitting } = this.props;

		return (
		  <form>
		  	<h1>Signup Form</h1>
        <div>
          <label><Field name="account" component="input" type="radio" value="user" checked/> User</label>
          <label><Field name="account" component="input" type="radio" value="chef"/> Chief</label>
        </div>
				<div>
				  <Field
						name="username"
						label="Username"
						component={renderTextField}
				  />
				</div>
				<div>
				  <Field
						name="password"
						label="Password"
						type="password"
						component={renderTextField}
				  />
				</div>
				<div>
				  <Field
						name="city"
						label="City"
						component={renderTextField}
				  />
			    <Field
			  		name="state"
			  		label="State"
			  		component={renderTextField}
			    />
				</div>
				<div>
					<Field
						name="address"
						label="address"
						component={renderTextAreaField}
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
		)
  }  
}

function validate() {

}
export default reduxForm({
  validate,
  form: "SignUpForm"
})(connect(null, { createMeal })(SignUpForm));