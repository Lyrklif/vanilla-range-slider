import { VERTICAL, INVERT, THUMB } from '../../../constants/classes';
import type { TThumbProps } from './types';
import { TSide } from '../knob/types';

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

  setStyle(percent: number) {
    const side = this.#getSide();
    this.#elem.style[side] = `${percent}%`;
  }

  setText(text: string) {
    this.#elem.innerHTML = text;
  }

  #create(): HTMLDivElement {
    const { invertThumb, vertical, classes, text } = this.#props;

    const elem = document.createElement('div');
    if (text) this.#elem.innerHTML = text;
    elem.classList.add(THUMB);
    if (invertThumb) elem.classList.add(INVERT);
    if (vertical) elem.classList.add(VERTICAL);
    if (classes) elem.classList.add(classes);

    return elem;
  }

  #getSide(): TSide {
    const { invert, vertical } = this.#props;
    return invert ? (vertical ? 'top' : 'right') : vertical ? 'bottom' : 'left';
  }
}

export default Thumb;
