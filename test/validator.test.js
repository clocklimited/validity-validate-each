var assert = require('assert-diff')
  , required = require('validity').required
  , createValidator = require('../validator')

describe('Validity Validate Each', function () {

  it('should apply a given validator to each value of an array', function (done) {
    var obj = { test: [ 1, 2, '', null, 5 ] }
      , validateEach = createValidator(required)

    validateEach('test', 'Test Property', obj, function (err, msgs) {
      assert.deepEqual(msgs, { 2: 'Test Property is required', 3: 'Test Property is required' })
      done()
    })
  })

  it('should not return errors on empty arrays', function (done) {
    var obj = {}
      , validateEach = createValidator(required)

    validateEach('test', 'Test Property', obj, function (err, msgs) {
      assert(!msgs)
      done()
    })
  })
})
