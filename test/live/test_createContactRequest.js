var sdk = require('../../index.js')
var test = require('tape')

test('createContactRequest', function (t) {
  t.plan(2)

  var payload = {
    data: {
      attributes: {
        title: new Date().toGMTString(),
        description: 'foo foo foo ' + Math.random(),
        request_type: 'feature'
      }
    }
  }

  sdk().createContactRequest(payload, function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
