// tslint:disable-next-line no-unused-variable
import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'

import loadable from '../loadable'

const TestComponent = () => <div>OK</div>

describe.only('decorators/loadable', () => {

  it('sets friendly .displayName', () => {
    const LoadedTestComponent = loadable(() => false)(TestComponent)
    expect(LoadedTestComponent.displayName)
      .toEqual('Loadable(TestComponent)')
  })

  it('handles loading state', () => {
    const LoadingTestComponent = loadable(() => true)(TestComponent)
    const renderer = TestRenderer.create(<LoadingTestComponent />)
    expect(renderer.toJSON()).toMatchSnapshot()
  })

  it('handles loaded state', () => {
    const LoadedTestComponent = loadable(() => false)(TestComponent)
    const renderer = TestRenderer.create(<LoadedTestComponent />)
    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
