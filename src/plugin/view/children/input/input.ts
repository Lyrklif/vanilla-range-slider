import { INPUT } from '../../../constants/classes';
import type { TInputProps } from './types';

class Input {
  #props: TInputProps;
  #input: HTMLInputElement;

  constructor(props: TInputProps) {
    this.#props = props;
    this.#input = this.#create();
  }

  getHTML(): HTMLInputElement {
    return this.#input;
  }

  setValue(value: number | string) {
    this.#input.setAttribute('value', `${value}`);
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
