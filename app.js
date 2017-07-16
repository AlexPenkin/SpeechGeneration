var Koa = require('koa');
var Router = require('koa-router');
var app = new Koa();
var router = new Router();
const send = require('koa-send');

const synthSpeech = require('./speech');
const guidGen = require('./utils/GUIDGenerator');
const removeFile = require('./utils/removeFile');
const createFile = require('./utils/createFile');

app
  .use(router.routes())
  .use(router.allowedMethods());

  router.get('/', async function (ctx, next) {
    const id = guidGen();
    try {
        const buf = await synthSpeech();
        await createFile(buf, id);
        await send(ctx, `./speech${id}.mp3`);
        await removeFile(`./speech${id}.mp3`);
    } catch (e) {
        console.log(e);
        ctx.body = e.message;
    }        
  });

app.listen(8888);

  