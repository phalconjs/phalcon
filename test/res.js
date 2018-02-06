'use strict';

var res = require('./../lib/response')
    //console.log(res)

function auto_bind() {
    return function(target, propKey, descriptor) {
        console.log(target)
    }
}
class Super {
    constructor(n) {
        this.name = n
    }

    //@auto_bind
    getName() {
        return this.name
    }
}

let bat = new Super('Batman')
let spider = new Super('Spiderman')
const batgetter = bat.getName
const spidergetter = spider.getName
    //console.log(batgetter())