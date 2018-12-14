import EventEmitter from 'events';

class Var extends EventEmitter {
  constructor() {
    super();
    this.value = null;
  }

  get() {
    return this.value;
  }

  set(val) {
    const old = this.value;
    this.value = val;
    this.emit('change', old, this.value);
  }
}

export default Var;
