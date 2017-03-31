/**
 * Created by wangming on 2016/10/24.
 */

import {
	connect
} from 'react-redux'
import {
	getBillingedDetail,
	getUnbillingDetail,
} from './modules/billingDetailTable'
import BillingDetailTable from './BillingDetailTable'

const mapDispatchToProps = {
  getBillingedDetail: id => getBillingedDetail(id),
  getUnbillingDetail: id => getUnbillingDetail(id)
}

const mapStateToProps = state => ({
  billingDetailTable: state.billingDetailTable
})

export default connect(mapStateToProps, mapDispatchToProps)(BillingDetailTable)
