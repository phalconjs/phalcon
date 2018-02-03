'use strict';

var methods = require('methods');
var http = require('http');
var mixin = require('merge-descriptors');
var ress = require('./response');
var reqq = require('./request')
var Router = require('./router')
var setPrototypeOf = require('setprototypeof')
var flatten = require('array-flatten')
const chalk = require('chalk')

class Core {
    constructor() {
        methods.forEach((method) => {
            Core.prototype[method] = function(params) {
                this.initRouter()
                var path = arguments[0]
                var handler = arguments[1]

                var route = this._router.route(path)
                route[method](handler)
                return this;
            }
        });

    }
    handleRequest(req, res, n) {
        return (req, res) => {
            mixin(res, ress, false)
            mixin(req, reqq, false)
            this._router.handle(req, res)
        }
    }
    initRouter() {
        if (!this._router) {
            this._router = new Router()
        }
        return this._router
    }
    listen() {
        var listener = http.createServer();
        listener.on('request', this.handleRequest())
        return listener.listen.apply(listener, arguments);
    }
    use(fn) {
        var path = '/'
        var handler = []
        this.initRouter()

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
                this._router.setUpRoute(path, (req, res) => {
                    mixin(res, ress, false)
                    mixin(req, reqq, false)
                    h.basePath = path
                    h.handle(req, res)
                })
            }
        })
    }
    all() {}
    disable() {}
    disabled() {}
    enable() {}
    enabled() {}
    engine() {}
    param() {}
    path() {}
    render() {}
    route() {}
}
module.exports = Core