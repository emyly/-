
import { fork } from 'redux-saga/effects'

import * as watchFunction from './watchFunction'

export default function *rootSaga() {
  yield Object.keys(watchFunction).map(watch => fork(watchFunction[watch]))
}
