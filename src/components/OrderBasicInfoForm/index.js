/**
 * Created by wangming on 2016/10/26.
 */

import {
	connect
} from 'react-redux'
import {
	getOrderDetail,
  getTurnOrderDetail
} from './modules/orderBasicInfoForm'
import OrderBasicInfoForm from './OrderBasicInfoForm'

const mapDispatchToProps = {
  getOrderDetail: (id, type) => getOrderDetail(id, type),
  getTurnOrderDetail
}

const mapStateToProps = state => ({
  orderBasicInfoForm: state.orderBasicInfoForm
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderBasicInfoForm)

