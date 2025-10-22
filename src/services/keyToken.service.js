"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      // const privateKeyString = Buffer.from(privateKey, "base64").toString();
      // const publicKeyString = Buffer.from(publicKey, "base64").toString();

      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKey,
        privateKey: privateKey,
      });

      return tokens
        ? {
            publicKeyString: tokens.publicKey,
            privateKeyString: tokens.privateKey,
          }
        : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
