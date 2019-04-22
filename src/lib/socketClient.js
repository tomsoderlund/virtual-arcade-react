/**
 * socketClient module
 * @description This is...
 * @module socketClient
 * @author Tom Söderlund
 */

let dummyEventHandlers = {}

const socketDummy = {
  on: (type, func) => { dummyEventHandlers[type] = func; console.log({ dummyEventHandlers }) },
  emit: (type, obj) => { dummyEventHandlers[type] && dummyEventHandlers[type](obj) }
}

const socket = window.io ? window.io() : socketDummy

export default socket
