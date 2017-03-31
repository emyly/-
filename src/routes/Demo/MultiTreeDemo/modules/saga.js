import {
  takeEvery,
} from 'redux-saga';
import {
  call,
  put,
  // fork,
  // take,
  // cancel,
} from 'redux-saga/effects';
import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from './MultiTreeDemoModule.js';
import {
  getData,
} from 'api/MultiTreeDemoApi';

export function *watchMultiTreeDemoGetData() {
  yield [
    takeEvery(GET_DATA, request),
  ];
}

function *request(action) {
  yield call(getMultiTreeDemoData);
}

function *getMultiTreeDemoData() {
  try {
    const response = yield call(getData);
    yield put({
      type: GET_DATA_SUCCESS,
      response,
    });
  } catch (error) {
    console.error(error.response);
    yield put({
      type: GET_DATA_ERROR,
      error,
    });
  }
}

