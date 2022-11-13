const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { BAD_REQUEST, SERVER_ERROR } = require("./utils/errors");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "63713473b39ed1106ec467fd",
  };

  next();
});

app.use(routes);

app.use("*", (err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({ message: "Переданы некорректные данные" });
  } else if (err.name === "ValidationError") {
    res.status(BAD_REQUEST).send({
      message: `${Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")}`,
    });
  } else {
    const { statusCode = SERVER_ERROR, message } = err;
    res
      .status(statusCode)
      .send({
        message:
          statusCode === SERVER_ERROR ? "На сервере произошла ошибка" : message,
      });
  }
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/mydb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
