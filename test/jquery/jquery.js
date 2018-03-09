/**
 * Author: Chidume Nnamdi
 */


/**
 * 
 * @param {*} params 
 */
function _$(params) {
    return {
        html: function(params) {

        }
    }
}

/**
 * @param {Array} arr
 * @param {function} cb
 */
_$.each = function(_arr, _cb) {}

/**
 * maps array to each other
 */
_$.map = function(arr, cb) {
    if (typeof arr !== 'array') {
        //throw arr + ' is not an Array'
    }
    let _arr = []
    for (var index = 0; index < arr.length; index++) {
        var element = arr[index];
        _arr.push(cb(element))
    }
    return _arr
}
module.exports = _$