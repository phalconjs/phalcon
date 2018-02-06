var http = require('http')
var mixin = require('merge-descriptors');

class Response {
    constructor(res) {
        this.res = res
    }
    append(params) {

    }
    attachment(params) {

    }
    cookie(params) {

    }
    clearCookie(params) {

    }
    download(params) {

    }

    /*res.end = function end(params) {

    }*/

    format(params) {

    }
    get(params) {

    }
    json(val) {
        this.end(val)
        return this;
    }
    jsonp(params) {

    }
    links(params) {

    }
    location(params) {

    }
    redirect(params) {

    }
    render(params) {

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
    send(val) {
        /*if (typeof val == 'number') {
            this.set(val)
        } else {
            this.set(200)
        }
        this.json(val)*/
        //this.setHeader('Content-Type', 'text/html');
        this.res.writeHead(this.res.statusCode, { 'Content-Type': 'text/plain' });
        this.res.end(val)
        return this;
    }

    sendFile(params) {

    }

    /** Sets the response HTTP status code to statusCode and send its string representation as the response body. 
     * res.sendStatus(220000); //// eeqquuiivvaalleenntt ttoo res.status(220000).send(''OK'')
    res.sendStatus(440033); //// eeqquuiivvaalleenntt ttoo res.status(440033).send(''Foorrbbiiddddeenn'')
    res.sendStatus(440044); //// eeqquuiivvaalleenntt ttoo res.status(440044).send(''Noott Foouunndd'')
    res.sendStatus(550000); //// eeqquuiivvaalleenntt ttoo res.status(550000).send(''IInntteerrnnaall Seerrvveerr Errrroorr'')
    */
    sendStatus(params) {
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
    set(sCode) {
        this.res.setHeader('Content-Type', 'text/html');
        this.res.writeHead(sCode, { 'Content-Type': 'text/plain' });
    }

    /** Sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode. 
     * res.status(440033).eenndd();
    res.status(440000).send(''Baadd Reeqquueesstt'');
    res.status(440044).sendFiillee(''//aabbssoolluuttee//ppaatthh//ttoo//440044.ppnngg'');
    */
    status(params) {
        this.res.statusCode = params
        return this;
    }
    type(params) {

    }
    vary(params) {

    }
}

module.exports = Response