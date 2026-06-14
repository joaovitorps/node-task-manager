import { createReadStream, existsSync } from "node:fs";
import { parse } from "csv-parse";
import type { CreateTask } from "../http/controllers/tasks/create";

const args = process.argv.slice(2);

const filePath = args[0]!;

if (!existsSync(filePath)) {
  console.error("file not found.");
  process.exit(1);
}

const fetchCreateTask = async (body: CreateTask) => {
  const response = await fetch("http://localhost:8080/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  console.log(data);
};

const parser = createReadStream(filePath).pipe(parse());

(async () => {
  let count = 0;
  // Report start
  process.stdout.write("start\n");
  // Iterate through each records
  for await (const record of parser) {
    if (count === 0) {
      count++;
      continue;
    }
    // Report current line
    process.stdout.write(`${count++} ${record.join(" | ")}\n`);
    // Fake asynchronous operation
    try {
      await fetchCreateTask({ title: record[0], description: record[1] });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Report end
  process.stdout.write("...done\n");
})();
