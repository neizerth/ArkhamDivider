export class EventEmitter {
  listeners: Map<string, CallableFunction[]>
  constructor() {
    this.listeners = new Map();
  }
  on(type: string, listener: CallableFunction) {
    const listeners = this.listeners.get(type) || [];
    this.listeners.set(type, [
      ...listeners,
      listener
    ]);

    return this;
  }
  off(type?: string, listener?: CallableFunction) {
    if (!type) {
      this.listeners.clear();
      return this;
    }

    const listeners = this.listeners.get(type) || [];

    if (listener) {
      this.listeners.set(type, 
        listeners.filter(l => l!== listener)
      );
      return this;
    }

    this.listeners.delete(type);
    return this;
  }
  emit(type: string, ...args: unknown[]) {
    const listeners = this.listeners.get(type) || [];

    listeners.forEach(listener => listener(...args));
  }
}