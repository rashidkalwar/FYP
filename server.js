const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const config = require('./config/keys');

const app = express();

app.use(morgan('combined'));

connectDB();

app.get('/', (req, res) => res.send('Hello World!'));

const port = config.port;

app.listen(port, () => console.log(`Server running on port ${port}`));
