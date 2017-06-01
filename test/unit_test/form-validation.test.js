var chai = require('chai');
var sinon = require('sinon');
var form = require('../../src/utils/form-validation');

var expect = chai.expect;
var sinonTest = require('sinon-test');

// use sinon.test to automatically restore your stubs
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

describe('Form validation', function() {
  describe('Login validation', function() {
    var payload;
    beforeEach(function() {
      payload = {
        username: 'wicki',
        password: 'hunter2'
      };
    });

    it('should not validate if payload is not defined', sinon.test(function() {
      expect(form.validateLogin().success).to.be.false;
    }));

    it('should not validate if username is empty', sinon.test(function() {
      payload.username = '';
      var validationResult = form.validateLogin(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if password is empty', sinon.test(function() {
      payload.password = '';
      var validationResult = form.validateLogin(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should validate if username and password are non-empty', sinon.test(function() {
      var validationResult = form.validateLogin(payload);
      expect(validationResult.success).to.be.true;
    }));
  });

  describe('User signup validation', function() {
    var payload;
    beforeEach(function() {
      payload = {
        username: 'wicki',
        password: 'hunter2',
        zipcode: '38130'
      };
    });

    it('should not validate if payload is not defined', sinon.test(function() {
      expect(form.validateUserSignup().success).to.be.false;
    }));

    it('should not validate if username is empty', sinon.test(function() {
      payload.username = '';
      var validationResult = form.validateUserSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if password is empty', sinon.test(function() {
      payload.password = '';
      var validationResult = form.validateUserSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if zipcode is empty', sinon.test(function() {
      payload.zipcode = '';
      var validationResult = form.validateUserSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should validate if username and password are non-empty', sinon.test(function() {
      var validationResult = form.validateUserSignup(payload);
      expect(validationResult.success).to.be.true;
    }));
  });

  describe('Chef signup validation', function() {
    var payload;
    beforeEach(function() {
      payload = {
        username: 'wicki',
        password: 'hunter2',
        address: '123 Main St.',
        city: 'Springfield',
        state: 'IL',
        zipcode: '38130'
      };
    });

    it('should not validate if payload is not defined', sinon.test(function() {
      expect(form.validateChefSignup().success).to.be.false;
    }));

    it('should not validate if username is empty', sinon.test(function() {
      payload.username = '';
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if password is empty', sinon.test(function() {
      payload.password = '';
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if address is empty', sinon.test(function() {
      payload.address = '';
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if city is empty', sinon.test(function() {
      payload.city = '';
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if state is empty', sinon.test(function() {
      payload.state = '';
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should not validate if zipcode is empty', sinon.test(function() {
      payload.zipcode = '';
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.false;
    }));

    it('should validate if all required fields are non-empty', sinon.test(function() {
      var validationResult = form.validateChefSignup(payload);
      expect(validationResult.success).to.be.true;
    }));
  });
});
