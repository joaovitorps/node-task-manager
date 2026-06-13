import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

interface TaskModel {
  id: string;
  title: string;
  description: string | null;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

type TaskQuery = Partial<Record<"title" | "description", string>>;

export class Task {
  #filePath: string;
  tasks: { tasks: TaskModel[] } = { tasks: [] };

  constructor(filePath: string = "tasks.json") {
    this.#filePath = filePath;
  }

  async init() {
    try {
      const fileContentBuffered = await readFile(this.#filePath);
      this.tasks = JSON.parse(Buffer.from(fileContentBuffered).toString());
    } catch (_) {
      await this.#persist();
    }
  }

  async fetch(query: TaskQuery | null) {
    const tasksFiltered = this.tasks.tasks ?? [];

    if (!query) {
      return tasksFiltered;
    }

    const activeKey = Object.keys(query).find(
      (key) => query[key as keyof TaskQuery] !== undefined,
    ) as keyof TaskQuery | undefined;

    if (!activeKey) {
      return tasksFiltered;
    }

    const rawQueryValue = query[activeKey];

    if (!rawQueryValue) {
      return tasksFiltered;
    }

    return tasksFiltered.filter((task) => {
      const taskActiveKey = task[activeKey as keyof TaskQuery];

      if (!taskActiveKey) {
        return false;
      }

      return taskActiveKey.toLowerCase().includes(rawQueryValue.toLowerCase());
    });
  }

  async insert(title: string, description: string) {
    const today = new Date();

    const newTask: TaskModel = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: today,
      updated_at: today,
    };

    if (Array.isArray(this.tasks.tasks)) {
      this.tasks.tasks.push(newTask);
    } else {
      this.tasks.tasks = [newTask];
    }

    await this.#persist();
  }

  async #persist() {
    await writeFile(this.#filePath, JSON.stringify(this.tasks));
  }
}
