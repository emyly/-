/**
 * Created by wangming on 2016/10/24.
 */
/**
 * Created by wangming on 2016/10/26.
 */

import {
	connect
} from 'react-redux'
import {
	getBaddebtsDetail,
} from './modules/baddebtsDetailTable'
import BaddebtsDetailTable from './BaddebtsDetailTable'

const mapDispatchToProps = {
  getBaddebtsDetail: id => getBaddebtsDetail(id)
}

const mapStateToProps = state => ({
  baddebtsDetailTable: state.baddebtsDetailTable
})

export default connect(mapStateToProps, mapDispatchToProps)(BaddebtsDetailTable)
