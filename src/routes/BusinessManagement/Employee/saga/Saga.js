/* saga functions */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

/* Load Action Type */
// import { FETCH_EMPLOYEE_LIST } from '../modules/Employee'
// import { EDIT_EMPLOYEE_INFO } from '../modules/EditEmployee'
// import { CREATE_EMPLOYEE } from '../modules/CreateEmployee'
// import { DELETE_EMPLOYEE } from '../modules/DeleteEmployee'
// import { ROLE_EDIT_INFO } from '../modules/EmployeeRoleEdit'

/* Load Action Dispatch */
import {
  FETCH_EMPLOYEE_LIST,
  fetchEmployeeListSuccess,
  fetchEmployeeListFail
} from '../modules/Employee'

import {
  editEmployeeInfoSuccess,
  editEmployeeInfoFail,
  EDIT_EMPLOYEE_INFO
} from '../modules/EditEmployee'

import {
  createEmployeeRemoteSuccess,
  createEmployeeRemoteFail,
  CREATE_EMPLOYEE
} from '../modules/CreateEmployee'

import {
  deleteEmployeeRemoteSuccess,
  deleteEmployeeRemoteFail,
  DELETE_EMPLOYEE
} from '../modules/DeleteEmployee'

import {
  roleEditInfoSuccess,
  roleEditInfoFail,
  ROLE_EDIT_INFO
} from '../modules/EmployeeRoleEdit'

/* API function */
import {
  editEmployeeInfoAPI,
  fetchEmployeeListAPI,
  createEmployeeAPI,
  deleteEmployeeAPI,
  employeeRoleEditInfoAPI
} from 'api/YHB'

import { ERROR } from 'layouts/components/ErrorDialog/modules/ErrorDialog'


/* Saga function: fetch Employee List  */
function* fetchEmployeeListSaga(action) {
  try {
    const result = yield call(fetchEmployeeListAPI, action.payload);
    if (result.Code === 0) {
      yield put(fetchEmployeeListSuccess({ result, currentPage: action.payload.page }))
    } else {
      yield put(fetchEmployeeListFail(result.Message))
    }
  } catch (error) {
    yield put(fetchEmployeeListFail(error))
  }
}

/* Saga function: Create employee */

function* createEmployeeSaga(action) {
  try {
    const result = yield call(createEmployeeAPI, action.YHB);
    if (result.Code === 0) {
      yield put(createEmployeeRemoteSuccess(result))
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
/* Saga function: Edit employee infomration  */
function* editEmployeInfoSaga(action) {
  try {
    const result = yield call(editEmployeeInfoAPI, action.payload);
    if (result.Code === 0) {
      yield put(editEmployeeInfoSuccess(result))
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
function* deleteEmployeeSaga(action) {
  try {
    const result = yield call(deleteEmployeeAPI, action.id);
    if (result.Code === 0) {
      yield put(deleteEmployeeRemoteSuccess(result))
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

/* Saga function:  employee RoleEdit infomration  */
function* employeeRoleEditSaga(action) {
  try {
    const result = yield call(employeeRoleEditInfoAPI, action.payload);
    if (result.Code === 0) {
      yield put(roleEditInfoSuccess(result))
    } else {
      yield put(roleEditInfoFail(result.Message))
    }
  } catch (error) {
    yield put(roleEditInfoFail(error))
  }
}

export function* watchFetchEmployeeList() {
  yield* takeEvery(FETCH_EMPLOYEE_LIST, handleAPI(fetchEmployeeListSaga));
}
export function* watchEditEmployeeInfo() {
  yield* takeEvery(EDIT_EMPLOYEE_INFO, handleAPI(editEmployeInfoSaga));
}
export function* watchAddEmployeeInfo() {
  yield* takeEvery(CREATE_EMPLOYEE, handleAPI(createEmployeeSaga));
}
export function* watchDeleteEmployeeInfo() {
  yield* takeEvery(DELETE_EMPLOYEE, handleAPI(deleteEmployeeSaga));
}
export function* watchEmployeeRoleEditInfo() {
  yield* takeEvery(ROLE_EDIT_INFO, handleAPI(employeeRoleEditSaga));
}
