exports.validateLogin = function(payload) {
  var errors = {};
  var isFormValid = true;
  var username;
  var password;

  if (payload) {
    username = payload.username;
    password = payload.password;
  }

  if (
    !payload ||
    typeof username !== 'string' ||
    username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please enter a username';
  }

  if (
    !payload ||
    typeof password !== 'string' ||
    password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please enter a password';
  }

  return {
    success: isFormValid,
    message: !isFormValid ? 'Check the form for errors' : '',
    errors: errors
  };
};

exports.validateChefSignup = function(payload) {
  var errors = {};
  var isFormValid = true;
  var username;
  var password;
  var address;
  var city;
  var state;
  var zipcode;

  if (payload) {
    username = payload.username;
    password = payload.password;
    address = payload.address;
    city = payload.city;
    state = payload.state;
    zipcode = payload.zipcode;
  }

  if (
    !payload ||
    typeof username !== 'string' ||
    username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please enter a username';
  }

  if (
    !payload ||
    typeof password !== 'string' ||
    password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please enter a password';
  }

  if (!payload || typeof address !== 'string' || address.trim().length === 0) {
    isFormValid = false;
    errors.address = 'Please enter an address';
  }

  if (!payload || typeof city !== 'string' || city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please enter a city';
  }

  if (!payload || typeof state !== 'string' || state.trim().length === 0) {
    isFormValid = false;
    errors.state = 'Please enter a state';
  }

  if (!payload || typeof zipcode !== 'string' || zipcode.trim().length === 0) {
    isFormValid = false;
    errors.zipcode = 'Please enter a zipcode';
  }

  return {
    success: isFormValid,
    message: !isFormValid ? 'Check the form for errors' : '',
    errors: errors
  };
};

exports.validateUserSignup = function(payload) {
  var errors = {};
  var isFormValid = true;
  var username;
  var password;
  var zipcode;

  if (payload) {
    username = payload.username;
    password = payload.password;
    zipcode = payload.zipcode;
  }

  if (
    !payload ||
    typeof username !== 'string' ||
    username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please enter a username';
  }

  if (
    !payload ||
    typeof password !== 'string' ||
    password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please enter a password';
  }

  if (!payload || typeof zipcode !== 'string' || zipcode.trim().length === 0) {
    isFormValid = false;
    errors.zipcode = 'Please enter a zipcode';
  }

  return {
    success: isFormValid,
    message: !isFormValid ? 'Check the form for errors' : '',
    errors: errors
  };
};
