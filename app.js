const http = require('http')
const express = require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const { redirect } = require('express/lib/response')

const app = express()

const adminRoutes = require('./routes/admin');
const fileRoutes = require('./routes/file');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(fileRoutes);

app.use((req, res, next) => {
    res.setStatus(404).send('<h1> Page not found</h1>');
})

const server = http.createServer(app);
server.listen(3000);
