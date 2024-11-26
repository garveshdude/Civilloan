require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const memberRoutes = require('./routes/memberRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use(serviceRoutes);
app.use(requestRoutes);
app.use(memberRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
