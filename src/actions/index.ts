import { api } from '../api'

import {
  Action,
  LoadCount,
  SaveCount,
  dispatcher,
  asReq,
  asRes,
  asErr,
} from './action'

export { Action }

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})

export const loadCount = dispatcher(api.load)<LoadCount>(
  asReq('LOAD_COUNT_REQUEST'),
  asRes('LOAD_COUNT_SUCCESS'),
  asErr('LOAD_COUNT_ERROR'))

export const saveCount = dispatcher(api.save)<SaveCount>(
  asReq('SAVE_COUNT_REQUEST'),
  asRes('SAVE_COUNT_SUCCESS'),
  asErr('SAVE_COUNT_ERROR'))
