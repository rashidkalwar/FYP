const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const datasetRoutes = require('./routes/datasetRoutes');
const visualizationRoutes = require('./routes/visualizationRoutes');
const chartRoutes = require('./routes/chartRoutes');
const connectDB = require('./config/db');
const config = require('./config/keys');

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

// app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// static folder
app.use(express.static(path.join(__dirname, 'public/assets')));

// routes
app.use('/api/user', userRoutes);
app.use('/api/dataset', datasetRoutes);
app.use('/api/visualization', visualizationRoutes);
app.use('/api/charts', chartRoutes);

// mongoose database setup
connectDB();

app.get('/', (req, res) => res.send('Back-end REST API is Working!'));

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
