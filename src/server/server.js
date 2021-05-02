//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();
require("./passport-setup")(app);

const messages = [
  {
    id: 1,
    to: "Mathilde",
    text: "Hei, hva skjer?",
    time: "15:32",
  },
  {
    id: 2,
    to: "deg",
    text: "Ikke så mye, derda?",
    time: "19:53",
  },
];

app.use(
  session({
    secret: "32bJS7s5k5al",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

app.get("/api/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  const { username } = req.user;
  res.json({ username });
});

//local and google strategy
app.get(
  "/api/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/api/oauth2callback", passport.authenticate("google"), (req, res) => {
  //Successful authentication, redirect profile.
  res.redirect("/profile");
});

app.get("/api/messages", (req, res) => {
  console.log(messages);
  res.json(messages);
});

app.get("/api/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((b) => b.id === id);
  res.json(message);
});

//login with given credentials, local strategy
app.post("/api/loginHard", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
});

//login with google strategy
app.post("/api/login", passport.authenticate("google"), (req, res) => {
  res.status(204).end();
});

app.post("/api/messages", (req, res) => {
  const { to, text, time } = req.body;
  console.log(req.body);
  messages.push({ to, text, time, id: messages.length + 1 });
  res.status(201).end();
});

app.put("/api/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const messageIndex = messages.findIndex((b) => b.id === id);
  const { to, text, time } = req.body;
  messages[messageIndex] = { to, text, time, id };
  res.status(200).end();
});

const server = app.listen(3000, () => {
  console.log(`server started on http://localhost:${server.address().port}/login`);
});
