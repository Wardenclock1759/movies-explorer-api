const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { PORT, MONGO_URL } = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.listen(PORT);