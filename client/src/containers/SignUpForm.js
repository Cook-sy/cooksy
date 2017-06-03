import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton';

import { signUpUser, signUpChef } from '../actions';
import { successfulAuth } from '../utils/IsAuthenticated'
import {
  renderTextAreaField,
  renderTextField,
  renderRadioGroup,
  isZipcode
} from '../utils/FormHelper';
import './SignUpForm.css';
import './NewMealForm.css';

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.successfulAuth = successfulAuth.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    if (values.role === 'chef') {
      this.props.signUpChef(values, this.successfulAuth);
    } else {
      this.props.signUpUser(values, this.successfulAuth);
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <h1>Signup Form</h1>
        <div className="radio-button-group">
          <Field name="role" component={renderRadioGroup}>
            <RadioButton value="user" label="user" />
            <RadioButton value="chef" label="chef" />
          </Field>
        </div>
        <div>
          <Field name="username" label="Username" component={renderTextField} />
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
            name="image"
            label="http://example.com/image.jpeg"
            floatingLabelText="Image"
            component={renderTextField}
          />
        </div>
        <div>
          <Field
            name="address"
            label="Address"
            component={renderTextAreaField}
            multiLine={true}
            rows={2}
          />
        </div>
        <div>
          <Field name="city" label="City" component={renderTextField} />
          <Field name="state" label="State" component={renderTextField} />
        </div>
        <div>
          <Field name="zipcode" label="Zipcode" component={renderTextField} />
        </div>
        <p className="error">{this.props.error}</p>
        <div>
          <RaisedButton type="submit" disabled={pristine || submitting}>
            Submit
          </RaisedButton>
        </div>
      </form>
    );
  }
}

export const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.zipcode) {
    errors.zipcode = 'Required';
  }

  if (!isZipcode(values.zipcode)) {
    errors.zipcode = 'Add a valid zipcode';
  }
  
  if (!values.role) {
    errors.role = 'Required';
  }

  if (!values.address && values.role === 'chef') {
    errors.address = 'Required';
  }

  if (!values.city && values.role === 'chef') {
    errors.city = 'Required';
  }

  if (!values.state && values.role === 'chef') {
    errors.state = 'Required';
  }

  return errors;
};

function mapStateToProps({auth}) {
  return auth
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUpUser, signUpChef }, dispatch);
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
