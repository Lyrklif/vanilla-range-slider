import { MIN_PERCENT } from '../constants/percents';

import Model from '../model/model';
import View from '../view/View';
import Observer from '../observer/observer';

import type { TSliderProps } from './types';

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

    this.#view.subscribe('onResize', this.#updateSizes.bind(this));
    this.#view.subscribe('onMouseMoveFrom', this.#moveKnobFrom.bind(this));
    this.#view.subscribe('onMouseMoveTo', this.#moveKnobTo.bind(this));

    this.#updateSizes();
    this.#updFillStyle();
  }

  #updateSizes() {
    const { height, width } = this.#view.getBar().getSize();
    const offsets = this.#view.getContainer().getOffsets();

    this.#model.setContainerState(offsets);
    this.#model.setBarState({ height, width });
  }
  #updFillStyle() {
    const { range } = this.#model.getSettings();
    const { percent: fromPercent } = this.#model.getFromControlState();
    const { percent: toPercent } = this.#model.getToControlState();
    if (range) {
      this.#view.getBar().setFillStyle(fromPercent, toPercent - fromPercent);
    } else {
      this.#view.getBar().setFillStyle(MIN_PERCENT, toPercent);
    }
  }
  #moveKnobFrom(props: { value: number; percent: number }) {
    const { value, percent } = props;
    this.#view.getFields().setFrom(value);
    this.#view.getControls().setFromPercent(percent);
    this.#model.setFromControlState({ value, percent });
    this.#updFillStyle();
  }
  #moveKnobTo(props: { value: number; percent: number }) {
    const { value, percent } = props;
    this.#view.getFields().setTo(value);
    this.#view.getControls().setToPercent(percent);
    this.#model.setToControlState({ value, percent });
    this.#updFillStyle();
  }
}

export default Controller;
