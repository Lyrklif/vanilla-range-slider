import Observer from '../../../observer/observer';
import Line from '../../atoms/line/line';
import Fill from '../../atoms/fill/fill';
import { TSizes } from '../../atoms/line/types';

class Bar extends Observer {
  #line: Line;
  #fill: Fill | null;
  #boundBarClickHandler: (event: MouseEvent) => void;

  constructor(props: any) {
    super();

    const { invert, vertical, fill } = props;

    this.#boundBarClickHandler = this.#clickHandler.bind(this);
    this.#line = new Line({ invert, vertical });
    this.#fill = fill ? new Fill({ invert, vertical }) : null;

    this.#line.getHTML().addEventListener('click', this.#boundBarClickHandler);
  }

  getHTMLChildren() {
    const array = [this.#line.getHTML()];
    if (this.#fill) array.push(this.#fill.getHTML());
    return array;
  }
  getSize(): TSizes {
    return this.#line.getSize();
  }

  setFillStyle(startPercent: number, endPercent: number) {
    if (this.#fill) this.#fill.setStyle(startPercent, endPercent);
  }

  #clickHandler(event: MouseEvent) {
    this.notify('onBarClick', event);
  }
}

export default Bar;
