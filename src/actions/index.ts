export type Action = {
  type: 'INCREMENT_COUNTER',
  delta: number,
} | {
  type: 'RESET_COUNTER',
}

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})
