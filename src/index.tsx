import * as React from 'react' // tslint:disable-line
import * as ReactDOM from 'react-dom'
import * as Redux from 'redux'
import { Provider } from 'react-redux'

import {
  reducers,
  Store,
} from './reducers'

import { Counter } from './components/counter'

let store: Redux.Store<Store.All> = Redux.createStore(reducers)

// Commented out ("let HTML app be HTML app!")
window.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('redux-app-root')
  if (rootEl) ReactDOM.render(
    <Provider store={store}>
      <Counter label='who\'s counting?' />
    </Provider>
  , rootEl)
})
