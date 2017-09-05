import { combineReducers } from 'redux'

import { Action } from '../actions'

export type Counter = { value: number }

export type All = {
  counter: Counter,
  isSaving: boolean,
  isLoading: boolean,
  error: string,
}

function isSaving (state: boolean = false, action: Action): boolean {
  if (action.type === 'SAVE_COUNT') {
    // `SAVE_COUNT` is a partial action. We'll check its payload to determine
    // whether this instance describes its resolution.
    // See: https://goo.gl/FYWGpr
    return !action.response && !action.error
  }
  return state
}

function isLoading (state: boolean = false, action: Action): boolean {
  if (action.type === 'LOAD_COUNT') {
    return !action.response && !action.error
  }
  return state
}

function error (state: string = '', action: Action): string {
  switch (action.type) {
    case 'LOAD_COUNT':
    case 'SAVE_COUNT':
      return action.error || ''
    default:
      return state
  }
}

const initialState: Counter = {
  value: 0,
}

function counter (state: Counter = initialState, action: Action): Counter {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const { delta } = action
      return { value: state.value + delta }

    case 'RESET_COUNTER':
      return { value: 0 }

    case 'LOAD_COUNT': {
      const { response } = action
      if (response) {
        // If `response` is set, `LOAD_COUNT` is "resolved"
        // See: https://goo.gl/FYWGpr
        return { value: response.value }
      }
    }

    default:
      return state
  }
}

export const reducers = combineReducers<All>({
  counter,
  isSaving,
  isLoading,
  error,
})
