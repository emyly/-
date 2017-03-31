/**
 * Created by liuyali on 2016/11/22.
 */
import {
  connect
} from 'react-redux'

import {
  createOrg
} from '../modules/FirstBusinessRegistration'

import FirstBusinessRegistration from '../components/FirstBusinessRegistration';

const mapDispatchToProps = {
  createOrg: params => createOrg(params)
}

const mapStateToProps = state => ({
  BasicInformation: state.FirstBusinessRegistrationReducer.BasicInformation,
  FirstBusinessRegistrationData: state.FirstBusinessRegistrationReducer.FirstBusinessRegistrationReducer,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(FirstBusinessRegistration)
