const HttpService = require('./http-service');

class ArchiveDownloader {

    get gitHubToken() {
        return '';
    }

    get userName() {
        return 'ti7215fi';
    }

    get repoName() {
        return '';
    }

    constructor() {
        this.httpService = new HttpService('https', `${this.gitHubToken}:@api.github.com/repos/${this.userName}/${this.repoName}`);
    }

    download(version) {
        const url = `${this.httpService.host}/releases/assets/${version}.asar`;
        const options = {
            headers: {
                'Accept': 'application/octet-stream',
                'User-Agent': 'request module',
            },
            encoding: null,
        }
        this.httpService.get(url, options, false).then((response) => {
            if (response.httpResponse.statusCode === 200) {
                console.log(response.body);
            }
        }, (error) => {
            console.error(error);
        });
    }

}

module.exports = ArchiveDownloader;