const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

app.get('/',function(req,res){	
    let element = 'This is the main page';
    res.send(element);
  });
  
//routes
const taskRouter = require('./task/task.route')
app.use('/', taskRouter);

const portConfig = require('./config/port.config');
//database
const db = require('./database/db.js');
db.connect()
  .then(() => {
    console.log('database connected..')
    app.listen(portConfig.PORT, () => {
      console.log('Listening on port: ' + portConfig.PORT);
    });
  });