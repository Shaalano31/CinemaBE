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
const DB =  "mongodb://Roaa:KFtZKzTmzKG3vKj@cluster0-shard-00-00.5toq8.mongodb.net:27017,cluster0-shard-00-01.5toq8.mongodb.net:27017,cluster0-shard-00-02.5toq8.mongodb.net:27017/Movies?ssl=true&replicaSet=atlas-1168da-shard-0&authSource=admin&retryWrites=true&w=majority";
// INCLUDE APP
const app = require('./app');

// LISTEN
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// CONNECT TO DB
mongoose
  .connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connection successful!'));

// UNHANDLED REJECTIONS
// process.on('unhandledRejection', (err) => {
//   console.log(err.name, err.message);
//   console.log('Unhandled Rejection! Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });