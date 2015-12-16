# evident

The javascript SDK for the [Evident](https://evident.io) Security Platform for AWS.

### install

`npm install --save evident`

### credentials
API keys are stored in environment variables `ESP_ACCESS_KEY_ID` and `ESP_SECRET_ACCESS_KEY`.  If the environment variables are not set every callback will return early with an error specifying missing credentials.

```bash
export ESP_ACCESS_KEY_ID=PxfX+2+Ll4ZJk...
export ESP_SECRET_ACCESS_KEY=9jtmPHfVA23BM...
```
Create new credentials in the [API Keys](https://esp.evident.io/settings/api_keys) section of your ESP settings.

#### include the code
```javascript
// include the sdk by requiring the module
var sdk = require('evident')
```

#### error first callback model
```javascript
sdk().getDashboard(function(err,data){
  if(err){ console.log('error!', err) }
  else {
    console.log('data returned fine!')
    console.log(data)
  }
})
```
The SDK utilizes the ["Error First" callback model](http://thenodeway.io/posts/understanding-error-first-callbacks/) that is standard to NodeJS.  If the first argument in the callback is null, then the request was successful and any returned data will be found in the second argument.

#### create the SDK object
```javascript
// create an sdk object that can make API calls
var esp = sdk()
```
The object returned by the `require` statement is a function that returns a closure that manages the method calls, isolates special parameters, and maintains associated callbacks during pagination calls.

Do not make the method calls on the `sdk` object
```javascript
// DO NOT DO THIS
sdk.getReports(callback) // INVALID CODE
```
Instead create more than one instance of the SDK object by running the function again.
```javascript
// DO THIS
sdk().getReports(callback)  // VALID CODE
// OR THIS
var req = sdk()
req.getReports(callback)   
var req_b = sdk()
req_b.getAlerts(32, callback)
```

##### optional pass the SDK object an include parameter at construction
```javascript
// pass the included to the sdk constructor
var esp = sdk({include:'region,external_account,custom_signature,tags'})
esp.getAlert(1143, callback)
```
Some requests call for [extra parameters](http://api-docs.evident.io/#including-objects), you pass those to the SDK constructor function for that request.

#### pagination `next([callback])`
```javascript
var esp = sdk()

var all_alerts = []
esp.getAlerts(1143, function latest_callback(err,data){
  if(err){ console.log(err) }

  all_alerts.push(data.data)

  if(esp.anotherpage()){
    esp.next()  // invokes latest_callback() when the data is returned
  } else {
    console.log('done!')
    console.log(all_alerts)
  }
})
```
Some requests will have multiple pages of data.  In the callback call the `anotherpage()` method of the SDK instance.  It will return `true` if another page is available.  

Call `next()` and the latest callback function passed to the SDK instance will be automatically invoked with the path of the next page in the series as the path.

You can also pass an alternative callback to the `next()` function.
```javascript
var esp = sdk()

var all_alerts = []
esp.getAlerts(1143, function(err,data){
  if(err){ console.log(err) }

  all_alerts.push(data.data)

  if(esp.anotherpage()){
    esp.next(function another_callback(err,data){
      // this is an alternate callback for next()
      console.log(err,data)
    })
  } else {
    console.log('done!')
    console.log(all_alerts)    
  }
})
```

#### methods
```javascript
var sdk = require('evident')

sdk().getDashboard(callback)
sdk().getAlerts(report_id, callback)
sdk().getAlert(alert_id, callback)
sdk().getCloudTrailEvents(alert_id, callback)
sdk().getCloudTrailEvent(cloud_trail_event_id, callback)
sdk().getCustomSignatures(callback)
sdk().getCustomSignature(custom_signature_id, callback)
sdk().getExternalAccounts(callback)
sdk().getExternalAccount(id, callback)
sdk().getOrganizations(callback)
sdk().getOrganization(organization_id, callback)
sdk().getRegions(callback)
sdk().getRegion(region_id, callback)
sdk().getReports(callback)
sdk().getReport(report_id, callback)
sdk().getServices(callback)
sdk().getService(service_id, callback)
sdk().getSignatures(callback)
sdk().getSignature(signature_id, callback)
sdk().getStatsForReportLatest(callback)
sdk().getStatsForReport(report_id, callback)
sdk().getStatsForRegion(region_id, callback)
sdk().getStatsForService(service_id, callback)
sdk().getStatsForSignature(signature_id, callback)
sdk().getStatsForCustomSignature(custom_signature_id, callback)
sdk().getSuborganizations(callback)
sdk().getSuborganization(suborganization_id, callback)
sdk().getSuppressions(callback)
sdk().getSuppression(suppression_id, callback)
sdk().getTagsForAlert(alert_id, callback)
sdk().getTag(tag_id, callback)
sdk().getTeams(callback)
sdk().getTeam(team_id, callback)
sdk().getUsers(callback)
sdk().getUser(user_id, callback)

sdk().createContactRequest(payload, callback)
sdk().createCustomSignature(payload, callback)
sdk().updateCustomSignature(custom_signature_id, payload, callback)
sdk().destroyCustomSignature(custom_signature_id, payload, callback)
sdk().runCustomSignatureExisting(custom_signature_id, payload, callback)
sdk().runCustomSignatureNew(payload, callback)
sdk().createExternalAccount(payload, callback)
sdk().updateExternalAccount(external_account_id, payload, callback)
sdk().destroyExternalAccount(external_account_id, payload, callback)
sdk().updateOrganization(organization_id, payload, callback)
sdk().createReport(payload, callback)
sdk().runSignature(signature_id, payload, callback)
sdk().createSubOrganization(payload, callback)
sdk().updateSubOrganization(suborganization_id, payload, callback)
sdk().destroySubOrganization(suborganization_id, payload, callback)
sdk().deactivateSuppression(suppression_id, payload, callback)
sdk().createSignatureSuppression(payload, callback)
sdk().createSignatureSuppressionByAlert(alert_id, payload, callback)
sdk().createRegionSuppression(payload, callback)
sdk().createRegionSuppressionByAlert(alert_id, payload, callback)
sdk().createUniqueIdentifierSuppressionByAlert(alert_id, payload, callback)
sdk().createTeam(payload, callback)
sdk().updateTeam(team_id, payload, callback)
sdk().destroyTeam(team_id, payload, callback)

// with included parameters
sdk({ include: 'region,tags' }).getAlerts(report_id, callback)
```
