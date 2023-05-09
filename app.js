require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./errors/CentralErrorHandler');

const app = express();

app.use(cors());

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

async function connect() {
  await mongoose.connect(process.env.MONGO_URL, {});
  // console.log(`Server connected db ${process.env.MONGO_URL}`);
  await app.listen(process.env.PORT);
  // console.log(`Server listen port ${process.env.PORT}`);
}

connect();
