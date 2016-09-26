type Q<T> = { request: T }
type S<T> = { response: T }
type E = { error: Error }

type QEmpty = Q<null>
type QValue = Q<{ value: number }>

export type Action =
// UI actions
   { type: 'INCREMENT_COUNTER', delta: number }
|  { type: 'RESET_COUNTER' }

// API Requests
| ({ type: 'SAVE_COUNT_REQUEST' } & QValue)
| ({ type: 'SAVE_COUNT_SUCCESS' } & QValue & S<{}>)
| ({ type: 'SAVE_COUNT_ERROR'   } & QValue & E)

| ({ type: 'LOAD_COUNT_REQUEST' } & QEmpty)
| ({ type: 'LOAD_COUNT_SUCCESS' } & QEmpty & S<{ value: number }>)
| ({ type: 'LOAD_COUNT_ERROR'   } & QEmpty & E)

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})

export type ApiActionGroup<_Q, _S> = {
  request: (q?: _Q)         => Action & Q<_Q>
  success: (s: _S, q?: _Q)  => Action & Q<_Q> & S<_S>
  error: (e: Error, q?: _Q) => Action & Q<_Q> & E
}

export const saveCount: ApiActionGroup<{ value: number }, {}> = {
  request: (request) =>
    ({ type: 'SAVE_COUNT_REQUEST', request }),
  success: (response, request) =>
    ({ type: 'SAVE_COUNT_SUCCESS', request, response }),
  error: (error, request) =>
    ({ type: 'SAVE_COUNT_ERROR',   request, error }),
}

export const loadCount: ApiActionGroup<null, { value: number }> = {
  request: (request) =>
    ({ type: 'LOAD_COUNT_REQUEST', request: null }),
  success: (response, request) =>
    ({ type: 'LOAD_COUNT_SUCCESS', request: null, response }),
  error: (error, request) =>
    ({ type: 'LOAD_COUNT_ERROR',   request: null, error }),
}
