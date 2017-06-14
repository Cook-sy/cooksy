import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import { Rating } from 'material-ui-rating';
import { AutoComplete } from 'redux-form-material-ui';
// Import injectTapEvent to get rid of Unknown props onTouchTap error
import injectTapEventPlugin from 'react-tap-event-plugin';
import uuid from 'uuid';

import '../containers/Containers.css';

injectTapEventPlugin();

export function isZipcode(value) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);
}

export function isEmail(email) {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    id={uuid.v4()}
    {...input}
    {...custom}
  />;

export const renderTextAreaField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    id={uuid.v4()}
    floatingLabelText={label}
    errorText={touched && error}
    className="textarea-field"
    {...input}
    {...custom}
  />;

export const renderDateField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) =>
  <DatePicker
    {...input}
    {...custom}
    errorText={touched && error}
    value={input.value !== '' ? new Date(input.value) : null}
    onChange={(event, value) => input.onChange(value)}
    id={uuid.v4()}
  />;

export const renderTimeField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    id={uuid.v4()}
    type='time'
    {...input}
    {...custom}
  />;

export const renderRadioGroup = ({
  input,
  selected,
  meta: { touched, error },
  ...custom
}) =>
  <div>
    <RadioButtonGroup
      {...input}
      {...custom}
      valueSelected={input.value}
    />
    {touched && error && <span className="error">{error}</span>}
  </div>;

export const renderRatingField = ({ input: { onChange, value }, ...custom }) => {
 return ( 
    <Rating
      value={value || 5}
      onChange={onChange}
      {...custom}
    />
  );
}

export const renderAutoComplete = ({ ...custom }) => {
  return (
    <AutoComplete
      {...custom}
    />  
  );
}

export function differenceBetweenTwoDatesInDays(end, start) {
  var endDate = new Date(end);
  var startDate = start && new Date(start) || new Date();
  var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
}