var methods = require('methods')
module.exports = Route

function Route(path) {
    this.path = path
    this.methods = []
}
Route.prototype.matchPath = function matchPath(params) {
    console.log('matchpath')
    Array.prototype.forEach.call(this.path, (path) => {
        if (params == path) {
            return true
        }
    })
}
Route.prototype.runHandler = function runHandler(params) {
    this.methods.forEach((method) => {
        method()
    })
}
methods.forEach(function(method) {
    Route.prototype[method] = function(params) {
        console.log(params)
        this.methods.push(params)
    }
})