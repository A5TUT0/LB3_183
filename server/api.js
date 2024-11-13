const req = require("express/lib/request");
const { initializeDatabase, queryDB, insertDB } = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

const key = Buffer.from(process.env.KEY, "utf8");
const iv = Buffer.from(process.env.IV, "utf8");
let db;
const secretKey = process.env.SECRET_KEY;
const autheticateToken = (req, res, next) => {
  // console.log(req);
  const token = req.headers["authorization"];
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "ERROR, INVALID TOKEN -_-" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
    if (err)
      return res.status(403).json({ error: "ERRRRRORRR, INVALID TOKEN :(" });
    req.user = user;
    next();
  });
};
const encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
const initializeAPI = async (app) => {
  db = await initializeDatabase();
  app.get("/api/feed", autheticateToken, getFeed);
  app.post("/api/feed", autheticateToken, postTweet);
  app.post("/api/login", login);
};

const getFeed = async (req, res) => {
  const query = req.query.q;
  const tweets = await queryDB(db, query);
  const decryptedTweets = tweets.map((tweet) => ({
    ...tweet,
    text: decrypt(tweet.text),
  }));
  res.json(decryptedTweets);
};

const postTweet = (req, res) => {
  console.log(req.body);
  const { query, text } = req.body;
  if (!query || !text) {
    return res.status(400).json({ error: "You need to text" });
  }
  const encryptedText = encrypt(text);
  const modifiedQuery = query.replace(`'${text}'`, `'${encryptedText}'`);
  console.log(encryptedText);
  console.log(modifiedQuery);

  insertDB(db, modifiedQuery);
  res.json({ status: "ok" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' `;
  const user = await queryDB(db, query);
  // console.log(user);
  const storedHash = user[0].password;
  const userProvidedPassword = password;
  // console.log(userProvidedPassword);
  // console.log(storedHash);
  bcrypt.compare(userProvidedPassword, storedHash, function (err, result) {
    if (err) throw err;
    if (result === true) {
      const token = generateAccessToken({
        id: user[0].id,
        username: user[0].username,
      });
      // console.log(token);
      res.json({
        success: true,
        token,
        username: user[0].username,
      });
    } else {
      return res.json("ERORR :( On validate passwort");
    }
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "1d" });
};

module.exports = { initializeAPI };
