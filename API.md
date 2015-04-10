###`login(credentials,callback)`
* `credentials` a configuration object that stores the credentials
  * ex.
    ```
    creds = {
      "username": "sdkuser@evident.io",
      "password": "v3rysecur3password",
      "host": "localhost",  // esp.evident.io for use with evident production
      "port": 3000,         // 443 for use with evident production
      "protocol": "http"    // 'https' is default, pass 'http' to override
    }
    ```
* `callback` a function that accepts an `(err)` argument.  In this callback all subsequent requests to the evident API should be valid as a null `err` argument means success.

###getDashboard(callback)
* `callback` a function that accepts two arguments `(err, data)`
  * `data` is an array of javascript objects that describe statistics for the latest reports for all the teams for which you have access

###getTimewarp(timestamp,callback)
* `timestamp` a unix timestamp that provides moment in time to rewind the dashboard API endpoint
* `callback` a function that accepts two arguments `(err, data)`
  * `data` is an array of javascript objects that describe statistics for the reports for all the teams for which you have access, at the time provided by `timestamp`.  It is the same endpoint as the dashboard, but allows you to view the statistics at a moment in the past.

###anotherpage( )
* returns `true` if the previous API call has another page of information to providem
* returns `false` if on the last page, or there are no possible extra pages for the API endpoint
* API calls are paginated to 25 results at a time

###next(callback)
* a special function that becomes whatever necessary API call you would need to make in order to request the next page of information from the previous API call.
* for example:  If you called `getAlerts(32, cb)` in the `cb` function you could then call `next(new_cb)` and it would make call to `getAlerts(32)` but for `page=2` of that request.  In `new_cb` you can make a call to `next()` again to repeat the process until there are no more pages left.
  * calling `next()` recursively is how you pull complete reports from our API

###getReports(callback)
* `callback` a function that accepts two arguments `(err, data)`
  * `data` an array of javascript objects with metadata for your latest 25 reports
  * in the `callback` function you can call `anotherpage()` to determine if there are more results, then you can call `next(new_cb)` with another callback to get the next batch of results

###getReport(report_id, callback)
* `report_id` is a numeric ID for a report.  The `id` can be found in the data returned by `getReports`
* `callback` a function that accepts two arguments `(err, data)`  
  * `data` a javascript object that contains metadata about a single report


###getAlerts(report_id, callback)
* `report_id` is a numeric ID for a report.  The `id` can be found in the data returned by `getReports`  
* `callback` a function that accepts two arguments `(err, data)`  
  * `data` an array of javascript objects that describe the first 25 alerts present in the report

###getAlert(alert_id, callback)
* `alert_id` is a numeric ID for a alert.  The `id` can be found in the data returned by `getAlerts`  
* `callback` a function that accepts two arguments `(err, data)`  
  * `data` a javascript object that describes an alert

###samePattern as above
The following block contains the same plural / singular pattern as in the `getReports(cb)` `getReport(id,cb)` example above.
* getTeams(callback)
* getTeam(team_id, callback)
* getOrganizations(callback)
* getOrganization(org_id, callback)
* getSuborganizations(callback)
* getSuborganization(suborg_id, callback)
* getExternalaccounts(callback)
* getExternalaccount(account_id, callback)
* getServices(callback)
* getService(service_id, callback)
* getSignatures(callback)
* getSignature(sig_id, callback)
* getSuppressions(callback)
* getSuppression(supp_id, callback)


| supported | endpoint | method |
| :-------: | -------- | ------ |
| x | `/api/v1/token/new` | GET |
| x | `/api/v1/dashboard` | GET |
| x | `/api/v1/dashboard/timewarp` | POST |
| x | `/api/v1/reports` | GET |
| x | `/api/v1/reports/:id` | GET |
| x | `/api/v1/reports/:id/alerts` | GET |
| x | `/api/v1/alerts/:id` | GET |
| x | `/api/v1/users` | GET |
| x | `/api/v1/users/:id` | GET |
| x | `/api/v1/teams` | GET |
| x | `/api/v1/teams/:id` | GET |
| x | `/api/v1/organizations` | GET |
| x | `/api/v1/organizations/:id` | GET |
| x | `/api/v1/suborganizations` | GET |
| x | `/api/v1/suborganizations/:id` | GET |
| x | `/api/v1/signatures` | GET |
| x | `/api/v1/signatures/:id` | GET |
| x | `/api/v1/custom_signatures` | GET |
| x | `/api/v1/custom_signatures/:id` | GET |
| x | `/api/v1/suppressions` | GET |
| x | `/api/v1/suppressions/:id` | GET |
