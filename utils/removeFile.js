const fs = require('fs');

const removeFile = (path) => {
    return new Promise(function (resolve, reject) {
        fs.unlink(path, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve('done');
        })
    });
}

module.exports = removeFile;