require('http').createServer((req, res) => {
    res.end('opop')
}).listen(100, () => {
    console.log('listening on port 100')
})