import type { TSliderProps } from '../controller/types';
import type { TCoords, TSliderCoords } from './types';
import Container from './atoms/container/container';
import Observer from '../observer/observer';
import Controls from './organisms/controls/controls';
import Bar from './organisms/bar/bar';
import Fields from './molecules/fields/fields';
import { NOTICE } from '../types/notive';
import { MAX_PERCENT } from '../constants/percents';

class View extends Observer {
  #props: TSliderProps | any;
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
    this.#props = props;
    this.#controls = new Controls({ invert, vertical, range });
    this.#bar = new Bar({ invert, vertical, fill });
    this.#fields = new Fields({ range });
    this.#container = new Container({ invert, vertical });

    this.#boundHandlers = {
      moveFrom: this.moveToPosition.bind(this, NOTICE.moveFrom),
      moveTo: this.moveToPosition.bind(this, NOTICE.moveTo),
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
  moveToPosition(type: NOTICE.moveFrom | NOTICE.moveTo, event: MouseEvent) {
    const coords: TCoords = this.#getCoordsByEvent(event);
    const percent: number = this.#getPercentByCoords(coords);
    const value: number = this.#getValueByPercent(percent);

    this.notify(type, { percent, value });
  }

  #display(parentHTML: HTMLElement | Element) {
    const controlsHTML = this.#controls.getHTMLChildren();
    const barHTML = this.#bar.getHTMLChildren();
    const fieldsHTML = this.#fields.getHTMLChildren();
    const containerHTML = this.#container.getHTML();

    const children = [...fieldsHTML, ...barHTML, ...controlsHTML];
    containerHTML.append(...children);

    parentHTML.appendChild(containerHTML);
  }
  #resizeHandler(event: Event) {
    this.notify(NOTICE.resize, event);
  }
  #getCoordsByEvent(event: MouseEvent | TouchEvent): TCoords {
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    return { x: clientX, y: clientY };
  }
  #getExternalOffset(): TSliderCoords {
    const offsets = this.#container.getOffsets();
    return {
      x: offsets.left + window.scrollX,
      y: offsets.top + window.scrollY,
    };
  }
  #getBarLength(): number {
    const { width, height } = this.#bar.getSize();
    return this.#props.vertical ? height : width;
  }
  #getPercentByCoords(coords: TCoords): number {
    const { invert, vertical, step } = this.#props;
    const barLength = this.#getBarLength();
    const externalOffset: TSliderCoords = this.#getExternalOffset();
    const pos = vertical ? coords.y : coords.x;
    const start = vertical ? externalOffset.y : externalOffset.x;
    const end = start + barLength;
    const offset = Math.max(start, Math.min(pos, end)) - start;
    const percent = (offset * MAX_PERCENT) / barLength;
    const roundedPercent = Math.round(percent / step) * step;
    const percentForHorizontal = invert ? MAX_PERCENT - roundedPercent : roundedPercent;
    const percentForVertical = invert ? roundedPercent : MAX_PERCENT - roundedPercent;

    return vertical ? percentForVertical : percentForHorizontal;
  }
  #getValueByPercent(percent: number): number {
    const { min, max, step } = this.#props;
    const range = max - min;
    const value = min + percent * (range / 100);
    return Math.round((value - min) / step) * step + min;
  }
}

export default View;
