const express = require('express');
const server = express();
const asar = require('asar');
const compareVersions = require('compare-versions');
const bodyParser = require('body-parser');

server.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 8080;

function getPackageJson() {
    // get content from package.json
    const extractedFile = asar.extractFile('app.asar', 'package.json');
    // parse content as json
    return JSON.parse(extractedFile);
}

function getFileName() {
    const packageJson = getPackageJson();
    // get value from name key
    const appName = packageJson.name;
    // get value from version key
    const appVersion = packageJson.version;
    // create postfix
    const postFix = appVersion.replace(/\./g, "");

    return `${appName}_${postFix}.asar`;
}

server.get('/client-app/version', (req, res) => {
    try {
        const packageJson = getPackageJson();
        // get value from version key
        const appVersion = packageJson.version;
        // send version number as response
        res.status(200).send(appVersion);
    } catch (error) {
        // send status 500 if an error occured
        res.status(500).send(error);
    }
});

server.post('/client-app/update-available', (req, res) => {
    try {
        const packageJson = getPackageJson();
        // get value from version key
        const appVersion = packageJson.version;
        // get version number from request body
        const clientAppVersion = req.body.version;
        // check if online version is greater than client version
        const clientHasOlderVersion = compareVersions(appVersion, clientAppVersion) === 1;

        return res.status(200).send(clientHasOlderVersion);
    } catch (error) {
        // send status 500 if an error occured
        res.status(500).send(error);
    }
});

server.get('/client-app/download', (req, res) => {
    try {
        const fileName = getFileName();
        res.download('app.asar', fileName, (error) => {
            if (error) {
                // define status 550 if response is partially-sent
                const statusCorruptedDownload = 550;
                // check if response is partially-sent
                const status = res.headersSent ? statusCorruptedDownload : 500;
                // send status code if an error occured
                res.status(status).send(error);
            }
        });
    } catch (error) {
        // send status 500 if an error occured
        res.status(500).send(error);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});