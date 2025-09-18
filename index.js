import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import engine from "ejs-mate";
import { fileURLToPath } from "url";
import indexRouter from "./src/routes/indexRoutes.js";

const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'rahasia-anda',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// set up view
app.set('view engine', 'ejs');
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRouter);

const connection ='mongodb://localhost:27017/myhabit';
mongoose.connect(connection).then((result) => app.listen(port))
.then(console.log(`server start on port ${port}`))
.catch((err) => console.log(err));