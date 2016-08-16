import { combineReducers } from 'redux'

import {
  IncrementCounter,
  DecrementCounter,
} from '../actions'

export namespace Store {

  export type Counter = { value: number }

  export type All = {
    counter: Counter
  }
}

const initialState: Store.Counter = {
  value: 0,
}

function counter (state: Store.Counter = initialState, action: IncrementCounter | DecrementCounter): Store.Counter {
  const { value } = state
  switch (action.type) {
    case 'INCREMENT_COUNTER': // not checked, pending Microsoft/TypeScript#9407
      const { payload } = action as IncrementCounter
      const newValue = value + payload.delta
      return { value: newValue }
  }

  return state
}

export const reducers = combineReducers<Store.All>({
  counter,
})
