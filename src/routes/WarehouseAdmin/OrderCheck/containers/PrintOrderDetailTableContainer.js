/**
 * Created by liuyali on 2017/2/28.
 */
import printOrderDetailTable from '../components/PrintOrderDetailTable.js';

import {
  connect
} from 'react-redux'

const mapStateToProps = state => ({
  orderBasicInfoForm: state.orderBasicInfoForm
})

export default connect(mapStateToProps)(printOrderDetailTable)
