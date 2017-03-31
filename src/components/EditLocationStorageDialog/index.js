/**
 * Created by chenming on 2016/12/1.
 */
import EditLocationStorageDialog from './EditLocationStorageDialog';
import {
  connect
} from 'react-redux'
import {
  getLocationStorageDetailData,
  putEidtLocationStorageData,
  postCreateNewLocationStorage,
  initCreateLocationStoragelData,
  initEditLocationStoragelData
} from './modules/editLocationStorageDialog'

// 绑定action
const mapDispatchToProps = {
  getLocationStorageDetailData: params => getLocationStorageDetailData(params),
  putEidtLocationStorageData: params => putEidtLocationStorageData(params),
  postCreateNewLocationStorage: params => postCreateNewLocationStorage(params),
  initCreateLocationStoragelData: () => initCreateLocationStoragelData(),
  initEditLocationStoragelData: () => initEditLocationStoragelData()
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  editLocationStorageDialog: state.editLocationStorageDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(EditLocationStorageDialog)
