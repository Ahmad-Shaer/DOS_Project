const express = require('express')
const app = express()

const routers = require('./routes/Frontend/frontend.js')

app.use("/", routers);

app.listen(8000);