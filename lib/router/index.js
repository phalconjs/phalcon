const methods = require('methods')
const Route = require('./route')
const Middleware = require('./middleware')
const setPrototypeOf = require('setprototypeof')
const flatten = require('array-flatten')

class Router {

    /**
     * @private
     */
    constructor() {
        this.routes = []
        this.middlewares = []
        this.basePath = null
        methods.forEach((method) => {
            Router.prototype[method] = function(params) {
                var route = this.route(params)
                route[method](arguments[1])
            }
        })
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @private
     */
    handle(req, res) {

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
        var route
        var match
        while (index <= this.routes.length - 1) {
            route = this.routes[index]
            match = route.matchPath(req.url, this.basePath, req, res)
            if (match) {
                route.runHandler(req, res)
            }
            index++
        }
        /** If execution reaches here: no method or route found */
        if (!match)
            this.handle_error(404, req, res)
    }

    /**
     * 
     * @param {*} statusCode 
     * @param {*} req 
     * @param {*} res 
     * @private
     */
    handle_error(statusCode, req, res) {
        res.sendStatus(statusCode)
    }

    /**
     * 
     * @param {*} path 
     * @public
     */
    route(path) {
        if (typeof path == 'array' || typeof path == 'object') {
            this.routeFromArray(path)
            return
        }
        var route = new Route(path)
        this.routes.push(route)
        return route
    }

    /**
     * 
     * @param {*} params 
     * @private
     */
    routeFromArray(params) {
        if (typeof params == 'array' || typeof params == 'object') {
            flatten([params]).forEach((route) => {
                let _route = new Route(route.path)
                flatten([route.method]).forEach((method) => {
                    let _method = String.prototype.toLowerCase.call(method)
                    _route[_method](route.handler)
                })
                this.routes.push(_route)
            })
        }
    }

    /**
     * 
     * @param {*} fn 
     * @public
     */
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

    /**
     * 
     * @param {*} path 
     * @param {*} fn 
     * @private
     */
    setUpMiddleware(path, fn) {
        var mw = new Middleware(path, fn)
        this.middlewares.push(mw)
    }

    /**
     * 
     * @param {*} path 
     * @private
     */
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