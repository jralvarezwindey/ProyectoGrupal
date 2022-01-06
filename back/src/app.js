const express = require('express');
const app = express();

// Configuration.
app.name = 'SERVER';
app.set('port', process.env.PORT || 3001);

// Middlewares.
require('./middlewares')(app);

// Routes middleware.
// const recipes = require('./routes/recipes');
// const diets = require('./routes/diets');
// app.use('/recipes', recipes);
// app.use('/diets', diets);

// Error catching endware.
app.use((error, req, res, next) => { 
  const status = error.status || 500;
  const message = error.message || error;
  console.error(error);
  res.status(status).send(message);
});

module.exports = app;