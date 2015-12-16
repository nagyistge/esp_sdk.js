var sdk = require('../../index.js')

// create team
var payload = {
  data: {
    type: 'sub_organizations',
    attributes: {
      name: 'my_new_suborg',
      organization_id: 1
    }
  }
}

console.log(JSON.stringify(payload))

sdk().createSuborganization(payload, show)

function show (err, data) {
  console.log('from show')
  if (err) {
    console.log('ERROR!')
    console.log(JSON.stringify(err, null, 2))
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
}
