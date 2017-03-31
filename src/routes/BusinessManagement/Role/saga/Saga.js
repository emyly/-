/**
 * Created by sjf on 2016/11/5.
 */

/**
 * Created by sjf on 2016/11/16.
 */


import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils';
import _ from 'lodash'

/* Load Action Type */
import { ROLE_LIST, RoleListSuccess, RoleListFail } from '../modules/RoleList'
import { GET_ROLE_DATA, getRoleDataSuccess, getRoleDataFail, getRoleData } from '../modules/Role'
import { CREAT_ROLE_LIST, creatRoleListDataSuccess, creatRoleListDataFail } from '../modules/Creat'
import { ROLE_SET, roleSetDataSuccess, roleSetDataFail } from '../modules/RoleSet'
import { EDIT_ROLE_LIST, editRoleListDataSuccess, editRoleListDataFail, EDIT_ROLE_NAME, editRoleNameSuccess, editRoleNameFail } from '../modules/EditRole'

/* Load Action Dispatch */

// import {
//   RoleListSuccess,
//   RoleListFail
// } from '../modules/RoleList'

// import {
//   getRoleDataSuccess,
//   getRoleDataFail
// } from '../modules/Role'

// import {
//   creatRoleListDataSuccess,
//   creatRoleListDataFail
// } from '../modules/Creat'

// import {
//   roleSetDataSuccess,
//   roleSetDataFail
// } from '../modules/RoleSet'

// import {
//   editRoleListDataSuccess,
//   editRoleListDataFail
// } from '../modules/EditRole'

/* API function */
import {
  fecthRolelistAPI
} from 'api/MKFLB';

import {
  getRoleAPI,
  creatRoleAPI,
  creatBusinessRoleAPI,
  roleSetAPI,
  roleNameSetAPI
} from 'api/JSQX';
import {
  editRoleListAPI
} from 'api/Role';
// import {
//   getRoleData
// } from '../modules/Role'

function* getRoleDataSaga(action) {
  try {
    const result = yield call(getRoleAPI, action.payload);
    if (result.Code === 0) {
      if (_.has(result.Result, 'JSB')) {
        yield put(getRoleDataSuccess({ result: result.Result, currentPage: action.payload.page }))
      }
    } else {
      yield put(getRoleDataFail(result.Message))
    }
  } catch (error) {
    yield put(getRoleDataFail(error))
  }
}


/*  Saga function:fetch Sale List   */


/** ******获取权限*********/
function* fetchSalelist2(action) {
  try {
    const result = yield call(fecthRolelistAPI, action.id);
    if (action.id === '' || action.id === undefined) {
      if (result.Code === 0) {
        if (_.has(result.Result, 'MKFLB')) {
          yield put(RoleListSuccess({ AllPermissions: result.Result.MKFLB }));
        }
      } else {
        yield put(RoleListFail(result.Message))
      }
    } else if (result.Code === 0) {
      if (_.has(result.Result, 'MKFLB')) {
        yield put(RoleListSuccess({ SelectPermissions: result.Result.MKFLB }));
      }
    } else {
      yield put(RoleListFail(result.Message))
    }
  } catch (error) {
    yield put(RoleListFail(error))
  }
}

function* fetchSalelist(action) {
  try {
    const [selected, all] = yield [
      call(fecthRolelistAPI, action.id),
      call(fecthRolelistAPI)
    ];
    if (all.Code !== 0) {
      yield put(RoleListFail(_.get(all, 'Result.MKFLB', []).Message))
    }
    yield [
      put(RoleListSuccess({ AllPermissions: _.get(all, 'Result.MKFLB', []) })),
      put(RoleListSuccess({ SelectPermissions: _.get(selected, 'Result.MKFLB', []) }))
    ];
  } catch (error) {
    yield put(RoleListFail(error))
  }
}
/** ******添加角色*********/
function* creatRoleList(action) {
  try {
    const result = yield call(creatRoleAPI, action.payload);
    if (result.Code === 0) {
      if (_.has(result.Result, 'JSB')) {
        // yield put(creatRoleListDataSuccess(result.Result.JSB));
        const obj = {
          JSID: result.Result.JSB.GUID,
          MKYWID: action.payload.Id
        };
        const response = yield call(creatBusinessRoleAPI, obj);
        try {
          if (response.Code === 0) {
            if (_.has(response.Result, 'JSMKYWGLB')) {
              yield put(creatRoleListDataSuccess(response.Result.JSMKYWGLB));
            }
          } else {
            yield put(creatRoleListDataFail(response.Message))
          }
        } catch (error) {
          yield put(RoleListFail(error))
        }
      }
    } else {
      yield put(creatRoleListDataFail(result.Message))
    }
  } catch (error) {
    yield put(RoleListFail(error))
  }
}
/** ***********修改角色状态**************/
function* roleDataSet(action) {
  try {
    const result = yield call(roleSetAPI, action.payload);
    if (result.Code === 0) {
      yield put(roleSetDataSuccess({ result, orId: action.payload.orId, page: action.payload.page }));
      yield put(getRoleData(action.payload.orId, 'E', action.payload.page));
    } else {
      yield put(roleSetDataFail(result.Message))
    }
  } catch (error) {
    yield put(roleSetDataFail(error))
  }
}

/** ***********编辑角色权限**************/
function* editRoleList(action) {
  try {
    const result = yield call(editRoleListAPI, action.payload);
    if (result.Code === 0) {
      yield put(editRoleListDataSuccess(result));
    } else {
      yield put(editRoleListDataFail(result.Message))
    }
  } catch (error) {
    yield put(editRoleListDataFail(error))
  }
}

/** ***********编辑角色名称**************/
function* editRoleName(action) {
  try {
    const result = yield call(roleNameSetAPI, action.payload);
    if (result.Code === 0) {
      yield put(editRoleNameSuccess(result));
    } else {
      yield put(editRoleNameFail(result.Message))
    }
  } catch (error) {
    yield put(editRoleNameFail(error))
  }
}

/* Saga function: Delete employee infomration  */
export function* watchRoleList() {
  yield* takeEvery(ROLE_LIST, handleAPI(fetchSalelist));
}
export function* watchRoleDataList() {
  yield* takeEvery(GET_ROLE_DATA, handleAPI(getRoleDataSaga));
}
export function* watchCreatRoleList() {
  yield* takeEvery(CREAT_ROLE_LIST, handleAPI(creatRoleList));
}
export function* watchAuthorizationSet() {
  yield* takeEvery(ROLE_SET, handleAPI(roleDataSet));
}
export function* watchEditRoleList() {
  yield* takeEvery(EDIT_ROLE_LIST, handleAPI(editRoleList));
}
export function* watchEditRoleName() {
  yield* takeEvery(EDIT_ROLE_NAME, handleAPI(editRoleName));
}
