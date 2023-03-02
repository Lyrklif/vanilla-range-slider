import { LINE, VERTICAL, INVERT } from '../../../constants/classes';
import type { TLineProps, TSizes } from './types';

class Line {
  #props: TLineProps;
  #elem: HTMLDivElement;

  constructor(props: TLineProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  getSize(): TSizes {
    const { clientWidth: width, clientHeight: height } = this.#elem;
    return { width, height };
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes } = this.#props;

    const elem = document.createElement('div');
    elem.classList.add(LINE);
    if (invert) elem.classList.add(INVERT);
    if (vertical) elem.classList.add(VERTICAL);
    if (classes) elem.classList.add(classes);

    return elem;
  }
}

export default Line;
