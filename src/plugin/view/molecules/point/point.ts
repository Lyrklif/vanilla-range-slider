import type { TPointProps } from './types';
import Knob from '../../atoms/knob/knob';
import Thumb from '../../atoms/thumb/thumb';

class Point {
  #knob: Knob;
  #thumb: Thumb | null;

  constructor(props: TPointProps) {
    const { invert, vertical, thumb, knobClasses, invertThumb } = props;

    this.#knob = new Knob({ invert, vertical, classes: knobClasses });
    this.#thumb = thumb ? new Thumb({ invert, invertThumb, vertical }) : null;
  }

  getKnob() {
    return this.#knob;
  }

  setStyle(percent: number, value: number) {
    this.#knob.setStyle(percent);
    if (this.#thumb) {
      this.#thumb.setStyle(percent);
      this.#thumb.setText(`${value}`);
    }
  }

  getHTMLChildren(): Array<HTMLDivElement | HTMLButtonElement> {
    const knob = this.#knob.getHTML();
    const thumb = this.#thumb?.getHTML();

    const array: Array<HTMLDivElement | HTMLButtonElement> = [knob];
    if (thumb) array.push(thumb);

    return array;
  }
}

export default Point;
