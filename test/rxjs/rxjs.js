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
class Subject {

}

class AsyncSubject {}
class BehaviorSubject {}
class ReplaySubject {}
class PublishSubject {}

class Observer {
    onNext() {

    }
    onError() {

    }
    onCompleted() {

    }
}

class Observable {

    static observers = []
    static registered = []

    constructor() {}

    static create(fn) {
        Observable.registered.push(fn)
    }

    static from() {

    }

    map() {

    }

    filter() {

    }

    subscribe(obj) {

    }
}