const { JWT_DEV_SECRET = 'dev_my-secret-key' } = process.env;
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_DEV_SECRET,
  PORT,
  MONGO_URL,
};
