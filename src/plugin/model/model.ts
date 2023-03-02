import type { TSliderProps, TSliderSettings } from '../controller/types';
import type { TSliderState, TContainer, TBar, TControl } from './types';

class Model {
  #settings: TSliderSettings;
  #state: TSliderState;

  constructor(settings: TSliderProps) {
    this.#settings = {
      min: settings.min ?? 0,
      max: settings.max,
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
        value: 0,
        percent: 0,
      },
      to: {
        value: 0,
        percent: 0,
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
