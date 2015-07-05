var async = require('async')

module.exports = validateEach

function validateEach(validator) {
  return function (key, msg, object, callback) {
    if (!Array.isArray(object[key])) return callback(null, undefined)

    function applyValidator(currentKey, validateCallback) {
      validator(currentKey, msg, object[key], validateCallback)
    }

    async.map(Object.keys(object[key]), applyValidator, function (err, msgs) {
      if (err) return callback(err)
      callback(null, createMsgObject(msgs))
    })
  }
}

function createMsgObject(msgs) {
  var msgObject = {}
    , hasError = false
  msgs.forEach(function (msg, i) {
    if (!msg) return
    msgObject[i] = msg
    hasError = true
  })
  return hasError ? msgObject : undefined
}
