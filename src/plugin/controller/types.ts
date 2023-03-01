type TSliderProps = {
  min: number
  max: number
  step?: number
  invert?: boolean
  vertical?: boolean
  range?: boolean
}

type TSliderSettings = {
  min: number
  max: number
  step: number
  invert: boolean
  vertical: boolean
  range: boolean
}


export type {
  TSliderProps,
  TSliderSettings,
}