import type { TSliderProps, TSliderSettings } from '../controller/types';
import type { TSliderState, TContainer, TBar, TControl } from './types';
import { MIN_PERCENT } from '../constants/percents';
import { modeFree } from '../controller/types';

class Model {
  #settings: TSliderSettings;
  #state: TSliderState;

  constructor(settings: TSliderProps) {
    this.#settings = {
      min: settings.min,
      max: settings.max,
      mode: settings.mode || modeFree,
      step: settings.step || 1,
      invert: !!settings.invert,
      vertical: !!settings.vertical,
      range: !!settings.range,
    };

    this.#state = {
      container: {
        top: 0,
        left: 0,
      },
      bar: {
        height: 0,
        width: 0,
      },
      from: {
        value: this.#settings.min,
        percent: MIN_PERCENT,
      },
      to: {
        value: this.#settings.min,
        percent: MIN_PERCENT,
      },
    };
  }

  getSettings(): TSliderSettings {
    return this.#settings;
  }

  getContainerState(): TContainer {
    return this.#state.container;
  }

  getBarState(): TBar {
    return this.#state.bar;
  }

  getFromControlState(): TControl {
    return this.#state.from;
  }

  getToControlState(): TControl {
    return this.#state.to;
  }

  setSettings(settings: TSliderSettings) {
    this.#settings = settings;
  }

  setContainerState(props: TContainer) {
    this.#state.container = props;
  }

  setBarState(props: TBar) {
    this.#state.bar = props;
  }

  setFromControlState(props: TControl) {
    this.#state.from = props;
  }

  setToControlState(props: TControl) {
    this.#state.to = props;
  }
}

export default Model;
