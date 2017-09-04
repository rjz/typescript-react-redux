jest.mock('../../api')

import { createStore } from 'redux'
import * as apiExports from '../../api'
import * as actions from '../index'

const api: jest.Mocked<apiExports.Api> = apiExports.api as any

const eventually = (assertFn) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        assertFn()
      } catch (e) {
        return reject(e)
      }
      resolve()
    }, 1)
  })

const expectRequest = (type, request, apiAction) => {
  expect(apiAction.type).toEqual(type)
  expect(apiAction.request).toEqual(request)
  expect(apiAction.error).toBeUndefined()
  expect(apiAction.response).toBeUndefined()
}

const expectResponse = (type, response, apiAction) => {
  expect(apiAction.type).toEqual(type)
  expect(apiAction.response).toEqual(response)
  expect(apiAction.response).not.toBeUndefined()
}

const expectError = (type, error, apiAction) => {
  expect(apiAction.type).toEqual(type)
  expect(apiAction.response).toBeUndefined()
  expect(apiAction.error).toEqual(error)
}

describe('actions', () => {
  const store = () => {
    const reducer = jest.fn()
    const { dispatch } = createStore(reducer)
    reducer.mockReset() // ignore @@redux/INIT
    return { dispatch, reducer }
  }

  describe('.saveCount', () => {
    beforeEach(() => {
      api.save.mockReturnValue(Promise.resolve({}))
    })

    it('sends an API request', () => {
      actions.saveCount({ value: 14 })(jest.fn())
      expect(api.save.mock.calls.length).toEqual(1)
    })

    describe('when API request succeeds', () => {
      it('fills out SAVE_COUNT', () => {
        const { dispatch, reducer } = store()
        actions.saveCount({ value: 14 })(dispatch)
        return eventually(() => {
          const actions = reducer.mock.calls.map(x => x[1])
          expectRequest('SAVE_COUNT', { value: 14 }, actions[0])
          expectResponse('SAVE_COUNT', {}, actions[1])
        })
      })
    })

    describe('when API request fails', () => {
      beforeEach(() => {
        api.save.mockReturnValue(Promise.reject(new Error('something terrible happened')))
      })

      it('dispatches SAVE_COUNT_ERROR', () => {
        const { dispatch, reducer } = store()
        actions.saveCount({ value: 14 })(dispatch)

        return eventually(() => {
          const actions = reducer.mock.calls.map(x => x[1])
          expectRequest('SAVE_COUNT', { value: 14 }, actions[0])
          expectError('SAVE_COUNT', 'Error: something terrible happened', actions[1])
        })
      })
    })
  })

  describe('.loadCount', () => {
    beforeEach(() => {
      api.load.mockReturnValue(Promise.resolve({ value: 14 }))
    })

    it('sends an API request', () => {
      actions.loadCount()(jest.fn())
      expect(api.load.mock.calls.length).toEqual(1)
    })

    describe('when API request succeeds', () => {
      it('fills out LOAD_COUNT .response', () => {
        const { dispatch, reducer } = store()
        actions.loadCount()(dispatch)

        return eventually(() => {
          const actions = reducer.mock.calls.map(x => x[1])
          expectRequest('LOAD_COUNT', undefined, actions[0])
          expectResponse('LOAD_COUNT', { value: 14 }, actions[1])
        })
      })

      it('includes new value with LOAD_COUNT_SUCCESS', () => {
        const { dispatch, reducer } = store()
        actions.loadCount()(dispatch)
        return eventually(() => {
          expect(reducer.mock.calls[1][1].response).toEqual({ value: 14 })
        })
      })
    })

    describe('when API request fails', () => {
      beforeEach(() => {
        api.load.mockReturnValue(Promise.reject(new Error('something terrible happened')))
      })

      it('fills out LOAD_COUNT .error', () => {
        const { dispatch, reducer } = store()
        actions.loadCount()(dispatch)

        return eventually(() => {
          const actions = reducer.mock.calls.map(x => x[1])
          expectRequest('LOAD_COUNT', undefined, actions[0])
          expectError('LOAD_COUNT', 'Error: something terrible happened', actions[1])
        })
      })
    })
  })
})
