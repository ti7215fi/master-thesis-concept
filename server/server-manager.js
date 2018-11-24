class Server {
    constructor(id, url, name, archiveName) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.archiveName = archiveName;
    }
}

class ServerManager {
    constructor() {}

    get servers() {
        return [
            new Server(0, 'http://127.0.0.1:3000', 'Demo-Server', 'demo-server'),
            new Server(1, 'http://127.0.0.1:8080', 'Live-Server', 'live-server')
        ];
    }
}

module.exports = new ServerManager();