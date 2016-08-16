import { createStore } from 'redux'

import { reducers } from '../index'
import { incrementCounter } from '../../actions'

describe('reducers/counter', () => {
  it('starts at 0', () => {
    const store = createStore(reducers)
    const { counter } = store.getState()
    expect(counter.value).toEqual(0)
  })

  it('increments', (done) => {
    const store = createStore(reducers)
    store.subscribe(() => {
      const { counter } = store.getState()
      expect(counter.value).toEqual(3)
      done()
    })
    store.dispatch(incrementCounter(3))
  })
})
