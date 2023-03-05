import { MIN_PERCENT } from '../constants/percents';

import Model from '../model/model';
import View from '../view/View';
import Observer from '../observer/observer';

import type { TSliderProps } from './types';
import { NOTICE } from '../types/notive';

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

    this.#updateSizes();
    this.#updFillStyle();
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
}

export default Controller;
