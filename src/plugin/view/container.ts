import { VERTICAL, INVERT, WRAPPER } from '../constants/classes';

type TContainerProps = {
  invert: boolean;
  vertical: boolean;
  classes?: string;
};

class Container {
  #props: TContainerProps;
  readonly #container: HTMLDivElement;

  constructor(props: TContainerProps) {
    this.#props = props;
    this.#container = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#container;
  }

  getMargin(): number {
    const rect = this.#container.getBoundingClientRect();
    const scrollOffset = this.#props.vertical ? window.scrollY : window.scrollX;

    return rect[this.#props.vertical ? 'top' : 'left'] + scrollOffset;
  }

  #create(): HTMLDivElement {
    const wrap = document.createElement('div');
    wrap.classList.add(WRAPPER);
    if (this.#props.invert) wrap.classList.add(INVERT);
    if (this.#props.vertical) wrap.classList.add(VERTICAL);
    if (this.#props.classes) wrap.classList.add(this.#props.classes);

    return wrap;
  }
}

export default Container;
