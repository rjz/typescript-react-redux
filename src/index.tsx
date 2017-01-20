import * as React from 'react' // tslint:disable-line
import * as ReactDOM from 'react-dom'
import * as redux from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import {
  reducers,
  Store,
} from './reducers'

import { Counter } from './components/counter'

let store: redux.Store<Store.All> = redux.createStore(
  reducers,
  {} as Store.All,
  redux.applyMiddleware(thunk),
)

// Commented out ("let HTML app be HTML app!")
window.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('redux-app-root')
  if (rootEl) ReactDOM.render(
    <Provider store={store}>
      <Counter label='count:' />
    </Provider>
  , rootEl)
})
