"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Apikey";
const COLECCTION_NAME = "Apikeys";

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "30d",
    },
  },
  {
    timestamps: true,
    collection: COLECCTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, apiKeySchema);
