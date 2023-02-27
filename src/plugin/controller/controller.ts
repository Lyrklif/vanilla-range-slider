
type TParams = {
  min: number
  max: number
  step?: number
  invert?: boolean
  vertical?: boolean
}

const MAX_PERCENT: number = 100
const MIN_PERCENT: number = 0


const createWrap = (invert: boolean, vertical: boolean): HTMLDivElement => {
  const wrap = document.createElement('div');
  wrap.className = 'vanilla-slider-ts';
  if (invert) wrap.classList.add('invert');
  if (vertical) wrap.classList.add('vertical');

  return wrap;
}

const setKnobStyle = (knob: HTMLButtonElement, percent: number, side: string) => {
  knob.style.cssText = `${side}: ${percent}%`
}

const createInput = (value: number|string, invert: boolean, vertical: boolean): HTMLInputElement => {
  const input = document.createElement('input')
  input.type = 'number';
  input.setAttribute('value', `${value}`);
  input.className = 'vanilla-slider-ts__input';
  if (invert) input.classList.add('invert');
  if (vertical) input.classList.add('vertical');

  return input;
}

const createBar = (invert: boolean, vertical: boolean): HTMLDivElement => {
  const bar = document.createElement('div');
  bar.className = 'vanilla-slider-ts__bar';
  if (invert) bar.classList.add('invert');
  if (vertical) bar.classList.add('vertical');

  return bar;
}

const createKnob = (invert: boolean, vertical: boolean): HTMLButtonElement => {
  const knob = document.createElement('button');
  knob.className = 'vanilla-slider-ts__control';
  if (invert) knob.classList.add('invert');
  if (vertical) knob.classList.add('vertical');

  return knob;
}

const getWrapMargin = (wrap: HTMLDivElement, vertical: boolean): number => {
  const rect = wrap.getBoundingClientRect();
  const scrollOffset = vertical ? window.scrollY : window.scrollX;

  return rect[vertical ? 'top' : 'left'] + scrollOffset;
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

const getSideName = (invert: boolean, vertical: boolean): string => {
  return invert ? (vertical ? 'top' : 'right') : (vertical ? 'bottom' : 'left')
}
 

const controller = (htmlElement: HTMLElement | Element, params: TParams) => {
  const {
    min,
    max,
    step = 1,
    invert = false,
    vertical = false,
  } = params

  let value = min
  let wrapMargin = 0
  let barWidth = 0
  let barHeight = 0
  let sideName = getSideName(invert, vertical)

  
  const wrap: HTMLDivElement  = createWrap(invert, vertical)
  const input: HTMLInputElement  = createInput(value, invert, vertical)
  const bar: HTMLDivElement  = createBar(invert, vertical)
  const knob: HTMLButtonElement  = createKnob(invert, vertical)

  setKnobStyle(knob, MIN_PERCENT, sideName)


  const getKnobOffsetPercent = (knobOffset: number, vertical: boolean): number => {
    let offset = MIN_PERCENT;
    const size = vertical ? barHeight : barWidth;

    if (size > MIN_PERCENT) {
      offset = knobOffset * MAX_PERCENT / size;
      offset = (vertical && !invert) || (!vertical && invert) ? MAX_PERCENT - offset : offset;
      offset = Math.max(MIN_PERCENT, Math.min(offset, MAX_PERCENT));
    }

    return offset;
  }

  
  const calculateKnobOffsetPercent = (e: MouseEvent, vertical: boolean): number => {
    const size: number = vertical ? e.clientY : e.clientX
    const knobOffset: number = size - wrapMargin;
    return getKnobOffsetPercent(knobOffset, vertical);
  }

  
  const calculateValueFromPercent = (persent: number, min: number, max: number, step: number): number => {
    let value = persent * max / MAX_PERCENT;
    value = Math.round((value - min) / step) * step + min;
    return Number(value.toFixed(1));
  }

  
  const moveKnob = (e: MouseEvent) => {
    const percent = calculateKnobOffsetPercent(e, vertical);
    const value = calculateValueFromPercent(percent, min, max, step);

    setKnobStyle(knob, percent, sideName);
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
    wrapMargin = getWrapMargin(wrap, vertical)
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