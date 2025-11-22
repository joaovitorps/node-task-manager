import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";

export default class Task {
    #task = {}

    async init() {
        try {
            const fileContentBuffered = await fs.readFile('tasks.json');
            this.#task = JSON.parse(Buffer.from(fileContentBuffered).toString());
        } catch (error) {
            await this.#persist();
        }
    }

    async fetch() {
        return this.#task ?? [];
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

        if (Array.isArray(this.#task['tasks'])) {
            this.#task['tasks'].push(newTask);
        } else {
            this.#task['tasks'] = [newTask]
        }

        await this.#persist();
    }

    async #persist() {
        await fs.writeFile('tasks.json', JSON.stringify(this.#task))
    }
}