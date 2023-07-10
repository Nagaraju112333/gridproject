var jwt = require("jsonwebtoken");
var app = require("../loaders/express");

async function generateToken(id,role, email) {
  try {
    // console.log(username,"username", role, "role", id, "id")
    var token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + parseInt(360000),
        id: id,
        role:role,
        email:email,
      },
      app.get("secret") || 'default-secret-key'
    );
    return token;
  } catch (err) {
    return err;
  }
}

module.exports = generateToken;