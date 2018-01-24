var chalk = require('chalk')
var phalcon = require('../lib/phalcon');

var app = new phalcon();
var router = phalcon.Router()

/* set middlewares*/
app.use((req, res) => { console.log('mw 1') })
app.use('cat', (req, res) => { console.log('mw 2') })
app.use(['dog', 'beetle'], (req, res) => { console.log('mw 3') }, (req, res) => { console.log('mw 3') })
app.use(['lion'], [(req, res) => { console.log('mw 4') }, (req, res) => { console.log('mw 4') }])
app.use([(req, res) => { console.log('mw 5') }])
app.use((req, res) => { console.log('mw 6') }, (req, res) => { console.log('mw 6') })

app.get('/', (req, res) => {
    res.send('Hello World form PhalconJS');
});
app.listen(3000, () => {
    console.log(chalk.green(`App started on port:`) + chalk.yellow(3000))
});

/*
var phalcon = require('../lib/phalcon');

var app = new phalcon();

//Creates a new router object
const router = phalcon.Router()

router.get('get', ()=>{})
router.route('dogs')
    .get(()=>{});
router.use('cat', ()=>{})    

app.use(router)
app.listen(3000);
*/

/*
const server = phalcon.Server();

server.route({
    path: '',
    method: GET,
    handler: () => {}
})

server.start({
    host: localhost,
    port: 3000,
    handler: () => {}
})
*/