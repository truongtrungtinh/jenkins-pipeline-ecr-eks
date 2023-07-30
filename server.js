const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION. SHUTTNG DOWN....');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  // .connect(process.env.LOCAL_DATABASE, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

// const Tourschema = mongoose.model('Tour', Tour);
// const testTour = new Tourschema({
//   name: 'the forest hiker',
//   rating: 4.7,
//   price: 497,
// })
// testTour.save().then(doc => { console.log(doc).catch(err => { console.log('error'.err) }) })

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. SHUTTING DOWN....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
