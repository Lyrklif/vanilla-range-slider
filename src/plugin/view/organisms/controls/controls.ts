import Point from '../../molecules/point/point';
import { KNOB1, KNOB2 } from '../../../constants/classes';
import Observer from '../../../observer/observer';
import { NOTICE } from '../../../types/notive';
import { DRAGGING } from './type';
import type { TDragging } from './type';

class Controls extends Observer {
  #from: Point | null;
  #to: Point;
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

    this.#from = range
      ? new Point({
          invert,
          vertical,
          knobClasses: KNOB1,
          thumb: { text: 'from1' },
          thumbSecond: { text: 'from2' },
        })
      : null;
    this.#to = new Point({
      invert,
      vertical,
      knobClasses: KNOB2,
      thumb: { text: 'to1' },
      thumbSecond: { text: 'to2' },
    });

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, NOTICE.moveFrom),
      moveTo: this.#moveHandler.bind(this, NOTICE.moveTo),
      stopDragging: this.#stopDragging.bind(this),
      startFrom: this.#startDragging.bind(this, DRAGGING.from),
      startTo: this.#startDragging.bind(this, DRAGGING.to),
    };

    if (this.#from) {
      this.#from.getKnob().getHTML().addEventListener('mousedown', this.#boundHandlers.startFrom);
    }
    this.#to.getKnob().getHTML().addEventListener('mousedown', this.#boundHandlers.startTo);
    this.#to.getKnob().getHTML().addEventListener('keydown', this.#arrowEvent);
  }

  getHTMLChildren() {
    const from = this.#from?.getHTMLChildren() || [];
    const to = this.#to.getHTMLChildren();

    return [...from, ...to];
  }
  setFromPercent(percent: number) {
    if (this.#from) this.#from.getKnob().setStyle(percent);
  }
  setToPercent(percent: number) {
    this.#to.getKnob().setStyle(percent);
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
  #arrowEvent(event: KeyboardEvent) {
    const { code } = event;
    console.log('TTT', code);
    // const isLeft = code === 'ArrowLeft';
    // const isRight = code === 'ArrowRight';
    // const isTop = code === 'ArrowUp';
    // const isBottom = code === 'ArrowDown';
  }
}

export default Controls;
