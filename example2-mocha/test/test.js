var assert = require('assert');
describe('Array', function() {

  before(function() {
    console.log('before')
  });

  after(function() {
    // runs after all tests in this block
    console.log('after')
  });

  beforeEach(function() {
    // runs before each test in this block
    console.log('beforeEach')
  });

  afterEach(function() {
    // runs after each test in this block
    console.log('afterEach')
  });

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      const result = [1,2,3].indexOf(4)
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
  
});
