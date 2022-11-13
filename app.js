const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const http2 = require("http2");

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

app.use("*", (req, res) => {
  res
    .status(http2.HTTP_STATUS_NOT_FOUND)
    .send({ message: "страницы не существует" });
});

mongoose.connect("mongodb://127.0.0.1:27017/mydb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
