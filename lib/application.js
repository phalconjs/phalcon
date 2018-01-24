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

var app = exports = module.exports = {};
app.stack = [];

app.start = function start() {
    this.defConfig();
};
app.initRouter = function initRoute() {
    if (!this._router) {
        this._router = new Router()
    }
    return this._router
}
app.handle = function handle(req, res, n) {
    mixin(res, ress, false)
    mixin(req, reqq, false)
    this._router.handle(req, res)
};
methods.forEach((method) => {
    app[method] = function(params) {
        //console.log("routes:" + this.initRoute().routes)
        this.initRouter()
        var path = arguments[0]
        var handler = arguments[1]
            //console.log(this._router)

        var route = this._router.route(path)
        this._router.get()
        console.log(this._router)
            //        console.log(route.matchPath())
            //        route[method].apply(route, handler)
        route[method](handler)

        //console.log(route['GET'].apply(route, mw))
        //this.stack.push(Array.prototype.slice.call(arguments, 1)[0])

        return this;
    }
});
app.defConfig = function defConfig() {
    this.on('mount', function onmount(parent) {
        // inherit protos
        setPrototypeOf(this.request, parent.request)
        setPrototypeOf(this.response, parent.response)
    });
};
app.set = function set() {
    console.log('set');
};
app.listen = function listen() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
}
app.use = function(fn) {
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
            this._router.setUpRoute(path)
            this._router.get()
        }
    })
}

/*
app.all()
app.disable()
app.disabled()
app.enable()
app.enabled()
app.engine()
app.param()
app.path()
app.render()
app.route()
*/