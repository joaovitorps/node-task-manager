import http from 'node:http'

http.createServer((req, res) => {
    res.setHeader('Content-type','application/json')

    return res.writeHead(200).end(JSON.stringify({status: 200, message: 'OK'}));
}).listen('8000')