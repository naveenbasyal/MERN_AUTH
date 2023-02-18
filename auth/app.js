const express = require("express");
const app = express();
const cors = require("cors");
const collection = require("./mongo");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
