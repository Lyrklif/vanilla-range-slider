import type { TSliderProps } from '../controller/types';
import Knob from '../view/knob';
import Input from '../view/input';
import Bar from '../view/bar';
import Container from '../view/container';

import { KNOB1, KNOB2 } from '../constants/classes';
import Observer from '../observer/observer';

type TViews = {
  container: Container;
  bar: Bar;
  from: {
    knob: Knob;
    input: Input;
  };
  to: {
    knob: Knob;
    input: Input;
  };
};

class View extends Observer {
  readonly #props;
  readonly #views: TViews;
  #parentHTML: HTMLElement | Element;
  readonly #boundMoveHandlerFrom: (event: MouseEvent) => void;
  readonly #boundMoveHandlerTo: (event: MouseEvent) => void;
  readonly #boundStopDragging: () => void;
  readonly #boundStartDraggingFrom: (event: MouseEvent) => void;
  readonly #boundStartDraggingTo: (event: MouseEvent) => void;

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();

    this.#props = props;
    this.#parentHTML = parentHTML;
    this.#views = this.#create();

    this.#boundMoveHandlerFrom = this.#moveHandlerFrom.bind(this);
    this.#boundMoveHandlerTo = this.#moveHandlerTo.bind(this);
    this.#boundStopDragging = this.#stopDragging.bind(this);
    this.#boundStartDraggingFrom = this.#startDraggingFrom.bind(this);
    this.#boundStartDraggingTo = this.#startDraggingTo.bind(this);

    this.#display();
    window.addEventListener('resize', this.#resizeHandler.bind(this));
    this.#views.bar.getHTML().addEventListener('click', this.#boundMoveHandlerFrom);
    this.#views.from.knob.getHTML().addEventListener('mousedown', this.#boundStartDraggingFrom);
    this.#views.to.knob.getHTML().addEventListener('mousedown', this.#boundStartDraggingTo);
  }

  getFrom(): { knob: Knob; input: Input } {
    return this.#views.from;
  }
  getTo(): { knob: Knob; input: Input } {
    return this.#views.to;
  }
  getContainer(): Container {
    return this.#views.container;
  }
  getBar(): Bar {
    return this.#views.bar;
  }
  #create(): TViews {
    const { invert, vertical, to, from } = this.#props;

    return {
      container: new Container({ invert, vertical }),
      bar: new Bar({ invert, vertical }),
      from: {
        knob: new Knob({ invert, vertical, classes: KNOB1 }),
        input: new Input({ value: from.value }),
      },
      to: {
        knob: new Knob({ invert, vertical, classes: KNOB2 }),
        input: new Input({ value: to.value }),
      },
    };
  }
  #display() {
    const { container, bar, from, to } = this.#views;
    const { range } = this.#props;

    const children = [bar.getHTML(), from.knob.getHTML(), from.input.getHTML()];
    if (range) {
      children.push(to.input.getHTML());
      children.push(to.knob.getHTML());
    }
    container.getHTML().append(...children);
    this.#parentHTML.appendChild(container.getHTML());
  }
  #stopDragging(): void {
    document.removeEventListener('mousemove', this.#boundMoveHandlerFrom);
    document.removeEventListener('mousemove', this.#boundMoveHandlerTo);
    document.removeEventListener('mouseup', this.#boundStopDragging);
  }
  #startDraggingFrom(): void {
    document.addEventListener('mousemove', this.#boundMoveHandlerFrom);
    document.addEventListener('mouseup', this.#boundStopDragging);
  }
  #startDraggingTo(): void {
    document.addEventListener('mousemove', this.#boundMoveHandlerTo);
    document.addEventListener('mouseup', this.#boundStopDragging);
  }
  #moveHandlerFrom(event: MouseEvent) {
    this.notify('onMouseMoveFrom', event);
  }
  #moveHandlerTo(event: MouseEvent) {
    this.notify('onMouseMoveTo', event);
  }
  #resizeHandler(event: Event) {
    this.notify('onResize', event);
  }
}

export default View;
