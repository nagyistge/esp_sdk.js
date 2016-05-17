var test = require('tape')

test('getCustomSignature', function (t) {
  t.plan(2)

  var sdk = require('../../esp_sdk.js')

  var esp = sdk()
  esp.getCustomSignature(1, function (err, data) {
    console.log(JSON.stringify(data, null, 0))
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
