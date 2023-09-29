const express = require("express");
const ok = require("./Routes/web");
const dbcon = require("./db/dbcon");
const base = require("./Controller/UserController");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const fileupload = require("express-fileupload");
const cookieparser = require('cookie-parser');
dbcon();
app.use(fileupload({useTempFiles:true}));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret:'admission',saveUninitialized:false,resave:false}));
app.use(cookieparser())
app.use(flash());
app.use("/", ok);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
