const fs = require('fs');

const createFile = (buffer, id) => {
    return new Promise(function (resolve, reject) {
        fs.writeFile(`./speech${id}.mp3`, buffer, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve('created');

        });
    })
}

module.exports = createFile;