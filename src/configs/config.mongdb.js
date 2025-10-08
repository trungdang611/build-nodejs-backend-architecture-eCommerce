"use strict";

// level 1
const dev = {
  app: {
    port: 3000,
  },
  db: {
    name: process.env.DEV_DB_NAME,
    password: process.env.DEV_DB_PASSWORD,
  },
};

const product = {
  app: {
    port: 3000,
  },
  db: {
    name: process.env.PRODUCT_DB_NAME,
    password: process.env.PRODUCT_DB_PASSWORD,
  },
};

const config = { dev, product };

const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
