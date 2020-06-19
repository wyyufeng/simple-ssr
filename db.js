const redis = require("redis");
const { promisify } = require("util");
const config = require("./config");
const client = redis.createClient(config.redis);

client.on("error", function (error) {
  console.error(error);
});
/**
 * @type {Promise}
 */
const get = promisify(client.get).bind(client);
/**
 * @type {Promise}
 */
const set = function (key, value, expireTime = 24 * 60 * 60) {
  return new Promise((resolve) => {
    client.set(key, value, () => {
      client.expire(key, expireTime, resolve);
    });
  });
};

module.exports = {
  get,
  set,
};
