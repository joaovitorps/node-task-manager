import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";

export default class Task {
    #tasks = {}

    async init() {
        try {
            const fileContentBuffered = await fs.readFile('tasks.json');
            this.#tasks = JSON.parse(Buffer.from(fileContentBuffered).toString());
        } catch (error) {
            await this.#persist();
        }
    }

    async fetch(query) {
        let tasksFiltered = this.#tasks['tasks'] ?? [];

        if (query ? query['title'] || query['description'] : false) {
            const queryParams = Object.entries(query);

            tasksFiltered = tasksFiltered.filter(task => {
                return queryParams.some(([key, value]) =>{
                    if (!task[key]) return false;

                    return task[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return tasksFiltered;
    }

    async insert(title, description) {
        const today = new Date();

        const newTask= {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: today,
            updated_at: today,
        }

        if (Array.isArray(this.#tasks['tasks'])) {
            this.#tasks['tasks'].push(newTask);
        } else {
            this.#tasks['tasks'] = [newTask]
        }

        await this.#persist();
    }

    async #persist() {
        await fs.writeFile('tasks.json', JSON.stringify(this.#tasks))
    }
}