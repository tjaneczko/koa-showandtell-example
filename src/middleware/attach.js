const User = require('../models/user').Model;

async function user (ctx, next) {
  const { accountId, userId } = ctx.params;
  ctx.state.user = await User.findOne({ accountId, _id: userId });
  if (!ctx.state.user) {
    ctx.throw(404, 'Not Found');
  }
  return next();
}

module.exports = { user } ;