import reducers, {
  initialState,
} from '../index'

import {
  Action,
  incrementCounter
} from '../../actions'

const resultOf = (actions: Action[]) =>
  actions.reduce(reducers, initialState)

describe.only('reducers/counter', () => {
  it('starts at 0', () =>
    expect(resultOf([])).toMatchSnapshot())

  it('increments', () =>
    expect(resultOf([
      incrementCounter(1),
      incrementCounter(2),
      incrementCounter(3),
    ])).toMatchSnapshot())

  it('restores state', () =>
    expect(resultOf([
      {
        type: 'LOAD_COUNT_SUCCESS',
        request: {},
        response: { value: 14 },
      }
    ])).toMatchSnapshot())
})
