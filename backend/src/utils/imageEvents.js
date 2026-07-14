let io;

exports.setIo = (socketServer) => { io = socketServer; };
exports.emitImageChange = (event, payload) => io?.emit(event, payload);
