import { INPUT } from '../../../constants/classes';
import type { TInputProps } from './types';

class Input {
  #props: TInputProps;
  #elem: HTMLInputElement;

  constructor(props: TInputProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLInputElement {
    return this.#elem;
  }

  setValue(value: number | string) {
    this.#elem.setAttribute('value', `${value}`);
  }

  #create(): HTMLInputElement {
    const { classes, value } = this.#props;

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('value', `${value}`);
    input.classList.add(INPUT);
    if (classes) input.classList.add(classes);

    return input;
  }
}

export default Input;
