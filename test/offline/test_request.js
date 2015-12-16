var test = require('tape')

if (!process.env.ESP_ACCESS_KEY_ID) {
  test('reuturns an error if no environment variables set', function (t) {
    t.plan(2)

    var request = require('../../src/request.js')

    request({
      method: 'GET',
      path: '/',
      callback: function (err, data) {
        console.log(err, data)
        t.ok(err.errors[0] === 'no keys set as environment variables, see README.md for info', 'error is populated in callback')
        t.ok(data === null, 'data is null in callback')
      }
    })
  })
}
