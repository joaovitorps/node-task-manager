import jsonResponse from "./response-api.js";
import verifyUrl from "./verify-url.js";

const routes = [
    {
        url: verifyUrl('/tasks'),
        method: 'GET',
        function: async (req, res, middleware, task) => {
            const {query} = req;

            return jsonResponse(res, await task.fetch(Object.keys(query).length !== 0 ? query : null));
        }
    },
    {
        url: verifyUrl('/tasks'),
        method: 'POST',
        function: async (req, res, middleware, task) => {
            await req.on('data', async (chunk) => {
                try {
                    const {title, description} = JSON.parse(Buffer.from(chunk).toString());

                    await task.insert(title, description);
                } catch (error) {
                    console.error(error);
                    jsonResponse(res, {}, 500);
                }
            })

            return jsonResponse(res, {}, 201, 'Task Created Successfully');
        }
    }
]

export default routes