import Point from '../../molecules/point/point';
import { KNOB1, KNOB2 } from '../../../constants/classes';
import Observer from '../../../observer/observer';
import { NOTICE } from '../../../types/notive';
import { DRAGGING, DIRECTION_CODE, STEP } from './type';
import type { TDragging } from './type';

class Controls extends Observer {
  #from: Point | null;
  #to: Point;
  #props;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
    stopDragging: () => void;
    startFrom: (event: MouseEvent) => void;
    startTo: (event: MouseEvent) => void;
    arrowFrom: (event: KeyboardEvent) => void;
    arrowTo: (event: KeyboardEvent) => void;
  };

  constructor(props: any) {
    super();

    const { invert, vertical, range, invertThumb, thumb } = props;
    this.#props = props;

    this.#from = range
      ? new Point({
          invert,
          vertical,
          knobClasses: KNOB1,
          thumb,
          invertThumb,
        })
      : null;
    this.#to = new Point({
      invert,
      vertical,
      knobClasses: KNOB2,
      thumb,
      invertThumb,
    });

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, NOTICE.moveFrom),
      moveTo: this.#moveHandler.bind(this, NOTICE.moveTo),
      stopDragging: this.#stopDragging.bind(this),
      startFrom: this.#startDragging.bind(this, DRAGGING.from),
      startTo: this.#startDragging.bind(this, DRAGGING.to),
      arrowFrom: this.#arrowEvent.bind(this, DRAGGING.from),
      arrowTo: this.#arrowEvent.bind(this, DRAGGING.to),
    };

    if (this.#from) {
      this.#from.getKnob().getHTML().addEventListener('mousedown', this.#boundHandlers.startFrom);
      this.#from.getKnob().getHTML().addEventListener('keydown', this.#boundHandlers.arrowFrom);
    }
    this.#to.getKnob().getHTML().addEventListener('mousedown', this.#boundHandlers.startTo);
    this.#to.getKnob().getHTML().addEventListener('keydown', this.#boundHandlers.arrowTo);
  }

  getHTMLChildren() {
    const from = this.#from?.getHTMLChildren() || [];
    const to = this.#to.getHTMLChildren();

    return [...from, ...to];
  }
  setFromPercent(percent: number, value: number) {
    if (this.#from) this.#from.setStyle(percent, value);
  }
  setToPercent(percent: number, value: number) {
    this.#to.setStyle(percent, value);
  }

  #stopDragging() {
    document.removeEventListener('mousemove', this.#boundHandlers.moveFrom);
    document.removeEventListener('mousemove', this.#boundHandlers.moveTo);
    document.removeEventListener('mouseup', this.#boundHandlers.stopDragging);
  }

  #startDragging(type: TDragging) {
    document.addEventListener('mousemove', this.#boundHandlers[type]);
    document.addEventListener('mouseup', this.#boundHandlers.stopDragging);
  }

  #moveHandler(type: NOTICE.moveFrom | NOTICE.moveTo, event: MouseEvent) {
    this.notify(type, event);
  }
  #arrowEvent(knobVariant: DRAGGING.from | DRAGGING.to, event: KeyboardEvent) {
    const { invert, vertical } = this.#props;
    const { code } = event;

    const isPlus: boolean =
      (!vertical && !invert && code === DIRECTION_CODE.right) ||
      (!vertical && invert && code === DIRECTION_CODE.left) ||
      (vertical && !invert && code === DIRECTION_CODE.top) ||
      (vertical && invert && code === DIRECTION_CODE.bottom);

    const isMinus: boolean =
      (!vertical && !invert && code === DIRECTION_CODE.left) ||
      (!vertical && invert && code === DIRECTION_CODE.right) ||
      (vertical && !invert && code === DIRECTION_CODE.bottom) ||
      (vertical && invert && code === DIRECTION_CODE.top);

    if (isPlus || isMinus) {
      const type = isPlus ? STEP.plus : STEP.minus;
      this.notify(NOTICE.step, { knob: knobVariant, type: type });
    }
  }
}

export default Controls;
