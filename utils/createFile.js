const fs = require('fs');

const createFile = (path, buffer, id) => {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, buffer, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve('created');

        });
    })
}

module.exports = createFile;