'use strict';

var methods = require('methods')

var app = exports = module.exports = {};

app.start = function start() {
    console.log('start');
    this.set();
    //this.defConfig();
};
methods.forEach((val, index) => {
    //console.log(val);
});
app.defConfig = function defConfig() {
    console.log('App Started');
};
app.handle = () => {
    console.log('handle');
};
app.set = function set() {
    console.log('set');
};