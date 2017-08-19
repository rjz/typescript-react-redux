// tslint:disable-next-line no-unused-variable
import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import * as ReactShallowRenderer from 'react-test-renderer/shallow'

import loadable from '../loadable'

const TestComponent = () => <div>OK</div>
const LoadableTestComponent = loadable(props => props.isLoading)(TestComponent)

describe('decorators/loadable', () => {

  it('sets friendly .displayName', () => {
    expect(LoadableTestComponent.displayName)
      .toEqual('Loadable(TestComponent)')
  })

  it('maps props to loading', () => {
    const renderer = new ReactShallowRenderer()
    expect(renderer.render(<LoadableTestComponent isLoading />).props.children)
      .toEqual('Just a moment, please...')

    expect(renderer.render(<LoadableTestComponent />))
      .toMatchSnapshot()
  })
})
