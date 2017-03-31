/**
 * Created by sjf on 2016/11/16.
 */
/* saga functions */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

/* Load Action Type */
import { FETCH_SALE_LIST } from '../modules/Sale'
import { AGENCY_SALE_LIST } from '../modules/Agency'
import { EDIT_SALE_LIST } from '../modules/Edit'
import { CREAT_SALE_LIST } from '../modules/Creat'


/* Load Action Dispatch */
import {
  fecthSalelistSuccess,
  fecthSalelistFail
} from '../modules/Sale'

import {
  AgencyListSuccess,
  AgencyListFail
} from '../modules/Agency'

import {
  CreatListSuccess,
  CreatListFail
} from '../modules/Creat'
import {
  EditListSuccess,
  EditListFail
} from '../modules/Edit'

/* API function */
import {
  fecthSalelistAPI,
  CreatListAPI,
  EditListAPI
} from 'api/JXSXSDBGLB';

import {
  getPartnerAPI
} from 'api/ZZJGB';

import _ from 'lodash'
import { ERROR } from 'layouts/components/ErrorDialog/modules/ErrorDialog'
/*  Saga function:fetch Sale List   */

function* fetchSalelist(action) {
  try {
    const result = yield call(fecthSalelistAPI, action.payload);
    if (result.Code === 0) {
      yield put(fecthSalelistSuccess({ result, currentPage: action.payload.page }));
    } else {
      yield put(fecthSalelistFail(result.Message))
    }
  } catch (error) {
    yield put(fecthSalelistFail(error))
  }
}
/** ******获取关联经销商医院*********/
function* AgencyList(action) {
  try {
    const result = yield call(getPartnerAPI, action.payload);
    if (result.Code === 0) {
      if (_.has(result.Result, 'JXSGXB')) {
        yield put(AgencyListSuccess(result.Result.JXSGXB))
      }
    } else {
      yield put(AgencyListFail(result.Message))
    }
  } catch (error) {
    yield put(AgencyListFail(error))
  }
}
/** ******编辑销售代表助理信息*********/
function* EditList(action) {
  try {
    const result = yield call(EditListAPI, action.payload);
    if (result.Code === 0) {
      yield put(EditListSuccess(result.Result))
    } else {
      yield put({
        type: ERROR,
        error: result
      })
    }
  } catch (error) {
    yield put({
      type: ERROR,
      error
    })
  }
}


/** ******创建销售人员*********/
function* CreatList(action) {
  try {
    const result = yield call(CreatListAPI, action.payload);
    if (result.Code === 0) {
      yield put(CreatListSuccess(result))
    } else {
      yield put({
        type: ERROR,
        error: result
      })
    }
  } catch (error) {
    yield put({
      type: ERROR,
      error
    })
  }
}

/* Saga function: Delete employee infomration  */
export function* watchFetchSaleList() {
  yield* takeEvery(FETCH_SALE_LIST, handleAPI(fetchSalelist));
}
export function* watchAgencyList() {
  yield* takeEvery(AGENCY_SALE_LIST, handleAPI(AgencyList));
}
export function* watchEditList() {
  yield* takeEvery(EDIT_SALE_LIST, handleAPI(EditList));
}
export function* watchCreatList() {
  yield* takeEvery(CREAT_SALE_LIST, handleAPI(CreatList));
}
