import { BAR, VERTICAL, INVERT } from '../../../constants/classes';
import type { TBarProps, TSizes } from './types';

class Bar {
  #props: TBarProps;
  #bar: HTMLDivElement;

  constructor(props: TBarProps) {
    this.#props = props;
    this.#bar = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#bar;
  }

  getSize(): TSizes {
    const { clientWidth: width, clientHeight: height } = this.#bar;
    return { width, height };
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes } = this.#props;

    const bar = document.createElement('div');
    bar.classList.add(BAR);
    if (invert) bar.classList.add(INVERT);
    if (vertical) bar.classList.add(VERTICAL);
    if (classes) bar.classList.add(classes);

    return bar;
  }
}

export default Bar;
