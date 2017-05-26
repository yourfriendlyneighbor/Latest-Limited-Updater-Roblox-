const express = require('express'), app = express(), http = require('http').Server(app), io = require('socket.io')(http), fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/airhorn.mp3', express.static('airhorn.mp3'))

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  fs.readFile('newhat.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
    io.emit('new limited update', data)
  });
  fs.watchFile('newhat.txt', (curr, prev) => {
    fs.readFile('newhat.txt', 'utf-8', (err, data) => {
      if(err) throw err;
      console.log(data);
      io.emit('new limited update', data)
    });
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000.. Instructions: Type this into your browser: http://localhost:4000/');
});
