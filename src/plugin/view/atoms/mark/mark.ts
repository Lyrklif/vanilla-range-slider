import { TMarkProps, TSide } from './types';
import { INVERT, MARK, VERTICAL, MARK_TEXT } from '../../../constants/classes';

class Mark {
  #props: TMarkProps;
  #elem: HTMLDivElement;

  constructor(props: TMarkProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  setStyle(percent: number): void {
    const side = this.#getSide();
    this.#elem.style[side] = `${percent}%`;
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes, text } = this.#props;

    const mark = document.createElement('div');

    if (text) {
      const child = document.createElement('span');
      child.classList.add(MARK_TEXT);
      mark.appendChild(child);
    }

    mark.classList.add(MARK);
    if (classes) mark.classList.add(classes);
    if (vertical) mark.classList.add(VERTICAL);
    if (invert) mark.classList.add(INVERT);

    return mark;
  }

  #getSide(): TSide {
    const { invert, vertical } = this.#props;
    return invert ? (vertical ? 'top' : 'right') : vertical ? 'bottom' : 'left';
  }
}

export default Mark;
