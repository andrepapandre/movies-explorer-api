require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const INTERNAL_ERROR = require('./middlewares/internalError');

const { PORT, DATABASE_ADRESS } = require('./utils/startConfig');

mongoose.connect(DATABASE_ADRESS)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_ADRESS}`);
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

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(INTERNAL_ERROR);

app.listen(PORT, () => {
  console.log(`your backend listenning on ${PORT}`);
});
