require('dotenv').config();

const express = require('express');
const Mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server)


io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
})

const port = 3333;

const URL = `mongodb://${process.env.USERS}:${process.env.PASSWORD}@localhost:27017/dev`
Mongoose
  .connect(URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
      if (!error) {
        return console.log('connection')
      }
      return console.log('error')
    })

app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  return next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

server.listen(port, () => console.log(`Listening on ${port}  ${URL}`));
