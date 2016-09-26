import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import {
  incrementCounter,
  saveCount,
  loadCount,
} from '../actions'

import { Store } from '../reducers'

type OwnProps = {
  label: string
}

type ConnectedState = {
  counter: { value: number }
}

type ConnectedDispatch = {
  increment: (n: number) => void
  save: (n: number) => void
  load: () => void
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
  increment: (n: number) =>
    dispatch(incrementCounter(n)),
  load: () =>
    dispatch(loadCount.request()),
  save: (value: number) =>
    dispatch(saveCount.request({ value })),
})

class CounterComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {

  _onClickIncrement = (e: React.SyntheticEvent) => {
    e.preventDefault()
    this.props.increment(1)
  }

  _onClickSave = (e: React.SyntheticEvent) => {
    e.preventDefault()
    this.props.save(this.props.counter.value)
  }

  _onClickLoad = (e: React.SyntheticEvent) => {
    e.preventDefault()
    this.props.load()
  }

  render () {
    const { counter, label } = this.props
    return <div>
      <label>{label}</label>
      <pre>counter = {counter.value}</pre>
      <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
      <button ref='save' onClick={this._onClickSave}>save</button>
      <button ref='load' onClick={this._onClickLoad}>load</button>
    </div>
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8787
export const Counter: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(CounterComponent)
