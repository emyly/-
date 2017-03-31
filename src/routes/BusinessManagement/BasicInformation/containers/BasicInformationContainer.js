/**
 * Created by liuyali on 2017/3/24.
 */
import { connect } from 'react-redux'

import BasicInformation from '../components/BasicInformation';
import {
 setBasicInfoDataInit, getCorporationBasicInfo, putCorporationBasicInfo
} from '../modules/BasicInformation'
import {
getAllLocationData
} from '../../../../components/Location/modules/location'
import {
  getOrgCertificate,
} from '../../../PartnersManagement/FirstBusinessRegistration/modules/getOrgCertificates'

const mapDispatchToProps = {
  getCorporationBasicInfo: id => getCorporationBasicInfo(id),
  getOrgCertificate: id => getOrgCertificate(id),
  setBasicInfoDataInit: () => setBasicInfoDataInit(),
  getAllLocationData: params => getAllLocationData(params),
  putCorporationBasicInfo: params => putCorporationBasicInfo(params),
}

const mapStateToProps = state => ({
  BasicInformation: state.BasicInformationState.reducer,
  getOrgCertificateData: state.BasicInformationState.getOrgCertificate,
  globalStore: state.globalStore,
  locationData: state.LocationReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation)
