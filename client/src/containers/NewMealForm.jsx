import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";

// Import injectTapEvent to get rid of Unknown props onTouchTap error
import injectTapEventPlugin from "react-tap-event-plugin";

import { createMeal } from "../actions";
import RaisedButton from "material-ui/RaisedButton";
import "./NewMealForm.css";

injectTapEventPlugin();

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderTextAreaField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField hintText={label} floatingLabelText={label} {...input} />;

const renderDateField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <DatePicker
      {...input}
      {...custom}
      value={input.value !== "" ? new Date(input.value) : null}
      onChange={(event, value) => input.onChange(value)}
    />
  );
};

const renderTimeField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TimePicker
      {...input}
      {...custom}
      value={input.value !== "" ? new Date(input.value) : null}
      onChange={(event, value) => input.onChange(value)}
    />
  );
};

class NewMealForm extends Component {
  submitForm(values) {
    createMeal(values, this.props.history.push("/"));
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form
          className="new-meal-form"
          onSubmit={handleSubmit(this.submitForm.bind(this))}
        >
          <h1>Submit a New Meal</h1>
          <div>
            <Field
              name="mealName"
              component={renderTextField}
              label="Meal Name"
            />
          </div>
          <div>
            <Field
              name="description"
              component={renderTextAreaField}
              label="Description"
              multiLine={true}
              rows={2}
            />
          </div>
          <div>
            <Field
              hintText="Delivery Date"
              name="delivery-date"
              component={renderDateField}
              autoOk={true}
            />
            <Field
              hintText="Delivery Time"
              name="delivery-time"
              component={renderTimeField}
              autoOk={true}
            />
          </div>
          <div className="images-container">
            <div>
              <Field
                name="photo_1"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 1"
              />
            </div>
            <div>
              <Field
                name="photo_2"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 2"
              />
            </div>
            <div>
              <Field
                name="photo_3"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 3"
              />
            </div>
            <div>
              <Field
                name="photo_4"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 4"
              />
            </div>
          </div>
          <div>
            <Field
              name="price"
              component={renderTextField}
              label="$12"
              floatingLabelText="Price"
            />
            <Field
              name="servings"
              component={renderTextField}
              label="10"
              floatingLabelText="Servings"
            />
          </div>
          <div>
            <Field name="address" component={renderTextField} label="Address" />
          </div>
          <div>
            <Field name="city" component={renderTextField} label="City" />
            <Field name="state" component={renderTextField} label="State" />
          </div>
          <div>
            <Field name="zipcode" component={renderTextField} label="Zipcode" />
          </div>
          <div>
            <RaisedButton type="submit" disabled={pristine || submitting}>
              Submit
            </RaisedButton>
          </div>
        </form>
      </div>
    );
  }
}

function validate() {
  // TODO: I will add some validations in here after we agree on them
}

export default reduxForm({
  validate,
  form: "NewMealForm"
})(connect(null, { createMeal })(NewMealForm));
