import { app } from "./app";
import { Task } from "./model/task";

const task = new Task();
await task.init();

const server = app(task);

server.listen(8080, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:8080/`);
});
