const fs = require('fs');

class FileHandler {

    writeFile(path, data, options = null) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, options, (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }

}

module.exports = new FileHandler();