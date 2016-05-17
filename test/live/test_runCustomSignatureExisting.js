var sdk = require('../../esp_sdk.js')
var test = require('tape')

test('runCustomSignatureExisting', function (t) {
  t.plan(2)

  // sdk().getCustomSignature(1, function (err, data) {
  //   if (err) {
  //   } else {
  //     console.log(data)
  //   }
  // })

  var payload = {
    data: {
      attributes: {
        id: 2,
        external_account_id: '61ef0343-a1ea-4dd1-a16c-bbbe3d326014',
        regions: ['us_east_1']
      }
    }
  }

  sdk().runCustomSignatureExisting(2, payload, function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
