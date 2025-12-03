export default function jsonResponse(response, data, httpCode = 200, message = '') {
    response.setHeader('Content-type', 'application/json')

    return response.writeHead(httpCode).end(JSON.stringify({
        status: httpCode,
        message: message || response.statusMessage,
        data
    }));
}