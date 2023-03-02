import type { TPointProps } from './types';
import Knob from '../../atoms/knob/knob';
import Thumb from '../../atoms/thumb/thumb';

class Point {
  #knob: Knob;
  #thumb: Thumb | null;
  #thumbSecond: Thumb | null;

  constructor(props: TPointProps) {
    const { invert, vertical, thumb, thumbSecond, knobClasses } = props;

    this.#knob = new Knob({ invert, vertical, classes: knobClasses });
    this.#thumb = thumb ? new Thumb({ invert, vertical, text: thumb.text }) : null;
    this.#thumbSecond = thumbSecond ? new Thumb({ invert, vertical, text: thumbSecond.text }) : null;
  }

  getKnob() {
    return this.#knob;
  }

  getArrayHTML(): Array<HTMLDivElement | HTMLButtonElement> {
    const knob = this.#knob.getHTML();
    const thumb = this.#thumb?.getHTML();
    const thumb2 = this.#thumbSecond?.getHTML();

    const array: Array<HTMLDivElement | HTMLButtonElement> = [knob];
    if (thumb) array.push(thumb);
    if (thumb2) array.push(thumb2);

    return array;
  }
}

export default Point;
