'use strict';
var proto = require('./application');
var mixin = require('merge-descriptors');

exports = module.exports = () => {
    console.log('phalcon')
    var app = () => {
        app.handle()
    }
    mixin(app, proto, false)
    app.start()
    return app;
}

exports.get = () => {
    console.log('GET');
}