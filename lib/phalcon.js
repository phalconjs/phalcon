'use strict';

var proto = require('./application');
var res = require('./response');
var req = require('./request');
var mixin = require('merge-descriptors');
var EventEmitter = require('events').EventEmitter;
var Router = require('./router')

exports = module.exports = initialize;

function initialize() {
    //console.log('phalcon')
    var app = function(req, res, next) {
        //console.log(res.send)
        app.handle(req, res, next);
    };
    mixin(app, EventEmitter.prototype, false);

    mixin(app, proto, false);

    app.response = Object.create(res, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });
    app.request = Object.create(req, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    app.start()
    return app;
}

exports.application = proto;
exports.response = res;
exports.request = req;
exports.Router = () => {
    return new Router()
}