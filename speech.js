const AWS = require('aws-sdk');

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

let params = {
    'Text': 'Hi, my name is @anaptfox.',
    'OutputFormat': 'mp3',
    'VoiceId': 'Maxim'
}

const synthSpeech = () => new Promise((resolve, reject) => {
    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
            reject(err);
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                Fs.writeFile("./speech.mp3", data.AudioStream, function (err) {
                    if (err) {
                        console.log(err)
                        reject(err);
                    }
                    console.log("The file was saved!");
                    resolve(data.AudioStream);
                })
            }
        }
    })
});

module.exports = synthSpeech;