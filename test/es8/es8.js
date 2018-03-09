/**
 * Author: Chidume Nnamdi
 */

/*
Object.prototype. = function () {
    
}
*/
Object._values = function(params) {

}
Object._entries = function(params) {
    return 'entries'
}
Object._getObjectOwnPropertyDescriptors = function(params) {
    return 'entries'
}
console.log(Object._entries())
Array.prototype._contains = function(l) {
    //console.log(this)
    //console.log(l)
    for (var index = 0; index < this.length; index++) {
        const element = this[index]
        if (element == l) {
            return true
        }
    }
    return false
}
String.prototype._padZeros = function() {
    console.log(this)
    const _this = this
    let _str = ''
    for (var index = 0; index < _this.length; index++) {
        _str += _this[index];
        //console.log(this[index])
        //this[index] = "00"
    }
    return _str += "00"
}
const cv = [9, 99, 89]
console.log(cv._contains(90))
console.log(Array.prototype._contains.call(cv, 90))
console.log('nnamdi'._padZeros()._padZeros())

function resv(params) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('yay!!')
        }, 200)
    })
}
async function df() {
    let d = await resv()
    console.log(d)
}
df().then(b => {
    console.log(b)
})

//console.log(Array.prototype.valueOf.call(cv))
//console.log(cv.valueOf())

//console.log('cv.valueOf')