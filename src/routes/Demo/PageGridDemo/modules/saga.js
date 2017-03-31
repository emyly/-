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
  PAGE_GRID_GET_DATA,
  PAGE_GRID_GET_DATA_SUCCESS,
  PAGE_GRID_GET_DATA_ERROR,
} from './MyPageGrid.js';
import {
  pageGridDemoGetDataAPI,
} from 'api/pageGridDemo';

export function *watchPageGridGetData() {
  yield takeEvery(PAGE_GRID_GET_DATA, request);
}

function *request(action) {
  const {
    value,
  } = action.payload;
  yield call(getPageGridData, value);
}

function *getPageGridData(page) {
  try {
    const response = yield call(pageGridDemoGetDataAPI, page);
    yield put({
      type: PAGE_GRID_GET_DATA_SUCCESS,
      cPage: page,
      response,
    });
  } catch (error) {
    console.error(error.response);
    yield put({
      type: PAGE_GRID_GET_DATA_ERROR,
      error,
    });
  }
}
