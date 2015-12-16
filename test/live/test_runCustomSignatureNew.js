var sdk = require('../../index.js')
var test = require('tape')

test('updateCustomSignature', function (t) {
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
        external_account_id: '61ef0343-a1ea-4dd1-a16c-bbbe3d326014',
        signature: "// Demo Signature\r\ndsl.configure(function(c) {\r\n  // Set regions to run in. Remove this line to run in all regions.\r\n  c.valid_regions     = ['us_east_1'];\r\n  // Override region to display as global. Useful when checking resources\r\n  // like IAM that do not have a specific region.\r\n  c.display_as        = 'global';\r\n  // deep_inspection works with set_data to automically collect\r\n  // data fields for each alert. Not required.\r\n  c.deep_inspection   = ['users'];\r\n});\r\n\r\n// Required perform function\r\nfunction perform(aws) {\r\n    try {\r\n        var users = aws.iam.list_users()\r\n        var count = users['users'].length || 0;\r\n\r\n        // Set data for deep_inspection to use\r\n        dsl.set_data(users);\r\n\r\n        if (count === 0) {\r\n            dsl.fail({\r\n                user_count: count,\r\n                condition: 'count == 0'\r\n            });\r\n        } else {\r\n            dsl.pass({\r\n                user_count: count,\r\n                condition: 'count >= 1'\r\n            });\r\n        }\r\n    }\r\n    catch(err) {\r\n        dsl.error({errors: err.message});\r\n    }\r\n}\r\n",
        language: 'javascript',
        regions: [ 'us_east_1' ]
      }
    }
  }

  sdk().runCustomSignatureNew(payload, function (err, data) {
    console.log(err, data)
    t.ok(err === null, 'err is null')
    t.ok(data !== null, 'data is populated')
  })
})
