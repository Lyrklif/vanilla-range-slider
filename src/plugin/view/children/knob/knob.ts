import { KNOB, VERTICAL, INVERT } from '../../../constants/classes';
import type { TKnobProps, TSide } from './types';

class Knob {
  #props: TKnobProps;
  #knob: HTMLButtonElement;

  constructor(props: TKnobProps) {
    this.#props = props;
    this.#knob = this.#create();
  }

  getHTML(): HTMLButtonElement {
    return this.#knob;
  }

  setStyle(percent: number): void {
    const side = this.#getSide();
    this.#knob.style[side] = `${percent}%`;
  }

  #create(): HTMLButtonElement {
    const { invert, vertical, classes } = this.#props;

    const knob = document.createElement('button');
    knob.type = 'button';
    knob.classList.add(KNOB);
    if (invert) knob.classList.add(INVERT);
    if (vertical) knob.classList.add(VERTICAL);
    if (classes) knob.classList.add(classes);

    return knob;
  }

  #getSide(): TSide {
    const { invert, vertical } = this.#props;
    return invert ? (vertical ? 'top' : 'right') : vertical ? 'bottom' : 'left';
  }
}

export default Knob;
