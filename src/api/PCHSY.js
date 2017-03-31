/**
 * Created by liuyali on 2016/11/8.
 */
import { fetchAPI } from 'lib/utils'

/*
* 分页公共参数
* PageSize: pageSize,       //每页显示条数(公共参数)
 Page: page,            //第几页(公共参数)
 SortBy: sortBy,         //排序条件(公共参数)
 SortOrder: sortOrder,   //降序还是升序(公共参数)
*
* */

/* 获取盘存记录*/
export function getInventoryRecordsAPI(page) {
  return fetchAPI(`/KCPDB?PageSize=10&Page=${page}&SortBy=CJSJ&SortOrder=DESC?`, {
    method: 'GET',
  })
}

/* 获取已结束盘存记录*/

export function getEndInventoryRecordsAPI() {
  const body = JSON.stringify({
    PDZT: '1'
  });
  return fetchAPI('/KCPDB', {
    method: 'GET',
    body
  })
}

/*
* 开始盘存
* */

export function beiginInventoryRecordsAPI(params) {
  return fetchAPI('/KCPDB', {
    method: 'POST',
    body: params
  })
}

/* 结束盘存*/
export function endInventoryRecordsAPI(id) {
  return fetchAPI(`/KCPDB/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

/* 打印盘存单*/

export function printInventoryRecordsAPI(id) {
  return fetchAPI(`/KCPDB/${id}/KCPDMXB`, {
    method: 'GET',
  });
}

/* 查询历次损溢记录*/
export function getProfitLossListAPI(page) {
  return fetchAPI(`/PDSYB?PageSize=10&Page=${page}&SortBy=CJSJ&SortOrder=DESC`, {
    method: 'GET',
  });
}


/* 查看单次损溢详情*/
export function checkSingleProfitLossDetailAPI(id) {
  return fetchAPI(`/PDSYB/${id}`, {
    method: 'GET',
  });
}

/* 登记损溢*/
export function checkInProfitLossAPI(params) {
  return fetchAPI('/PDSYB/PDSYMXB', {
    method: 'POST',
    body: params
  });
}


/* 查看仓库状态*/
export function getInventoryStatusAPI(id) {
  return fetchAPI(`/KCPDB/${id}`, {
    method: 'GET',
  });
}
