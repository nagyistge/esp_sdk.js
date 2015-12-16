var test = require('tape')

test('next() with no callback', function (t) {
  t.plan(2)

  var sdk = require('../../index.js')

  var esp = sdk()

  var nextpage_once = false

  esp.getAlerts(1183, function (err, data) {
    console.log('data found', Object.keys(data))
    if (!nextpage_once) {
      esp.next()
      nextpage_once = true
    } else {
      t.ok(err === null, 'err is null')
      t.ok(data !== null, 'data is populated')
    }
  })
})

test('next() with callback', function (t) {
  t.plan(2)

  var sdk = require('../../index.js')

  var esp = sdk()

  esp.getAlerts(1183, function (err, data) {
    if (err) {
      console.log(err)
    }
    console.log('data found', Object.keys(data))
    esp.next(function (err, data) {
      t.ok(err === null, 'err is null')
      t.ok(data !== null, 'data is populated')
    })
  })
})
