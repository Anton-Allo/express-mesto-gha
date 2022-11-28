require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

const app = express();

app.use(cors());

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());

app.use(router);

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
