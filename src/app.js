require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// init middlewares
app.use(morgan("dev")); // danh cho moi truong dev
// app.use(morgan("combined")); //danh cho moi truong production
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));

// Chặn truy cập từ câu lệnh curl --include
app.use(helmet());

// Giảm băng thông khi tải dữ liệu từ payload
app.use(compression());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./dbs/init.mongodb");
// const { countConnect, checkOverLoad } = require("./helpers/check.connect");

// countConnect();
// checkOverLoad();

// init routes
app.use("", require("./routes"));

// handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
