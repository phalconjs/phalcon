var phalcon = require('../lib/phalcon');

var app = new phalcon();

/* set middlewares*/
app.use((req, res) => {})
app.use('cat', (req, res) => {})
app.use(['dog', 'beetle'], (req, res) => {}, (req, res) => {})
app.use(['lion'], [(req, res) => {}, (req, res) => {}])
app.use([(req, res) => {}])
app.use((req, res) => {}, (req, res) => {})

app.get('/', (req, res) => {
    res.send('Hello World form PhalconJS');
});
app.listen(3000);