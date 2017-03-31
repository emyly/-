/**
 * Created by chenming on 2016/10/24.
 */
import RegistrationCertificateDialog from './RegistrationCertificateDialog';

import {
  connect
} from 'react-redux'
import {
  getRegistrationCertificateInfoDate,
  initRegistrationCAData
} from './modules/registrationCertificationDialog'
// 绑定action
const mapDispatchToProps = {
  getRegistrationCertificateInfoDate: params => getRegistrationCertificateInfoDate(params),
  initRegistrationCAData: () => initRegistrationCAData
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  registrationCertificateDialog: state.registrationCertificateDialog,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationCertificateDialog)
