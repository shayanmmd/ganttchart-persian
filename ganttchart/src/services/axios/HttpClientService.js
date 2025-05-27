import axios from 'axios';

export class HttpClientService {

    #instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_SERVER_ADDRESS,
        timeout: 1000,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
        }
    });

    async get(route, body = null, headers = null) {
        const config = {};
        if (headers)
            config = { ...config, headers: headers };

        if (body)
            config = { ...config, data: body };

        try {
            return await this.#instance.get(route, config);
        } catch (error) {
            return error;
        }
    }
}