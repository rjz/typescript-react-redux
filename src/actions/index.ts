import { api } from '../api'

import {
  Action,
  createThunkAction,
} from './action'

export { Action }

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})

export const saveCount = createThunkAction(api.save,
  'SAVE_COUNT_REQUEST',
  'SAVE_COUNT_SUCCESS',
  'SAVE_COUNT_ERROR')

export const loadCount = createThunkAction(api.load,
  'LOAD_COUNT_REQUEST',
  'LOAD_COUNT_SUCCESS',
  'LOAD_COUNT_ERROR')
