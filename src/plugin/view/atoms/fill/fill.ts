import { RANGE, VERTICAL, INVERT } from '../../../constants/classes';
import type { TFillProps } from './types';
import { TSide } from '../knob/types';

class Fill {
  #props: TFillProps;
  #elem: HTMLDivElement;

  constructor(props: TFillProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  setStyle(startPercent: number, endPercent: number): void {
    const side = this.#getSide();
    this.#elem.style[side] = `${startPercent}%`;
    this.#elem.style.maxWidth = `${endPercent}%`;
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes } = this.#props;

    const elem = document.createElement('div');
    elem.classList.add(RANGE);
    if (invert) elem.classList.add(INVERT);
    if (vertical) elem.classList.add(VERTICAL);
    if (classes) elem.classList.add(classes);

    return elem;
  }

  #getSide(): TSide {
    const { invert, vertical } = this.#props;
    return invert ? (vertical ? 'top' : 'right') : vertical ? 'bottom' : 'left';
  }
}

export default Fill;
