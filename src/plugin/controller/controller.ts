
type TParams = {
  min: number
  max: number
  step?: number
  invertDirection?: boolean
}

const createWrap = (invert: boolean): HTMLDivElement => {
  const wrap = document.createElement('div');
  wrap.className = 'vanilla-slider-ts';
  if (invert) wrap.classList.add('invert');

  return wrap;
}

const setKnobStyle = (knob: HTMLElement, offsetPercent: number, offsetPositionName: string) => {
  knob.style.cssText = `${offsetPositionName}: ${offsetPercent}%`
}

const createInput = (value: number|string, invert: boolean): HTMLInputElement => {
  const input = document.createElement('input')
  input.type = 'number';
  input.setAttribute('value', `${value}`);
  input.className = 'vanilla-slider-ts__input';
  if (invert) input.classList.add('invert');

  return input;
}

const createBar = (invert: boolean): HTMLDivElement => {
  const bar = document.createElement('div');
  bar.className = 'vanilla-slider-ts__bar';
  if (invert) bar.classList.add('invert');

  return bar;
}

const createKnob = (invert: boolean): HTMLButtonElement => {
  const knob = document.createElement('button');
  knob.className = 'vanilla-slider-ts__control';
  if (invert) knob.classList.add('invert');

  return knob;
}

const getWrapMargin = (wrap: HTMLDivElement, side: string): number => {
  // @ts-ignore
  // return wrap.getBoundingClientRect()[side] + window.scrollX;
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

const getOffsetPositionName = (invertDirection: boolean): string => {
  return invertDirection ? 'right' : 'left'
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
  let sideName = getOffsetPositionName(invertDirection)
  const MAX_PERCENT = 100

  
  const wrap: HTMLDivElement  = createWrap(invertDirection)
  const input: HTMLInputElement  = createInput(value, invertDirection)
  const bar: HTMLDivElement  = createBar(invertDirection)
  const knob: HTMLButtonElement  = createKnob(invertDirection)

  setKnobStyle(knob, 0, sideName)


  const getKnobOffsetPercent = (knobOffset: number): number => {
    let offset = 0;

    if (barWidth <= 0 ) return offset

    offset = knobOffset * MAX_PERCENT / barWidth;
    
    if (invertDirection) {
      offset = 100 - offset
    }

    offset = Math.min(Math.max(offset, 0), MAX_PERCENT);

    return offset;
  }
  const calculateKnobOffsetPercent = (e: MouseEvent): number => {
    let knobOffset = e.clientX - wrapMargin;
    return getKnobOffsetPercent(knobOffset);
  }
  const calculateValueFromPercent = (persent: number, min: number, max: number, step: number): number => {
    let value = persent * max / MAX_PERCENT;
    value = Math.round((value - min) / step) * step + min;
    return Number(value.toFixed(1));
  }
  const moveKnob = (e: MouseEvent) => {
    const percent = calculateKnobOffsetPercent(e);
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
    wrapMargin = getWrapMargin(wrap, sideName)
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