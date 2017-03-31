/**
 * Created by liuyali on 2016/10/24.
 */
import {
  connect
} from 'react-redux'
import DeliveryOrdersGoodsDetailDataGrid from './DeliveryOrdersGoodsDetailDataGrid';

import {
  getDlryOrdersGoodsData,
} from './modules/DeliveryOrdersGoodsDetailDataGrid'

const mapDispatchToProps = {
  getDlryOrdersGoodsData: (GUID, CKRK, DDLX) => getDlryOrdersGoodsData(GUID, CKRK, DDLX)
}
const mapStateToProps = state => ({
  getDlryOrdersGoods: state.getDlryOrdersGoods
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryOrdersGoodsDetailDataGrid)
