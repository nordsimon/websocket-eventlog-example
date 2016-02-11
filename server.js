var fs = require('fs')
var levelup = require('levelup')
var db = levelup('./eventlog')

var server = require('http').createServer(function(req,res) {
  if(req.url === '/script.js') {
    fs.createReadStream('client.js').pipe(res)
  } else {
    fs.createReadStream('index.html').pipe(res)
  }
})

var io = require('socket.io')(server);

db.on('put', function(key, value) {
  io.emit('event', JSON.parse(value))
})

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});

  // Send complete eventlog to connected clients
  db.createReadStream().on('data', function(data) {
    socket.emit('event', JSON.parse(data.value))
  })

  socket.on('action', function(data) {
    db.put([+new Date(), data.actionType].join('!'), JSON.stringify(data))
  })
});

server.listen(8000)
