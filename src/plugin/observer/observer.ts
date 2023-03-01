type TSubscriberFn = (value: any) => void;

type TSubscriber = {
  name: string;
  fn: TSubscriberFn;
};

class Observer {
  #subscribers: Array<TSubscriber>;

  constructor() {
    this.#subscribers = [];
  }

  subscribe(name: string, fn: TSubscriberFn): void {
    this.#subscribers.push({ name, fn });
  }

  unsubscribe(name: string, fn: TSubscriberFn): void {
    this.#subscribers = this.#subscribers.filter((subscriber) => {
      return !(subscriber.fn === fn && subscriber.name === name);
    });
  }

  notify(name: string, data: any): void {
    this.#subscribers
      .filter((subscriber) => subscriber.name === name)
      .forEach((subscriber) => subscriber.fn(data));
  }
}

export default Observer;
