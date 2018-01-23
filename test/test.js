var chalk = require('chalk')
var phalcon = require('../lib/phalcon');

var app = new phalcon();
var router = phalcon.Router()

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
router.use('cat)    

app.use(router)
app.listen(3000);
*/