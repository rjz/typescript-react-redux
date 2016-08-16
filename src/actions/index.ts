export interface Action<T, P> {
  type: T
  payload?: P
}

type CounterActionTypes = 'INCREMENT_COUNTER' | 'DECREMENT_COUNTER'

type IncrementCounterPayload = { delta: number }

export type IncrementCounter = Action<CounterActionTypes, IncrementCounterPayload>

export const incrementCounter = (delta: number): IncrementCounter => ({
  type: 'INCREMENT_COUNTER',
  payload: { delta },
})

type DecrementCounterPayload = { delta: number }

export type DecrementCounter = Action<CounterActionTypes, DecrementCounterPayload>

export const decrementCounter = (delta: number): DecrementCounter => ({
  type: 'INCREMENT_COUNTER',
  payload: { delta },
})
