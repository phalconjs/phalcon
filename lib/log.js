const Interface = require('./interface')

class Log {

    /**
     * 
     * @param {Object} options 
     */
    constructor(options) {}

    execute(server, opts) {
        this.options = opts || {}
        server.use(this.log)
    }

    log() {
        let date = new Date()
        console.log(`[Logger]-[${date.getDate()} ${date.getTime()} ] ${arguments[0].method} ${arguments[0].url}`)
    }
}
module.exports = Log

/* 
app.register('./log.js')
app.register(require('log'))
app.register(require('log'),{
    route: 'goat'
})
new Log(
    {
        format: 'combined'
    })
    new  Log('combined')
    new Log([':method :url :status'])

    :date - current date and time
    :http-version - http version of req
    :method - method of request
    :referrer
    :remote-user
    :remote-addr
    :req[header]
    :res[header]
    :url
    :user-agent
    :status
    :response-time[digits]
*/