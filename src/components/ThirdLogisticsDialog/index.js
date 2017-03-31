/**
 * Created by chenming on 2016/10/24.
 */
import ThirdLogisticsDialog from './ThirdLogisticsDialog';

import {
  connect
} from 'react-redux'

// 绑定action
const mapDispatchToProps = {

}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  logisticsDetailDialog: state.logisticsDetailDialog,
})

export default connect(mapStateToProps, mapDispatchToProps)(ThirdLogisticsDialog)
