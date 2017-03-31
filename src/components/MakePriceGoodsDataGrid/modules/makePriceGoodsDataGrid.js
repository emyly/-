/**
 * Created by NXQ on 11/25/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MAKE_PRICE_GOODS_DATA = 'GET_MAKE_PRICE_GOODS_DATA';
export const GET_MAKE_PRICE_GOODS_DATA_SUCCESS = 'GET_MAKE_PRICE_GOODS_DATA_SUCCESS';
export const GET_MAKE_PRICE_GOODS_DATA_FAIL = 'GET_MAKE_PRICE_GOODS_DATA_FAIL';
export const INIT_PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA = 'INIT_PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA';
export const PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA = 'PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA';
export const PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_SUCCESS = 'PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_SUCCESS';
export const PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_FAIL = 'PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getMakePriceGoodsData({ contract_type, business_line_id, brand_id, first_class_id, second_class_id, third_class_id, authorize_organization_id, authorized_organization_id, for_pricing, pricing_status, price_status, money_type, min_price, max_price }) {
  return {
    type: GET_MAKE_PRICE_GOODS_DATA,
    payload: {
      contractType: contract_type,                // 合同类型   为了匹配已写好的后台key
      businessLineId: business_line_id,           // 业务线id
      brandId: brand_id,                          // 品牌id
      firstClassId: first_class_id,               // 一级分类id
      secondClassId: second_class_id,             // 二级分类id
      thirdClassId: third_class_id,               // 三级分类id
      authorizeOrgId: authorize_organization_id,  // 授权经销商id -- 卖方经销商
      authorizedOrgId: authorized_organization_id, // 被授权授权经销商id -- 买方经销商
      forPricing: for_pricing,                    // 是否在定价筛选处调用此接口
      pricingStatus: pricing_status,              // true表示已经定价,false表示未定价,不传代表此参数代表查询定价和未定价
      priceStatus: price_status,                  // now代表当前生效,future代表未生效,past代表已经失效
      moneyType: money_type,                 // 货币种类ID
      minPrice: min_price,                        // 最小价格
      maxPrice: max_price                         // 最大价格
    }
  }
}

export function putMakePriceGoodsData(makePriceGoodsCreateArray) {
  return {
    type: PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA,
    payload: makePriceGoodsCreateArray           // 定价商品数组
  }
}

export function initPutMakePriceGoodsData() {
  return {
    type: INIT_PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA
  }
}


export const actions = {
  getMakePriceGoodsData,
  putMakePriceGoodsData,
  initPutMakePriceGoodsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA]: (state, action) => Object.assign({}, state, {
    batchMakePriceStatus: '0'
  }),
  [PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    batchMakePriceStatus: '1'
  }),
  [PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    batchMakePriceStatus: '2'
  }),
  [GET_MAKE_PRICE_GOODS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    makePriceGoodsData: action.response
  }),
  [GET_MAKE_PRICE_GOODS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    makePriceGoodsData: []
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  batchMakePriceStatus: '0',       // '0'表示init状态 '1'表示成功状态 '2'表示失败状态 批量定价是否成功
  makePriceGoodsData: []
};
export default function makePriceGoodsDataGridReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
