import Point from '../../molecules/point/point';
import { KNOB1, KNOB2 } from '../../../constants/classes';
import Observer from '../../../observer/observer';

class Controls extends Observer {
  #from: Point;
  #to: Point | null;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
    stopDragging: () => void;
    startFrom: (event: MouseEvent) => void;
    startTo: (event: MouseEvent) => void;
  };

  constructor(props: any) {
    super();

    const { invert, vertical, range } = props;

    this.#from = new Point({
      invert,
      vertical,
      knobClasses: KNOB1,
      thumb: { text: 'from1' },
      thumbSecond: { text: 'from2' },
    });
    this.#to = range
      ? new Point({
          invert,
          vertical,
          knobClasses: KNOB2,
          thumb: { text: 'to1' },
          thumbSecond: { text: 'to2' },
        })
      : null;

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, 'onMouseMoveFrom'),
      moveTo: this.#moveHandler.bind(this, 'onMouseMoveTo'),
      stopDragging: this.#stopDragging.bind(this),
      startFrom: this.#startDragging.bind(this, 'moveFrom'),
      startTo: this.#startDragging.bind(this, 'moveTo'),
    };

    this.#from.getKnob().getHTML().addEventListener('mousedown', this.#boundHandlers.startFrom);
    if (this.#to) {
      this.#to.getKnob().getHTML().addEventListener('mousedown', this.#boundHandlers.startTo);
    }
  }

  getArrayHTML() {
    const from = this.#from.getArrayHTML();
    const to = this.#to?.getArrayHTML() || [];

    return [...from, ...to];
  }

  setFromPercent(percent: number) {
    this.#from.getKnob().setStyle(percent);
  }
  setToPercent(percent: number) {
    if (this.#to) this.#to.getKnob().setStyle(percent);
  }

  #stopDragging() {
    document.removeEventListener('mousemove', this.#boundHandlers.moveFrom);
    document.removeEventListener('mousemove', this.#boundHandlers.moveTo);
    document.removeEventListener('mouseup', this.#boundHandlers.stopDragging);
  }

  #startDragging(type: 'moveFrom' | 'moveTo'): void {
    document.addEventListener('mousemove', this.#boundHandlers[type]);
    document.addEventListener('mouseup', this.#boundHandlers.stopDragging);
  }

  #moveHandler(type: 'onMouseMoveFrom' | 'onMouseMoveTo', event: MouseEvent) {
    this.notify(type, event);
  }
}

export default Controls;
