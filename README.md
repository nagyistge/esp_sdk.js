esp_sdk.js
==========

###Node.js library for [evident.io](http://evident.io) API


example credentials file
```json
{
  "username": "username@domain.tld",
  "password": "mys3curep4sswerd",
  "hostname": "https://api.evident.io"
}
```

example usage
```javascript
var fs = require('fs')
var esp = require('./index.js')

var creds = JSON.parse(fs.readFileSync('./local_creds.json'))

console.log(creds)

esp.login(creds, function (err) {

  if(err){
    console.log('problem getting token')
    console.log('reason: '+err)
  }

  esp.getReports(function(err,data){

    console.log('id of the latest report: ' + data[0].id)

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
  // esp.getReports(display_every_page)

})

function display_every_page(err, data) {

  if (err) {

    return console.log('error!')

  } else {

    console.log(data.length)
    console.log(data)

    if (esp.anotherpage() !== false) {

      esp.next(display_every_page)

    } else {

      console.log('done!')

    }
  }
}

```
