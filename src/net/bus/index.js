import EventEmitter from 'events';
import Async from '../../async';

class Bus extends EventEmitter {
  constructor() {
    super();
    this.services = {};
  }

  async addService(service) {
    if (!this.services[service.name]) {
      this.services[service.name] = service;
      this.emit('service-added', service);
    } else throw new Error('This service is already added');
  }

  async removeService(name) {
    if (this.services[name]) {
      await this.services[name].destroy();
      delete this.services[name];
      this.emit('service-deleted', name);
    } else throw new Error(`No service ${name} on the bus`);
  }


  async list() {
    return this.services;
  }

  async getByName(name) {
    if (this.services[name]) return this.services[name];
    throw new Error(`No service ${name} on the bus`);
  }

  async waitForService(name) {
    return Async.conditionTask(this, 'once', false, res => res.name === name, 'service-added');
  }

  broadcast(message) {
    Object.values(this.services).forEach((service) => {
      service.emit('broadcast', message);
    });
  }
}

export default Bus;
