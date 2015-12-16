module.exports = esp

function esp (opts) {
  if (opts === undefined) {
    opts = {}
  }

  var api_request = require('./src/request.js')

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

  var routes = []

  // add all the routes from the file
  routes = routes.concat(require('./src/routes_GET.js'))
  routes = routes.concat(require('./src/routes_POST.js'))

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
