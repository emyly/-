
import {
  connect
} from 'react-redux'
import {
  getBarcodeOut,
  getBarcodeIn,
  clearErrorMsg,
  getTranGood
} from './modules/barCodeTextField'
import BarCodeTextField from './BarCodeTextField'

const mapDispatchToProps = {
  getBarcodeOut: param => getBarcodeOut(param),
  getBarcodeIn: param => getBarcodeIn(param),
  clearErrorMsg: () => clearErrorMsg(),
  getTranGood: param => getTranGood(param)
}

const mapStateToProps = state => ({
  barCodeTextField: state.barCodeTextField
})

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeTextField)
