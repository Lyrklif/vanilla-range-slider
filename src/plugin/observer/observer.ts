type TSubscribeFn = (value: any) => void;

type TSubscribe = {
  name: string;
  fn: TSubscribeFn;
};

class Observer {
  #subscribers: Array<TSubscribe>;

  constructor() {
    this.#subscribers = [];
  }

  subscribe(name: string, fn: TSubscribeFn): void {
    this.#subscribers.push({ name, fn });
  }

  unsubscribe(name: string, fn: TSubscribeFn): void {
    this.#subscribers = this.#subscribers.filter((subscribe) => {
      return !(subscribe.fn === fn && subscribe.name === name);
    });
  }

  notify(name: string, data: any): void {
    this.#subscribers.forEach((subscribe) => {
      if (subscribe.name === name) subscribe.fn(data);
    });
  }
}

export default Observer;
