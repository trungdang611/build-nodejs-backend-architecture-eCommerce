"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async () => {
    try {
      // check email exists??
      // dung lean de tra 1 object js thuan, mac dinh tra ve mongoC
      const hodelShop = await shopModel.findOne({ email }).lean();
      if (hodelShop) {
        return {
          code: "xxx",
          message: "Shop already registeresed",
        };
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulesLength: 4096,
        });

        console.log({ privateKey, publicKey }); // Save Collection keystore
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}
