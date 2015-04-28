//var request = require('request')
var http = require('http')
var https = require('https')

var username, password, host, port, protocol
var token

var nextpage

function setCredentials(creds) {

  username = creds.username
  password = creds.password
  host = creds.host
  port = creds.port

  if (creds.protocol === 'http') {
    protocol = 'http'
  } else {
    http = https
    protocol = 'https'
  }

  if(creds.token !== undefined){
    token = creds.token
  }

}

function login(creds, cb) {

  setCredentials(creds)

  var options = {
    host: host,
    port: port,
    path: '/api/v1/token/new',
    headers: {
      'Authorization-Email': username,
      'Authorization': password,
      'Accept': 'application/json'
    },
    method: 'GET'
  };

  var req = http.get(options, function (response) {

    var buf = ''

    response.on('data', function (d) {
      buf += d
    })

    response.on('end', function () {

      if (response.statusCode !== 200) {
        // error
        console.log('error getting token')
        return cb(response, null)
      } else {
        if (cb !== undefined) {

          console.log('success getting token!')
          buf = JSON.parse(buf)
          token = buf.authentication_token

          return cb(null, response)
        }
      }

    })

  })

  req.on('error', function (e) {
    console.log('problem with the request ' + e)
  })

}

function next(cb) {

  return apiCall(nextpage, cb)
}

function anotherpage() {
  if (nextpage === null) {
    return false;
  } else {
    return true;
  }
}

function apiCall(target, cb) {

  var opts = {}
  if (typeof target === 'object') {
    opts.target = target.target
    opts.method = target.method
    target = opts.target
  }

  var options = {
    host: host,
    port: port,
    path: target,
    headers: {
      'Authorization-Email': username,
      'Authorization': token,
      'Accept': 'application/json'
    },
    method: opts.method || 'GET'
  };

  var req = http.get(options, function (response) {

    var buf = ''

    response.on('data', function (d) {
      buf += d
    })

    response.on('end', function () {

        nextpage = null

        if (response.statusCode !== 200) {
          return console.log('bad status: ' + response.statusCode)
        }

        if (response.headers.link !== undefined) {
          var link = response.headers.link
          var splitlink = link.split(',')

          splitlink.forEach(function (part) {
            var splitpart = part.split(';')
            if (splitpart[1].indexOf('rel=\"next\"') !== -1) {
              var link = splitpart[0]

              link = link.replace(protocol + '://' + host + ':' + port + '/', '')
              link = link.replace('<', '')
              link = link.replace('>', '')
              link = link.replace(' ', '')

              nextpage = '/' + link
            }
          })
        }

        if (cb !== undefined) {
          return cb(null, JSON.parse(buf))
        }

      }) // end of response.on('end')

  })

  req.on('error', function (e) {
    console.log('problem with the request ' + e)
  })

}

// all the methods

function getDashboard(cb) {
  return apiCall('/api/v1/dashboard', cb)
}

function getTimewarp(time, cb) {
  var opts = {
    target: '/api/v1/dashboard/timewarp/?dashboard[time]=' + time,
    method: 'POST'
  }
  return apiCall(opts, cb)
}

function getReports(cb) {
  return apiCall('/api/v1/reports', cb)
}

function getReport(id, cb) {
  return apiCall('/api/v1/reports/' + id, cb)
}

function getTeams(cb) {
  return apiCall('/api/v1/teams', cb)
}

function getTeam(id, cb) {
  return apiCall('/api/v1/teams/' + id, cb)
}

function getOrganizations(cb) {
  return apiCall('/api/v1/organizations', cb)
}

function getOrganization(id, cb) {
  return apiCall('/api/v1/organizations/' + id, cb)
}

function getSuborganizations(cb) {
  return apiCall('/api/v1/sub_organizations', cb)
}

function getSuborganization(id, cb) {
  return apiCall('/api/v1/sub_organizations/' + id, cb)
}

function getExternalaccounts(cb) {
  return apiCall('/api/v1/external_accounts', cb)
}

function getExternalaccount(id, cb) {
  return apiCall('/api/v1/external_accounts/' + id, cb)
}

function getServices(cb) {
  return apiCall('/api/v1/services', cb)
}

function getService(id, cb) {
  return apiCall('/api/v1/services/' + id, cb)
}

function getSignatures(cb) {
  return apiCall('/api/v1/signatures', cb)
}

function getSignature(id, cb) {
  return apiCall('/api/v1/signatures/' + id, cb)
}

function getSignatureNames(cb) {
  return apiCall('/api/v1/signatures/signature_names/', cb)
}

function getAlerts(id, cb) {
  return apiCall('/api/v1/reports/' + id + '/alerts/', cb)
}

function getAlert(id, cb) {
  return apiCall('/api/v1/alerts/' + id, cb)
}

function getSuppressions(cb) {
  return apiCall('/api/v1/suppressions', cb)
}

function getSuppression(id, cb) {
  return apiCall('/api/v1/suppression/' + id, cb)
}

// function searchAlerts(filters, cb) {
//
// }

module.exports = {
  login: login,
  setCredentials: setCredentials,
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
  //  searchAlerts: searchAlerts
}
