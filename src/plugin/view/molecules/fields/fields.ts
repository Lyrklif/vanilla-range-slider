import type { TFieldsProps } from './types';
import Input from '../../atoms/input/input';

class Fields {
  #from;
  #to;

  constructor(props: TFieldsProps) {
    const { range } = props;

    this.#from = new Input();
    this.#to = range ? new Input() : null;
  }

  setFrom(value: number | string) {
    this.#from.setValue(value);
  }
  setTo(value: number | string) {
    if (this.#to) this.#to.setValue(value);
  }
  getHTMLChildren(): Array<HTMLInputElement> {
    const from = this.#from.getHTML();
    const to = this.#to?.getHTML();

    const array: Array<HTMLInputElement> = [from];
    if (to) array.push(to);

    return array;
  }
}

export default Fields;
