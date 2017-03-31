import {
  connect
} from 'react-redux'
import {
  getProductionData,
} from './modules/pickProductionDialog'
import PickProductionDialog from './PickProductionDialog'

// 绑定action
const mapDispatchToProps = {
  getProductionData: (barCode, KWID) => getProductionData(barCode, KWID)
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  pickProductionDialog: state.pickProductionDialog
})
export default connect(mapStateToProps, mapDispatchToProps)(PickProductionDialog)

