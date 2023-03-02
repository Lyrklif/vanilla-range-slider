import { VERTICAL, INVERT, WRAPPER } from '../constants/classes';
import { TContainer } from '../model/types';

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

  getOffsets(): TContainer {
    const { top, left } = this.#container.getBoundingClientRect();
    return { top, left };
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
