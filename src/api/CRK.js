/**
 * Created by liuyali on 2016/11/3.
 */
import { fetchAPI } from 'lib/utils'

// 获取订单的出库商品详情汇总

/**
 * 2.获取单个出入库单详情v
 * */
export function getSingleWareHouseOutDetailAPI(params) {
  return fetchAPI(`/CRKDB/${params.CRKDID}`, {
    method: 'GET',
    body: {}
  });
}

// 经销商获取能选择的业务线
export function getDlryOrdersGoodsAPI({ GUID, CKRK, DDLX }) {
  const body = JSON.stringify({ DDB: { GUID, CKRK, DDLX } })
  return fetchAPI('/CRKDB/CRKMXB/CRKHZ', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body
  })
}

/**
* 3.获取单个出入库单明细
**/
export function getSingleWareHouseOutProductionDetailAPI(params) {
  return fetchAPI(`/DDB/${params.DDID}/CRKDB/${params.CRKDID}/CRKMXB`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body: {}
  })
}

/**
 *4.出库汇总界面（备货、铺货、借货等出库，手术配货）
 * */

export function getWareHouseOutSummaryAPI(params) {
  return fetchAPI(`/CRKDB/DDB/CK?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.dataParams
  })
}
/**
 * 12.出库复核、术后回收复核汇总页面
 * */
export function getStorageOutRecheckListAPI(params) {
  return fetchAPI(`/CRKDB/DDB/FH?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.dataParams
  })
}

/**
 * 10. 生成入库单
 * createReceivingGoodsOrderAPI - create receivingGoods order
 *
 * @param  {object} receivingGoods description
 * @return {type}                description
 */
export function createReceivingGoodsOrderAPI(receivingGoods) {
  return fetchAPI('/CRKDB/RKD', {
    method: 'POST',
    body: receivingGoods
  })
}

/**
 * 11.术后回收入口查询相应状态订单列表
 * */
export function getOperationReceiveListAPI(params) {
  return fetchAPI(`/CRKDB/DDB/SHHS?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.dataParams
  })
}

/**
 * 出库商品扫描
 * */
export function getPickProductionDataAPI({ barCode, KWID }) {
  const SPTM = {}
  barCode = barCode.split('(')
  barCode.shift()
  barCode.forEach((o) => {
    const temp = o.split(')')
    SPTM[temp[0]] = temp[1]
  })
  return fetchAPI('/KWSPGLB/KCJY', {
    method: 'GET',
    body: { SPTM, KWID }
  })
}

/**
 * 14.出入库单复核
 * */
export function postOutWarehouseCheckAPI(params) {
  return fetchAPI('/CRKDSHB', {
    method: 'POST',
    body: params.params
  })
}

/**
 * 获取仓库对于订单的满足情况
 * */
export function getWarehouseForNeedDataAPI(params) {
  const query = params.type ? '' : `?FJKWID=${params.crkid}`; // type  true是仓库层面,false是库位层面
  return fetchAPI(`/DDB/${params.id}/CKB/${params.ckid}${query}`, {
    method: 'GET'
  })
}

/**
 * 出库商品扫描
 * */
export function getBarcodeOutAPI(params) {
  return fetchAPI('/KWSPGLB/KCJY', {
    method: 'GET',
    body: params
  })
}

/**
 * 入库商品扫描
 * */
export function getBarcodeInAPI(params) {
  return fetchAPI('/CRKDB/CRKMXB/SPJY', {
    method: 'GET',
    body: params
  })
}

/**
 * 获取订单的出入库商品详情汇总
 * */
// {
//   "DDB": {
//   "GUID": 1, //当前订单的GUID
//     "CKRK": "0", // 出库汇总值为"0"，入库汇总值为"1",
//     "DDLX": "0"  //根据实际操作的订单类型传入
// }
// }
export function getWarehouseInOutGoodsSummaryAPI(params) {
  return fetchAPI('/CRKDB/CRKMXB/CRKHZ', {
    method: 'GET',
    body: params
  })
}

/**
 * 生成拣货建议单
 * */
export function getSelectAdviceAPI(params) {
  return fetchAPI(`/DDB/${params.id}/JHTJDB`, {
    method: 'GET',
    body: params.body
  })
}

/**
 * 生成出库单
 * */
export function createOutStockAPI(params) {
  return fetchAPI('/CRKDB/CKD', {
    method: 'POST',
    body: params
  })
}

/**
 * 拣货推荐单——其他可选库位
 * */
export function getOtherStorageAPI(params) {
  return fetchAPI('/SPCCB/QTTJ', {
    method: 'GET',
    body: params
  })
}

export function surgeryRecoveryGoodsSummaryAPI(id) {
  const body = { CRKDB: { DDID: id } }
  return fetchAPI('/CRKDB/CRKMXB/HSHZ', {
    method: 'GET',
    body
  })
}

/* 单个订单对应的出入库单列表查询*/
export function historyRecoveryRecordsAPI(id) {
  const body = { CKRK: 1 };
  return fetchAPI(`/DDB/${id}/CRKDB`, {
    method: 'GET',
    body
  });
}

/* 术后回收*/
export function submitSurgeryRecoveryDataAPI([ddid, data, params]) {
  const body = {
    CRKDB: {
      DDID: ddid, // 订单ID
      CKRK: '1', // 出库入库，0：出库，1：入库
      DDLX: '2' // 订单类型，0：铺货订单，1：备货订单，2：手术订单，3：借货订单，4：调货订单， 5：铺货补货订单 6:铺货销售订单
    },
    WLDB: params,
    CRKMXB: data };
  return fetchAPI('/CRKDB/WLDB', {
    method: 'POST',
    body
  });
}

/* 术后回收复核——订单商品的回收复核详情汇总 */
export function surgeryReturnLogisticsOrderRecheck(body) {
  return fetchAPI('/CRKDB/CRKMXB/HSFHHZ', {
    method: 'GET',
    body
  })
}

/* 入库引导单完成确认 */
export function surgeryReturnReceivingRecheckFinish(body) {
  return fetchAPI('/KWSPGLB/SPCCB', {
    method: 'PUT',
    body
  })
}

/* 拣货推荐单——复制本行功能 */
export function copySelectTableRowAPI(body) {
  return fetchAPI('/SPCCB/FZBH', {
    method: 'GET',
    body
  })
}

/* 手术订单，生成拣货推荐单 */
export function operationSelectDataAPI(params) {
  return fetchAPI(`/DDB/${params.id}/SPCCB/JHTJDB`, {
    method: 'GET',
    body: params.body
  })
}

/* 获取多个出入库单明细汇总 */
export function fetchSurgeryLogisticsOrderSummary(params) {
  return fetchAPI(`/DDB/${params.id}/CRKDB/${params.id}/CRKMXB`, {
    method: 'GET',
    body: params
  })
}

/**
 * 手术订单，库位优先，其他推荐
 * */
export function getOperationOtherStorageAPI(params) {
  return fetchAPI('/SPCCB/SH/QTTJ', {
    method: 'GET',
    body: params
  })
}

/**
 * 拣货暂存
 * {
    "DDID": 10000, // 订单ID
    "DDLX": "2", // 订单类型
    "JHZCB": [
        {
            "CKID": 1, //仓库ID
            "KWID": 100, // 库位ID
            "SPID": 1, // 商品ID
            "SPPHID": 24866, // 商品批号ID
            "SPPPID": 1000, // 商品品牌ID
            "WQJXSID": 1000, // 物权经销商ID
            "CKJXSID": 1000, // 仓库经销商ID
            "SPBH": "10000", // 商品编号
            "SPPH": "123123", // 商品批号
            "SCRQ": 1000000000000, // 生产日期
            "YXQZ": 1000000000000, // 有效期止
            "YJSL": 10,// 已拣数量
            "WJSL": 10 // 未拣数量
        }
        ......
    ]
} **/
export function setTemporaryStorageAPI(params) {
  return fetchAPI('/JHTJDB', {
    method: 'POST',
    body: params
  })
}


/**
 * 获取暂存的拣货数据
 * /JHTJDB/:ddid
 **/
export function getTemporaryStorageAPI(params) {
  return fetchAPI(`/JHTJDB/${params}`, {
    method: 'GET',
  })
}
