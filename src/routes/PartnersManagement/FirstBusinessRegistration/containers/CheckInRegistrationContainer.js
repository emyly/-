/**
 * Created by liuyali on 2016/12/30.
 */

import {
  connect
} from 'react-redux'

import {
  getOrgCertificate,
} from '../modules/getOrgCertificates'
import {
  getEnterpriseInformation,
} from '../modules/getEnterpriseInformation'

import CheckInRegistration from '../components/CheckInRegistration';

const mapDispatchToProps = {
  getOrgCertificate: id => getOrgCertificate(id),
  getEnterpriseInformation
}

const mapStateToProps = state => ({
  getOrgCertificateData: state.OrgCertificate,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckInRegistration)
