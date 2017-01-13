var PUBKEY = process.env.ESP_ACCESS_KEY_ID || ''
var SECKEY = process.env.ESP_SECRET_ACCESS_KEY || ''

module.exports = esp
module.exports.request = api_request

var http = require('https')
var crypto = require('crypto')

var API_PREFIX = '/api/v2/'
var HOST = process.env.ESP_HOST || 'esp.evident.io'
var PORT = process.env.ESP_PORT || '443'

if (PORT !== '443') {
  http = require('http')
}

var routes = [
  {
    fn: 'getDashboard',
    path: 'dashboard/recent.json',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getAlerts',
    path: 'reports/:id/alerts',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getAlert',
    path: 'alerts/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getCloudTrailEvents',
    path: 'alerts/:id/cloud_trail_events',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getCloudTrailEvent',
    path: 'cloud_trail_events/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getCustomSignatures',
    path: 'custom_signatures',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getCustomSignature',
    path: 'custom_signatures/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getExternalAccounts',
    path: 'external_accounts',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getExternalAccount',
    path: 'external_accounts/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getOrganizations',
    path: 'organizations',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getOrganization',
    path: 'organizations/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getRegions',
    path: 'regions',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getRegion',
    path: 'regions/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getReports',
    path: 'reports',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getReport',
    path: 'reports/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getServices',
    path: 'services',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getService',
    path: 'services/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getSignatures',
    path: 'signatures',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getSignature',
    path: 'signatures/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForReportLatest',
    path: 'stats/latest_for_teams',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getStatsForReport',
    path: 'reports/:id/stats',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForRegion',
    path: 'stats/:id/regions',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForService',
    path: 'stats/:id/regions',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForSignature',
    path: 'stats/:id/signatures',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getStatsForCustomSignature',
    path: 'stats/:id/custom_signatures',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getSuborganizations',
    path: 'sub_organizations',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getSuborganization',
    path: 'sub_organizations/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getSuppressions',
    path: 'suppressions',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getSuppression',
    path: 'suppressions/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getTagsForAlert',
    path: 'alerts/:id/tags',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getTag',
    path: 'tags/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getTeams',
    path: 'teams',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getTeam',
    path: 'teams/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'getUsers',
    path: 'users',
    method: 'GET',
    num_args: 1
  },
  {
    fn: 'getUser',
    path: 'users/:id',
    method: 'GET',
    num_args: 2
  },
  {
    fn: 'createContactRequest',
    path: 'contact_requests',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createCustomSignature',
    path: 'custom_signatures',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateCustomSignature',
    path: 'custom_signatures/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroyCustomSignature',
    path: 'custom_signatures/:id',
    method: 'DELETE',
    num_args: 3
  },
  {
    fn: 'runCustomSignatureExisting',
    path: 'custom_signatures/:id/run',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'runCustomSignatureNew',
    path: 'custom_signatures/run',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createExternalAccount',
    path: 'external_accounts',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateExternalAccount',
    path: 'external_accounts/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroyExternalAccount',
    path: 'external_accounts/:id',
    method: 'DELETE',
    num_args: 3
  },
  {
    fn: 'updateOrganization',
    path: 'organizations/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'createReport',
    path: 'reports',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'runSignature',
    path: 'signatures/:id/run',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createSubOrganization',
    path: 'sub_organizations',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateSubOrganization',
    path: 'sub_organizations/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroySubOrganization',
    path: 'sub_organizations/:id',
    method: 'DELETE',
    num_args: 3
  },
  {
    fn: 'deactivateSuppression',
    path: 'suppressions/:id/deactivate',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'createSignatureSuppression',
    path: 'suppressions/signatures',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createSignatureSuppressionByAlert',
    path: 'suppressions/alert/:id/signatures',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createRegionSuppression',
    path: 'suppressions/regions',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'createRegionSuppressionByAlert',
    path: 'suppressions/alert/:id/regions',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createUniqueIdentifierSuppressionByAlert',
    path: 'suppressions/alert/:id/unique_identifiers',
    method: 'POST',
    num_args: 3
  },
  {
    fn: 'createTeam',
    path: 'teams',
    method: 'POST',
    num_args: 2
  },
  {
    fn: 'updateTeam',
    path: 'teams/:id',
    method: 'PATCH',
    num_args: 3
  },
  {
    fn: 'destroyTeam',
    path: 'teams/:id',
    method: 'DELETE',
    num_args: 3
  }
]

function esp (opts) {
  if (opts === undefined) {
    opts = {}
  }

  // var api_request = require('./src/request.js')

  var include = ''

  if (opts.include !== undefined) {
    include = opts.include
  }

  var global_cb
  var next_params = {
    another_page: false,
    next_path: ''
  }

  function next (cb) {
    if (cb !== undefined) {
      global_cb = cb
    }
    if (next_params.another_page) {
      api_request({
        method: 'GET',
        path: next_params.next_path,
        callback: master_callback,
        include: include
      })
    } else {
      return cb('no next page', null)
    }
  }

  function master_callback (err, data) {
    if (err) {
      return global_cb(err, null)
    }
    if (data.links === undefined) {
      return global_cb(null, data)
    } else {
      if (data.links.next === undefined) {
        // this is no next page
        next_params.another_page = false
        next_params.next_path = ''
        return global_cb(null, data)
      } else {
        // there is a next page
        next_params.another_page = true
        next_params.next_path = data.links.next.split('/api/v2/')[1]
        return global_cb(null, data)
      }
    }
  }

  // methods for API access added to the return object
  var return_object = {}
  //
  // var routes = []
  //
  // // add all the routes from the file
  // routes = routes.concat(require('./src/routes_GET.js'))
  // routes = routes.concat(require('./src/routes_POST.js'))

  routes.forEach(function (route) {
    // create post routes that have two arguments
    if (route.method === 'POST' || route.method === 'PATCH' || route.method === 'DELETE') {
      // POST, PATCH, DELETE
      if (route.num_args === 2) {
        return_object[route.fn] = function (params, cb) {
          global_cb = cb
          api_request({
            method: route.method,
            path: route.path,
            callback: master_callback,
            include: include,
            body: params
          })
        }
      } else if (route.num_args === 3) {
        // update
        return_object[route.fn] = function (id, params, cb) {
          global_cb = cb

          // split the path on the ID, insert the argument
          var split_path = route.path.split(':id')
          // join the path back together
          var new_path = [split_path[0], id].join('')
          // add any trailing segments
          if (split_path.length > 1) {
            new_path += split_path[1]
          }

          api_request({
            method: route.method,
            path: new_path,
            callback: master_callback,
            include: include,
            body: params
          })
        }
      }
    } else {
      // GET
      if (route.num_args === 1) {
        // just the callback  -- fn(callback)
        return_object[route.fn] = function (cb) {
          global_cb = cb
          api_request({
            method: route.method,
            path: route.path,
            callback: master_callback,
            include: include
          })
        }
      } else if (route.num_args === 2) {
        // a callback and an 'id' value -- fn(id, callback)
        return_object[route.fn] = function (id, cb) {
          global_cb = cb

          // split the path on the ID, insert the argument
          var split_path = route.path.split(':id')

          // join the path back together
          var new_path = [split_path[0], id].join('')

          // add any trailing segments
          if (split_path.length > 1) {
            new_path += split_path[1]
          }

          api_request({
            method: route.method,
            path: new_path,
            callback: master_callback,
            include: include
          })
        }
      }
    }
  })

  return_object.next = next

  // debug level functions - should be removed after the API is nailed down
  return_object.anotherpage = function () {
    return next_params.another_page
  }
  return_object.getparams = function () {
    return next_params
  }
  return return_object
}

function api_request (params) {
  // set a default callback function if none specified
  if (params.callback === undefined) {
    params.callback = function nop () {}
  }

  // if there is no public key or secret key return early
  if (PUBKEY === '' || SECKEY === '') {
    return params.callback({
      errors: ['no keys set, see README.md for info']
    }, null)
  }

  // major errors, missing stuff
  if (params.path === undefined) {
    return params.callback('no path specified', null)
  }

  // default params corrections
  if (params.method === undefined) {
    params.method = 'GET'
  }

  // append the include parameters to the end of the path if not already present
  if (params.include !== '' && params.include !== undefined) {
    if (params.path.indexOf('include') === -1) { // is include already bundled?
      if (params.path.indexOf('?') === -1) { // is there already a param in path?
        params.path += ('?include=' + params.include) // no
      } else {
        params.path += ('&include=' + params.include) // yes
      }
    }
  }

  // create a static date string
  var date_string = new Date().toGMTString()

  // parse and serialize the message body
  var message_body = ''

  if (params.body !== undefined) {
    message_body = JSON.stringify(params.body)
  }

  var content_md5 = new Buffer(
    crypto.createHash('md5')
      .update(message_body)
      .digest('hex'), 'hex').toString('base64')

  // build HTTP Request Options
  var opts = {}

  opts.method = params.method
  opts.hostname = HOST
  opts.port = PORT
  opts.path = API_PREFIX + params.path
  opts.body = message_body

  opts.headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
    'Date': date_string,
    'Content-MD5': content_md5
  }

  if (params.method !== 'GET') {
    opts.headers['Content-Length'] = message_body.length
  }

  var canonical_string = [
    params.method,
    opts.headers['Content-Type'],
    content_md5,
    opts.path,
    date_string
  ].join(',')

  var encoded_string = crypto
    .createHmac('sha1', SECKEY)
    .update(canonical_string)
    .digest('base64')

  opts.headers['Authorization'] = 'APIAuth ' + PUBKEY + ':' + encoded_string

  var request = http.request(opts, function (response) {
    response.setEncoding('utf8')
    var d = ''
    response.on('data', function (chunk) {
      d += chunk
    })
    response.on('end', function () {
      try {
        d = JSON.parse(d)

        if (d.errors !== undefined) {
          // errors found, usually a status code of not 200
          return params.callback(d, null)
        } else {
          // no errors found
          return params.callback(null, d)
        }
      } catch (exception) {
        return params.callback(['error parsing response', exception, response.statusCode, response.statusMessage].join('\t'), null)
      }
    })
  })

  request.on('error', function (e) {
    return params.callback(e, null)
  })

  if (params.method !== 'GET') {
    request.write(message_body)
  }

  request.end()
}
