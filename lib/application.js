'use strict';

var methods = require('methods');
var http = require('http');
var mixin = require('merge-descriptors');
var ress = require('./response');
var reqq = require('./request')
var setPrototypeOf = require('setprototypeof')
const chalk = require('chalk')

var app = exports = module.exports = {};
app.stack = [];

app.start = function start() {
    this.defConfig();
};
app.handle = function handle(req, res, n) {
    console.log(req.headers)
    mixin(res, ress, false)
    mixin(req, reqq, false)
    this.stack[0](req, res, n)
};
methods.forEach((method) => {
    app[method] = function(params) {
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
app.use()*/