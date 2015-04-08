var request = require('request')

var username, password, host
var token

var nextpage

function login(creds, cb){

  username = creds.username
  password = creds.password
  host = creds.hostname

  var options = {
      url: host + '/api/v1/token/new',
      headers: {
          'Authorization-Email': username,
          'Authorization': password,
          'Accept': 'application/json'
      },
      method: 'GET'
  };

  function callback(error, response, body) {

    if (response.statusCode === 200) {
        var info = JSON.parse(body);
        token = info.authentication_token
        if(cb !== undefined){
          return cb(null, response, body)
        }
    } else {
      if(cb !== undefined){
        return cb(body)
      }
    }

  }

  request(options, callback)

}

function next(cb){
  return apiCall(nextpage, cb)
}

function anotherpage(){
  if(nextpage === null){
    return false
  } else {
    return true
  }
  // return nextpage
}

function apiCall(target, cb){

  var opts = {}
  if(typeof target === 'object'){
    opts.target = target.target
    opts.method = target.method
    target = opts.target
  }

  var options = {
      url: host + target,
      method: opts.method || 'GET',
      headers: {
          'Authorization-Email': username,
          'Authorization': token,
          'Accept': 'application/json'
      }
  };

  function request_callback(error, response, body) {

      if (response.statusCode === 200) {

        var info = JSON.parse(body);

        // pagination
        nextpage = null

        // var next_page = {}
        if(response.caseless.dict.link !== undefined){
          // console.log(response.caseless.dict.link)
          var link = response.caseless.dict.link
          var splitlink = link.split(',')

          splitlink.forEach(function(part){
            var splitpart = part.split(';')
            if(splitpart[1].indexOf('rel=\"next\"') !== -1){

              var link = splitpart[0]
              link = link.replace('<','')
              link = link.replace('>','')
              link = link.replace(host,'')
              link = link.replace(' ','')

              nextpage = link

            }
          })
        }

        if(cb !== undefined){
          return cb(null,info)
        }

      } else {

        if(cb !== undefined){
          return cb({error: error, status: response.statusCode, res: body },null)
        }

      }

  }

  request(options, request_callback)

}

// all the methods

function getDashboard(cb){
  return apiCall('/api/v1/dashboard', cb)
}

function getTimewarp(time, cb){
  var opts = {
    target: '/api/v1/dashboard/timewarp/?dashboard[time]='+time,
    method: 'POST'
  }
  return apiCall(opts, cb)
}

function getReports(cb){
  return apiCall('/api/v1/reports', cb)
}

function getReport(id, cb){
  return apiCall('/api/v1/reports/' + id, cb)
}

function getTeams(cb){
  return apiCall('/api/v1/teams', cb)
}

function getTeam(id, cb){
  return apiCall('/api/v1/teams/' + id, cb)
}

function getOrganizations(cb){
  return apiCall('/api/v1/organizations', cb)
}

function getOrganization(id, cb){
  return apiCall('/api/v1/organizations/' + id, cb)
}

function getSuborganizations(cb){
  return apiCall('/api/v1/sub_organizations', cb)
}

function getSuborganization(id, cb){
  return apiCall('/api/v1/sub_organizations/' + id, cb)
}

function getExternalaccounts(cb){
  return apiCall('/api/v1/external_accounts', cb)
}

function getExternalaccount(id, cb){
  return apiCall('/api/v1/external_accounts/' + id, cb)
}

function getServices(cb){
  return apiCall('/api/v1/services', cb)
}

function getService(id, cb){
  return apiCall('/api/v1/services/' + id, cb)
}

function getSignatures(cb){
  return apiCall('/api/v1/signatures', cb)
}

function getSignature(id, cb){
  return apiCall('/api/v1/signatures/' + id, cb)
}

function getSignatureNames(cb){
  return apiCall('/api/v1/signatures/signature_names/', cb)
}

function getAlerts(id, cb){
  return apiCall('/api/v1/reports/' + id + '/alerts/', cb)
}
function getAlert(id, cb){
  return apiCall('/api/v1/alerts/' + id, cb)
}

function getSuppressions(cb){
  return apiCall('/api/v1/suppressions', cb)
}
function getSuppression(id, cb){
  return apiCall('/api/v1/suppression/' + id, cb)
}

function searchAlerts(filters, cb){

}


module.exports = {
  login: login,
  next: next,
  anotherpage: anotherpage,
  getDashboard: getDashboard,
  getTimewarp: getTimewarp,
  getReports: getReports,
  getReport: getReport,
  getTeams: getTeams,
  getTeam: getTeam,
  getOrganizations: getOrganizations,
  getOrganization: getOrganization,
  getSuborganizations: getSuborganizations,
  getSuborganization: getSuborganization,
  getExternalaccounts: getExternalaccounts,
  getExternalaccount: getExternalaccount,
  getServices: getServices,
  getService: getService,
  getSignatures: getSignatures,
  getSignature: getSignature,
  getSignatureNames: getSignatureNames,
  getAlerts: getAlerts,
  getAlert: getAlert,
  getSuppressions: getSuppressions,
  getSuppression: getSuppression,
  searchAlerts: searchAlerts
}
