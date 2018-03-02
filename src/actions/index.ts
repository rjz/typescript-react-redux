import { api } from '../api'

import * as state from '../reducers/index'

type Q<T> = { request: T }
type S<T> = { response: T }
type E = { error: Error }

type QEmpty = Q<{}>
type QValue = Q<{ value: number }>

export interface Dispatch<A> {
  (a: A): A
}

type _T = Action['type']

type APIActionGroup<TQ extends _T, TS extends _T, TE extends _T, _Q, _S> =
  ({ type: TQ } & Q<_Q>)
| ({ type: TS } & Q<_Q> & S<_S>)
| ({ type: TE } & Q<_Q> & E)

type Thunk<Q, S> = (request: Q) => Promise<S>

const createThunkAction = <Q, S, TQ extends _T, TS extends _T, TE extends _T>
  (fn: Thunk<Q, S>, tq: TQ, ts: TS, te: TE) =>
    (request: Q) =>
      (dispatch: Dispatch<APIActionGroup<TQ, TS, TE, Q, S>>) => {
        dispatch({ type: tq, request })
        fn(request)
          .then(response => dispatch({ type: ts, request, response }))
          .catch(error => dispatch({ type: te, request, error }))
      }

type LoadAction =
  ({ type: 'LOAD_COUNT_REQUEST' } & QEmpty)
| ({ type: 'LOAD_COUNT_SUCCESS' } & QEmpty & S<{ value: number }>)
| ({ type: 'LOAD_COUNT_ERROR'   } & QEmpty & E)

type SaveAction =
  ({ type: 'SAVE_COUNT_REQUEST' } & QValue)
| ({ type: 'SAVE_COUNT_SUCCESS' } & QValue & S<{}>)
| ({ type: 'SAVE_COUNT_ERROR'   } & QValue & E)

export type Action =
  LoadAction
| SaveAction
// UI actions
|  { type: 'INCREMENT_COUNTER', delta: number }
|  { type: 'RESET_COUNTER' }

export const saveCount = createThunkAction(api.save,
  'SAVE_COUNT_REQUEST',
  'SAVE_COUNT_SUCCESS',
  'SAVE_COUNT_ERROR')

export const loadCount = createThunkAction(api.load,
  'LOAD_COUNT_REQUEST',
  'LOAD_COUNT_SUCCESS',
  'LOAD_COUNT_ERROR')

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})
