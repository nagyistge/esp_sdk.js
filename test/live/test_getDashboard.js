var test = require('tape')

test('getDashboard', function (t) {
  t.plan(2)

  var sdk = require('../../index.js')

  var esp = sdk()
  esp.getDashboard(function (err, data) {
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
