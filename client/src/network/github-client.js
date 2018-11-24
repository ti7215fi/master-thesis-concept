const HttpService = require('./http-service');
const fileHandler = require('../core/file-handler');
const path = require('path');

class GitHubClient {

    get repoName() {
        return 'master-thesis-concept';
    }

    get userName() {
        return 'ti7215fi';
    }

    get urlToRepo() {
        return `${this.httpService.url}/repos/${this.userName}/${this.repoName}`;
    }

    constructor() {
        this.httpService = new HttpService('https', 'api.github.com');
    }

    downloadReleaseByTag(tag) {
        return new Promise((resolve, reject) => {
            this.httpService.get(`${this.urlToRepo}/releases/tags/${tag}`, options).then((response) => {
                const assets = response.body.assets;
                if (assets && assets.length === 1 && (new RegExp(/.*\.asar/)).test(assets[0].name)) {
                    const asset = assets[0];
                    const options = {
                        headers: {
                            'Accept': 'application/octet-stream',
                            'User-Agent': 'request module',
                        },
                        encoding: null,
                    }
                    this.httpService.get(asset.url, options, false).then((response) => {
                        const savePath = path.join(__dirname, '../../releases', asset.name);
                        fileHandler.writeFile(savePath, response.body).then(() => {
                            resolve();
                        }, error => reject(error));
                    }, error => reject(error));
                }
                reject('There are no assets with this tag!');
            }, error => reject(error));
        });
    }

}

module.exports = new GitHubClient();