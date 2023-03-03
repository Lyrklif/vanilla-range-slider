import type { TSliderProps } from '../controller/types';
import type { TViews } from './types';
import Knob from './atoms/knob/knob';
import Input from './atoms/input/input';
import Line from './atoms/line/line';
import Container from './atoms/container/container';

import { KNOB1 } from '../constants/classes';
import Observer from '../observer/observer';
import Controls from './organisms/controls/controls';
import Bar from './organisms/bar/bar';

class View extends Observer {
  #props;
  #controls;
  #bar;
  #views: TViews;
  #parentHTML: HTMLElement | Element;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
  };

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();

    const { invert, vertical, range, fill } = props;
    this.#props = props;
    this.#parentHTML = parentHTML;
    this.#views = this.#create();

    this.#controls = new Controls({ invert, vertical, range });
    this.#bar = new Bar({ invert, vertical, fill });

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, 'onMouseMoveFrom'),
      moveTo: this.#moveHandler.bind(this, 'onMouseMoveTo'),
    };

    this.#display();
    window.addEventListener('resize', this.#resizeHandler.bind(this));

    this.#controls.subscribe('onMouseMoveFrom', this.#boundHandlers.moveFrom);
    this.#controls.subscribe('onMouseMoveTo', this.#boundHandlers.moveTo);
    this.#bar.subscribe('onBarClick', this.#boundHandlers.moveFrom);
  }

  getView(): TViews {
    return this.#views;
  }
  getControls() {
    return this.#controls;
  }
  getBar() {
    return this.#bar;
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
    const { container, from, to } = this.#views;

    const controlsHTML = this.#controls.getArrayHTML();
    const barHTML = this.#bar.getHTMLChildren();

    const children = [from.input.getHTML(), ...barHTML, ...controlsHTML];
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
