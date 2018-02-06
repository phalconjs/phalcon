// properties
/*
IncomingMessage.prototype.app
IncomingMessage.prototype.baseUrl
IncomingMessage.prototype.body
IncomingMessage.prototype.cookies
IncomingMessage.prototype.fresh
IncomingMessage.prototype.hostname
IncomingMessage.prototype.ip
IncomingMessage.prototype.ips
IncomingMessage.prototype.method
IncomingMessage.prototype.originalUrl
IncomingMessage.prototype.params
IncomingMessage.prototype.path
IncomingMessage.prototype.protocol
IncomingMessage.prototype.query
IncomingMessage.prototype.route
IncomingMessage.prototype.secure
IncomingMessage.prototype.signedCookies
IncomingMessage.prototype.stale
IncomingMessage.prototype.subdomains
IncomingMessage.prototype.xhr
*/

// `Methods`

module.exports = patchIncomingMessage = function(IncomingMessage) {
    IncomingMessage.prototype.accepts = function accepts(params) {

    }
    IncomingMessage.prototype.acceptsCharsets = function acceptsCharsets(params) {

    }
    IncomingMessage.prototype.acceptsEncodings = function acceptsEncodings(params) {

    }
    IncomingMessage.prototype.acceptsLanguages = function acceptsLanguages(params) {

    }
    IncomingMessage.prototype.get = function get(params) {

    }
    IncomingMessage.prototype.is = function is(params) {

    }
    IncomingMessage.prototype.param = function param(params) {

    }
    IncomingMessage.prototype.range = function range() {

    }
}