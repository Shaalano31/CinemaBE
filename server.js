// INCLUDE DEPENDENCIES
const mongoose = require('mongoose');
//const dotenv = require('dotenv');

// UNCAUGHT EXCEPTIONS
// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   console.log('Uncaught Exception! Shutting down...');
//   process.exit(1);
// });

// CONFIGURE SERVER
//dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 3000;
const DB =  "mongodb+srv://admin:admin@cluster0.5toq8.mongodb.net/Movies?retryWrites=true&w=majority";

// INCLUDE APP
const app = require('./app');

// LISTEN
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// CONNECT TO DB
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// UNHANDLED REJECTIONS
// process.on('unhandledRejection', (err) => {
//   console.log(err.name, err.message);
//   console.log('Unhandled Rejection! Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });