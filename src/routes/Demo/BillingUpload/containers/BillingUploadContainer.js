/**
 * Created by liuyali on 2016/12/21.
 */
import {
  connect
} from 'react-redux'
import {
   getBillingData, uploadBillingImgData
} from '../modules/billingUpload'
import BillingUpload from '../components/BillingUpload'

const mapDispatchToProps = {
  getBillingData: ddid => getBillingData(ddid),
  uploadBillingImgData: (body, formdata) => uploadBillingImgData(body, formdata)
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  billingUploadData: state.billingUploadReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(BillingUpload)
