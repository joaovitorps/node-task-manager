export default function jsonResponse(
  response,
  data,
  httpCode = 200,
  message = "",
) {
  response.setHeader("Content-type", "application/json");

  const obj = {
    status: httpCode,
    message: message || response.statusMessage,
  };

  if (data) {
    obj.data = data;
  }

  return response.writeHead(httpCode).end(JSON.stringify(obj));
}
