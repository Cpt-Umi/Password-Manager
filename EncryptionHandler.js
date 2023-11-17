// We Don't give a shit about encryption right now
const crypto = require("crypto");
// This should be in an env
const SECRET = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const encrypt = (password) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(SECRET), iv);
  const encryptedPassword = Buffer.concat([
    cipher.update(password, "utf-8"),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"), // consistent property name
  };
};

const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(SECRET),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")), // consistent property name
    decipher.final(),
  ]);

  return decryptedPassword.toString("utf-8");
};

module.exports = { encrypt, decrypt };
