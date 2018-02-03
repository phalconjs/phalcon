var methods = require('methods')
var flatten = require('array-flatten')
var pathToRegexp = require('path-to-regexp')
module.exports = Route

function Route(path) {
    this.path = path
    this.handlers = []
    this.methodType = []
}
Route.prototype.matchPath = function matchPath(params) {

    if (arguments[1] == null && this.methodType.length !== 0) {
        /** check if route method matches the req.method */
        if (!checkMethod(arguments[2].method, this.methodType)) {
            return false
        }
    }

    var keys = []
    var match = false
    var paths = []
    paths.push(this.path)
    var path = flatten(paths)
    Array.prototype.forEach.call(path, (path) => {
        // check if mounted app
        if (arguments[1] != null) {
            flatten([arguments[1]]).forEach((basePath) => {
                path = (basePath == '/' ? '' : basePath) + path + '/:id*'
                var re = pathToRegexp(path, keys).exec(params)
                if (re != null)
                    match = true
                else
                    return match
            })
        }
        path = path + '/:id*'
        var re = pathToRegexp(path, keys).exec(params)
        if (re != null)
            match = true
    })
    return match
}

/**
 * @Param:params error code
 * @Param: req
 * @Param: res
 */
Route.prototype.handle_error = function handle_error(params) {
    arguments[2].statusCode = params
    arguments[2].send('Cannot Handle METHOD')
}
Route.prototype.runHandler = function runHandler(params) {
    this.handlers = flatten(this.handlers)
    this.handlers.forEach((method) => {
        method(arguments[0], arguments[1])
    })

}
methods.forEach(function(method) {
    Route.prototype[method] = function(params) {
        this.methodType.push(method.toString())
        this.handlers.push(params)
    }
})

function checkMethod(params, methodType) {
    var isMethod = false
    Array.prototype.forEach.call(methodType, (method) => {
        var m = String.prototype.toString().toLowerCase.call(params)
        var ma = String.prototype.toString().toLowerCase.call(method)
        if (m == ma) {
            isMethod = true
        }
    })
    return isMethod
}