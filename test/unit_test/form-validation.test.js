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
    it('should not validate if payload is not defined', sinon.test(function() {
      expect(form.validateLogin().success).to.be.false;
    }));
  });
});
