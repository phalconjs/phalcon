var Route = require('./route')
var Middleware = require('./middleware')
var setPrototypeOf = require('setprototypeof')

class Router {

    constructor() {
        this.routes = []
        this.middlewares = []
    }

    handle(req, res) {
        //        console.log('Handle')
        //console.log(this.middlewares)
        //     console.log(this.routes)
        //console.log(req)
        //        res.send('pop')

        var index = 0;
        while (index <= this.middlewares.length - 1) {
            var middleware = this.middlewares[index]
            var match = middleware.matchPath(req.url)
            if (match) {
                middleware.runHandler(req, res)
            }
            index++
        }
        index = 0
        while (index <= this.routes.length - 1) {
            var route = this.routes[index]
            var match = route.matchPath(req.url)
            if (match)
                route.runHandler(req, res)
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