import { MAX_PERCENT, MIN_PERCENT } from '../constants/percents';

import Model from '../model/model';
import View from '../view/View';
import Observer from '../observer/observer';

import type { TSliderProps } from './types';

class Controller extends Observer {
  #model: Model;
  #view: View;

  readonly #boundMoveKnob: (event: MouseEvent) => void;
  readonly #boundUpdateSizes: () => void;

  constructor(parentHTML: HTMLElement | Element, props: TSliderProps) {
    super();

    this.#model = new Model(props);
    this.#view = new View(parentHTML, {
      invert: this.#model.getSettings().invert,
      vertical: this.#model.getSettings().vertical,
      range: this.#model.getSettings().range,
      from: this.#model.getFromControlState(),
      to: this.#model.getToControlState(),
    });

    this.#boundMoveKnob = this.#moveKnob.bind(this);
    this.#boundUpdateSizes = this.#updateSizes.bind(this);

    this.#view.subscribe('onResize', this.#boundUpdateSizes);
    this.#view.subscribe('onMouseMove', this.#boundMoveKnob);

    this.#boundUpdateSizes();
  }

  #updateSizes(): void {
    const { height, width } = this.#view.getBar().getSize();
    const margin = this.#view.getContainer().getMargin();

    this.#model.setContainerState({ margin });
    this.#model.setBarState({ height, width });
  }

  #moveKnob(event: MouseEvent): void {
    const { vertical, min, max, step, invert } = this.#model.getSettings();
    const bar = this.#model.getBarState();

    const getKnobOffsetPercent = (knobOffset: number): number => {
      let offset = MIN_PERCENT;
      const size = vertical ? bar.height : bar.width;
      if (size > MIN_PERCENT) {
        offset = (knobOffset * MAX_PERCENT) / size;
        offset = (vertical && !invert) || (!vertical && invert) ? MAX_PERCENT - offset : offset;
        offset = Math.max(MIN_PERCENT, Math.min(offset, MAX_PERCENT));
      }
      return offset;
    };
    const calculateKnobOffsetPercent = (event: MouseEvent): number => {
      const size: number = vertical ? event.clientY : event.clientX;
      const knobOffset: number = size - this.#model.getContainerState().margin;
      return getKnobOffsetPercent(knobOffset);
    };
    const calculateValueFromPercent = (percent: number): number => {
      let value = (percent * max) / MAX_PERCENT;
      value = Math.round((value - min) / step) * step + min;
      return Number(value.toFixed(1));
    };

    const percent = calculateKnobOffsetPercent(event);
    const value = calculateValueFromPercent(percent);

    this.#view.getFrom().knob.setStyle(percent);
    this.#view.getFrom().input.setValue(value);
    this.#model.setFromControlState({ value, percent });
  }
}

export default Controller;
