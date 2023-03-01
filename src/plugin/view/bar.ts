import { BAR, VERTICAL, INVERT } from '../constants/classes';

type TBarProps = {
  invert: boolean;
  vertical: boolean;
  classes?: string;
};

class Bar {
  #props: TBarProps;
  #bar: HTMLDivElement;

  constructor(props: TBarProps) {
    this.#props = props;
    this.#bar = this.#create();
  }

  public getHTML(): HTMLDivElement {
    return this.#bar;
  }

  public getSize(): { width: number; height: number } {
    const { clientWidth: width, clientHeight: height } = this.#bar;
    return { width, height };
  }

  #create(): HTMLDivElement {
    const { invert, vertical, classes } = this.#props;
    const bar = document.createElement('div');
    bar.classList.add(BAR);
    if (invert) bar.classList.add(INVERT);
    if (vertical) bar.classList.add(VERTICAL);
    if (classes) bar.classList.add(classes);
    return bar;
  }
}

export default Bar;
