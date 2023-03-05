import { MAX_PERCENT, MIN_PERCENT } from '../constants/percents';

import Model from '../model/model';
import View from '../view/View';
import Observer from '../observer/observer';

import type { TSliderProps } from './types';
import { NOTICE } from '../types/notive';
import { DRAGGING, STEP } from '../view/organisms/controls/type';

class Controller extends Observer {
  #model: Model;
  #view: View;

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps) {
    super();
    this.#model = new Model(props);
    this.#view = new View(parentHTML, {
      ...props,
      from: this.#model.getFromControlState(),
      to: this.#model.getToControlState(),
    });

    this.#view.subscribe(NOTICE.resize, this.#updateSizes.bind(this));
    this.#view.subscribe(NOTICE.moveFrom, this.#moveKnobFrom.bind(this));
    this.#view.subscribe(NOTICE.moveTo, this.#moveKnobTo.bind(this));
    this.#view.subscribe(NOTICE.barClick, this.#barClick.bind(this));
    this.#view.subscribe(NOTICE.step, this.#moveStep.bind(this));

    this.#updateSizes();
    this.#moveKnobFrom(this.#model.getFromControlState());
    this.#moveKnobTo(this.#model.getToControlState());
  }

  #updateSizes() {
    const { height, width, top, left } = this.#view.getSizes();

    this.#model.setContainerState({ top, left });
    this.#model.setBarState({ height, width });
  }
  #updFillStyle() {
    const { range } = this.#model.getSettings();
    const { percent: fromPercent } = this.#model.getFromControlState();
    const { percent: toPercent } = this.#model.getToControlState();
    if (range) {
      const start = Math.min(fromPercent, toPercent);
      const end = Math.max(fromPercent, toPercent);
      this.#view.setBarFillStyle(start, end - start);
    } else {
      this.#view.setBarFillStyle(MIN_PERCENT, toPercent);
    }
  }
  #moveKnobFrom(props: { value: number; percent: number }) {
    const { value, percent } = props;
    this.#view.setFrom(value, percent);
    this.#model.setFromControlState({ value, percent });
    this.#updFillStyle();
  }
  #moveKnobTo(props: { value: number; percent: number }) {
    const { value, percent } = props;
    this.#view.setTo(value, percent);
    this.#model.setToControlState({ value, percent });
    this.#updFillStyle();
  }
  #barClick(props: { value: number; percent: number }) {
    const { range } = this.#model.getSettings();
    const { percent } = props;
    const { percent: fromPercent } = this.#model.getFromControlState();
    const { percent: toPercent } = this.#model.getToControlState();

    const distanceFrom = Math.abs(fromPercent - percent);
    const distanceTo = Math.abs(toPercent - percent);

    if (!range) {
      this.#moveKnobTo(props);
      return;
    }

    if (distanceTo <= distanceFrom) {
      this.#moveKnobTo(props);
    } else {
      this.#moveKnobFrom(props);
    }
  }
  #getPercentByValue(value: number, min: number, max: number): number {
    if (min === max) return 0;
    return ((value - min) / (max - min)) * MAX_PERCENT;
  }
  #moveStep(props: { type: STEP.plus | STEP.minus; knob: DRAGGING.from | DRAGGING.to }) {
    const { type, knob } = props;
    const { step, max, min } = this.#model.getSettings();
    const { value: fromValue } = this.#model.getFromControlState();
    const { value: toValue } = this.#model.getToControlState();

    const isPlus = type === STEP.plus;
    const isTo = knob === DRAGGING.to;
    const currentStep = isPlus ? step : -step;
    let value = isTo ? toValue + currentStep : fromValue + currentStep;
    value = isPlus ? Math.min(value, max) : Math.max(value, min);
    const percent = this.#getPercentByValue(value, min, max);

    if (isTo) this.#moveKnobTo({ percent, value });
    else this.#moveKnobFrom({ percent, value });
  }
}

export default Controller;
