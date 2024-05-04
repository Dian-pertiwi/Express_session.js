var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//tambahkan middlelware express-session
var session = require("express-session");
//tambahkan script ini utk memanggil fungsi session.js
var sessionRouter = require("./routes/session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//Tambahkan panggil routes kelas
var kelasRouter = require("./routes/kelas");

var app = express();

app.use(
  session({
    secret: "iniadalahkeyrahasiamu",
    resave: false, // tambahkan opsi resave
    saveUninitialized: true, // tambahkan opsi saveUninitialized
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

//lalu gunakan session.js
app.use("/session", sessionRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//Tambahkan kelasRouter
app.use("/kelas", kelasRouter);

module.exports = app;
