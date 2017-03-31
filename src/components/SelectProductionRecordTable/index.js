/**
 * Created by wangming on 2016/10/29.
 */

import {
	connect
} from 'react-redux'
import {
	getSelectProductionRecord,
} from './modules/selectProductionRecordTable'
import SelectProductionRecordTable from './SelectProductionRecordTable';

const mapDispatchToProps = {
  getSelectProductionRecord: (id, type) => getSelectProductionRecord(id, type)
}

const mapStateToProps = state => ({
  selectProductionRecordTable: state.selectProductionRecordTable
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectProductionRecordTable)
