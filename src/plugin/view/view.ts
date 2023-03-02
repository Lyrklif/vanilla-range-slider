import type { TSliderProps } from '../controller/types';
import type { TViews } from './types';
import Knob from './atoms/knob/knob';
import Input from './atoms/input/input';
import Line from './atoms/line/line';
import Container from './atoms/container/container';

import { KNOB1 } from '../constants/classes';
import Observer from '../observer/observer';
import Controls from './organisms/controls/controls';

class View extends Observer {
  #props;
  #controls;
  #views: TViews;
  #parentHTML: HTMLElement | Element;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
  };

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();

    const { invert, vertical, range } = props;
    this.#props = props;
    this.#parentHTML = parentHTML;
    this.#views = this.#create();

    this.#controls = new Controls({ invert, vertical, range });

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, 'onMouseMoveFrom'),
      moveTo: this.#moveHandler.bind(this, 'onMouseMoveTo'),
    };

    this.#display();
    window.addEventListener('resize', this.#resizeHandler.bind(this));
    this.#views.bar.getHTML().addEventListener('click', this.#boundHandlers.moveFrom);

    this.#controls.subscribe('onMouseMoveFrom', this.#boundHandlers.moveFrom);
    this.#controls.subscribe('onMouseMoveTo', this.#boundHandlers.moveTo);
  }

  getView(): TViews {
    return this.#views;
  }
  getControls() {
    return this.#controls;
  }

  #create(): TViews {
    const { invert, vertical, from } = this.#props;

    return {
      container: new Container({ invert, vertical }),
      bar: new Line({ invert, vertical }),
      from: {
        knob: new Knob({ invert, vertical, classes: KNOB1 }),
        input: new Input({ value: from.value }),
      },
      to: null,
    };
  }

  #display() {
    const { container, bar, from, to } = this.#views;

    const controlsHTML = this.#controls.getArrayHTML();

    const children = [bar.getHTML(), from.input.getHTML(), ...controlsHTML];
    if (to) {
      children.push(to.input.getHTML());
    }
    container.getHTML().append(...children);

    this.#parentHTML.appendChild(container.getHTML());
  }

  #moveHandler(type: 'onMouseMoveFrom' | 'onMouseMoveTo', event: MouseEvent) {
    this.notify(type, event);
  }

  #resizeHandler(event: Event) {
    this.notify('onResize', event);
  }
}

export default View;
