var test = require('tape')

test('getAlerts included', function (t) {
  t.plan(2)

  var sdk = require('../../esp_sdk.js')

  var esp = sdk({include: 'region,signature,custom_signature'})
  esp.getAlerts(1183, function (err, data) {
    t.ok(err === null, 'err is null')
    t.ok(data.included.length > 0, 'data included is populated')
  })
})
