var sdk = require('../../esp_sdk.js')
var test = require('tape')

test('updateTeam', function (t) {
  t.plan(2)

  var team_id = 7

  var payload = {
    data: {
      attributes: {
        id: team_id,
        name: 'Testing 2' + new Date().toGMTString()
      }
    }
  }

  sdk().updateTeam(team_id, payload, function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
