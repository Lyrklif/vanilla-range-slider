import type { TFieldsProps } from './types';
import Input from '../../atoms/input/input';

class Fields {
  #from: Input | null;
  #to: Input;

  constructor(props: TFieldsProps) {
    const { range } = props;

    this.#from = range ? new Input() : null;
    this.#to = new Input();
  }

  setFrom(value: number | string) {
    if (this.#from) this.#from.setValue(value);
  }
  setTo(value: number | string) {
    this.#to.setValue(value);
  }
  getHTMLChildren(): Array<HTMLInputElement> {
    const from = this.#from?.getHTML();
    const to = this.#to.getHTML();

    const array: Array<HTMLInputElement> = [to];
    if (from) array.push(from);

    return array;
  }
}

export default Fields;
