export default class Middleware {
    #request = null;

    constructor(request) {
        this.#request = request

        const myUrl = new URL(request.url, `https://${request.headers.host}`)

        request.query = myUrl.searchParams.entries().reduce((objParams, params) => {
            const [key, value] = params
            objParams[key] = value

            return objParams
        }, {})
    }
}