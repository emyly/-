/**
 * Created by wangming on 2016/10/24.
 */

import {
	connect
} from 'react-redux'
import {
	getDiscountDetail,
} from './modules/discountDetailTable'
import DiscountDetailTable from './DiscountDetailTable'

const mapDispatchToProps = {
  getDiscountDetail: id => getDiscountDetail(id)
}

const mapStateToProps = state => ({
  discountDetailTable: state.discountDetailTable
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscountDetailTable)

