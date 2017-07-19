// tslint:disable-next-line no-unused-variable
import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import * as ReactShallowRenderer from 'react-test-renderer/shallow'

import { createStore } from 'redux'

import { Counter } from '../counter'
import { reducers } from '../../reducers'

describe('components/Counter', () => {

  it('renders', () => {
    const store = createStore(reducers)
    const renderer = new ReactShallowRenderer()
    expect(renderer.render(
      <Counter label='a counter!' store={store} />
    )).toMatchSnapshot()
  })

  describe('clicking "increment"', () => {
    it('increments counter', () => {
      const store = createStore(reducers)
      const counter = TestUtils.renderIntoDocument(
        <Counter label='a counter!' store={store} />
      )
      const [
        increment,
      ] = TestUtils.scryRenderedDOMComponentsWithTag(counter, 'button')
      TestUtils.Simulate.click(increment)
      TestUtils.Simulate.click(increment)
      TestUtils.Simulate.click(increment)

      const pre = TestUtils.findRenderedDOMComponentWithTag(counter, 'pre')
      expect(JSON.parse(pre.textContent).counter.value).toEqual(3)
    })
  })
})
