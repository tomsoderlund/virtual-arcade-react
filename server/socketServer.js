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
      console.log('user disconnected', arguments)
    })

    const bounceBackMessage = (eventName, obj) => {
      console.log(eventName, obj)
      io.emit(eventName, obj)
    }

    const eventNames = ['join', 'leave', 'move', 'button']
    for (let e in eventNames) {
      socket.on(eventNames[e], bounceBackMessage.bind(undefined, eventNames[e]))
    }
  }

}
