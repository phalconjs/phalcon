var Route = require('./route')
var Middleware = require('./middleware')
var setPrototypeOf = require('setprototypeof')

class Router {

    constructor() {
        this.routes = []
        this.middlewares = []
    }

    handle(req, res) {
        console.log('Handle')
        console.log(this.middlewares)
        console.log(this.routes)
        res.send('pop')
        var index = 0;
        while (index <= this.middlewares.length) {
            middleware = this.middlewares[index]
            if (middleware.mathPath())
                middleware.runHandler()
            index++
        }
        index = 0
        while (index <= this.routes.length) {
            route = this.routes[index]
            if (route.mathPath())
                route.runHandler()
            index++
        }
    }

    route(path) {
        var route = new Route(path)
        this.routes.push(route)
        return route
    }

    use(fn) {

    }

    setUpMiddleware(path, fn) {
        var mw = new Middleware(path, fn)
        this.middlewares.push(mw)
    }

    setUpRoute(path) {
        var route = new Route(path)
        this.routes.push(route)
        return route
    }
}
module.exports = Router