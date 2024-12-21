const express = require('express');
require('dotenv').config();
const db = require('./models');
const securityRouter = require('./routes/securityRouter');
const currencyRouter = require('./routes/currencyRouter');

const app = express();

const environment = process.env.NODE_ENV || 'development';

const errorHandler = require('./middleware/errorHandler');

const categoryRoutes = require('./routes/categoryRouter');
const userRoutes = require('./routes/userRouter');
const itemRoutes = require('./routes/itemRouter');
const transactionRoutes = require('./routes/transactionRouter');
const reviewRoutes = require('./routes/reviews');
const deliveryOptionRoutes = require('./routes/deliveryOptionRoutes');
const disputeRoutes = require('./routes/disputeRoutes'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/security-deposits', securityRouter);
app.use('/api/currency', currencyRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/deliveryoptions', deliveryOptionRoutes);
app.use('/api/disputes', disputeRoutes); 
app.get('/', (req, res) => {
  res.json({ message: 'All good!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running in ${environment} on port ${PORT}`);
});
