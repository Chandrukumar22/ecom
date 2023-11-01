const express = require("express");
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config();
const cors = require('cors')
const db = require('./db');
const authRouter = require("./src/routes/authRoute")
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
var useragent = require('express-useragent');
const app = express();
const PORT = process.env.PORT || 4000
app.use(bodyParser.json())
app.use(cors());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{ 
flags: 'a' })

//global log stream
app.use(morgan('combined'))

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(useragent.express());

app.use("/api/user",authRouter);
app.listen(PORT,()=>{
    console.log(`server is runing at PORT ${PORT}`);
})
