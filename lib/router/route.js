var methods = require('methods')
var flatten = require('array-flatten')
var pathToRegexp = require('path-to-regexp')
module.exports = Route

function Route(path) {
    this.path = path
    this.methods = []
}
Route.prototype.matchPath = function matchPath(params) {
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
                console.log(re + ' path:' + path + ' params: ' + params)
                if (re != null)
                    match = true
                else
                    return match
            })
        }
        path = path + '/:id*'
        var re = pathToRegexp(path, keys).exec(params)
        console.log(re + ' path:' + path + ' params: ' + params)
        if (re != null)
            match = true
    })
    return match
}
Route.prototype.runHandler = function runHandler(params) {
    console.log(this.methods)
    this.methods = flatten(this.methods)
    this.methods.forEach((method) => {
        console.log(method)
        method(arguments[0], arguments[1])
    })
}
methods.forEach(function(method) {
    Route.prototype[method] = function(params) {
        //console.log(params)
        this.methods.push(params)
    }
})