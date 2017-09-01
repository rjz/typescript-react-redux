import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import {
  incrementCounter,
  loadCount,
  saveCount,
} from '../actions'

import * as state from '../reducers'

import loadable from '../decorators/loadable'

type OwnProps = {
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

const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
  counter: state.counter,
  isSaving: state.isSaving,
  isLoading: state.isLoading,
  error: state.error,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
  increment: (n: number) =>
    dispatch(incrementCounter(n)),
  load: () =>
    dispatch(loadCount()),
  save: (value: number) =>
    dispatch(saveCount({ value })),
})

class PureCounter extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {

  _onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.increment(1)
  }

  _onClickSave = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!this.props.isSaving) {
      this.props.save(this.props.counter.value)
    }
  }

  _onClickLoad = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!this.props.isLoading) {
      this.props.load()
    }
  }

  render () {
    const { counter, isSaving, isLoading, error } = this.props
    return <div>
      <div className='hero'>
        <strong>{counter.value}</strong>
      </div>
      <form>
        <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
        <button ref='save' disabled={isSaving} onClick={this._onClickSave}>{isSaving ? 'saving...' : 'save'}</button>
        <button ref='load' disabled={isLoading} onClick={this._onClickLoad}>{ isLoading ? 'loading...' : 'load'}</button>
        { error ? <div className='error'>{error}</div> : null }
        <pre>
          {JSON.stringify({
            counter,
            isSaving,
            isLoading,
          }, null, 2)}
        </pre>
      </form>
    </div>
  }
}

const isLoading = (p: ConnectedState & ConnectedDispatch & OwnProps) =>
  p.isLoading || p.isSaving

// Invoke `loadable` manually pending decorator support
// See: https://github.com/Microsoft/TypeScript/issues/4881
const LoadableCounter = loadable(isLoading)(PureCounter)

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8787
export const Counter = connect(mapStateToProps, mapDispatchToProps)(LoadableCounter)
