import * as redux from 'redux'

import { api } from '../api'
import * as state from '../reducers/index'

type APIAction<Q, S> = {
  request?: Q
  response?: S
  error?: string
}

export type Action =
// UI actions
   { type: 'INCREMENT_COUNTER', delta: number }
|  { type: 'RESET_COUNTER' }

// API Requests
| ({ type: 'SAVE_COUNT' } & APIAction<{ value: number }, {}>)
| ({ type: 'LOAD_COUNT' } & APIAction<undefined, { value: number }>)

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})

type apiFunc<Q, S> = (q: Q) => Promise<S>

function apiActionCreator<Q, S>(a: Action & APIAction<Q, S>, go: apiFunc<Q, S>) {
  return (request?: Q) => (dispatch: redux.Dispatch<state.All>) => {
    dispatch({ ...a, request })
    go(request)
      .then((response) => dispatch({ ...a, request, response }))
      .catch((e: Error) => dispatch({ ...a, request, error: e.toString() }))
  }
}

export const saveCount = apiActionCreator({ type: 'SAVE_COUNT' }, api.save)
export const loadCount = apiActionCreator({ type: 'LOAD_COUNT' }, api.load)
