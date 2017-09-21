import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as redux from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as state from './reducers'

import { Counter } from './components/counter'

const store: redux.Store<state.All> = redux.createStore(
  state.reducers,
  {} as state.All,
  redux.applyMiddleware(thunk),
)

const Root: React.SFC<{}> = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
)

window.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('redux-app-root')
  ReactDOM.render(<Root />, rootEl)
})
