var chalk = require('chalk')
const phalcon = require('../lib/phalcon');

const app = new phalcon.Server();

/* set router object */
var router = phalcon.Router()
router.get('/cow', (req, res) => { res.send('from router (cow)') })
router.route({
    path: '/turtle',
    method: 'GET',
    handler: (req, res) => { res.send('from app Router turtle') }
})
router.route([{
        path: '/wolf',
        method: 'POST',
        handler: (req, res) => { res.send('from app Router wolf POST') }
    },
    {
        path: '/fox',
        method: 'GET',
        handler: (req, res) => {
            res.send('from app Router fox GET request')
        }
    }
])
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
    res.send('Hello World from PhalconJS');
});

app.log()

/** setting middlewares in route path */
app.get('/cheta', [(req, res) => { console.log('cheta by Ada') }, (req, res) => { console.log('cheta by AdaEhi') }], (req, res) => {
    res.send('Never forget')
})
app.route({
    method: 'GET',
    path: '/pot',
    handler: (req, res) => { res.send('/pot app.route calls') }
})
app.route({
    method: ['POST', 'GET'],
    path: '/sands',
    handler: (req, res) => { res.send('/sands app.route calls') }
})
app.route([{
        path: '/kettle',
        method: 'POST',
        handler: (req, res) => { res.send('from keetle POST') }
    },
    {
        path: '/frigde',
        method: 'GET',
        handler: (req, res) => {
            res.send('from frigde GET request')
        }
    }
])
let port = 4000
app.listen(port, () => {
    console.log(chalk.green(`App started on port:`) + chalk.yellow(port))
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
/*
phalcon = require('./../lib')
app = phalcon()

/** deifnes your authentication strategy and schemes */
/*
app.auth('basic', 'basic', () => {})
app.auth('jwt', 'jwt', () => {})
*/
/** allows a cross-orgin browser requests */
/*
app.cors({
    origin: ['localhost:3000'],
    methods: ['GET'],
    allowedHeader: ["Content-Type", "Authorization"]
})
app.cors()

app.compression()
*/
/** serves the static files like html, css etc */
/*
app.serve_static('/static/*')
*/
/** logs html requests */
/*
app.log()
*/



app.register('auth', 'cors', 'log', 'compression')
app.register({
    type: 'serve-static',
    config: {
        path: '/static'
    }
})