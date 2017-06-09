const Router = require('koa-router');
const userRouter = require('./user');

const router = new Router();

router.use('/accounts/:accountId/users', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;