import EventEmitter from 'events';
import Async from '../../async';

class BusTransport extends EventEmitter {
  constructor(bus, socket, name) {
    super();
    this.bus = bus;
    this.name = name;
    this.socket = socket;
    this.on('broadcast', (message) => {
      this.socket.send(message);
    });
    this.bus.addService(this);
  }

  async destroy() {
    this.socket.send('destroy');
    await Async.conditionTask(this.socket, 'once', false, res => res === 'destroyed', 'received');
  }
}

export default BusTransport;
