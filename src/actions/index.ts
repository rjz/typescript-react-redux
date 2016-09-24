export type Action = {
  type: 'INCREMENT_COUNTER',
  delta: number,
} | {
  type: 'DECREMENT_COUNTER',
  delta: number,
}

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const decrementCounter = (delta: number): Action => ({
  type: 'DECREMENT_COUNTER',
  delta,
})
