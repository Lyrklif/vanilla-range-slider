enum DRAGGING {
  from = 'moveFrom',
  to = 'moveTo',
}

enum DIRECTION_CODE {
  left = 'ArrowLeft',
  right = 'ArrowRight',
  top = 'ArrowUp',
  bottom = 'ArrowDown',
}

enum STEP {
  plus = 'plus',
  minus = 'minus',
}

type TDragging = DRAGGING.from | DRAGGING.to;

export { DRAGGING, DIRECTION_CODE, STEP };
export type { TDragging };
