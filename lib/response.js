var http = require('http')
var res = Object.create(http.ServerResponse.prototype)
module.exports = res

res.json = function json(val) {
    this.end(val)
    return this;
}

res.send = function send(val) {
    this.set()
    this.json(val)
    return this;
}
res.set = function set() {
    this.setHeader('Content-Type', 'text/html');
    this.writeHead(200, { 'Content-Type': 'text/plain' });
}