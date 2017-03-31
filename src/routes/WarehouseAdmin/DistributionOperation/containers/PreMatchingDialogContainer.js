import {
  connect
} from 'react-redux'
import {
  getPrematchingData,
} from '../modules/preMatchingDialog'
import PreMatchingDialog from '../components/SelectMethodFlow/PreMatchingDialog'

// 绑定action
const mapDispatchToProps = {
  getPrematchingData
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  preMatchingDialog: state.distributionOperation.preMatchingDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(PreMatchingDialog)

