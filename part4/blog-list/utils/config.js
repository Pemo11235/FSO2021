require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URL } = process.env;

module.exports = {
  MONGODB_URL,
  PORT,
};
