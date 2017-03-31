import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import makeRootReducer from './reducers'
import rootSaga from '../sagas'
import {apiMiddleWare} from 'lib/utils'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()
  let middleware
  if (process.env.NODE_ENV === 'production') {
    middleware = [thunk, apiMiddleWare, sagaMiddleware, routerMiddleware(history)]
  } else {
    middleware = [thunk, logger(), apiMiddleWare, sagaMiddleware,  routerMiddleware(history)]
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)

  return store
}
