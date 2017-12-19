var phalcon = require('../lib/phalcon');

var app = new phalcon();

app.get('/', (req, res) => {
    res.send('Hello World form PhalconJS');
});
app.listen(3000);