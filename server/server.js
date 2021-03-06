const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth-routes');
const WRRouter = require('./routes/waitingRoom-routes');
const passportSetup = require('../config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('../config/keys');
const passport = require('passport');
const PORT = 3000;
const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);

console.log('in da server');

// serving index.html upon every GET request
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

//initialize sockets
// const http = require('http');
// const socket = require('socket.io');
// const server = http.createServer(app);
// const io = socket(server);

app.use(cors());

const users = {}; 

io.on('connection', socket => {
  if(!users[socket.id]) {
    users[socket.id] = socket.id; 
  }

  socket.emit("yourID", socket.id); 
  io.sockets.emit('allUsers', users); 



   socket.on('textcode', (textdata) => {
        io.sockets.emit('textcode', textdata)
    })

  socket.on('disconnect', () => {
    console.log('user has disconnected:', socket.id);
      delete users[socket.id]; 
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('hey', {signal: data.signalData, from:data.from}); 
  })

  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted',data.signal); 
  })
  
});

// body parser
app.use(bodyParser.json());

// cookie-session set-up
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// defining route handler to authRouter for OAuth
app.use('/auth', authRouter);

// defining route handler to WRRouter for OAuth
app.use('/waiting-room', WRRouter);

// defining route handler to apiRouter
app.use('/api', apiRouter);

// route for a specific room

app.get('/:room', (req, res) => {
  res.render('room', { roomID: req.params.room });
});

//Start server
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
<<<<<<< HEAD
=======


>>>>>>> 5dad6064cc5c3781a441b36e2cbba74e150030fc
