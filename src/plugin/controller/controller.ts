import { MAX_PERCENT, MIN_PERCENT } from '../constants/percents';

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
      invert: this.#model.getSettings().invert,
      vertical: this.#model.getSettings().vertical,
      range: this.#model.getSettings().range,
      from: this.#model.getFromControlState(),
      to: this.#model.getToControlState(),
    });

    this.#view.subscribe('onResize', this.#updateSizes.bind(this));
    this.#view.subscribe('onMouseMoveFrom', this.#moveKnobFrom.bind(this));
    this.#view.subscribe('onMouseMoveTo', this.#moveKnobTo.bind(this));

    this.#updateSizes();
  }

  #updateSizes() {
    const { height, width } = this.#view.getBar().getSize();
    const offsets = this.#view.getContainer().getOffsets();

    this.#model.setContainerState(offsets);
    this.#model.setBarState({ height, width });
  }

  #moveKnobFrom(event: MouseEvent) {
    const { percent, value } = this.#moveKnob(event);
    this.#view.getFields().setFrom(value);
    this.#view.getControls().setFromPercent(percent);
    this.#model.setFromControlState({ value, percent });
  }

  #moveKnobTo(event: MouseEvent) {
    const { percent, value } = this.#moveKnob(event);
    this.#view.getFields().setTo(value);
    this.#view.getControls().setToPercent(percent);
    this.#model.setToControlState({ value, percent });
  }

  #moveKnob(event: MouseEvent): { percent: number; value: number } {
    const { vertical, min, max, step, invert } = this.#model.getSettings();
    const { left, top } = this.#model.getContainerState();
    const bar = this.#model.getBarState();

    const containerMargin: number = vertical ? top : left;
    const size: number = vertical ? event.clientY : event.clientX;
    const knobOffset: number = size - containerMargin;
    const barSize: number = vertical ? bar.height : bar.width;
    let offset = MIN_PERCENT;

    if (barSize > MIN_PERCENT) {
      offset = (knobOffset * MAX_PERCENT) / barSize;
      offset = (vertical && !invert) || (!vertical && invert) ? MAX_PERCENT - offset : offset;
      offset = Math.max(MIN_PERCENT, Math.min(offset, MAX_PERCENT));
    }
    const percent = offset;
    let value = Number((percent * max) / MAX_PERCENT);
    value = Math.round((value - min) / step) * step + min;
    value = Number(value.toFixed(1));

    return { percent, value };
  }
}

export default Controller;
