function Scope(params) {
    this.i = 0
}
Scope.prototype.$new = function(params) {
    var obj = new Scope(this)
    Object.setPrototypeOf(this, obj)
    return obj
}
Scope.prototype.change = function() {
        this.i++
            return this
    }
    /*var s = new Scope()
    var v = s.$new()
    v.a = 90
    v.chg = function() {

    }
    s.change()
    v.change().change()
    */
    /*console.log(s.a)
    console.log(s)
    console.log(v)*/
var g = []

function fad() {
    g['push'](90)
}
fad()
console.log(g)

if (typeof document != 'undefined') {
    let el = document.querySelector('[ng-app]')
    console.log(el)
    let att = el.getAttribute('ng-app')
    console.log(att)
}

/** _angular.module('ng', []) */
window._angular = {
    module: function() {
        return {
            ng_ctrl: function() {

            },
            ng_repeat: function(params) {

            },
            ng_click: function(params) {

            }
        }
    }
}

let app = _angular.module()
app.ng_ctrl('_ctrl', () => {

})

console.log(app)








/*
_angular.ng_ctrl('_ctrl', ($scope) => {
    $scope.value = 45
    $scope.chg = ()=>{
        $scope.value++
    }
})
_angular.ng_ctrl('ctrl', ($scope) => {
    $scope.value = 4
})
*/