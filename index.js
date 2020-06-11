const fs = require("fs");
var jwt = require("jsonwebtoken");
var privateKey = fs.readFileSync("private.pem");
const now = Date.now();
var token = jwt.sign(
  {
    iss: "ivan",
    sub: "mail@mail.com",
    role: ["a", "b", "c"],
    lastName: "Toreto",
    firsName: "Pepe",
    iat: Math.floor(now / 1000) - 30,
    exp: Math.floor(now / 1000) + 60 * 60,
  },
  privateKey,
  {
    algorithm: "RS256",
  }
);

// verify a token asymmetric
var cert = fs.readFileSync("public.pem"); // get public key
jwt.verify(token, cert, function (err, decoded) {
  if (!err) {
    console.log(decoded.role); // bar
  } else {
    console.log(err);
  }
});

console.log("token", token);
