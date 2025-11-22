import http from 'node:http'
import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

let tasks = {};
http.createServer(async (req, res) => {
    res.setHeader('Content-type', 'application/json')

    if (req.method === 'POST') {
        await req.on('data', async (chunk) => {
            const {title, description} = JSON.parse(Buffer.from(chunk).toString());
            const today = new Date();

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: today,
                updated_at: today,
            }

            if (Array.isArray(tasks['tasks'])) {
                tasks['tasks'].push(task);
            } else {
                tasks['tasks'] = [task]
            }

            await fs.writeFile('tasks.json', JSON.stringify(tasks))
        })

        return res.writeHead(201).end(JSON.stringify({status: 201, message: 'Created Successfully'}));
    }

    return res.writeHead(200).end(JSON.stringify({status: 200, message: 'OK'}));
}).listen('8000')