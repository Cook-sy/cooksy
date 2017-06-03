import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton';

import { logInUser, logInChef } from '../actions';
import { successfulAuth } from '../utils/IsAuthenticated'
import {
  renderTextField,
  renderRadioGroup
} from '../utils/FormHelper';
import './NewMealForm.css';

export class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.successfulAuth = successfulAuth.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    if (values.role === 'chef') {
      this.props.logInChef(values, this.successfulAuth);
    } else {
      this.props.logInUser(values, this.successfulAuth);
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <h1>Login Form</h1>
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
        <p className='error'>{this.props.error}</p>
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

  return errors;
};

function mapStateToProps({auth}) {
  return auth
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logInUser, logInChef }, dispatch);
}

export default reduxForm({
  validate,
  form: 'LogInForm'
})(connect(mapStateToProps, mapDispatchToProps)(LogInForm));
