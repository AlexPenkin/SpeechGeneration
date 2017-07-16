const AWS = require('aws-sdk');

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

const synthSpeech = (text, voiceId) => new Promise((resolve, reject) => {
    let params = {
        'Text': text || 'Привет, сейчас проигрывается стандартный текст.',
        'OutputFormat': 'mp3',
        'VoiceId': voiceId || 'Maxim'
    }
    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
            reject(err);
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                resolve(data.AudioStream);
            }
        }
    })
});

module.exports = synthSpeech;