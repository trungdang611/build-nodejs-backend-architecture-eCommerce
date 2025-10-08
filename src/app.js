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

// init db
// require("./dbs/init.mongodb");
// const { countConnect, checkOverLoad } = require("./helpers/check.connect");

// countConnect();
// checkOverLoad();

// init routes
app.use("", require("./routes"));

// handling error

module.exports = app;
