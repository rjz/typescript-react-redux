import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { incrementCounter } from '../actions'
import { Store } from '../reducers'

type OwnProps = {
  label: string
}

type ConnectedState = {
  counter: { value: number }
}

type ConnectedDispatch = {
  increment: (n: number) => void
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
  increment: (n: number): void => {
    dispatch(incrementCounter(n))
  },
})

class CounterComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {

  _onClickIncrement = (e: Event) => {
    e.preventDefault()
    this.props.increment(1)
  }

  render () {
    const { counter, label } = this.props
    return <div>
      <label>{label}</label>
      <pre>counter = {counter.value}</pre>
      <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
    </div>
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8787
export const Counter: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(CounterComponent)
