module.exports = Middleware

function Middleware(path) {
    this.path = path
    this.methods = []
}