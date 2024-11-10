const req = require("express/lib/request");
const { initializeDatabase, queryDB, insertDB } = require("./database");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let db;
const secretKey = process.env.SECRET_KEY;
const generateAccessToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "1d" });
};

const initializeAPI = async (app) => {
  db = await initializeDatabase();
  app.get("/api/feed", getFeed);
  app.post("/api/feed", postTweet);
  app.post("/api/login", login);
};

const getFeed = async (req, res) => {
  const query = req.query.q;
  const tweets = await queryDB(db, query);
  res.json(tweets);
};

const postTweet = (req, res) => {
  insertDB(db, req.body.query);
  res.json({ status: "ok" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const user = await queryDB(db, query);
  if (user.length === 1) {
    const token = generateAccessToken({ username: req.body.username });
    console.log(token);
    res.json(token);
  } else {
    res.json(null);
  }
};

module.exports = { initializeAPI };
