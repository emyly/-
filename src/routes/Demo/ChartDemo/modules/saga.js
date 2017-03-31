import {
  takeEvery
} from 'redux-saga'
import {
  call,
  put,
  fork,
  take,
  cancel
} from 'redux-saga/effects'
import {
  CHART_GET_DATA,
  CHART_GET_DATA_SUCCESS,
  CHART_GET_DATA_ERROR
} from './chart.js'
import {
  chartGetDataAPI
} from 'api/chart'

import {
  testAPI
} from 'api/authorization'

export function* watchChartGetData() {
  yield takeEvery(CHART_GET_DATA, request)
}

function* request(action) {
  const {
    value
  } = action.payload;
  yield call(getChartData, value);
}

function* getChartData() {
  // console.log(value)
  try {
    const response = yield call(chartGetDataAPI);
    yield put({
      type: CHART_GET_DATA_SUCCESS,
      response
    })
  } catch (error) {
    console.error(error.response)
    yield put({
      type: CHART_GET_DATA_ERROR,
      error
    })
  }
}

/*
function* request(action) {
  let task;
  const {
    value
  } = action.payload;
  task = yield fork(getChartData, value);
  yield take(CHART_GET_DATA_ERROR)
  yield cancel(task)
}

function* getChartData(value) {
  // console.log(value)
  try {
    const response = yield call(chartGetDataAPI);
    yield put({
      type: CHART_GET_DATA_SUCCESS,
      response
    })
  }catch(error){
    yield put({
      type:CHART_GET_DATA_ERROR,
      error
    })
  }
}
*/
