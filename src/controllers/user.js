const User = require('../models/user').Model;

async function list (ctx) {
  const { accountId } = ctx.params;
  ctx.body = await User.find({ accountId });
}

async function create (ctx) {
  const { accountId } = ctx.params;
  ctx.body = await User.create(Object.assign(ctx.request.body, { accountId }));
  ctx.status = 201;
}

async function get (ctx) {
  ctx.body = ctx.state.user;
}

async function update (ctx) {
  const { accountId } = ctx.params;
  ctx.state.user.set(Object.assign(ctx.request.body, { accountId }));
  ctx.body = await ctx.state.user.save();
}

async function remove (ctx) {
  ctx.body = await ctx.state.user.remove();
  ctx.status = 204;
}

module.exports = { list, get, create, update, remove };