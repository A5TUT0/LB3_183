const req = require("express/lib/request");
const { initializeDatabase, queryDB, insertDB } = require("./database");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let db;
const secretKey = process.env.SECRET_KEY;
const autheticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ error: "ERROR, INVALID TOKEN -_-" });
  jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
    if (err)
      return res.status(403).json({ error: "ERRRRRORRR, INVALID TOKEN :(" });
    req.user = user;
    next();
  });
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
  res.json(tweets);
};

const postTweet = (req, res) => {
  const { query } = req.body;
  if (!query)
    return res
      .status(400)
      .json({ error: "ERRRRRRORRR -_- YOU NEED TO PUT TEXT ON TH INPUT :0" });

  insertDB(db, req.body.query);
  res.json({ status: "ok" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const user = await queryDB(db, query);

  if (user.length === 1) {
    const token = generateAccessToken({
      id: user[0].id,
      username: user[0].username,
    });
    console.log(token);
    res.json({
      success: true,
      token,
      username: user[0].username,
    });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "1d" });
};

module.exports = { initializeAPI };
