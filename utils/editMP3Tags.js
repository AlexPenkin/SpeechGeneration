const nodeID3 = require('node-id3');

const editTags = (filePath, tags) => {
    return new Promise(function (resolve, reject) {
       resolve(nodeID3.write(tags, filePath));
    });
};

module.exports = editTags;