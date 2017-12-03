# phalcon
A fast web framework for Nodejs

# Basic Usage
```javascript
var phalcon = require('phalcon');
var app = new phalcon();

app.get('/', (req, res) => {
    res.send('Hello World form PhalconJS');
});
app.listen(3000);
```
# Installation
```sh
npm install phalcon --save
```
# Examples
To run the examples.
1. Clone the repo:

        git clone git://github.com/phalconjs/phalcon.git

1. Move into the `phalcon` directory from the terminal:

        cd phalcon

1. Install the dependencies:

        npm install

1. To run any example you want:

        node examples/<example-dir>

# Test
To run the test.
1. Clone the repo:

        git clone git://github.com/phalconjs/phalcon.git

1. Move into the `phalcon` directory from the terminal:

        cd phalcon

1. Install the dependencies:

        npm install

1. Run:
        npm test

