'use strict';

const core = require('./core');
const Router = require('./router')
const Log = require('./log')

/*
exports = module.exports = core
exports.Router = () => {
    return new Router()
}
*/
exports.Server = core
exports.Router = () => {
    return new Router()
}
exports.log = (options) => {
    return new Log(options)
}