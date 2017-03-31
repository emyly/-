/**
 * Created by liuyali on 2016/11/9.
 */
/**
 * Created by liuyali on 2016/11/8.
 */
import {
  connect
} from 'react-redux'
import {
  printInventoryRecords
} from '../modules/printInventoryRecords'

import PrintInventoryRecords from '../components/printInventoryRecords';

const mapDispatchToProps = {
  DprintInventoryRecords: id => printInventoryRecords(id)
}

const mapStateToProps = state => ({
  printInventoryRecords: state.printInventoryRecords
})


export default connect(mapStateToProps, mapDispatchToProps)(PrintInventoryRecords);
