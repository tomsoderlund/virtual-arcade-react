//
// Name:    socketServer.js
// Purpose:
// Creator: Tom Söderlund
//

// Private functions

// Public API
module.exports = {

  connection: function (io, socket) {
    console.log('Socket.io: a user connected', socket.id)

    socket.on('disconnect', function () {
      console.log('user disconnected')
    })

    socket.on('chat message', function (msg) {
      console.log('chat message: ' + msg)
      io.emit('chat message', 'Reply: ' + msg)
    })

    socket.on('position', function (msg) {
      // console.log('position: ' + msg);
      io.emit('position', msg)
    })
  }

}
