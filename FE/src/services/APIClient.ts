import { fetchAPI } from "./fetch";

const headers = {'Content-Type': 'application/json'}

export class APIClient {
    #url: string;

    constructor(url: string) {
        this.#url = url
    }

    public get(query = "") {
        return fetchAPI(this.#url + query, {
            method: 'GET',
            headers: headers,
        })
    }

    public post<T>(body: T, query = "") {
        return fetchAPI(this.#url + query, {
            method: "POST",
            headers: headers,
            body: body ? JSON.stringify(body) : null
        })
    }

    public delete(id: string) {
        return fetchAPI(`${this.#url}/${id}`, {
            method: "DELETE",
            headers: headers,
        })
    }
}