import React from "react";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import { RadioButtonGroup } from 'material-ui/RadioButton';

// Import injectTapEvent to get rid of Unknown props onTouchTap error
import injectTapEventPlugin from "react-tap-event-plugin";
import uuid from "uuid";

import '../containers/Containers.css';

injectTapEventPlugin();

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    id={uuid.v4()}
    {...input}
    {...custom}
  />
);

export const renderTextAreaField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField
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
}) => {
  return (
    <DatePicker
      {...input}
      {...custom}
      errorText={touched && error}
      value={input.value !== "" ? new Date(input.value) : null}
      onChange={(event, value) => input.onChange(value)}
      id={uuid.v4()}
    />
  );
};

export const renderTimeField = ({
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
      errorText={touched && error}
      value={input.value !== "" ? new Date(input.value) : null}
      onChange={(event, value) => input.onChange(value)}
      id={uuid.v4()}
    />
  );
};

export const renderRadioGroup = ({
  input,
  selected,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <RadioButtonGroup
      {...input}
      {...custom}
      valueSelected={input.value }
      onChange={(event, value) => input.onChange(value)}
    />
    {touched && error && <span className="error">{error}</span>}
  </div>
);