/**
 * Author: Chidume Nnamdi
 */

/**
 * new Promise((res, rej)=>{}).then((res)=>{},(rej)=>{})
 */
class _Promise {
    constructor(_fn) {
        this.fn = null
        this.err = null
        this._fn = _fn
        const EventEmitter = require('events')
        class _Emitter extends EventEmitter {}

        const __Emitter = new _Emitter()
        this._emitter = __Emitter
        console.log('here.........')

        __Emitter.on('event', () => {
                setImmediate(() => {
                    //console.log('eventing.........')
                    this._fn(this._resolve(this), this._reject)
                })
            })
            //console.log('emitting event.........')
        __Emitter.emit('event')

        return this
    }
    _then(fn, err) {
        //console.log(`indsied then ${this.fn}`)
        this._emitter.on('end', () => {
            //console.log('ending event with these: ', this.fn, this.err)
            if (this.fn)
                fn(this.fn)
            if (this.err)
                err(this.err)
        })
    }
    _resolve(_this, _p) {
        //console.log('resolving')
        return function(p) {
            _this.fn = p
            _this._emitter.emit('end')
                //console.log(p)
        }
    }
    _reject(_p) {
        this.err = _p
    }
}

function cv(params) {
    function getOdd() {
        return true
    }
    var prm = new _Promise(function(_resolve, _reject) {
        setTimeout(() => {
                _resolve('herereeee')
            }, 300)
            /*require('http').get('http://localhost:100', (res) => {
                console.log(res.data)
                _resolve(true)
            })*/
            /*if (getOdd()) {
                _resolve(true)
            } else {
                _reject('Error: detected')
            }*/
    })
    return prm
}
cv()._then((res) => {
    console.log(`${res} : The answer`)
}, (err) => {
    console.log(err)
})
console.log('end script')

console.log('=================================')

/*function cvv(params) {
    function getOdd() {
        return true
    }
    var prm = new Promise(function(_resolve, _reject) {
        if (getOdd()) {
            _resolve(true)
        } else {
            _reject('Error: detected')
        }
    })
    return prm
}*/
/*cvv().then((res) => {
    console.log(`${res} : The answer from real Promise`)
}, (err) => {
    console.log(err)
})
console.log('end script')
console.log('===============================')
*/

/*const EventEmitter = require('events')
class _Emitter extends EventEmitter {}

const __Emitter = new _Emitter()

__Emitter.on('event', () => {
    setImmediate(() => {
        console.log('listener')
    })
})
__Emitter.emit('event')
console.log('end script')*/