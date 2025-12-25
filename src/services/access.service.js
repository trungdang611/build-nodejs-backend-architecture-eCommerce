"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // try {
    // check email exists??
    // dung lean de tra 1 object js thuan, mac dinh tra ve mongoC

    // console.log("tesst:: ", name, email, password);
    const hodelShop = await shopModel.findOne({ email }).lean();
    if (hodelShop) {
      throw new BadRequestError("Error: Shop already registered!");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,

      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      // created private key & publicKey
      console.log("id:: ", newShop._id);
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1", //pkcs8
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      console.log("publicKey, privateKey", { privateKey, publicKey }); // Save Collection keystore

      const { publicKeyString, privateKeyString } =
        await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
      if (!privateKeyString || !publicKeyString) {
        return {
          code: "xxx",
          message: "publicKeyString, privateKeyString error",
        };
      }
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new BadRequestError("Error: KeyStore error");
      }

      // Created token pair
      const tokens = await createTokenPair(
        {
          userId: newShop._id,
          email,
        },
        publicKeyString,
        privateKeyString
      );

      console.log(`Created Token Success:: `, tokens);

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
    // } catch (error) {
    //   return {
    //     code: "xxx",
    //     message: error.message,
    //     status: "error",
    //   };
    // }
  };
}

module.exports = AccessService;
