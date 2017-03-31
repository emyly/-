/**
 * Created by wangming on 2016/10/24.
 */

import {
	connect
} from 'react-redux'
import {
	getUrgentDetail,
} from './modules/urgentDetailTable'
import UrgentDetailTable from './UrgentDetailTable'

const mapDispatchToProps = {
  getUrgentDetail: id => getUrgentDetail(id)
}

const mapStateToProps = state => ({
  urgentDetailTable: state.urgentDetailTable
})

export default connect(mapStateToProps, mapDispatchToProps)(UrgentDetailTable)
