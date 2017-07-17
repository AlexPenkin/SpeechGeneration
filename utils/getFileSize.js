const fs = require('fs');

const getFileSize = (filePath) => {
    return new Promise(function (resolve, reject) {
        var stats = fs.statSync(filePath);
        var size = stats["size"];
        resolve(size);
    });
}

module.exports = getFileSize;