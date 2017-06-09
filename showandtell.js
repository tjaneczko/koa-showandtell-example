const redis = 'foo';
const userModel = 'bar';

function getUserCb (id, callback) {
  redis.get(`user.${id}`, (err, data) => {
    if (err) {
      return callback(err);
    }
    if (data) {
      return callback(data);
    }
    userModel.find({ _id: id }, (err, user) => {
      if (err || !user) {
        return callback(err);
      }
      redis.set(`user.${id}`, user, (err) => {
        if (err) {
          return callback(err);
        }
        callback(null, user);
      });
    });
  });
}

function getUserPromise (id) {
  return redis.get(`user.${id}`)
    .then(data => {
      if (data) {
        return data;
      }
      return userModel.find({ _id: id })
        .then(user => {
          if (!user) {
            return user;
          }
          return redis.set(`user.${id}`, user)
            .then(() => user);
        });
    });
}

async function getUserAsync (id) {
  let data = await redis.get(`user.${id}`);
  if (!data) {
    data = await userModel.find({ _id: id });
    if (data) {
      await redis.set(`user.${id}`, data);
    }
  }
  return data;
}

const app = 'abc';

app.use(async (ctx, next) => {
  const data = await redis.get(ctx.path);
  if (data) {
    ctx.body = data;
    return;
  }
  await next();
  if (ctx.body) {
    await redis.set(ctx.path, ctx.body);
  }
});

module.exports = { getUserCb, getUserPromise, getUserAsync }