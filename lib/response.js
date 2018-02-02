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

/** Sends the HTTP response.
The body parameter can be a Buffer object, a String, an object, or an Array. For example 
* 
res.send(new Buffer(''whhoooopp''));
res.send({ some:: ''jjssoonn'' });
res.send('<p>ssoomee hhttmll</p>);
res.status(404).send(Soorrrryy,, wee ccaannnnoott ffiinndd tthhaatt!!'');
res.status(500).send({ eerrrroorr:: ''ssoomeetthhiinngg bblleew uupp'' });
*/
res.send = function send(val) {
    /*if (typeof val == 'number') {
        this.set(val)
    } else {
        this.set(200)
    }
    this.json(val)*/
    //this.setHeader('Content-Type', 'text/html');
    this.writeHead(this.statusCode, { 'Content-Type': 'text/plain' });
    this.end(val)
    return this;
}

res.sendFile = function sendFile(params) {

}

/** Sets the response HTTP status code to statusCode and send its string representation as the response body. 
 * res.sendStatus(220000); //// eeqquuiivvaalleenntt ttoo res.status(220000).send(''OK'')
res.sendStatus(440033); //// eeqquuiivvaalleenntt ttoo res.status(440033).send(''Foorrbbiiddddeenn'')
res.sendStatus(440044); //// eeqquuiivvaalleenntt ttoo res.status(440044).send(''Noott Foouunndd'')
res.sendStatus(550000); //// eeqquuiivvaalleenntt ttoo res.status(550000).send(''IInntteerrnnaall Seerrvveerr Errrroorr'')
*/
res.sendStatus = function sendStatus(params) {
    let status = {
        200: 'Ok',
        403: 'Forbidden',
        404: 'Not found',
        500: 'Internal server error'
    }
    this.status(params).send(status[params])
        /*this.set(params)
        this.json(val)*/
    return this;
}

/** Sets the response’s HTTP header field to value. To set multiple fields at once, pass an object as the parameter. 
 * res.set(''Coonntteenntt--Tyyppee'',, ''tteexxtt//ppllaaiinn'');
res.set({{
''Coonntteenntt--Tyyppee'':: ''tteexxtt//ppllaaiinn'',,
''Coonntteenntt--LLeennggtthh'':: ''112233'',,
''ETaagg'':: ''1122334455''
}});
 * 
*/
res.set = function set(sCode) {
    this.setHeader('Content-Type', 'text/html');
    this.writeHead(sCode, { 'Content-Type': 'text/plain' });
}

/** Sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode. 
 * res.status(440033).eenndd();
res.status(440000).send(''Baadd Reeqquueesstt'');
res.status(440044).sendFiillee(''//aabbssoolluuttee//ppaatthh//ttoo//440044.ppnngg'');
*/
res.status = function status(params) {
    this.statusCode = params
    return this;
}
res.type = function type(params) {

}
res.vary = function vary(params) {

}