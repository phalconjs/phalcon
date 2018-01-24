var methods = require('methods')
var flatten = require('array-flatten')
module.exports = Route

function Route(path) {
    this.path = path
    this.methods = []
}
Route.prototype.matchPath = function matchPath(params) {
    var match = false
    var paths = []
    paths.push(this.path)
    var path = flatten(paths)
    Array.prototype.forEach.call(path, (path) => {
        if (params == path) {
            match = true
        }
    })
    return match
}
Route.prototype.runHandler = function runHandler(params) {
    this.methods.forEach((method) => {
        method(arguments[0], arguments[1])
    })
}
methods.forEach(function(method) {
    Route.prototype[method] = function(params) {
        this.methods.push(params)
    }
})