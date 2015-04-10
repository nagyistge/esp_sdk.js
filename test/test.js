// test.js by @billautomata
//
// An application that demonstrates the esp_sdk.js API patterns.
// It follows the standard node-style callback pattern where
// the callbacks are provided two arguments (err, data) where
// 'err' is null when there is no error for the callback.
//
// This app will create a credentials object, calls esp.login()
// using that credentials object and in the callback calls
// esp.getReports() and esp.getDashboard()
//
// In the esp.getReports() callback we take the .id property
// and call esp.getAlerts() for that report, then take the first
// alert_id returned and call esp.getAlert() in the callback provided
// to esp.getAlerts()
//
// Also included in this example, but commented out, is how to
// leverage the esp.anotherpage() detection and esp.next() function
// to make recursive calls against the api to get a complete download
// of paginated data.

var esp = require('../index.js')

var creds = {
  "username": "sdkuser@evident.io",
  "password": "v3rysecur3password",
  "host": "localhost",  // esp.evident.io for use with evident production
  "port": 3000,         // 443 for use with evident production
  "protocol": "http"    // 'https' is default, pass 'http' to override
}

console.log(creds)

esp.login(creds, function (err) {

  if (err) {

    // if there was an error getting the token needed to make subsequent
    // requests then the err object would be something other than null
    // it would contain information about the response, 401 is access denied

    console.log('problem getting token')
    return console.log('reason: ' + err.statusCode); // return with a message
                                                    // about the status code
  }

  esp.getSignatureNames(console.log)
  return;

  // At this point we should have an authenticated session to make requests.

  // call esp.getReports and pass it a callback function
  // esp.getReports() returns information about the latest reports.
  esp.getReports(function (err, data) {


    if (err) {

      // same as above, if there were and error receiveing the report data
      // the esp_sdk would make the err argument a non-null object with info
      // about the error

      return console.log('error getting reports: ' + err.statusCode);
    }

    // The list of reports returned is a javascript array of objects.
    // One of the fields returned is "id".  You can take that numeric ID
    // and make a subsequent request for more information about that report

    var a_report = data[0]

    console.log(a_report)

    console.log('id of the latest report: ' + a_report.id)

    // esp.getAlerts() returns information about alerts for a report_id
    esp.getAlerts(a_report.id, function (err, data) {

      if (err) {
        return console.log('error getting report: ' + err.statusCode);
      }

      // Just as we saw above in esp.getReports, the returned list is an
      // array of objects.

      var first_alert = data[0]

      console.log('id of the first alert in the that report: ' + first_alert.id)

      // at any point in the callback chain you can see if there is another
      // page of results available by calling esp.anotherpage()
      // esp.anotherpage() will return a boolean value indicating if there
      // are more results to be queried

      console.log('is ther another page? ' + esp.anotherpage())

      esp.getAlert(first_alert.id, function (err, data) {

        if (err) {
          return console.log('error getting alert: ' + err.statusCode);
        }

        var single_alert = data

        console.log('the alert itself')
        console.log(single_alert)

      })

    })

  })

  // make an http request the REST API to get an abbreviated version of the
  // report statistics for the latest report for a team
  esp.getDashboard(function (err, data) {
    if (err) {
      return;
    } else {
      console.log('dashboard data')
      console.log(data)
    }
  })

  // esp.getReports(display_every_page)
  // return;


  return;

})

function display_every_page(err, data) {

  if (err) {

    return console.log('error!')

  } else {

    console.log('length of data returned: ' + data.length)
      // console.log(data)

    if (esp.anotherpage() !== false) {

      esp.next(display_every_page)

    } else {

      console.log('done!')

    }
  }
}
