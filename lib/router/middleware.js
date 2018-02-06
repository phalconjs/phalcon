var flatten = require('array-flatten')
module.exports = Middleware

/**
 * 
 * @param {*} path 
 * @param {*} fn 
 */
function Middleware(path, fn) {
    this.path = path
    this.methods = fn
}

/**
 * @public
 */
Middleware.prototype.runHandler = function runHandler(params) {
    var methods = []
    methods.push(this.methods)
    methods = flatten(methods)
    methods.forEach((method) => {
        method(arguments[0], arguments[1])
    })
}

/**
 * @public
 */
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