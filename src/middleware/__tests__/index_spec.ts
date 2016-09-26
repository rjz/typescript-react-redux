import * as redux from 'redux'

import { apiMiddleware } from '../'

import { api } from '../../api'

import {
  Action,
  loadCount,
  saveCount,
} from '../../actions'

const empty = () => {}

const mockDispatch = (dispatch: (a: Action) => void): redux.MiddlewareAPI<any> =>
  ({ dispatch, getState: empty })

describe('apiMiddleware', () => {

  describe('when SAVE_COUNT_REQUEST succeeds', () => {

    it('includes request { value }', (done) => {
      const saveStub = sinon.stub(api, 'save')
        .returns(Promise.resolve({}))

      apiMiddleware(mockDispatch((actual: Action) => {
        expect(saveStub.firstCall.args[0].value).toEqual(13)
        saveStub.restore()
        done()
      }))(empty)(saveCount.request({ value: 13 }))
    })

    it('fires SAVE_COUNT_SUCCESS', (done) => {
      const saveStub = sinon.stub(api, 'save')
        .returns(Promise.resolve({}))

      apiMiddleware(mockDispatch((actual: Action) => {
        saveStub.restore()
        expect(actual.type).toEqual('SAVE_COUNT_SUCCESS')
        done()
      }))(empty)(saveCount.request({ value: 13 }))
    })

  })

  describe('when LOAD_COUNT_REQUEST succeeds', () => {

    it('fires LOAD_COUNT_SUCCESS', (done) => {
      const loadStub = sinon.stub(api, 'load')
        .returns(Promise.resolve({ value: 42 }))

      apiMiddleware(mockDispatch((actual: Action) => {
        loadStub.restore()

        if (actual.type === 'LOAD_COUNT_SUCCESS') {
          expect(42).toEqual(actual.response.value)
          done()
        }
        else {
          done.fail('types don\'t match')
        }
      }))(empty)(loadCount.request())
    })
  })
})
