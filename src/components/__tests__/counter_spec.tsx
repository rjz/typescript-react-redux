import * as React from 'react'
import * as TestUtils from 'react-addons-test-utils'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { Counter } from '../counter'
import { reducers } from '../../reducers'

describe('components/Counter', () => {

  function renderElement (el: React.ReactElement<{}>) {
    return TestUtils.renderIntoDocument(el) as React.Component<{}, {}>
  }

  function findComponentByType(root: React.Component<{}, {}>, type: any): React.Component<{}, {}> {
    return TestUtils.findRenderedComponentWithType(root, type)
  }

  function setup (): React.Component<{}, {}> {
    const store = createStore(reducers)
    const wrapper = renderElement(
      <Provider store={store}>
        <Counter label='a counter!' />
      </Provider>
    )
    const counter = findComponentByType(wrapper, Counter)
    return counter
  }

  it('starts at 0', () => {
    const counter = setup()
    const pre = TestUtils.findRenderedDOMComponentWithTag(counter, 'pre')
    expect(JSON.parse(pre.textContent).counter.value).toEqual(0)
  })

  it('shows a label', () => {
    const counter = setup()
    const label = TestUtils.findRenderedDOMComponentWithTag(counter, 'legend')
    expect(label.textContent).toEqual('a counter!')
  })

  describe('clicking "increment"', () => {
    it('increments counter', () => {
      const counter = setup()
      const [ increment ] = TestUtils.scryRenderedDOMComponentsWithTag(counter, 'button')
      TestUtils.Simulate.click(increment)
      TestUtils.Simulate.click(increment)
      TestUtils.Simulate.click(increment)

      const pre = TestUtils.findRenderedDOMComponentWithTag(counter, 'pre')
      expect(JSON.parse(pre.textContent).counter.value).toEqual(3)
    })
  })
})
