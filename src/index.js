const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaBunyanLogger = require('koa-bunyan-logger');
const router = require('./routes');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = new Koa();

app.use(koaBunyanLogger());
app.use(koaBunyanLogger.requestLogger());
app.use(koaBodyParser());

app.use(router.routes(), router.allowedMethods());

mongoose.connect('mongodb://localhost:27017/showandtell')
  .then(() => {
    app.listen(3000);
  });
