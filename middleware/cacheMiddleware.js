const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (req, res, next) => {
  const { username } = req.user;
  
  // Check if user session is cached
  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      // User session is cached, retrieve data
      console.log('Cache hit');
      req.user = JSON.parse(data);
      next();
    } else {
      // User session is not cached, proceed with request
      console.log('Cache miss');
      next();
    }
  });
};

module.exports = cacheMiddleware;
