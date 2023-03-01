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
  #boundMoveHandler: (event: MouseEvent) => void;
  #boundStopDragging: () => void;

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();
    
    this.#props = props;
    this.#parentHTML = parentHTML;
    this.#views = this.#create();

    this.#boundMoveHandler = this.#moveHandler.bind(this);
    this.#boundStopDragging = this.#stopDragging.bind(this);

    this.#display();
    window.addEventListener('resize', this.#resizeHandler.bind(this));
    this.#views.bar.getHTML().addEventListener('click', this.#boundMoveHandler);
    this.#views.from.knob.getHTML().addEventListener('mousedown', this.#startDragging.bind(this));
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

    const children = [from.knob.getHTML(), bar.getHTML(), from.input.getHTML()];
    if (range) {
      children.push(to.input.getHTML());
      children.push(to.knob.getHTML());
    }
    container.getHTML().append(...children);
    this.#parentHTML.appendChild(container.getHTML());
  }
  #stopDragging(): void {
    document.removeEventListener('mousemove', this.#boundMoveHandler);
    document.removeEventListener('mouseup', this.#boundStopDragging);
  }
  #startDragging(): void {
    document.addEventListener('mousemove', this.#boundMoveHandler);
    document.addEventListener('mouseup', this.#boundStopDragging);
  }
  #moveHandler(event: MouseEvent) {
    this.notify('onMouseMove', event);
  }
  #resizeHandler(event: Event) {
    this.notify('onResize', event);
  }
}

export default View;
