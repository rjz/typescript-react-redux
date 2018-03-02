type Q<T> = { request: T }
type S<T> = { response: T }
type E = { error: Error }

type QEmpty = Q<{}>
type QValue = Q<{ value: number }>

type LoadCount =
    ({ type: 'LOAD_COUNT_REQUEST' } & QEmpty)
  | ({ type: 'LOAD_COUNT_SUCCESS' } & QEmpty & S<{ value: number }>)
  | ({ type: 'LOAD_COUNT_ERROR'   } & QEmpty & E)

type SaveCount =
    ({ type: 'SAVE_COUNT_REQUEST' } & QValue)
  | ({ type: 'SAVE_COUNT_SUCCESS' } & QValue & S<{}>)
  | ({ type: 'SAVE_COUNT_ERROR'   } & QValue & E)

export type Action =
  LoadCount
| SaveCount
| { type: 'INCREMENT_COUNTER', delta: number }
| { type: 'RESET_COUNTER' }

type _T = Action['type']

type APIActionGroup<TQ extends _T, TS extends _T, TE extends _T, _Q, _S> =
  ({ type: TQ } & Q<_Q>)
| ({ type: TS } & Q<_Q> & S<_S>)
| ({ type: TE } & Q<_Q> & E)

type Dispatch<A> = (a: A) => A
type Thunk<Q, S> = (request: Q) => Promise<S>

export const createThunkAction = <Q, S, TQ extends _T, TS extends _T, TE extends _T>
  (fn: Thunk<Q, S>, tq: TQ, ts: TS, te: TE) =>
    (request: Q) =>
      (dispatch: Dispatch<APIActionGroup<TQ, TS, TE, Q, S>>) => {
        dispatch({ type: tq, request })
        fn(request)
          .then(response => dispatch({ type: ts, request, response }))
          .catch(error => dispatch({ type: te, request, error }))
      }
