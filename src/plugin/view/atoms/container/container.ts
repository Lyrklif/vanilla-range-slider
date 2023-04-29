import { VERTICAL, INVERT, WRAPPER } from '../../../constants/classes';
import type { TContainer } from '../../../model/types';
import type { TContainerProps } from './types';

class Container {
  #props: TContainerProps;
  #elem: HTMLDivElement;

  constructor(props: TContainerProps) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  getOffsets(): TContainer {
    const { top, left } = this.#elem.getBoundingClientRect();
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
