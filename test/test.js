var chalk = require('chalk')
var phalcon = require('../lib/phalcon');

var app = new phalcon();

/* set router object */
var router = phalcon.Router()
router.get('/cow', (req, res) => { res.send('from router (cow)') })
router.route('/dogs')
    .get((req, res) => { res.send('from router (dogs)') });
app.use('/goat', router)

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

router.get('cow', ()=>{})
router.route('dogs')
    .get(()=>{});
router.use('cat', ()=>{})    
[
    Routes: 
    [
        cow => func,
        dogs => func
    ]
    Middlewares: 
    [
        cat => function
    ]
]

app.use(router)
app.use('goat', router)
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

phalcon.auth('basic', 'basic', () => {})
phalcon.auth('jwt', 'jwt', () => {})

phalcon.cors({
    origin: ['localhost:3000'],
    methods: ['GET'],
    allowedHeader: ["Content-Type", "Authorization"]
})
phalocn.cors()

phalcon.compression()

phalcon.serve_static('/static/*')

phalcon.log()