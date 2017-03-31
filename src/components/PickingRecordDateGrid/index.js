/**
 * Created by wrq on 2016/10/26.
 */

import {
  connect
} from 'react-redux'

import PickingRecordDateGrid from './PickingRecordDateGrid';
import {
  getPickingRecordDate
} from './modules/pickingRecordDateGrid'

const mapDispatchToProps = {
  getPickingRecordDate: (id, type) => getPickingRecordDate(id, type)
};
const mapStateToProps = state => ({
  pickingRecordDateGrid: state.pickingRecordDateGrid
});

export default connect(mapStateToProps, mapDispatchToProps)(PickingRecordDateGrid)

