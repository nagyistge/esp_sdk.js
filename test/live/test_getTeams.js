var test = require('tape')

test('getTeams live', function (t) {
  t.plan(2)

  var sdk = require('../../index.js')

  var esp = sdk()
  esp.getTeams(function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
