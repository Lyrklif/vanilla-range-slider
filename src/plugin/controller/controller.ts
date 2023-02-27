
type TParams = {
  min: number
  max: number
  step?: number
  invert?: boolean
  vertical?: boolean
}

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
  const rect = wrap.getBoundingClientRect()

  if (vertical) return rect.top + window.scrollY
  return rect.left + window.scrollX
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
  const MAX_PERCENT = 100

  
  const wrap: HTMLDivElement  = createWrap(invert, vertical)
  const input: HTMLInputElement  = createInput(value, invert, vertical)
  const bar: HTMLDivElement  = createBar(invert, vertical)
  const knob: HTMLButtonElement  = createKnob(invert, vertical)

  setKnobStyle(knob, 0, sideName)


  const getKnobOffsetPercent = (knobOffset: number, vertical: boolean): number => {
    let offset = 0;
    const size = vertical ? barHeight : barWidth

    if (size <= 0 ) return offset

    offset = knobOffset * MAX_PERCENT / size;
    
    if ((vertical && !invert) || (!vertical && invert)) {
      offset = 100 - offset
    }

    offset = Math.min(Math.max(offset, 0), MAX_PERCENT);

    return offset;
  }
  const calculateKnobOffsetPercent = (e: MouseEvent, vertical: boolean): number => {
    const size = vertical ? e.clientY : e.clientX
    let knobOffset = size - wrapMargin;
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