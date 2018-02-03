var flatten = require('array-flatten')
module.exports = Middleware

function Middleware(path, fn) {
    this.path = path
    this.methods = fn
}
Middleware.prototype.runHandler = function runHandler(params) {
    var methods = []
    methods.push(this.methods)
    methods = flatten(methods)
    methods.forEach((method) => {
        method(arguments[0], arguments[1])
    })
}
Middleware.prototype.matchPath = function matchPath(params) {
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