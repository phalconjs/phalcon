var Route = require('./route')
var Middleware = require('./middleware')
var setPrototypeOf = require('setprototypeof')

class Router {
    constructor() {
        this.routes = []
        this.middlewares = []
    }
    handle(req, res) {
        var index = 0;
        while (index < this.routes.length) {

        }
        while (index < this.middlewares.length) {

        }
    }

    route(path) {
        var route = new Route(path)
        this.routes.push(route)
        return route
    }
}
module.exports = Router