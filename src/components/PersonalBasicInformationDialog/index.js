/**
 * Created by liuyali on 2016/10/31.
 */
import {
  connect
} from 'react-redux'
import {
  getPersonalBasicInfoData, putPersonalBasicInfoData, exitDispatch
} from './modules/PersonalBasicInformationDialog'

import PersonalBasicInformationDialog from './PersonalBasicInformationDialog';

const mapDispatchToProps = {
  getPersonalBasicInfoData: id => getPersonalBasicInfoData(id),
  putPersonalBasicInfoData: (flag, id, newInfo, imgData, userData) => putPersonalBasicInfoData(flag, id, newInfo, imgData, userData),
  exitDispatch: () => exitDispatch()
}

const mapStateToProps = state => ({
  getPersonalBasicInfo: state.getPersonalBasicInfo,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalBasicInformationDialog);
