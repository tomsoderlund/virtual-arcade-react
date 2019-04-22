//
// Name:    socketServer.js
// Purpose:
// Creator: Tom Söderlund
//

// Private functions

// Public API
module.exports = {

  connection: function (io, socket) {
    console.log('user connected', socket.id)

    socket.on('disconnect', function () {
      console.log('user disconnected', socket.id)
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
