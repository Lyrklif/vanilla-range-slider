import { BAR, VERTICAL, INVERT } from '../constants/classes';

type TBarProps = {
  invert: boolean;
  vertical: boolean;
  classes?: string;
};

class Bar {
  #props: TBarProps;
  readonly #bar: HTMLDivElement;

  constructor(props: TBarProps) {
    this.#props = props;
    this.#bar = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#bar;
  }

  getSize(): { width: number; height: number } {
    return {
      width: this.getHTML().clientWidth,
      height: this.getHTML().clientHeight,
    };
  }

  #create(): HTMLDivElement {
    const bar = document.createElement('div');
    bar.classList.add(BAR);
    if (this.#props.invert) bar.classList.add(INVERT);
    if (this.#props.vertical) bar.classList.add(VERTICAL);
    if (this.#props.classes) bar.classList.add(this.#props.classes);

    return bar;
  }
}

export default Bar;
