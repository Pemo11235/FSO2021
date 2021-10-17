const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');
const logignRouter = require('./controllers/login');
const loginRouter = require('./controllers/login');


logger.info('connecting to', config.MONGODB_URL);

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => { logger.info('connected to MongoDB'); })
  .catch((error) => { logger.error('error connecting to MongoDB:', error.message); });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
