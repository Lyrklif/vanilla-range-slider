import { INPUT } from '../constants/classes';

type TInputProps = {
  value: string | number;
  classes?: string;
};

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

  setValue(value: number | string): void {
    this.#input.setAttribute('value', `${value}`);
  }

  #create(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('value', `${this.#props.value}`);
    input.classList.add(INPUT);
    if (this.#props.classes) input.classList.add(this.#props.classes);

    return input;
  }
}

export default Input;
