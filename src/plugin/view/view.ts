import type { TSliderProps } from '../controller/types';
import type { TCoords, TSliderCoords } from './types';
import Container from './atoms/container/container';
import Observer from '../observer/observer';
import Controls from './organisms/controls/controls';
import Bar from './organisms/bar/bar';
import Fields from './molecules/fields/fields';
import { NOTICE } from '../types/notive';
import { MAX_PERCENT } from '../constants/percents';
import { DRAGGING, STEP } from './organisms/controls/type';

class View extends Observer {
  #props: TSliderProps | any;
  #controls: Controls;
  #bar: Bar;
  #fields: Fields;
  #container: Container;
  #boundHandlers: {
    moveFrom: (event: MouseEvent) => void;
    moveTo: (event: MouseEvent) => void;
  };

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps | any) {
    super();

    const { invert, vertical, range, fill, thumb, invertThumb, scale, min, max, step, inputNameFrom, inputNameTo } =
      props;

    this.#props = props;
    this.#controls = new Controls({ invert, vertical, range, thumb, invertThumb });
    this.#bar = new Bar({ invert, vertical, fill, scale, min, max, step });
    this.#fields = new Fields({ range, inputNameFrom, inputNameTo });
    this.#container = new Container({ invert, vertical });

    this.#boundHandlers = {
      moveFrom: this.moveToPosition.bind(this, NOTICE.moveFrom),
      moveTo: this.moveToPosition.bind(this, NOTICE.moveTo),
    };

    this.#handleEvents();
    this.#display(parentHTML);
  }

  setFrom(value: number, percent: number) {
    this.#fields.setFrom(value);
    this.#controls.setFromPercent(percent, value);
  }
  setTo(value: number, percent: number) {
    this.#fields.setTo(value);
    this.#controls.setToPercent(percent, value);
  }
  setBarFillStyle(fromPercent: number, toPercent: number) {
    this.#bar.setFillStyle(fromPercent, toPercent);
  }
  getSizes(): { height: number; width: number; top: number; left: number } {
    const { height, width } = this.#bar.getSize();
    const { top, left } = this.#container.getOffsets();
    return { height, width, top, left };
  }
  moveToPosition(type: NOTICE.moveFrom | NOTICE.moveTo, event: MouseEvent) {
    const coords: TCoords = this.#getCoordsByEvent(event);
    const percent: number = this.#getPercentByCoords(coords);
    const value: number = this.#getValueByPercent(percent);

    this.notify(type, { percent, value });
  }
  #barClick(event: MouseEvent | TouchEvent) {
    const coords: TCoords = this.#getCoordsByEvent(event);
    const percent: number = this.#getPercentByCoords(coords);
    const value: number = this.#getValueByPercent(percent);

    this.notify(NOTICE.barClick, { percent, value });
  }
  #handleEvents() {
    this.#controls.subscribe(NOTICE.moveFrom, this.#boundHandlers.moveFrom);
    this.#controls.subscribe(NOTICE.moveTo, this.#boundHandlers.moveTo);
    this.#controls.subscribe(NOTICE.step, this.#moveByStep.bind(this));
    this.#bar.subscribe(NOTICE.barClick, this.#barClick.bind(this));
    window.addEventListener('resize', this.#resizeHandler.bind(this));
  }
  #display(parentHTML: HTMLElement | Element) {
    const containerHTML = this.#container.getHTML();
    const appendChildren = [
      ...this.#fields.getHTMLChildren(),
      ...this.#bar.getHTMLChildren(),
      ...this.#controls.getHTMLChildren(),
    ];
    containerHTML.append(...appendChildren);
    parentHTML.appendChild(containerHTML);
  }
  #resizeHandler(event: Event) {
    this.notify(NOTICE.resize, event);
  }
  #getCoordsByEvent(event: MouseEvent | TouchEvent): TCoords {
    return {
      x: event instanceof MouseEvent ? event.clientX : event.touches[0].clientX,
      y: event instanceof MouseEvent ? event.clientY : event.touches[0].clientY,
    };
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
    const externalOffset = this.#getExternalOffset();
    const position = vertical ? coords.y : coords.x;
    const start = vertical ? externalOffset.y : externalOffset.x;
    const end = start + barLength;
    const offset = Math.max(start, Math.min(position, end)) - start;
    const percent = (offset / barLength) * MAX_PERCENT;
    const roundedPercent = Math.round(percent / step) * step;
    const percentForHorizontal = invert ? MAX_PERCENT - roundedPercent : roundedPercent;
    const percentForVertical = invert ? roundedPercent : MAX_PERCENT - roundedPercent;

    return vertical ? percentForVertical : percentForHorizontal;
  }
  #getValueByPercent(percent: number): number {
    const { min, max, step } = this.#props;
    const range = max - min;
    const value = min + (percent * range) / MAX_PERCENT;
    return Math.round((value - min) / step) * step + min;
  }
  #moveByStep(props: { type: STEP.plus | STEP.minus; knob: DRAGGING.from | DRAGGING.to }) {
    this.notify(NOTICE.step, props);
  }
}

export default View;
