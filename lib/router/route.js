/** 
 * Author: Chidume Nnamdi 2017
 */
'use strict';
const methods = require('methods')
const flatten = require('array-flatten')
const pathToRegexp = require('path-to-regexp')
module.exports = Route

/**
 * 
 * @param {*} path 
 */
function Route(path) {
    this.path = path
    this.handlers = []
    this.methodType = []
}

/**
 * @public
 */
Route.prototype.matchPath = function matchPath(params) {

    if (arguments[1] == null && this.methodType.length !== 0) {
        /** check if route method matches the req.method */
        if (!checkMethod(arguments[2].method, this.methodType)) {
            return false
        }
    }

    var keys = []
    var match = false
    var paths = []
    paths.push(this.path)
    var path = flatten(paths)
    Array.prototype.forEach.call(path, (path) => {
        // check if mounted app
        if (arguments[1] != null) {
            flatten([arguments[1]]).forEach((basePath) => {
                path = (basePath == '/' ? '' : basePath) + path + '/:id*'
                var re = pathToRegexp(path, keys).exec(params)
                if (re != null)
                    match = true
                else
                    return match
            })
        }
        path = path + '/:id*'
        var re = pathToRegexp(path, keys).exec(params)
        if (re != null)
            match = true
    })
    return match
}

/**
 * @param:params error code
 * @param: req
 * @param: res
 * @private
 */
Route.prototype.handle_error = function handle_error(params) {
    arguments[2].statusCode = params
    arguments[2].send('Cannot Handle METHOD')
}

/**
 * @public
 */
Route.prototype.runHandler = function runHandler(params) {
    this.handlers = flatten(this.handlers)
    this.handlers.forEach((method) => {
        method(arguments[0], arguments[1])
    })

}

methods.forEach(function(method) {
    Route.prototype[method] = function(params) {
        this.methodType.push(method.toString())
        var h = []
        for (var key in params) {
            if (typeof params[key] != 'string') {
                h.push(params[key])
            }
        }
        this.handlers.push(flatten(h))
    }
})

/**
 * 
 * @param {*} params 
 * @param {*} methodType 
 * @private
 */
function checkMethod(params, methodType) {
    var isMethod = false
    Array.prototype.forEach.call(methodType, (method) => {
        var m = String.prototype.toString().toLowerCase.call(params)
        var ma = String.prototype.toString().toLowerCase.call(method)
        if (m == ma) {
            isMethod = true
        }
    })
    return isMethod
}