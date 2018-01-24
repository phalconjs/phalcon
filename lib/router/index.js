var methods = require('methods')
var Route = require('./route')
var Middleware = require('./middleware')
var setPrototypeOf = require('setprototypeof')

class Router {

    constructor() {
        this.routes = []
        this.middlewares = []
        methods.forEach((method) => {
            Router.prototype[method] = function(params) {
                console.log(method + 'ing')
            }
        })
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
        var path = '/'
        var handler = []
        this.initRoute()
            // check for path
        if (typeof fn == 'function' || (typeof arguments[0] == 'object' && arguments.length == 1)) {
            path = '/'
            for (var key in arguments) {
                handler.push(arguments[key])
            }
            handler = flatten(handler)
        }
        if (typeof fn !== 'function' && arguments.length > 1) {
            path = fn
            for (var key in arguments) {
                if (key != 0) {
                    handler.push(arguments[key])
                }
            }
            handler = flatten(handler)
        }
        handler.forEach((h) => {
            // if not a phalcon app
            if (typeof h == 'function') {
                this._router.setUpMiddleware(path, h)
            } else {
                this._router.setUpRoute(path)
            }
        })
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
    all() {}
    param() {}
}
module.exports = Router