var counter = 0
var socket = require('socket.io-client')();

socket.on('event', function(data){
  switch(data.actionType) {
    case "CLICK_ACTION":
      counter += data.count
      break
      default:
  }

  update()
});


document.getElementById('button').addEventListener('click', function() {
  socket.emit('action', {
    actionType: 'CLICK_ACTION',
    count: 1
  })
})

var countEl = document.getElementById('count')


function update() {
  countEl.innerText = counter
}
