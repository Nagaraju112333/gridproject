var jwt = require("jsonwebtoken");
var app = require("../loaders/express");

async function generateToken(id,firstName, role) {
  try {
    // console.log(username,"username", role, "role", id, "id")
    var token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + parseInt(360000),
        id: id,
        firstName: firstName,
        role: role,
      },
      app.get("secret") || 'default-secret-key'
    );
    return token;
  } catch (err) {
    return err;
  }
}

module.exports = generateToken;