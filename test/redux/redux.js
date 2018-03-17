/**
 * Author: Chidume Nnamdi
 */

/**
 * window.state = {
 *  articles = [],
 *  isAuth = false
 * }
 */

//window.state = {}
//window.reducers = {}
let reducers = {}
let reducers_state = {}

/**
 * 
 */
function getState() {

}

/**
 * type: "", payload
 * { type: 'LOAD_ARTICLES', article: {} }
 * @param {*} action 
 */
function dispatch(action) {
    console.log(action)
    for (var key in reducers) {
        var element = reducers[key];

        //console.log(key)
        //console.log(element.red)

        let state = element.red(undefined, action)
        console.log('displayin state...')
        console.log(state)

        //key({}, action)
        //element({}, action)
    }
}

/**
 * 
 * @param {*} subscriber 
 */
function subscribe(subscriber) {

}

/**
 * 
 * @param {*} _r 
 */
function initializeState(_r) {
    let INIT_STATE = undefined

}

/**
 * 
 * @param {*} fn 
 */
function createStore(fn) {
    //console.log(fn)
    //reducers.fn = fn
    //console.log(reducers)
    for (var key in fn) {
        let reducer = fn[key]
        initializeState(reducer)
    }
}

/**
 * 
 * @param {*} reducers 
 */
function combineReducers(_reducers) {
    reducers = _reducers
    return reducers
}


/** index.html */
const initialState = {
    articles: [],
    article: {}
}

function red(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_ARTICLES':
            return {
                state,
                articles: action.articles
            }
        default:
            return state
    }
}

let _reducer = combineReducers({ red })
let store = createStore(_reducer)
dispatch({ type: '_LOAD_ARTICLES', article: {} })























/*
window._state = {
    'date': 90,
    'subscribers': [],
    'subscribe': function(fn) {
        this.subscribers.push(fn)
    }
}

function getState() {
    return _state.date
}

function mut(s) {
    window._state.date = s
    console.log(window._state.date)
    //window._state.subscribers.forEach((e) => {e()});
}

window._state.subscribe(() => {
    document.getElementById('d').innerHTML = getState()
})
document.getElementById('d').innerHTML = getState()
console.log(window._state.date)
*/