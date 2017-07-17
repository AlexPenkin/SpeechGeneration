var Koa = require('koa');
var Router = require('koa-router');
var app = new Koa();
var router = new Router();
const send = require('koa-send');
const etag = require('koa-etag');

const synthSpeech = require('./speech');
const guidGen = require('./utils/GUIDGenerator');
const removeFile = require('./utils/removeFile');
const createFile = require('./utils/createFile');
const getFileSize = require('./utils/getFileSize');
const editMP3Tags = require('./utils/editMP3Tags');


app
  .use(router.routes())
  .use(etag())
  .use(router.allowedMethods());

router.get('/', async function (ctx, next) {
  const id = guidGen();
  const text = ctx.query.text;
  const voiceId = ctx.query.voice_id;
  const path = `./speech${id}.mp3`;

  try {
    const buf = await synthSpeech(text, voiceId);
    await createFile(path, buf, id);
    const fileSize = await getFileSize(path);
    await editMP3Tags(path, {
      title: 'Speech',
      size: fileSize
    })

    await send(ctx, path, {
      maxage: 1000,
      setHeaders: async (res, path, stats) => {
        res.setHeader('Content-Length', fileSize);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Connection', 'Keep-Alive');
        // res.setHeader('Accept-Ranges', 'bytes 14137-14137/80666');
        res.setHeader('Keep-Alive', 'timeout=5, max=100');
        res.setHeader('Server', 'Apache');
        res.setHeader('Cache-Control', 'public');
      }
    });
    await removeFile(path);
  } catch (e) {
    console.log(e);
    ctx.body = e.message;
  }
});

app.listen(80);