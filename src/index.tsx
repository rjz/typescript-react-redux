import * as React from 'react' // tslint:disable-line
import * as ReactDOM from 'react-dom'
import * as redux from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as state from './reducers'

import { Counter } from './components/counter'

let store: redux.Store<state.All> = redux.createStore(
  state.reducers,
  {} as state.All,
  redux.applyMiddleware(thunk),
)

// Commented out ("let HTML app be HTML app!")
window.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('redux-app-root')
  if (rootEl) ReactDOM.render(
    <Provider store={store}>
      <Counter />
    </Provider>
  , rootEl)
})
