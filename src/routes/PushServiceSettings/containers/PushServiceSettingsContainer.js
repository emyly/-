/**
 * Created by NXQ on 2/23/2017.
 */

import { connect } from 'react-redux';

import {
  initPushServiceSettingsData,
  getPushServiceSettingsData,
  updatePushServiceSettingsData
} from '../modules/pushServiceSettings';

import PushServiceSettings from '../components/PushServiceSettings';

const mapDispatchToProps = {
  initPushServiceSettingsData,
  getPushServiceSettingsData,
  updatePushServiceSettingsData
};

const mapStateToProps = state => ({
  pushServiceSettings: state.pushService.pushServiceSettings,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(PushServiceSettings)

