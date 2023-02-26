
type TParams = {
  min: number
  max: number
  step?: number
  invertDirection?: boolean
}

const createWrap = (): HTMLElement => {
  const wrap = document.createElement('div');
  wrap.className = 'vanilla-slider-ts';

  return wrap;
}

const setKnobStyle = (knob: HTMLElement, offsetPercent: number) => {
  knob.style.left = `${offsetPercent}%`
}

const createInput = (value: number|string): HTMLElement => {
  const input = document.createElement('input')
  input.type = 'number';
  input.setAttribute('value', `${value}`);
  input.className = 'vanilla-slider-ts__input';

  return input;
}

const createBar = (): HTMLElement => {
  const bar = document.createElement('div');
  bar.className = 'vanilla-slider-ts__bar';

  return bar;
}

const createKnob = (): HTMLElement => {
  const knob = document.createElement('button');
  knob.className = 'vanilla-slider-ts__control';

  return knob;
}

const getWrapMargin = (wrap: HTMLElement): number => {
  return wrap.getBoundingClientRect().left + window.scrollX;
};

const wrapSliderElements = (wrap: HTMLElement, children: Array<HTMLElement>) => {
  wrap.append(...children);
  return wrap;
}

const displaySlider = (htmlElement: HTMLElement | Element, wrap: HTMLElement) => {
  htmlElement.appendChild(wrap);
}

const setInputValue = (input: HTMLElement, value: number|string) => {
  input.setAttribute('value', `${value}`);
}
 

const controller = (htmlElement: HTMLElement | Element, params: TParams) => {
  const {
    min,
    max,
    step = 1,
    invertDirection = false,
  } = params

  let value = min
  let wrapMargin = 0
  let barWidth = 0
  let barHeight = 0
  
  const wrap  = createWrap()
  const input  = createInput(value)
  const bar  = createBar()
  const knob  = createKnob()

  setKnobStyle(knob, 0)


  const getKnobOffsetPercent = (knobOffset: number): number => {
    let offset = 0;

    if (barWidth > 0) {
      offset = knobOffset * 100 / barWidth;
      offset = Math.min(Math.max(offset, 0), 100);
    }

    return offset;
  }
  const calculateKnobOffsetPercent = (e: MouseEvent): number => {
    const knobOffset = e.clientX - wrapMargin;
    return getKnobOffsetPercent(knobOffset);
  }
  const calculateValueFromPercent = (persent: number, min: number, max: number, step: number): number => {
    let value = persent * max / 100;
    value = Math.round((value - min) / step) * step + min;
    return Number(value.toFixed(1));
  }
  const moveKnob = (e: MouseEvent) => {
    const percent = calculateKnobOffsetPercent(e);
    const value = calculateValueFromPercent(percent, min, max, step);

    setKnobStyle(knob, percent);
    setInputValue(input, value);
  }
  const stopDragging = () => {
    document.removeEventListener('mousemove', moveKnob)
    document.removeEventListener('mouseup', stopDragging)
  }
  const startDragging = () => {
    document.addEventListener('mousemove', moveKnob)
    document.addEventListener('mouseup', stopDragging)
  }

  const setSliderSizes = () => {
    wrapMargin = getWrapMargin(wrap)
    barWidth = bar.clientWidth
    barHeight = bar.clientHeight
  }

  knob.addEventListener('mousedown', startDragging)
  bar.addEventListener('click', moveKnob)
  window.addEventListener('resize', setSliderSizes)

  displaySlider(htmlElement, wrapSliderElements(wrap, [ knob, bar, input ]))
  setSliderSizes()
}

export default controller