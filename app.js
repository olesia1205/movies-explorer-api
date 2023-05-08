require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use('/', routes);

async function connect() {
  await mongoose.connect(process.env.MONGO_URL, {});
  console.log(`Server connected db ${process.env.MONGO_URL}`);
  await app.listen(process.env.PORT);
  console.log(`Server listen port ${process.env.PORT}`);
}

connect();
