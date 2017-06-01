var chai = require('chai');
var sinon = require('sinon');

var expect = chai.expect;
var sinonTest = require('sinon-test');

// use sinon.test to automatically restore your stubs
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

// describe('Name of the file you are testing', function() {
//   it('some test case', sinon.test(function() {}));
// });
