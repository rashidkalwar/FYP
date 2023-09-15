const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const config = require('./config/keys');

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/user', userRoutes);

connectDB();

app.get('/', (req, res) => res.send('Back-end REST API is Working!'));

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
