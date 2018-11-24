class ServerView {
    constructor(protocol, hostName, port) {
        this.hostName = hostName;
        this.protocol = protocol;
        this.port = port;
    }
}

module.exports = {
    demoServer: new ServerView('http', 'localhost', '3000'),
    liveServer: new ServerView('http', 'localhost', '8080'),
};