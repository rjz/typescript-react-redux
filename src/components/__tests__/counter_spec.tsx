// tslint:disable-next-line no-unused-variable
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as TestUtils from 'react-dom/test-utils'
import * as TestRenderer from 'react-test-renderer'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { Counter } from '../counter'
import reducers from '../../reducers'

describe('components/Counter', () => {

  it('renders', () => {
    const store = createStore(reducers)
    const renderer = TestRenderer.create(
      <Provider store={store}>
        <Counter />
      </Provider>
    )
    expect(renderer.toJSON()).toMatchSnapshot()
  })

  describe('clicking "increment"', () => {
    let container: Element
    beforeEach(() => {
      container = document.createElement('div')
      document.body.appendChild(container)
    })

    afterEach(() => {
      document.body.removeChild(container)
      container = null
    })

    it('increments counter', () => {
      const store = createStore(reducers)
      TestUtils.act(() => {
        ReactDOM.render(
          <Provider store={store}>
            <Counter />
          </Provider>
        , container)
      })

      const button = container.querySelector('button')
      TestUtils.act(() => {
        TestUtils.Simulate.click(button)
      })

      const pre = container.querySelector('pre')
      expect(JSON.parse(pre.textContent).counter.value).toEqual(1)
    })
  })
})
