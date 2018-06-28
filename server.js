// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = (process.env.PORT || 8000);

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  
  // Make sure you add the database name and not the collection name
  // db = database.db("heroku_zldd2c3x");
  require('./app/routes')(app, database.db("heroku_zldd2c3x"));
  
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})