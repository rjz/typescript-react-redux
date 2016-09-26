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
  isSaving: boolean,
  isLoading: boolean,
  error: string,
}

type ConnectedDispatch = {
  increment: (n: number) => void
  save: (n: number) => void
  load: () => void
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  counter: state.counter,
  isSaving: state.isSaving,
  isLoading: state.isLoading,
  error: state.error,
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
    if (!this.props.isSaving) {
      this.props.save(this.props.counter.value)
    }
  }

  _onClickLoad = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!this.props.isLoading) {
      this.props.load()
    }
  }

  render () {
    const { counter, label, isSaving, isLoading, error } = this.props
    return <form>
      <legend>{label}</legend>
      <pre>{JSON.stringify({ counter, isSaving, isLoading }, null, 2)}</pre>
      <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
      <button ref='save' disabled={isSaving} onClick={this._onClickSave}>{isSaving ? 'saving...' : 'save'}</button>
      <button ref='load' disabled={isLoading} onClick={this._onClickLoad}>{ isLoading ? 'loading...' : 'load'}</button>
      { error ? <div className='error'>{error}</div> : null }
    </form>
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8787
export const Counter: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(CounterComponent)
