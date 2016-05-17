require('./test_getAlerts.js')
require('./test_getAlertsIncluded.js')
require('./test_getDashboard.js')
require('./test_getCustomSignature.js')

var sdk = require('../../esp_sdk.js')
var test = require('tape')
var get_routes = require('../../src/routes_GET.js')

// automatically run tests on the 1 argument routes
get_routes.forEach(function (route) {
  console.log(route)
  if (route.num_args === 1) {
    test(route.fn, function (t) {
      t.plan(2)
      var esp = sdk()
      esp[route.fn](function (err, data) {
        t.ok(err === null, 'err is null')
        t.ok(data !== null, 'data is populated')
      })
    })
  }
})
