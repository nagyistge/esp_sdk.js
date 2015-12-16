var http = require('https')
var crypto = require('crypto')

var PUBKEY = process.env.ESP_ACCESS_KEY_ID || ''
var SECKEY = process.env.ESP_SECRET_ACCESS_KEY || ''

var API_PREFIX = '/api/v2/'
var HOST = process.env.ESP_HOST || 'esp.evident.io'
var PORT = process.env.ESP_PORT || '443'

// HOST = 'staging.int.evident.io';PORT = '443'

if (PORT !== '443') {
  http = require('http')
}

module.exports = function (params) {
  // set a default callback function if none specified
  if (params.callback === undefined) {
    params.callback = function nop () {}
  }

  // if there is no public key or secret key return early
  if (PUBKEY === '' || SECKEY === '') {
    return params.callback({
      errors: ['no keys set as environment variables, see README.md for info']
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
