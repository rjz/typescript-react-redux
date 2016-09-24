import { combineReducers } from 'redux'

import { Action } from '../actions'

export namespace Store {

  export type Counter = { value: number }

  export type All = {
    counter: Counter
  }
}

const initialState: Store.Counter = {
  value: 0,
}

function counter (state: Store.Counter = initialState, action: Action): Store.Counter {
  const { value } = state
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const newValue = value + action.delta
      return { value: newValue }
  }

  return state
}

export const reducers = combineReducers<Store.All>({
  counter,
})
