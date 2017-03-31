/**
 * Created by sjf on 2016/11/2.
 */
import { fetchAPI } from 'lib/utils'

/**
 * 查询订单列表
 * */

export function getOrderAPI({ id, ordertype }) {
  let body;
  function handleType(type) {
    switch (type) {
    //   采购 已提交 订单列表（本级经销商查看自己的待复核、待审核的备货订单）
      case '1':
        body = JSON.stringify({
          DDB: [
            {
              CJJXSID: id,
              DDZT: '0',
              SHZT: '0'
            },
            {
              CJJXSID: id,
              DDZT: '0',
              SHZT: '1'
            }
          ]
        });
        break;
    // 采购 已审核 订单列表（本级经销啥查看自己的已通过内外部审核的备货订单）
      case '2':
        body = JSON.stringify({
          DDB: [
            {
              CJJXSID: id,
              DDZT: '1'
            }
          ]
        });
        break;
    // 采购 已退回 订单列表 （本级经销商查看自己的撤单、内部复核退回、外部审核退回的备货订单）
      case '3':
        body = JSON.stringify({
          DDB: [
            {
              CJJXSID: id,
              DDZT: '2'
            },
            {
              CJJXSID: id,
              DDZT: '3'
            }
          ]
        });
        break;
      case '4':
        body = JSON.stringify({
          DDB: [{
            CJJXSID: id,
            SHZT: '0'
          }]
        });
        break;
    // 采购复核 待复核 订单列表 （本级经销商查看内部审核状态为未审核的铺货、备货、补货、借货订单）
      case '5':
        body = JSON.stringify({
          DDB: [
            {
              CJJXSID: id,
              DDZT: '2'
            },
            {
              CJJXSID: id,
              DDZT: '1'
            },
            {
              CJJXSID: id,
              DDZT: '0',
              SHZT: '1'
            }
          ]
        });
        break;
    //   订单审核 待审核 订单列表 (上级经销商查看内部复核状态通过、外部未审核的铺货、转单手术、补货、备货订单)
      case '6':
        body = JSON.stringify({
          DDB: [{
            SHJXSID: id,
            SHZT: '1',
            WBSHZT: '0'
          }]
        });
        break;
    //   订单审核 已审核 订单列表 （上级经销商查看订单状态通过的铺货、补货、备货、转单手术订单）
      case '7':
        body = JSON.stringify({
          DDB: [{
            SHJXSID: id,
            DDZT: '1',
          }]
        });
        break;
    //   订单审核 已退回 订单列表 (上级经销商查看审核退回的铺货、补货、备货、转单手术订单)
      case '8':
        body = JSON.stringify({
          DDB: [{
            SHJXSID: id,
            DDZT: '2',
          }]
        });
        break;
    // 查询可折扣、物流加急、添加物流费用订单列表
      case '9':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              YSZJE: 0,
              YKPJE: 0,
              WSZJE: ['>', 0],
              WKPJE: ['>', 0]
            }
          ]
        });
        break;
    //   查询我给出折扣的订单列表
      case '10':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              ZKJE: ['>', 0]
            }
          ]
        });
        break;
    //   查询我获得折扣的订单列表
      case '11':
        body = JSON.stringify({
          DDB: [
            {
              JSJXSID: id,
              ZKJE: ['>', 0]
            }
          ]
        });
        break;
    //   查询已加急订单列表
      case '12':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              JJFY: ['>', 0]
            }
          ]
        });
        break;
    //   查询已添加物流费用的订单列表
      case '13':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              WLFY: ['>', 0]
            }
          ]
        });
        break;
    //   查询可做坏账登记、收账的订单列表
      case '14':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              WSZJE: ['>', 0]
            }
          ]
        });
        break;
    //   查询可做开票的订单列表
      case '15':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              WKPJE: ['>', 0]
            }
          ]
        });
        break;
    //   查询有坏账的订单
      case '16':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              HZJE: ['>', 0]
            }
          ]
        });
        break;
    //   查询全额收账的订单
      case '17':
        body = JSON.stringify({
          DDB: [
            {
              SHJXSID: id,
              WSZJE: 0,
              YSZJE: ['>', 0]
            }
          ]
        });
        break;
       //   查询未全额开票的订单
      default:body = JSON.stringify({
        DDB: [
          {
            SHJXSID: id,
            WKPJE: ['>', 0]
          }
        ]
      });
        break;
    }
  }
  handleType(ordertype);
  return fetchAPI('/DDB', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body
  });
}


/**
 * 查询订单列表
 * 查询医院要验票的订单
 * */
export function getOrderListAPI(params) {
  return fetchAPI(`/DDB?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.dataParams
  });
}

export function getOrderBillingedDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/KPMX/YKP`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}

// 查询订单的未开票明系

export function getOrderUnbillingDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/KPMX/WKP`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}


/* 订单中商品明细表格、商品结算明细表格调用api*/
export function orderGoodsDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/DDSPGLB`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body: {}
  });
}
/* 查询订单的商品明细*/
export function getGoodsSetDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/SPMX`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body: {}
  });
}
// 查询订单的账单汇总信息

export function getBillSmmryDataAPI({ ddid }) {
  return fetchAPI(`/DDB/${ddid}/ZDHZ`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}

// 查询订单的已收款明细

export function getOrderGatheringedDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/SZMX/YSZ`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}

// 查询订单的未收款明系
export function getOrderUngatheringDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/SZMX/WSZ`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}

// 历次入库记录
export function historyWarehousingAPI(params) {
  let body;
  body = JSON.stringify({ CKRK: params.body });
  return fetchAPI(`/DDB/${params.id}/CRKDB`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body
  });
}
// 订单外部审核
export function postOrderCheckAPI({ orderId, SHZT, CKCK, TZNR, BTZR, SHYJ = '' }) {
  return fetchAPI(`/DDB/${orderId}/SH`, {
    method: 'POST',
    body: { CKCK, DDSH: { SHLX: '1', SHZT, SHYJ }, TZ: { TZNR, BTZR } }
  })
}

export function getOrderDetailAPI(params) {
  return fetchAPI(`/DDB/${params.id}`, {
    method: 'GET'
  })
}

export function postDispatchApplyAPI({ RKCKID, DHRQ, TZNR, BTZR, productionList }) {
  return fetchAPI('/DBSQDD', {
    method: 'POST',
    body: {
      DDB: { RKCKID, DHRQ },
      TZ: { TZNR, BTZR },
      SP: productionList
    }
  })
}

// 查询调拨申请列表
export function getDispatchApplyListAPI({ CJR, DDZT, Page }) {
  const JOINS = ['CKCKMC', 'RKCKMC', 'WBSHSJ'];
  if (Number(DDZT) === 0) JOINS.pop();
  return fetchAPI(`/DDB?PageSize=10&Page=${Page}`, {
    method: 'GET',
    body: { DDB: [{ DDLX: '7', CJR, DDZT }], JOINS }
  })
}

// 查询调拨命令列表
export function getDispatchManageListAPI({ CJJXSID, DDZT, Page }) {
  const JOINS = ['CKCKMC', 'RKCKMC', 'WBSHSJ'];
  if (Number(DDZT) === 0) JOINS.pop();
  return fetchAPI(`/DDB?PageSize=10&Page=${Page}`, {
    method: 'GET',
    body: { DDB: [{ DDLX: ['7', '8'], CJJXSID, DDZT }], JOINS }
  })
}

/**
 * getSingleOrderLogisticsDetail -  获取单张订单对应的单次物流明细
 *
 * @param  {object} params { DDID: '12321214', WLDH: '3554325'}
 * @return {type}        description
 */
export function getSingleOrderLogisticsDetailAPI(params) {
  const body = JSON.stringify(params);
  return fetchAPI('/DDB/WLDB/CRKDB/CRKMXB', {
    method: 'GET',
    body
  })
}

export function postDispatchManageAPI({ RKCKID, CKCKID, BTZR, SP, productionList, DHRQ }) {
  return fetchAPI('/DBZLDD', {
    body: { DDB: { RKCKID, CKCKID, DHRQ }, TZ: { TZNR: '请处理该调拨指令', BTZR }, SP, JHTJDB: productionList },
    method: 'POST'
  })
}
/* 根据物流单号获取详情*/
export function LogistDetailSlect(ddid) {
  return fetchAPI(`/DDB/${ddid}/CRKDB/WLDB`, {
    method: 'GET'
  })
}

/**
 * 创建直销手术托管订单
 */
export function postZXTGSSDDAPI(params) {
  return fetchAPI('/ZXTGSSDD', {
    method: 'POST',
    body: { DDB: { ...params }, TZ: { TZNR: params.TZNR, BTZR: params.BTZR }, SP: params.SP }
  })
}

/**
 * 创建直销备货订单
 */
export function postZXBHDDAPI(params) {
  return fetchAPI('/ZXBHDD', {
    method: 'POST',
    body: { DDB: { ...params }, TZ: { TZNR: params.TZNR, BTZR: params.BTZR }, SP: params.SP }
  })
}

/**
 * 创建寄售订单
 */
export function postJSDDAPI(params) {
  return fetchAPI('/JSDD', {
    method: 'POST',
    body: { DDB: { ...params }, TZ: { TZNR: params.TZNR, BTZR: params.BTZR }, SP: params.SP }
  })
}

/**
 * 订单内部复核
 */
export function postProcurementReviewAPI({ id, SHZT, SHYJ, TZNR, BTZR }) {
  return fetchAPI(`/DDB/${id}/SH`, {
    method: 'POST',
    body: { DDSH: { SHLX: '0', SHZT, SHYJ }, TZ: { TZNR, BTZR } }
  })
}

/* 查询和筛选订单*/
export function orderListSearchAndFilter([page, params]) {
  return fetchAPI(`/DDB?Page=${page}&SortOrder=desc&PageSize=10&SortBy=`, {
    method: 'GET',
    body: params
  });
}

/**
 * 手术分销订单
 */
export function postSSFXDDAPI(params) {
  return fetchAPI('/SSFXDD', {
    method: 'POST',
    body: { DDB: { ...params }, TZ: { TZNR: params.TZNR, BTZR: params.BTZR }, SP: params.SP }
  })
}

/**
 * 铺货提交
 * @param  {} params
 */
export function postDistributionOrderAPI(params) {
  return fetchAPI('/PHDD', {
    method: 'POST',
    body: { DDB: { ...params }, TZ: { TZNR: params.TZNR, BTZR: params.BTZR }, SP: params.SP }
  })
}
