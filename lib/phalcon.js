'use strict';

var core = require('./core');
var res = require('./response');
var req = require('./request');
var mixin = require('merge-descriptors');
var EventEmitter = require('events').EventEmitter;
var Router = require('./router')

exports = module.exports = core
exports.Router = () => {
    return new Router()
}