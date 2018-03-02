type Q<T> = { request: T }
type S<T> = { response: T }
type E = { error: string }

type Value = { value: number }

type LoadCountAction =
  ({ type: 'LOAD_COUNT_REQUEST' } & Q<{}>)
| ({ type: 'LOAD_COUNT_SUCCESS' } & Q<{}> & S<Value>)
| ({ type: 'LOAD_COUNT_ERROR'   } & Q<{}> & E)

type SaveCountAction =
  ({ type: 'SAVE_COUNT_REQUEST' } & Q<Value>)
| ({ type: 'SAVE_COUNT_SUCCESS' } & Q<Value> & S<{}>)
| ({ type: 'SAVE_COUNT_ERROR'   } & Q<Value> & E)

export type Action =
  LoadCountAction
| SaveCountAction
| { type: 'INCREMENT_COUNTER', delta: number }
| { type: 'RESET_COUNTER' }

type _T = Action['type']

type ThunkActionGroup<TQ extends _T, TS extends _T, TE extends _T, _Q, _S> =
  ({ type: TQ } & Q<_Q>)
| ({ type: TS } & Q<_Q> & S<_S>)
| ({ type: TE } & Q<_Q> & E)

type Dispatch<A> = (a: A) => A
type Thunk<Q, S> = (request: Q) => Promise<S>

export const createThunkAction = <Q, S, TQ extends _T, TS extends _T, TE extends _T>
  (fn: Thunk<Q, S>, tq: TQ, ts: TS, te: TE) =>
    (request: Q) =>
      (dispatch: Dispatch<ThunkActionGroup<TQ, TS, TE, Q, S>>) => {
        dispatch({ type: tq, request })
        fn(request)
          .then(response => dispatch({ type: ts, request, response }))
          .catch(err => dispatch({ type: te, request, error: err.message }))
      }
