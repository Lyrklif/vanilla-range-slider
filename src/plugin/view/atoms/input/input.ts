import { INPUT } from '../../../constants/classes';

class Input {
  #elem: HTMLInputElement;

  constructor() {
    this.#elem = this.#create();
  }

  getHTML(): HTMLInputElement {
    return this.#elem;
  }

  setValue(value: number | string) {
    this.#elem.setAttribute('value', `${value}`);
  }

  #create(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add(INPUT);

    return input;
  }
}

export default Input;
