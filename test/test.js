var esp = require('../index.js')

var creds = {
  "username": "sdkuser@evident.io",
  "password": "v3rysecur3password",
  "host": "localhost",
  "port": 3000,
  "protocol": "http"
}

console.log(creds)

esp.login(creds, function (err) {

  if(err){
    console.log('problem getting token')
    return console.log('reason: '+err)
  }

  // esp.getReports(display_every_page)
  // return;

  esp.getReports(function(err,data){

    if(err){
      console.log('error getting reports: ' + err)
    } else {
      console.log('id of the latest report: ' + data[0].id)
    }

    esp.getAlerts(data[0].id, function(err,data){

      console.log('id of the latest alert in the that report: ' + data[0].id)

      console.log(esp.anotherpage())

      esp.getAlert(data[0].id, function(err,data){

        console.log('the alert itself')
        console.log(data)

      })

    })

  })

  esp.getDashboard(function(err,data){
    if(err){
      return;
    } else {
      console.log(data)
    }
  })

  // return;

})

function display_every_page(err, data) {

  if (err) {

    return console.log('error!')

  } else {

    console.log('length of data returned: '+data.length)
    // console.log(data)

    if (esp.anotherpage() !== false) {

      esp.next(display_every_page)

    } else {

      console.log('done!')

    }
  }
}
