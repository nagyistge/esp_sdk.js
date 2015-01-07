var util = require('util')
var assert = require('assert')
var request = require('request')

var jquery
if(typeof window !== 'undefined'){
  jquery = require('jquery')
  jquery.support.cors = true;
}

// constructor
function Client(options, callback){

  var self = this;

  if(options !== undefined){
    console.log('constructor running')
    this.options = options

    this.hostname = options.hostname || 'https://api.evident.io'

    this.token = ''
    this.getToken(callback)

  } else {

    console.log('constructor running w/o credentials, in the browser')
    console.log('running callback to set the esp variable on the window')

    this.options = {}
    this.hostname = 'https://api.evident.io'
    this.token = ''

    if(callback !== undefined){
      callback()
    }
  }

}

Client.prototype.login = function(email, password, cb){
  this.options.email = email
  this.options.password = password
  this.getToken(cb)
}

Client.prototype.getDashboard = function(cb){
  this.apiCall('/api/v1/dashboard', cb)
}

Client.prototype.getTimewarp = function(time, cb){
  var opts = {
    target: '/api/v1/dashboard/timewarp/?dashboard[time]='+time,
    method: 'POST'
  }
  this.apiCall(opts, cb)
}

Client.prototype.getReports = function(cb){
  return this.apiCall('/api/v1/reports', cb)
}
Client.prototype.getReport = function(id, cb){
  this.apiCall('/api/v1/reports/' + id, cb)
}

Client.prototype.getTeams = function(cb){
  this.apiCall('/api/v1/teams', cb)
}
Client.prototype.getTeam = function(id, cb){
  this.apiCall('/api/v1/teams/' + id, cb)
}

Client.prototype.getOrganizations = function(cb){
  this.apiCall('/api/v1/organizations', cb)
}
Client.prototype.getOrganization = function(id, cb){
  this.apiCall('/api/v1/organizations/' + id, cb)
}

Client.prototype.getSuborganizations = function(cb){
  this.apiCall('/api/v1/sub_organizations', cb)
}
Client.prototype.getSubOrganization = function(id, cb){
  this.apiCall('/api/v1/sub_organizations/' + id, cb)
}

Client.prototype.getExternalaccounts = function(cb){
  this.apiCall('/api/v1/external_accounts', cb)
}
Client.prototype.getExternalaccount = function(id, cb){
  this.apiCall('/api/v1/external_accounts/' + id, cb)
}

Client.prototype.getServices = function(cb){
  this.apiCall('/api/v1/services', cb)
}
Client.prototype.getService = function(id, cb){
  this.apiCall('/api/v1/services/' + id, cb)
}

Client.prototype.getSignatures = function(cb){
  this.apiCall('/api/v1/signatures', cb)
}
Client.prototype.getSignature = function(id, cb){
  this.apiCall('/api/v1/signatures/' + id, cb)
}
Client.prototype.getSignatureNames = function(cb){
  this.apiCall('/api/v1/signatures/signature_names/', cb)
}

////////////////////////////////////////////////
////////////////////////////////////
////////////////////////
////////////
Client.prototype.apiCall = function(target, cb){

  var opts = {}
  if(typeof target === 'object'){
    opts.target = target.target
    opts.method = target.method
    target = opts.target
  }

  console.log('api call!')
  console.log(target)

  var self = this

  console.log('token ' + self.token)

  var options = {
      url: self.hostname + target,
      method: opts.method || 'GET',
      headers: {
          'Authorization-Email': this.options.email,
          'Authorization': this.token
      }
  };

  function request_callback(error, response, body) {

      if (!error && response.statusCode === 200) {

        var info = JSON.parse(body);

        // pagination
        var nextpage = null

        var next_page = {}
        if(response.caseless.dict.link !== undefined){
          next_page = JSON.parse(response.caseless.dict.link)
        }

        if(Object.keys(next_page).length !== 0){
            console.log('//==//==//==//==//')
            console.log(JSON.parse(response.caseless.dict.link))
            nextpage = JSON.parse(response.caseless.dict.link)
        }

        if(cb !== undefined){
          return cb(null,info,nextpage)
        }

      } else {

        if(cb !== undefined){
          return cb({error: error, status: response.statusCode, res: body },null)
        }

      }

  }

  request(options, request_callback)

}

Client.prototype.getToken = function(cb){

  console.log('get token running')

  var self = this

  var options = {
      url: self.hostname + '/api/v1/token/new',
      headers: {
          'Authorization-Email': this.options.email,
          'Authorization': this.options.password
      }
  };

  function callback(error, response, body) {

    console.log('running callback from get token')


    if (!error && response.statusCode === 200) {
        var info = JSON.parse(body);

        // console.log('info')
        // console.log(info)
        // console.log(Object.keys(info))

        self.token = info.authentication_token

        if(cb !== undefined){
          cb()
        }

    } else {

      console.log('error')
      console.log(error)
      console.log(response.statusCode)
      console.log(body)

      //console.log(Object.keys(error))
      console.log(error)

    }

  }

  request(options, callback)

}

module.exports = (function(options, callback){
  //assert(options, 'Username and Password Required')
  return new Client(options, callback)
})
