import type { TSliderProps } from '../controller/types';
import Container from './atoms/container/container';
import Observer from '../observer/observer';
import Controls from './organisms/controls/controls';
import Bar from './organisms/bar/bar';
import Fields from './molecules/fields/fields';
import { NOTICE } from '../types/notive';

class View extends Observer {
  #controls;
  #bar;
  #fields;
  #container;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
  };

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();

    const { invert, vertical, range, fill } = props;
    this.#controls = new Controls({ invert, vertical, range });
    this.#bar = new Bar({ invert, vertical, fill });
    this.#fields = new Fields({ range });
    this.#container = new Container({ invert, vertical });

    this.#boundHandlers = {
      moveFrom: this.#moveHandler.bind(this, NOTICE.moveFrom),
      moveTo: this.#moveHandler.bind(this, NOTICE.moveTo),
    };

    this.#display(parentHTML);
    window.addEventListener('resize', this.#resizeHandler.bind(this));

    this.#controls.subscribe(NOTICE.moveFrom, this.#boundHandlers.moveFrom);
    this.#controls.subscribe(NOTICE.moveTo, this.#boundHandlers.moveTo);
    this.#bar.subscribe(NOTICE.barClick, this.#boundHandlers.moveFrom);
  }

  getContainer() {
    return this.#container;
  }
  getControls() {
    return this.#controls;
  }
  getFields() {
    return this.#fields;
  }
  getBar() {
    return this.#bar;
  }

  #display(parentHTML: HTMLElement | Element) {
    const controlsHTML = this.#controls.getArrayHTML();
    const barHTML = this.#bar.getHTMLChildren();
    const fieldsHTML = this.#fields.getHTMLChildren();
    const containerHTML = this.#container.getHTML();

    const children = [...fieldsHTML, ...barHTML, ...controlsHTML];
    containerHTML.append(...children);

    parentHTML.appendChild(containerHTML);
  }

  #moveHandler(type: NOTICE.moveFrom | NOTICE.moveTo, event: MouseEvent) {
    this.notify(type, event);
  }

  #resizeHandler(event: Event) {
    this.notify(NOTICE.resize, event);
  }
}

export default View;
