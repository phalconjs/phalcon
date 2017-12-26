var http = require('http');

var req = Object.create(http.IncomingMessage.prototype)

module.exports = req;

// properties
/*
req.app
req.baseUrl
req.body
req.cookies
req.fresh
req.hostname
req.ip
req.ips
req.method
req.originalUrl
req.params
req.path
req.protocol
req.query
req.route
req.secure
req.signedCookies
req.stale
req.subdomains
req.xhr
*/

// `Methods`
req.accepts = function accepts(params) {

}
req.acceptsCharsets = function acceptsCharsets(params) {

}
req.acceptsEncodings = function acceptsEncodings(params) {

}
req.acceptsLanguages = function acceptsLanguages(params) {

}
req.get = function get(params) {

}
req.is = function is(params) {

}
req.param = function param(params) {

}
req.range = function range() {

}