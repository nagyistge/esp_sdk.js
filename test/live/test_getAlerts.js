var test = require('tape')

test('getAlerts live', function (t) {
  t.plan(3)

  var sdk = require('../../index.js')

  var esp = sdk()
  esp.getAlerts(1183, function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
    t.ok(data.included === undefined, 'included is not populated')
  })
})
