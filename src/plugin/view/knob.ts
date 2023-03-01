import { KNOB, VERTICAL, INVERT } from '../constants/classes';

type TKnobProps = {
  invert: boolean;
  vertical: boolean;
  classes?: string;
};

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
    const knob = document.createElement('button');
    knob.type = 'button';
    knob.classList.add(KNOB);
    if (this.#props.invert) knob.classList.add(INVERT);
    if (this.#props.vertical) knob.classList.add(VERTICAL);
    if (this.#props.classes) knob.classList.add(this.#props.classes);

    return knob;
  }

  #getSide(): 'left' | 'top' | 'right' | 'bottom' {
    const { invert, vertical } = this.#props;
    return invert ? (vertical ? 'top' : 'right') : vertical ? 'bottom' : 'left';
  }
}

export default Knob;
