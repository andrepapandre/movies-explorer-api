require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, PATH_TO_DB } = require('./utils/startConfig');

mongoose.connect(PATH_TO_DB)
  .then(() => {
    console.log(`Connected to database on ${PATH_TO_DB}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(requestLogger);
app.use(errorLogger)

app.use((req, res, next) => {
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`your backend listenning on ${PORT}`)
})



