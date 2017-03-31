/**
 * Created by wangming on 2016/10/27.
 */

/**
 * 订单类型
 */
const orderType = [
  '铺货订单',
  '备货订单',
  '手术订单',
  '借货订单',
  '调货订单',
  '寄售订单',
  '铺货补货订单',
  '调拨申请订单',
  '调拨指令订单'
];

/**
 * 订单状态
 */
const orderState = [
  '待审核',
  '待发货',
  '退回',
  '撤单',
  '完成',
  '关闭'
];

const orderTypeObject = { operator: '2', stockout: '1', transfer: '7', transferAdmin: '8' , consignment:'5', distribution:'0'};
/**
 * 手术订单打桩数据
 */
const orderOperationData = {
  GUID: 1000001,
  YWXZFL: '业务线ID',
  YWXMC: '脊柱',
  PPID: '品牌ID',
  PPMC: '三友',
  SSLXID: '手术类型ID',
  SSLXMC: '脊椎矫正',
  SSMC: '手术名称',
  SSMBID: '手术模板ID',
  SSMBMC: '雅典娜',
  CJJXSMC: '浙二医院',
  SHJXSMC: '鼎盛医疗',
  DDZT: 0,
  SHZT: '审核状态',
  WBSHZT: '外部审核状态',
  CJSJ: '2016-10-26',
  XSDB: '销售代表',
  XSDBMC: '张三',
  XSZL: '销售助理',
  XSZLMC: '李四',
  ZXFX: 1,
  YYMC: '浙二医院',
  SHLXR: '收货人',
  SHLXRDH: '收货人电话',
  SHDZ: '收货地址',
  DHRQ: '送货时间',
  DDBZ: '订单备注',
  SSRQ: '手术日期',
  RL: '入路',
  RLMC: '入路名称',
  BW: '部位',
  BWMC: '部位名称',
  YSID: '医生ID',
  YSMC: '医生名称',
  FSYSBH1: '附属医生编号1',
  FSYSMC1: '附属医生名称1',
  FSYSBH2: '附属医生编号2',
  FSYSMC2: '附属医生名称2',
  FSYSBH3: '附属医生编号3',
  FSYSMC3: '附属医生名称3',
  BRXM: '病人姓名',
  BRXB: '病人性别',
  ZYH: '住院号',
  CWH: '床位号',
  DDLX: 2
};

/**
 * 备货订单打桩数据
 */
const orderStockData = {
  GUID: 1000001,
  YWXZFL: '业务线ID',
  YWXMC: '脊柱',
  PPID: '品牌ID',
  PPMC: '三友',
  SSLXID: '手术类型ID',
  SSLXMC: '脊椎矫正',
  SSMC: '手术名称',
  SSMBID: '手术模板ID',
  SSMBMC: '雅典娜',
  CJJXSMC: '浙二医院',
  SHJXSMC: '鼎盛医疗',
  DDZT: 1,
  SHZT: '审核状态',
  WBSHZT: '外部审核状态',
  CJSJ: '2016-10-27',
  XSDB: '销售代表',
  XSDBMC: '张三',
  XSZL: '销售助理',
  XSZLMC: '李四',
  ZXFX: 1,
  YYMC: '浙二医院',
  SHLXR: '张三',
  SHLXRDH: '13588319354',
  SHDZ: '浙江省杭州市上城区武林路131号青春大药房',
  DHRQ: '2016-02-29 10:30',
  DDBZ: '订单备注',
  SSRQ: '手术日期',
  RL: '入路',
  RLMC: '入路名称',
  BW: '部位',
  BWMC: '部位名称',
  YSID: '医生ID',
  YSMC: '医生名称',
  FSYSBH1: '附属医生编号1',
  FSYSMC1: '附属医生名称1',
  FSYSBH2: '附属医生编号2',
  FSYSMC2: '附属医生名称2',
  FSYSBH3: '附属医生编号3',
  FSYSMC3: '附属医生名称3',
  BRXM: '病人姓名',
  BRXB: '病人性别',
  ZYH: '住院号',
  CWH: '床位号',
  DDLX: 1
};

export
{
	orderType,
	orderState,
	orderOperationData,
	orderStockData,
  orderTypeObject
}
