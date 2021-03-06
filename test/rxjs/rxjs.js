/**
 * Author: Chidume Nnamdi
 */

/**
 * let ob = Rx.Observable.create((observer)=>{
 *  observer.onNext(42)
 *  observer.onCompleted()
 * })
 * 
 * ob.subscribe((v)=>{
 *  console.log(v)
 * })
 */

const EventEmitter = require('events')
class _Emitter extends EventEmitter {}

const __Emitter = new _Emitter()

class Subject {

}

class AsyncSubject {}
class BehaviorSubject {}
class ReplaySubject {}
class PublishSubject {}

class Observer {

    constructor() {
        this.stream = []
        this.subscribers = []
        this.fn = null
        class _Emitter extends EventEmitter {}
        const __Emitter = new _Emitter()
        this._emitter = __Emitter
        this._emitter.on('start', function() {

        })
    }

    /** push values to stream */
    next(v) {
        this.stream.push(v)
    }

    onError(v) {

    }

    onCompleted(v) {

    }
    flushStream() {
        this.stream = []
    }
    startEmit() {
        this._emitter.emit('start')
    }
}

class Observable {


    constructor(fn) {
        this.observer = new Observer()

        //fn(this.observer)

        this._subscribe = fn

        //this.fn = fn
    }

    static create(fn) {
        return new Observable(fn)
    }

    _subscribe() {}

    static from(array) {
        return new Observable()
    }
    static interval() {

    }
    static range() {

    }
    static distinct() {

    }

    map() {

    }

    filter() {

    }

    /**
     * .subscribe({
     *  next: x=> console.log(`emitted ${x}`),
     *  error: err=> console.log(`Error ${err}`),
     *  complete: cmp=> console.log(`Completed ${cmp}`)
     * })
     * @param {*} observer 
     */
    subscribe(_observer) {
        //this.observer.flushStream()
        //this.fn(this.observer)
        this._subscribe(_observer)

        //this.observer.startEmit()

        /*this.observer.stream.forEach((s) => {
            _observer.next(s)
        })*/

    }
}

let source = Observable.create(function(observer) {
    //console.log('Hello')
    observer.next(9)
    observer.next(90)
    observer.next(900)
    setTimeout(() => {
        observer.next(10)
            //console.log('timeout', observer)
    }, 1000)
})

source.subscribe({
    next: x => console.log(x)
})

source.subscribe({
    next: x => console.log(`Hello: ${x}`)
})
console.log('end')

/**
 * store the stream in observer
 * register subscriber
 * start emiting stream
 */ next: x => console.log(x)
})

source.subscribe({
    next: x => console.log(`Hello: ${x}`)
})
console.log('end')

/**
 * store the stream in observer
 * register subscriber
 * start emiting stream
 */