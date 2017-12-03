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
