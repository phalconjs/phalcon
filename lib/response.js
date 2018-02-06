module.exports = patchServerResponse = function(ServerResponse) {

    ServerResponse.prototype.append = function append(params) {

    }
    ServerResponse.prototype.attachment = function attachment(params) {

    }
    ServerResponse.prototype.cookie = function cookie(params) {

    }
    ServerResponse.prototype.clearCookie = function clearCookie(params) {

    }
    ServerResponse.prototype.download = function download(params) {

    }

    ServerResponse.prototype.format = function format(params) {

    }
    ServerResponse.prototype.get = function get(params) {

    }
    ServerResponse.prototype.json = function json(val) {
        this.end(val)
        return this;
    }
    ServerResponse.prototype.jsonp = function jsonp(params) {

    }
    ServerResponse.prototype.links = function links(params) {

    }
    ServerResponse.prototype.location = function location(params) {

    }
    ServerResponse.prototype.redirect = function redirect(params) {

    }
    ServerResponse.prototype.render = function render(params) {

    }

    /** Sends the HTTP response.
    The body parameter can be a Buffer object, a String, an object, or an Array. For example 
    * 
    res.send(new Buffer('whoop'));
    res.send({ some: 'json' });
    res.send('<p>some html</p>');
    res.status(404).send('Sorry, we cannot find that!');
    res.status(500).send({ error: 'something blew up' });    
    */
    ServerResponse.prototype.send = function send(val) {
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

    ServerResponse.prototype.sendFile = function sendFile(params) {

    }

    /** Sets the response HTTP status code to statusCode and send its string representation as the response body. 
     * res.sendStatus(220000); //// eeqquuiivvaalleenntt ttoo res.status(220000).send(''OK'')
    res.sendStatus(440033); //// eeqquuiivvaalleenntt ttoo res.status(440033).send(''Foorrbbiiddddeenn'')
    res.sendStatus(440044); //// eeqquuiivvaalleenntt ttoo res.status(440044).send(''Noott Foouunndd'')
    res.sendStatus(550000); //// eeqquuiivvaalleenntt ttoo res.status(550000).send(''IInntteerrnnaall Seerrvveerr Errrroorr'')
    */
    ServerResponse.prototype.sendStatus = function sendStatus(params) {
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
    ServerResponse.prototype.set = function set(sCode) {
        this.setHeader('Content-Type', 'text/html');
        this.writeHead(sCode, { 'Content-Type': 'text/plain' });
    }

    /** Sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode. 
     * res.status(440033).eenndd();
    res.status(440000).send(''Baadd Reeqquueesstt'');
    res.status(440044).sendFiillee(''//aabbssoolluuttee//ppaatthh//ttoo//440044.ppnngg'');
    */
    ServerResponse.prototype.status = function status(params) {
        this.statusCode = params
        return this;
    }
    ServerResponse.prototype.type = function type(params) {

    }
    ServerResponse.prototype.vary = function vary(params) {

    }
}