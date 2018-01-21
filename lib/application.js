'use strict';

var methods = require('methods');
var http = require('http');
var mixin = require('merge-descriptors');
var ress = require('./response');
var reqq = require('./request')
var Router = require('./router')
var setPrototypeOf = require('setprototypeof')
const chalk = require('chalk')

var app = exports = module.exports = {};
app.stack = [];

app.start = function start() {
    this.defConfig();
};
app.initRoute = function initRoute() {
    this._router = new Router()
    return this._router
}
app.handle = function handle(req, res, n) {
    console.log(req.headers)
    mixin(res, ress, false)
    mixin(req, reqq, false)
    this.stack[0](req, res, n)
    this._router.handle(req, res)
};
methods.forEach((method) => {
    app[method] = function(params) {
        console.log("routes:" + this.initRoute().routes)
        this.initRoute()
        var path = Array.prototype.slice.call(arguments, 0)
        var mw = Array.prototype.slice.call(arguments, 1)
        console.log(this._router)
        var route = this._router.route(path)
            //console.log(route['GET'].apply(route, mw))
        this.stack.push(Array.prototype.slice.call(arguments, 1)[0])
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
    console.log(chalk.green(`App started on port:`) + chalk.yellow(arguments[0]))
    return server.listen.apply(server, arguments);
}
app.use = function(fn) {
    //console.log(arguments[0])
    var path = '/'
    var offset
    var handler = []
        // check for path
    console.log(fn)
    if (typeof fn == 'function' || typeof arguments[0] == 'function') {
        path = '/'
        offset = 0
        for (var key in arguments) {
            handler.push(arguments[key])
        }
    }
    console.log(handler)
    if (typeof fn !== 'function' && arguments.length > 1) {
        path = fn
        offset = 1
    }

}

/*app.all()
app.delete()
app.disable()
app.disabled()
app.enable()
app.enabled()
app.engine()
app.get()
app.get()
app.METHOD()
app.param()
app.path()
app.post()
app.put()
app.render()
app.route()
*/