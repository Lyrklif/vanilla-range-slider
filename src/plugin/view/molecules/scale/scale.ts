import { INVERT, SCALE, VERTICAL } from '../../../constants/classes';
import Mark from '../../atoms/mark/mark';
import { MAX_PERCENT } from '../../../constants/percents';

class Scale {
  #props;
  #elem: HTMLDivElement;

  constructor(props: any) {
    this.#props = props;
    this.#elem = this.#create();
  }

  getHTML(): HTMLDivElement {
    return this.#elem;
  }

  #create(): HTMLDivElement {
    const { min, max, step, vertical, invert } = this.#props;

    const values = [];
    for (let i = min; i <= max; i += step) {
      values.push(i);
    }

    const scale = document.createElement('div');
    scale.classList.add(SCALE);
    if (vertical) scale.classList.add(VERTICAL);
    if (invert) scale.classList.add(INVERT);

    values.forEach((value) => {
      const mark = new Mark({ invert, vertical });
      mark.getHTML().style.left = ((value - min) / (max - min)) * MAX_PERCENT + '%';
      scale.appendChild(mark.getHTML());
    });

    return scale;
  }
}

export default Scale;
