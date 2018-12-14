import EventEmitter from 'events';

class UniSocket extends EventEmitter {
  send(data) {
    this.emit('send', data);
  }

  receive(data) {
    this.emit('receive', data);
  }

  close() {
    this.emit('close');
  }

  static createVirtSocketPair() {
    const sock1 = new UniSocket();
    const sock2 = new UniSocket();
    sock1.on('send', sock2.receive);
    sock2.on('send', sock1.receive);
    sock1.on('close', sock2.close);
    sock2.on('close', sock1.close);
    return [sock1, sock2];
  }

  static pairWithVirtSocket(socket) {
    const sockv = new UniSocket();
    sockv.on('send', socket.receive);
    socket.on('send', sockv.receive);
    sockv.on('close', socket.close);
    socket.on('close', sockv.close);
    return sockv;
  }
}

export default UniSocket;
