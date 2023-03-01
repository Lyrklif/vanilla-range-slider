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
  to: null | {
    knob: Knob;
    input: Input;
  };
};

class View extends Observer {
  #props;
  #views: TViews;
  #parentHTML: HTMLElement | Element;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
    stopDragging: () => void;
    startFrom: (event: MouseEvent) => void;
    startTo: (event: MouseEvent) => void;
  };

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();

    this.#props = props;
    this.#parentHTML = parentHTML;
    this.#views = this.#create();

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, 'onMouseMoveFrom'),
      moveTo: this.#moveHandler.bind(this, 'onMouseMoveTo'),
      stopDragging: this.#stopDragging.bind(this),
      startFrom: this.#startDragging.bind(this, 'moveFrom'),
      startTo: this.#startDragging.bind(this, 'moveTo'),
    };

    this.#display();
    window.addEventListener('resize', this.#resizeHandler.bind(this));
    this.#views.bar.getHTML().addEventListener('click', this.#boundHandlers.moveFrom);
    this.#views.from.knob.getHTML().addEventListener('mousedown', this.#boundHandlers.startFrom);

    if (this.#views.to) {
      this.#views.to.knob.getHTML().addEventListener('mousedown', this.#boundHandlers.startTo);
    }
  }

  getFrom(): { knob: Knob; input: Input } {
    return this.#views.from;
  }

  getTo(): null | { knob: Knob; input: Input } {
    return this.#views.to;
  }

  getContainer(): Container {
    return this.#views.container;
  }

  getBar(): Bar {
    return this.#views.bar;
  }

  #create(): TViews {
    const { invert, vertical, to, from, range } = this.#props;

    return {
      container: new Container({ invert, vertical }),
      bar: new Bar({ invert, vertical }),
      from: {
        knob: new Knob({ invert, vertical, classes: KNOB1 }),
        input: new Input({ value: from.value }),
      },
      to: range
        ? {
            knob: new Knob({ invert, vertical, classes: KNOB2 }),
            input: new Input({ value: to.value }),
          }
        : null,
    };
  }

  #display() {
    const { container, bar, from, to } = this.#views;

    const children = [bar.getHTML(), from.knob.getHTML(), from.input.getHTML()];
    if (to) {
      children.push(to.input.getHTML());
      children.push(to.knob.getHTML());
    }
    container.getHTML().append(...children);
    this.#parentHTML.appendChild(container.getHTML());
  }

  #stopDragging(): void {
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

  #resizeHandler(event: Event) {
    this.notify('onResize', event);
  }
}


export default View;
