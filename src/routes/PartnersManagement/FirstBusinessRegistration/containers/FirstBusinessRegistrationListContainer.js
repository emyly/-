/**
 * Created by liuyali on 2016/11/22.
 */

import {
  connect
} from 'react-redux'

import {
  getRelatedOrg,
} from '../modules/getRelatedOrg'


import FirstBusinessRegistrationList from '../components/FirstBusinessRegistrationList';

const mapDispatchToProps = {
  getRelatedOrg: (page, id) => getRelatedOrg(page, id),
}

const mapStateToProps = state => ({
  firstBusinessRegistrationList: state.getFirstBusinessRegistrationListReducer.getFirstBusinessRegistrationList,
  // getOrgCertificateData:state.getFirstBusinessRegistrationListReducer.getFirstBusinessRegistrationList,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(FirstBusinessRegistrationList)
