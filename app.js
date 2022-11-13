const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");

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

// app.use("*", (req, res) => {
//   res.status(404).send({ message: "страницы не существует" });
// });
app.use("*", (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

mongoose.connect("mongodb://127.0.0.1:27017/mydb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
