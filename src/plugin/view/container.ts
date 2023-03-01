import { VERTICAL, INVERT, WRAPPER } from '../constants/classes';

type TContainerProps = {
  invert: boolean;
  vertical: boolean;
  classes?: string;
};

class Container {
  #props: TContainerProps;
  #container: HTMLDivElement;

  constructor(props: TContainerProps) {
    this.#props = props;
    this.#container = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#container;
  }

  getMargin(): number {
    const { vertical } = this.#props;
    const rect = this.#container.getBoundingClientRect();
    const scrollOffset = vertical ? window.scrollY : window.scrollX;

    return rect[vertical ? 'top' : 'left'] + scrollOffset;
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes } = this.#props;
    const container = document.createElement('div');
    container.classList.add(WRAPPER);
    if (invert) container.classList.add(INVERT);
    if (vertical) container.classList.add(VERTICAL);
    if (classes) container.classList.add(classes);

    return container;
  }
}


export default Container;
