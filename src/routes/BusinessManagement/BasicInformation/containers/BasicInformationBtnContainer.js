/**
 * Created by liuyali on 2016/11/5.
 */
import { connect } from 'react-redux'

import ChangeInfoBtn from '../components/BasicInformationChangeBtn';

import {
  getBasicInfoData, setBasicInfoDataInit
} from '../modules/BasicInformation'

import {
  getOrgCertificate,
} from 'routes/PartnersManagement/FirstBusinessRegistration/modules/getOrgCertificates'

const mapDispatchToProps = {
  getBasicInfoData: imgArr => getBasicInfoData(imgArr),
  setBasicInfoDataInit: () => setBasicInfoDataInit(),
  getOrgCertificate: id => getOrgCertificate(id)
}

const mapStateToProps = state => ({
  BasicInformation: state.BasicInformationState.reducer,
  globalStore: state.globalStore,
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfoBtn)
