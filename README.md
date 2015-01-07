esp_sdk.js
==========

###Node.js library for [evident.io](http://evident.io) API



```javascript
// instructions
// git clone and step into the directory...

// use an external credentials JSON file where you will
// specify your email & password and (optional) hostname

var credentials = require('credentials_example.json')

// credentials object fields
// {
//   "email": "email@host.tld",
//   "password": "p4ssw3rd",
//   "hostname": "https://api.evident.io" // optional
// }

// the library import is the constructor so pass the arguments
// arguments (credentials, callback)

var esp = require('index.js')(credentials, function main_callback(){

    console.log('constructor callback')

    // most API calls accept only a callback
    // function that will be passed three
    // arguments (error, response, nextpage)
    esp.getDashboard(function(err,response,nextpage){
      if(err){ // dag yo
      } else {
        console.log(JSON.stringify(response))
      }
    })

    esp.getReports(function(err,response,nextpage){
      if(err){ // dag yo
      } else {
        console.log(JSON.stringify(response))
      }

      if(nextpage){ // there is more!
        console.log(nextpage)
      }

    })

    // API calls that request a specific item and the same callback function
    // with the arguments (err, response, nextpage)
    esp.getReport(16, console.log)

    var some_time_ago = Math.floor(Date.now()/1000)-10000

    // previous dashboards using timewarp
    esp.getTimewarp(some_time_ago, console.log)

    // common functions
    esp.getExternalaccounts(console.log)
    esp.getExternalaccount(1,console.log)

    esp.getServices(console.log)
    esp.getService(11,console.log)

    esp.getTeams(console.log)
    esp.getTeam(11,console.log)

    esp.getSignatures(console.log)
    esp.getSignature(22,console.log)
    esp.getSignatureNames(console.log)

  }
)
```
