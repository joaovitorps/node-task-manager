import { ValidationError } from "../../../errors/validation-error.js";
import jsonResponse from "../../../response-api.js";

export const createTask = async (req, res, task) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new ValidationError(`Missing "title" or "description"`);
    }

    await task.insert(title, description);
  } catch (error) {
    if (error instanceof ValidationError) {
      return jsonResponse(res, null, error.httpCode, error.message);
    }

    console.error(error);
    return jsonResponse(res, null, 500);
  }

  return jsonResponse(res, null, 201, "Task Created Successfully");
};
