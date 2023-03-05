import { INPUT } from '../../../constants/classes';
import type { TInputName } from './types';

class Input {
  #elem: HTMLInputElement;

  constructor(name: TInputName) {
    this.#elem = this.#create(name);
  }

  getHTML(): HTMLInputElement {
    return this.#elem;
  }

  setValue(value: number | string) {
    this.#elem.setAttribute('value', `${value}`);
  }

  #create(name: TInputName): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.classList.add(INPUT);

    return input;
  }
}

export default Input;
