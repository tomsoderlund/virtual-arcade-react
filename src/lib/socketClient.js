/**
 * socketClient module
 * @description This is...
 * @module socketClient
 * @author Tom Söderlund
 */

const socketDummy = {
  on: () => {},
  emit: () => {}
}

const socket = window.io ? window.io() : socketDummy
socket.on('chat message', function (msg) {
  console.log('chat message: ' + msg)
})

export default socket
