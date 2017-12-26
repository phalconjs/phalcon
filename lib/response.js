var http = require('http')
var res = Object.create(http.ServerResponse.prototype)
module.exports = res



// `Properties`
/*res.app
res.headersSent
res.locals
*/
// `Methods`
res.append = function append(params) {

}
res.attachment = function attachment(params) {

}
res.cookie = function cookie(params) {

}
res.clearCookie = function clearCookie(params) {

}
res.download = function download(params) {

    }
    /*res.end = function end(params) {

    }*/
res.format = function format(params) {

}
res.get = function get(params) {

}
res.json = function json(val) {
    this.end(val)
    return this;
}
res.jsonp = function jsonp(params) {

}
res.links = function links(params) {

}
res.location = function location(params) {

}
res.redirect = function redirect(params) {

}
res.render = function render(params) {

}
res.send = function send(val) {
    this.set()
    this.json(val)
    return this;
}
res.sendFile = function sendFile(params) {

}
res.sendStatus = function sendStatus(params) {

}
res.set = function set() {
    this.setHeader('Content-Type', 'text/html');
    this.writeHead(200, { 'Content-Type': 'text/plain' });
}
res.status = function status(params) {

}
res.type = function type(params) {

}
res.vary = function vary(params) {

}