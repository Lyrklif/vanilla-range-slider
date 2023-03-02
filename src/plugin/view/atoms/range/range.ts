import { RANGE, VERTICAL, INVERT } from '../../../constants/classes';
import type { TRangeProps } from './types';

class Range {
  #props: TRangeProps;
  #elem: HTMLDivElement;

  constructor(props: TRangeProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  setStyle(percent: number): void {
    this.#elem.style.maxWidth = `${percent}%`;
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
}

export default Range;
