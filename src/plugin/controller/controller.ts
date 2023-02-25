
type TParams = {
  min: number
  max: number
  step?: number
}

const controller = (htmlElement: HTMLElement | Element, params: TParams) => {
  const {
    min,
    max,
    step = 1,
  } = params

  let value = min

  const wrap = document.createElement('div')
  wrap.setAttribute('class', 'vanilla-slider-ts')

  const input = document.createElement('input')
  input.setAttribute('type', 'number')
  input.setAttribute('value', `${value}`)
  input.setAttribute('class', 'vanilla-slider-ts__input')
  
  const bar = document.createElement('div')
  bar.setAttribute('class', 'vanilla-slider-ts__bar')
  
  const knob = document.createElement('button')
  knob.setAttribute('class', 'vanilla-slider-ts__control')
  knob.style.cssText = `left: ${0}%`

  const getKnobOffsetPercent = (knobOffset: number): number => {
    let left = knobOffset * 100 / bar.clientWidth
    if (left < 0) left = 0
    else if (left > 100) left = 100
    return left
  }
  const moveKnob = (e: MouseEvent) => {
    let knobOffset = e.clientX - wrapLeft
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

  knob.addEventListener('mousedown', startDragging)
 
  wrap.appendChild(knob)
  wrap.appendChild(bar)
  wrap.appendChild(input)
  htmlElement.appendChild(wrap)

  const wrapLeft = wrap.getBoundingClientRect().left
}

export default controller