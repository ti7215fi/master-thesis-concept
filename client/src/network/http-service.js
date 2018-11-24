const request = require('request');

class HttpService {

    get url() {
        const port = this.port ? `:${this.port}` : '';
        return `${this.protocol}://${this.host}${port}`;
    }

    constructor(protocol, host, port = null) {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
    }

    get(path, options = {}, parseAsJson = true) {
        return new Promise((resolve, reject) => {
            request.get(`${this.url}/${path}`, options, (error, httpResponse, body) => {
                if(!error) {
                    resolve({
                        httpResponse: httpResponse,
                        body: parseAsJson ? JSON.parse(body) : body,
                    });
                }
                reject(error);
            });
        });
    }

    post(path, data) {
        return new Promise((resolve, reject) => {
            request.post(`${this.url}/${path}`, data, (error, httpResponse, body) => {
                if(!error) {
                    resolve({
                        httpResponse: httpResponse,
                        body: JSON.parse(body),
                    }); 
                }
                reject(error);
            });
        });
    }
}

module.exports = HttpService;