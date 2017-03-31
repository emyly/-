import {
  connect
} from 'react-redux'

import {
  getBillingData, uploadBillingImgData, setBillingUploadInit, deleteOneBilling
} from './modules/billingUpload'

import BillingUpload from './BillingUpload'

const mapDispatchToProps = {
  deleteOneBilling,
  setBillingUploadInit: () => setBillingUploadInit(),
  getBillingData: (ddid, mbjxsid) => getBillingData(ddid, mbjxsid),
  uploadBillingImgData: (body, formdata) => uploadBillingImgData(body, formdata)
}

const mapStateToProps = state => ({
  globalStore: state.globalStore,
  billingUploadData: state.BillingUploadContainer
})

export default connect(mapStateToProps, mapDispatchToProps)(BillingUpload)
