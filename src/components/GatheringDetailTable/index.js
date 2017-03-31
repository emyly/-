/**
 * Created by wangming on 2016/10/24.
 */

import {
	connect
} from 'react-redux'
import {
	getGatheringedDetail,
	getUngatheringDetail,
} from './modules/gatheringDetailTable'
import GatheringDetailTable from './GatheringDetailTable';

const mapDispatchToProps = {
  getGatheringedDetail: id => getGatheringedDetail(id),
  getUngatheringDetail: id => getUngatheringDetail(id)
}

const mapStateToProps = state => ({
  gatheringDetailTable: state.gatheringDetailTable
})

export default connect(mapStateToProps, mapDispatchToProps)(GatheringDetailTable)
