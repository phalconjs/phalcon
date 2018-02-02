var methods = require('methods')
var Route = require('./route')
var Middleware = require('./middleware')
var setPrototypeOf = require('setprototypeof')

class Router {

    constructor() {
        this.routes = []
        this.middlewares = []
        this.basePath = null
        methods.forEach((method) => {
            Router.prototype[method] = function(params) {
                //route[method](handler)
                var route = this.route(params)
                route[method](arguments[1])
                    //console.log(arguments[1])
            }
        })
    }
    handle(req, res) {
        console.log('Handle')
            //console.log(this.middlewares)
            //     console.log(this.routes)
            //console.log(req)
            //res.send('pop')

        var index = 0;
        while (index <= this.middlewares.length - 1) {
            var middleware = this.middlewares[index]
            var match = middleware.matchPath(req.url, this.basePath)
            if (match) {
                middleware.runHandler(req, res)
            }
            index++
        }
        index = 0
        while (index <= this.routes.length - 1) {
            var route = this.routes[index]
                //console.log(route.methods)
            var match = route.matchPath(req.url, this.basePath)
                //console.log(match)
            if (match) {
                console.log(match)
                route.runHandler(req, res)
            }
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
                this._router.setUpRoute(path, h)
            }
        })
    }

    setUpMiddleware(path, fn) {
        var mw = new Middleware(path, fn)
        this.middlewares.push(mw)
    }

    setUpRoute(path) {
        var route = new Route(path)
        if (arguments[1]) {
            route.handlers.push(arguments[1])
        }
        this.routes.push(route)
        return route
    }
    all() {}
    param() {}
}
module.exports = Router