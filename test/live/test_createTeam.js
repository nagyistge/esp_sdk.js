var sdk = require('../../index.js')
var test = require('tape')

test('createTeam', function (t) {
  t.plan(2)

  var esp = sdk()

  var payload = {
    data: {
      attributes: {
        name: 'Testing 2' + new Date().toGMTString(),
        sub_organization_id: 1
      }
    }
  }

  esp.createTeam(payload, function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
