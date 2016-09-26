import * as redux from 'redux'

import { api } from '../api'

import {
  Action,
  saveCount,
  loadCount,
} from '../actions'

export const apiMiddleware = ({ dispatch }: redux.MiddlewareAPI<any>) =>
  (next: redux.Dispatch<any>) =>
    (action: Action) => {
      switch (action.type) {

        case 'SAVE_COUNT_REQUEST':
          api.save(action.request)
            .then(() => dispatch(saveCount.success({}, action.request)))
            .catch((e) => dispatch(saveCount.error(e, action.request)))
          break

        case 'LOAD_COUNT_REQUEST':
          api.load()
            .then(({ value }) => dispatch(loadCount.success({ value }, action.request)))
            .catch((e) => dispatch(loadCount.error(e, action.request)))
          break
      }

      return next(action)
    }
