import { VERTICAL, INVERT, THUMB, THUMB_TEXT } from '../../../constants/classes';
import type { TThumbProps } from './types';

class Thumb {
  #props: TThumbProps;
  #elem: HTMLDivElement;

  constructor(props: TThumbProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes, text } = this.#props;

    const elem = document.createElement('div');

    if (text) {
      const textElem = document.createElement('div');
      textElem.classList.add(THUMB_TEXT);
      elem.appendChild(textElem);
    }

    elem.classList.add(THUMB);
    if (invert) elem.classList.add(INVERT);
    if (vertical) elem.classList.add(VERTICAL);
    if (classes) elem.classList.add(classes);

    return elem;
  }
}

export default Thumb;
