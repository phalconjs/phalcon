/** 
 * Author: Chidume Nnamdi 2017
 */
'use strict';

const methods = require('methods');
const http = require('http');
const mixin = require('merge-descriptors');
const patchServerResponse = require('./response');
const patchIncomingMessage = require('./request')
const Router = require('./router')
const setPrototypeOf = require('setprototypeof')
const flatten = require('array-flatten')
const chalk = require('chalk')
patchServerResponse(http.ServerResponse)
patchIncomingMessage(http.IncomingMessage)
const Auth = require('./auth')

class Core {
    constructor() {
        this.auth = new Auth()
        methods.forEach((method) => {

            /**
             * @public
             */
            Core.prototype[method] = function(params) {
                this.initRouter()
                var path = params
                var handler = arguments

                var route = this._router.route(path)
                route[method](handler)
                return this;
            }
        });

    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} n 
     * @private
     */
    handleRequest(req, res, n) {
        return (req, res) => {
            this._router.handle(req, res)
        }
    }

    /**
     * @private
     */
    initRouter() {
        if (!this._router) {
            this._router = new Router()
        }
        return this._router
    }

    /**
     * @public
     */
    listen() {
        let listener = http.createServer();
        listener.on('request', this.handleRequest())
        return listener.listen.apply(listener, arguments);
    }

    /**
     * 
     * @param {*} fn 
     * @public
     */
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
                    h.basePath = path
                    h.handle(req, res)
                })
            }
        })
    }

    /**
     * This registers a plugin like cors , compression, auth schemes,..etc
     * @param {Object} plugin 
     * @param {Object} options
     * @public
     */
    register(plugin, options) {
        //console.log(`----- ${typeof plugin}`)
        if (typeof plugin == 'function') {
            new plugin().execute(this)
        }
    }

    log(opts) {
        var Log = require('./log.js')
            //console.log(`===== ${typeof Log}`)
        this.register(Log)
    }

    /**
     * 
     * @param {*} param 
     * @public
     */
    all(param) {}
    disable() {}
    disabled() {}
    enable() {}
    enabled() {}
    engine() {}
    param() {}
    path() {}
    render() {}

    /**
     * 
     * @param {*} params 
     * Usage: app.route({
     *  path: '/doug'
     *  method: 'GET',
     *  handler: (res, req) => {}
     * })
     * 
     * app.route([
     * {
     *  path: '/shytlman',
     *  method: 'GET',
     *  handler: (res, req) => {}
     * },
     * {
     *  path: '/tj',
     *  method: 'POST',
     *  handler: (res,req) => {}
     * }
     * ])
     * @public
     */
    route(params) {
        this.initRouter()
        if (typeof params == 'array' || typeof params == 'object') {
            flatten([params]).forEach((route) => {
                let _route = this._router.route(route.path)
                flatten([route.method]).forEach((method) => {
                    let _method = String.prototype.toLowerCase.call(method)
                    _route[_method](route.handler)
                })
            })
        }
    }
}
module.exports = Core