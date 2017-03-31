/**
 * Created by wangming on 2016/12/28.
 */
import { fetchAPI } from 'lib/utils'
/*
*1、开票 用到的接口
*开票记录查询 已开票 查询接口
*查询订单列表
*查询订单详情
*查询订单的账单汇总信息
*根据订单获取账单详情
*查看已开票订单关联的商品清单
*查看未开票订单关联的商品清单
*
*2、收款用到的接口
*查询订单列表
*查看订单详情
*销售收账表创建接口
*查询订单的账单汇总信息
*查看订单详情
*
*/

/**
 * 押金 预付款 API接口
 */
// 查看押金列表
// ~~~json
// {
//     "PageSize": 10,       //每页显示条数(公共参数)
//     "Page": 1,            //第几页(公共参数)
//     "SortBy": "",         //排序条件(公共参数)
//     "SortOrder": "desc"   //降序还是升序(公共参数)
// }
// ~~~
// ~~~json
// {
//   "JXSYJB":{
//            "SJXSID":8000,   //收经销商ID（组织机构ID）
//            "YJLX":"1"       //押金类型 1表示押金,0表示预售金
//   }
// }
// ~~
// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "Total": 2,
//     "JXSYJB": [
//       {
//         "GUID": 8000,             // GUID
//         "SJXSID": 91,             // 收经销商ID
//         "ZJXSID": 92,             // 支经销商ID
//         "YJLX": "1",              // 押金类型 1表示押金,0表示预售金
//         "JE": 120000,             // 押金总额
//         "LJSKJE": 190000,         // 累计收款金额
//         "LJTKJE": 70000,          // 累计退款金额
//         "CJR": 8888,              // 创建人
//         "CJSJ": 1560528000000,    // 创建时间
//         "ZTBS": "E",              // 状态标识
//         "JGMC": "杭州某某公司1"    // 付款方机构名称
//       },
//       {
//         "GUID": 8001,
//         "SJXSID": 91,
//         "ZJXSID": 93,
//         "YJLX": "1",
//         "JE": 100000,
//         "LJSKJE": 190000,
//         "LJTKJE": 90000,
//         "CJR": 8889,
//         "CJSJ": 1560528000000,
//         "ZTBS": "E",
//         "JGMC": "杭州某某公司2"
//       }
//       /*.......*/
//     ]
//   }
// }
export function getDepositListAPI(params) {
  return fetchAPI(`/JXSYJB?Page=${params.Page}&SortOrder=desc&PageSize=10&SortBy=`, {
    method: 'GET',
    body: params.body
  });
}

// 查看押金明细列表 查看预付款收款明细列表
// ~~~
// ~~~json
// {
//   "YJMXB":{
//            "SJXSID":8000,   //收经销商ID（组织机构ID）(主体)
//            "ZJXSID":8001,   //支经销商ID（组织机构ID）
//            "YJLX":"1",      //押金类型 1表示押金,0表示预售金
//            "SZLX":"1"       //0表示支(退款),1表示收(收款)
//   }
// }
// ~~~
// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "Total": 2,
//     "YJMXB": [
//        {
//          "GUID": 304,                   //GUID
//          "JXSYJID": 8000,               //经销商押金ID
//          "SJXSID": 91,                  //收经销商ID
//          "ZJXSID": 92,                  //支经销商ID
//          "YJLX": "1",                   //押金类型 1表示押金,0表示预售金
//          "SZLX": "1",                   //收支类型 1表示收,0表示支
//          "SJBH": 900000001,             //收据编号
//          "JE": 55000,                   //金额
//          "MS": "这是一个押金测试描述",    //描述
//          "CJR": 8888,                   //创建人
//          "CJSJ": 1560528000000,         //创建时间(收款日期)
//          "ZTBS": "E",                   //状态标识
//          "YHXM": "张阿三"               //收款人姓名
//        },
//        {
//          "GUID": 305,
//          "JXSYJID": 8000,
//          "SJXSID": 91,
//          "ZJXSID": 92,
//          "YJLX": "1",
//          "SZLX": "1",
//          "SJBH": 900000002,
//          "JE": 60000,
//          "MS": "这是一个押金测试描述",
//          "CJR": 8889,
//          "CJSJ": 1560528000000,
//          "ZTBS": "E",
//          "YHXM": "李小四"
//       }
//   ]
// }
// ~~~
export function getDepositDetailListAPI(params) {
  return fetchAPI(`/YJMXB?Page=${params.Page}&SortOrder=desc&PageSize=10&SortBy=`, {
    method: 'GET',
    body: params.body
  });
}

// 押金收款登记 押金退款登记 预付款收款登记
// ~~~json
// {
//   "YJMXB":{
//       "SJXSID": 91,                  //收经销商ID
//       "ZJXSID": 92,                  //支经销商ID
//       "YJLX": "1",                   //押金类型 1表示押金,0表示预售金
//       "SZLX": "1",                   //收支类型 1表示收,0表示支
//       "SJBH": 900000001,             //收据编号
//       "JE": 55000,                   //金额
//       "MS": "这是押金收款登记测试描述" //描述
//   }
// }
// ~~~
// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "YJMXB":{
//       "GUID": 800,                   //GUID
//       "JXSYJID": 8000,               //经销商押金ID
//       "SJXSID": 91,                  //收经销商ID
//       "ZJXSID": 92,                  //支经销商ID
//       "YJLX": "1",                   //押金类型 1表示押金,0表示预售金
//       "SZLX": "1",                   //收支类型 1表示收,0表示支
//       "SJBH": 900000001,             //收据编号
//       "JE": 55000,                   //金额
//       "MS": "这是押金收款登记测试描述",//描述
//       "CJR": 8888,                   //创建人
//       "CJSJ": 1560528000000,         //创建时间(收款日期)
//       "ZTBS": "E"                    //状态标识
//     }
//   }
// }
// ~~~
export function postDepositSubmitAPI(params) {
  return fetchAPI('/YJMXB', {
    method: 'POST',
    body: params.body
  });
}

// 查看单个押金总数据 查看单个预付款总数据
// ~~~json
// {
//   "JXSYJB":{
//            "SJXSID":91,   //收经销商ID（组织机构ID）
//            "ZJXSID":92,   //支经销商ID（组织机构ID）
//            "YJLX":"1"       //押金类型 1表示押金,0表示预售金
//   }
// }
// ~~~
// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "JXSYJB": {
//         "GUID": 8000,             // GUID
//         "SJXSID": 91,             // 收经销商ID
//         "ZJXSID": 92,             // 支经销商ID
//         "YJLX": "1",              // 押金类型 1表示押金,0表示预售金
//         "JE": 120000,             // 押金总额
//         "LJSKJE": 190000,         // 累计收款金额
//         "LJTKJE": 70000,          // 累计退款金额
//         "CJR": 8888,              // 创建人
//         "CJSJ": 1560528000000,    // 创建时间
//         "ZTBS": "E"              // 状态标识
//       }
//   }
// }
// ~~~
export function getOneDepositDataAPI(params) {
  return fetchAPI('/ONEJXSYJB', {
    method: 'GET',
    body: params.body
  });
}

// |[根据授权经销商获取被授权经销商](#根据授权经销商获取被授权经销商)|/contract/authorize_organizations| GET|
// |[根据被授权经销商获取授权经销商](#根据被授权经销商获取授权经销商)|/contract/authorized_organizations| GET|

// 根据被授权经销商获取授权经销商

// |接口   | 	/contract/authorize_organizations   |
// |:------|:----------:|
// |方法    |GET        |
// |HTTP返回值|200        |

// *Url请求参数*
// ~~~json
// {
//   "contract_type": "合同类型",
//   "authorized_organization_id": "授权经销商经销商id",
// }
// ~~~
// `/contract/authorize_organizations?contract_type=value&authorized_organization_id=value`

// *成功返回*：

// `content-type: application/json`
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "authorize_organizations": [
//       {
//         "id": "经销商id",
//         "name": "经销商名称"
//       },
//       {
//         "id": "经销商id",
//         "name": "经销商名称"
//       }
//     ]
//   }
// }
// ~~~
export function getAuthorizeOrgListAPI(params) {
  return fetchAPI('/contract/authorize_organizations', {
    method: 'GET',
    body: params.body
  });
}

// 根据授权经销商获取被授权经销商

// |接口   | 	/contract/authorized_organizations   |
// |:------|:----------:|
// |方法    |GET        |
// |HTTP返回值|200        |

// *Url请求参数*
// ~~~json
// {
//   "contract_type": "合同类型",
//   "authorize_organization_id": "授权经销商经销商id",
//   "authorized_organization_type": "被授权经销商类型" //"J"代表经销商，"Y"代表医院,如果没有此层筛选条件，则不用传此参数
// }
// ~~~
// `/contract/authorized_organizations?contract_type=value&authorize_organization_id=value&authorized_organization_type=value`

// *成功返回*：

// `content-type: application/json`
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "authorized_organizations": [
//       {
//         "id": "经销商id",
//         "name": "经销商名称"
//       },
//       {
//         "id": "经销商id",
//         "name": "经销商名称"
//       }
//     ]
//   }
// }
// ~~~

export function getAuthorizedOrgListAPI(params) {
  return fetchAPI('/contract/authorized_organizations', {
    method: 'GET',
    body: params.body
  });
}
/**
 * 开票 API接口
 */

// 开票记录查询 已开票 查询接口
// ~~~json
// {
// 	"GHDWID": "购货单位id",
// 	"FPHM": "发票号码",
// 	"START_TIME": "开始时间", //开票时间
// 	"STOP_TIME": "结束时间" //开票时间,
// }
// ~~~

// 成功返回值示例：

// ~~~json
// {
// 	"Code":0,
// 	"Message":"查询成功",
// 	"Result":{
// 		"total": "记录总数量",
// 		"XSKPB": [{
// 			"GHDW": "购货单位",
// 			"DDID": "订单id",
// 			"FPHM": "发票号码",
// 			"KPR": "开票人",
// 			"KPSJ": "开票时间",
// 			"KPJE": "开票金额",
// 		}]
// 	}
// }
// ~~~

// 失败返回值示例：

// ~~~json
// {
// 	"Code": "待定",
// 	"Message": "Error Message"
// }
// ~~~
export function getAlreadyBillingAPI(params) {
  return fetchAPI(`/ZZJGB/${params.zzjgid}/XSKPB?PageSize=${params.PageSize}&Page=${params.Page}` +
      `&SortBy=${params.SortBy}&SortOrder=${params.SortOrder}`, {
        method: 'GET',
        body: params.body
      });
}


// 查询订单列表
export function getOrderListAPI(params) {
  console.debug('getOrderListAPI:', params);
  return fetchAPI(`/DDB?PageSize=${params.PageSize}&Page=${params.Page}` +
      `&SortBy=${params.SortBy}&SortOrder=${params.SortOrder}`, {
        method: 'GET',
        body: params.body
      });
}

// 查询订单详情
export function getOrderDetailAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}`, {
    method: 'GET',
    body: params.body
  });
}

// 查询订单的账单汇总信息
export function getOrderSummaryAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/ZDHZ`, {
    method: 'GET'
  });
}

// 根据订单获取账单详情
export function getOrderCheckDetailAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/XSDB`, {
    method: 'GET',
    body: params.body
  });
}

// 查看已开票订单关联的商品清单
export function getBillingedOrderGoodsAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/YKPDDSPGLB`, {
    method: 'GET'
  });
}

// 查看未开票订单关联的商品清单
export function getUnbllingOrderGoodsAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/WKPDDSPGLB`, {
    method: 'GET'
  });
}

// 销售开票创建
// ~~~json
// {
// 	"FP": [
// 		{
// 			"CRKDID": ["出入库单id","出入库单id", "出入库单id"], //在订单详情页做开票时，传要开票的出入库单id数组
// 			"DDID": ["订单id", "订单id", "订单id"], //在未开票列表页面做开票时，传要开票的订单id数组
// 			"FPLX": "发票类型",
// 			"FPTT": "发票抬头",
// 			"FPDM": "发票代码",
// 			"FPHM": "发票号码",
// 			"KPJE": "开票金额", number
// 			"FPRQ": "发票时间"
// 		},
// 		{
// 			"CRKDID": ["出入库单id","出入库单id", "出入库单id"], //在订单详情页做开票时，传要开票的出入库单id数组
// 			"DDID": ["订单id", "订单id", "订单"], //在未开票列表页面做开票时，传要开票的订单id数组
// 			"FPLX": "发票类型",
// 			"FPTT": "发票抬头",
// 			"FPDM": "发票代码",
// 			"FPHM": "发票号码",
// 			"KPJE": "开票金额", number
// 			"FPRQ": "发票时间"
// 		}
// 	]
// }
// ~~~

// 成功返回值示例：

// ~~~json
// {
// 	"Code":0,
// 	"Message":"成功",
// 	"Result":{}
// }
// ~~~

// 失败返回值示例：

// ~~~json
// {
// 	"Code": "待定",
// 	"Message": "Error Message"
// }
// ~~~
export function postSalesBillingAPI(params) {
  return fetchAPI('/XSKPB', {
    method: 'POST',
    body: params.body
  });
}

// 销售收账表创建接口
// 入参示例：

// ~~~json
// {
// 	"XSSZMXB": [{
// 		"CRKDID": ["出入库单id", "出入库单id", "出入库单id"], [number]
//     "DDID": "订单id", number
//     "ZSZJE": "该订单收账金额", number
//     "SZRQ": "收账日期" number
// 	}, {
//     "CRKDID": ["出入库单id", "出入库单id", "出入库单id"], [number]
//     "DDID": "订单id", number
//     "ZSZJE": "该订单收账金额", number
//     "SZRQ": "收账日期" number
// 	}],
//   "XSSZB": {
//     "FZJXSID": "付账经销商id",  number
//     "SZLX": "收账类型", string
//   }
// }
// ~~~

// 成功返回值示例：

// ~~~json
// {
// 	"Code":0,
// 	"Message":"操作成功",
// 	"Result":{}
// }
// ~~~

export function postSalesCreateAPI(params) {
  return fetchAPI('/XSSZB', {
    method: 'POST',
    body: params.body
  });
}

// 查看订单关联的商品清单
export function getOrderGoodsAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/ALLDDSPGLB`, {
    method: 'GET'
  });
}

// 添加物流加急订单
// 入参示例：
// ~~~json
// {
// 	"XSDZKJJ": {
// 		"CZJE": "操作金额", number
// 		"CZBZ": "操作备注",	string
// 		"CZLX": "1" string
//  	}
// }
// ~~~

// 成功返回值示例：

// ~~~json
// {
// 	"Code":0,
// 	"Message":"操作成功",
// 	"Result":{}
// }
// ~~~
export function postUrgentLogisticsCreateAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/JJWL`, {
    method: 'POST',
    body: params.body
  });
}

// 订单折扣
// 入参示例：

// ~~~json
// {
// 	"XSDZKJJ": {
// 		"CZJE": "操作金额", number
// 		"CZBZ": "操作备注", string
// 		"CZLX": "0"	string
//  	}
// }
// ~~~

// 成功返回值示例：

// ~~~json
// {
// 	"Code":0,
// 	"Message":"操作成功",
// 	"Result":{}
// }
// ~~~
export function postDiscountCreateAPI(params) {
  return fetchAPI(`/DDB/${params.ddid}/ZK`, {
    method: 'POST',
    body: params.body
  });
}

// 销售坏账创建接口
// 入参示例：

// ~~~json
// {
// 	"XSHZMX": [{
// 		"CRKDID": "出入库单id", number
// 		"DDID": "订单ID", number
// 		"HZJE": "坏账金额", number
// 		"YY": "原因" string
// 	}, {
// 		"CRKDID": "出入库单id", number
// 		"DDID": "订单ID", number
// 		"HZJE": "坏账金额", number
// 		"YY": "原因" string
// 	}],
// 	"XSHZ": {
// 		"FZJXSID": "付账经销商id", number
// 		"FZJXSMC": "付账经销商名称", string
// 		"SZJXSID": "收账经销商id", number
// 		"SZJXSMC": "收账经销商名称", string
// 	}
// }
// ~~~

// 成功返回值示例：

// ~~~json
// {
// 	"Code":0,
// 	"Message":"成功",
// 	"Result":{}
// }
// ~~~
export function postBadebtCreateAPI(params) {
  return fetchAPI('/XSHZB', {
    method: 'POST',
    body: params.body
  });
}

// 未核销列表
// ~~~json
// {
//     "PageSize": 10,       //每页显示条数
//     "Page": 1,            //第几页
//     "SortBy": "default",  //排序条件
//     "SortOrder": "desc"   //降序还是升序
// }
// ~~~

// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "Total": 3,
//     "DDWHXB": [
//       {
//         "GUID": 5001,
//         "CJJXSID": 8002,
//         "CJJXSMC": "测试核销的购货单位2",          // 创建经销商名称
//         "JSJXSID": 8002,
//         "JSJXSMC": "测试核销的购货单位2",
//         "SHJXSID": 20001,
//         "SHJXSMC": "测试核销的审核经销商1",        // 审核经销商名称
//         "WSZJE": 0,                              // 未收帐金额
//         "DDZT": 1,                               // 订单状态
//         "JSZJE": 1500000,                        // 结算总金额
//         "YSZJE": 900000,                         // 已收帐金额
//         "HZJE": 600000,                          // 坏账金额
//         "CJSJ": 1471861074017,                   // 创建时间
//         "ZTBS": "E"
//         /*.......*/
//       }
//       /*.......*/
//     ]
//   }
// }
export function getUnverificationAPI(params) {
  return fetchAPI(`/DDWHX/${params.orgId}?PageSize=${params.PageSize}&Page=${params.Page}` +
      `&SortBy=${params.SortBy}&SortOrder=${params.SortOrder}`, {
        method: 'GET',
        body: params.body
      });
}


// 已核销列表
// 入参示例:
// 注：由于要进行分页，公共参数如下：
// ~~~json
// {
//     "PageSize": 10,       //每页显示条数
//     "Page": 1,            //第几页
//     "SortBy": "default",  //排序条件
//     "SortOrder": "desc"   //降序还是升序
// }
// ~~~


// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {
//     "Total": 4,
//     "DDYHXB": [
//       {
//         "GUID": 5001,
//         "CJJXSID": 8002,
//         "CJJXSMC": "测试已核销的购货单位6",        // 创建经销商名称
//         "JSJXSID": 8002,
//         "JSJXSMC": "测试已核销的购货单位6",
//         "SHJXSID": 20001,
//         "SHJXSMC": "测试核销的审核经销商1",        // 审核经销商名称
//         "WSZJE": 0,                              // 未收帐金额
//         "DDZT": 1,                               // 订单状态
//         "JSZJE": 1500000,                        // 结算总金额
//         "YSZJE": 900000,                         // 已收帐金额
//         "HZJE": 600000,                          // 坏账金额
//         "CJSJ": 1471861074017,                   // 创建时间
//         "ZTBS": "E"
//         /*.......*/
//       }
//       /*.......*/
//     ]
//   }
// }
// ~~~
export function getVerificationedAPI(params) {
  return fetchAPI(`/DDYHX/${params.orgId}?PageSize=${params.PageSize}&Page=${params.Page}` +
      `&SortBy=${params.SortBy}&SortOrder=${params.SortOrder}`, {
        method: 'GET',
        body: params.body
      });
}

// 核销
// 入参示例:
// ~~~json
// {
//   "DDB":{
//     SHJXSID: 9000,              // 当前组织机构GUID
//     DDID: [110, 115, 118, 250]  // 当前要核销的订单ID列表
//   }
// }
// ~~~
// 返回示例:
// ~~~json
// {
//   "Code": 0,
//   "Message": "操作成功",
//   "Result": {

//   }
// }
// ~~~
export function postVerificationAPI(params) {
  return fetchAPI('/DDHX', {
    method: 'PUT',
    body: params.body
  });
}
