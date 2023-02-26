
type TParams = {
  min: number
  max: number
  step?: number
}

const createWrap = (): HTMLElement => {
  const wrap = document.createElement('div')
  wrap.setAttribute('class', 'vanilla-slider-ts')

  return wrap
}

const createInput = (value: string|number): HTMLElement => {
  const input = document.createElement('input')
  input.setAttribute('type', 'number')
  input.setAttribute('value', `${value}`)
  input.setAttribute('class', 'vanilla-slider-ts__input')

  return input
}

const createBar = (): HTMLElement  => {
  const bar = document.createElement('div')
  bar.setAttribute('class', 'vanilla-slider-ts__bar')

  return bar
}

const createKnob = (): HTMLElement => {
  const knob = document.createElement('button')
  knob.setAttribute('class', 'vanilla-slider-ts__control')

  return knob
}

const getWrapMargin = (wrap: HTMLElement): number => {
  return wrap.getBoundingClientRect().left
}

const displaySlider = (htmlElement: HTMLElement | Element, wrap: HTMLElement, children: Array<HTMLElement>) => {
  children.forEach(element => {
    wrap.appendChild(element)
  });

  htmlElement.appendChild(wrap)
}

const controller = (htmlElement: HTMLElement | Element, params: TParams) => {
  const {
    min,
    max,
    step = 1,
  } = params

  let value = min
  let wrapMargin = 0
  
  const wrap  = createWrap()
  const input  = createInput(value)
  const bar  = createBar()
  const knob  = createKnob()

  knob.style.cssText = `left: ${0}%`

  const getKnobOffsetPercent = (knobOffset: number): number => {
    let left = knobOffset * 100 / bar.clientWidth
    if (left < 0) left = 0
    else if (left > 100) left = 100
    return left
  }
  const moveKnob = (e: MouseEvent) => {
    let knobOffset = e.clientX - wrapMargin
    let left = getKnobOffsetPercent(knobOffset)
    knob.style.cssText = `left: ${left}%`

    value = left * max / 100
    const valueWithStep = Number((Math.round((value - min) / step) * step + min).toFixed(1));

    input.setAttribute('value', `${valueWithStep}`)
  }
  const stopDragging = () => {
    document.removeEventListener('mousemove', moveKnob)
    document.removeEventListener('mouseup', stopDragging)
  }
  const startDragging = () => {
    document.addEventListener('mousemove', moveKnob)
    document.addEventListener('mouseup', stopDragging)
  }

  const initSlider = () => {
    wrapMargin = getWrapMargin(wrap)
  }

  knob.addEventListener('mousedown', startDragging)
  window.addEventListener('resize', initSlider)

 
  displaySlider(htmlElement, wrap, [ knob, bar, input ])
  initSlider()
}

export default controller