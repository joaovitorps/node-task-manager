import http from 'node:http'
import Task from './src/task.js'

const task = new Task();
await task.init();

http.createServer(async (req, res) => {
    res.setHeader('Content-type', 'application/json')

    try {
        const {url, method} = req

        switch (url) {
            case '/tasks':
                switch (method) {
                    case 'GET':
                        return res.writeHead(200).end(JSON.stringify(await task.fetch()));

                    case 'POST':
                        await req.on('data', async (chunk) => {
                            try {
                                const {title, description} = JSON.parse(Buffer.from(chunk).toString());

                                await task.insert(title, description);
                            } catch (error) {
                                console.error(error);
                                res.writeHead(500).end();
                            }
                        })

                        return res.writeHead(201).end(JSON.stringify({status: 201, message: 'Created Successfully'}));

                    default:
                        res.writeHead(405).end();
                }
                break;
            default:
                res.writeHead(404).end();
        }
    } catch (error) {
        console.error(error);
        res.writeHead(500).end();
    }
}).listen('8000')
