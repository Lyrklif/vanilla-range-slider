import Observer from '../../../observer/observer';
import Line from '../../atoms/line/line';
import Fill from '../../atoms/fill/fill';
import { TSizes } from '../../atoms/line/types';
import { NOTICE } from '../../../types/notive';
import Scale from '../../molecules/scale/scale';

class Bar extends Observer {
  #line: Line;
  #fill: Fill | null;
  #scale: Scale | null;
  #boundBarClickHandler: (event: MouseEvent) => void;

  constructor(props: any) {
    super();

    const { invert, vertical, fill, scale, step, min, max } = props;

    this.#boundBarClickHandler = this.#clickHandler.bind(this);
    this.#line = new Line({ invert, vertical });
    this.#fill = fill ? new Fill({ invert, vertical }) : null;
    this.#scale = scale ? new Scale({ invert, vertical, step, min, max }) : null;

    this.#line.getHTML().addEventListener('click', this.#boundBarClickHandler);
  }

  getHTMLChildren() {
    const array = [this.#line.getHTML()];
    if (this.#fill) array.push(this.#fill.getHTML());
    if (this.#scale) array.push(this.#scale.getHTML());
    return array;
  }
  getSize(): TSizes {
    return this.#line.getSize();
  }
  setFillStyle(startPercent: number, endPercent: number) {
    if (this.#fill) this.#fill.setStyle(startPercent, endPercent);
  }

  #clickHandler(event: MouseEvent) {
    this.notify(NOTICE.barClick, event);
  }
}

export default Bar;
