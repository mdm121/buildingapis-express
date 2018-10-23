const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./routes');

let app = express();
const frontEnd = path.join(__dirname, "../client");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(frontEnd));
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000);