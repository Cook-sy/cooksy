import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
  renderDateField,
  renderTextField,
  renderAutoComplete
} from '../utils/FormHelper';
import RaisedButton from 'material-ui/RaisedButton';
import { } from '../actions';

class RequestForm extends Component {
  submitForm(values) {
  }

  handleUpdateInput(e) {
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const dataSource = ['obay', 'obama'];

    return (
      <form
        onSubmit={handleSubmit(this.submitForm)}
      >
        <div>
          <Field
            name="Meal" 
            component={renderAutoComplete} 
            floatingLabelText="Meal" 
            dataSource={dataSource}
            onUpdateInput={this.handleUpdateInput}
           />
        </div>
        <div>
          <Field
            hintText="Deadline"
            name="Deadline"
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

function mapStateToProps() {
  return {
    // review: review,
    // currentMeal: currentMeal
  };
}

export const validate = values => {
  const errors = {};
  // if (!values.title) {
  // 	errors.title = 'Title is required';
  // }

  // if (!values.review) {
  // 	errors.review = 'Review is required';
  // }

  return errors;
};

export default reduxForm({
	validate,
  form: 'ReviewsForm'
})(
  connect(mapStateToProps, {
  })(RequestForm)
);
