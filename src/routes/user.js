const Router = require('koa-router');
const controller = require('../controllers/user');
const attach = require('../middleware/attach');

const resourceRouter = new Router();

resourceRouter.get('/', controller.get);
resourceRouter.put('/', controller.update);
resourceRouter.del('/', controller.remove);

const collectionRouter = new Router();

collectionRouter.get('/', controller.list);
collectionRouter.post('/', controller.create);
collectionRouter.use('/:userId', attach.user, resourceRouter.routes(), resourceRouter.allowedMethods());

module.exports = collectionRouter;