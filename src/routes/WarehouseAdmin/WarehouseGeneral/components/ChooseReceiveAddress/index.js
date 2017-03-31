/**
 * Created by magellan on 2016/12/9.
 */
import ChooseReceiveAddress from './ChooseReceiveAddress';

import {
  connect
} from 'react-redux'
import {
  getLogisticsAddressList,
  postChooseReceiveAddress,
  postDeleteAddress,
  initChooseReceiveAddress,
  putEditOneAddress,
  addOrganizationAddress
} from './modules/chooseReceiveAddress'
import {
  initLocationData,
  initAllLocationData
} from 'components/Location/modules/location.js'
import {
  getLocationId
} from 'components/EditWarehouseDialog/modules/editWarehouseDialog.js'
// 绑定action
const mapDispatchToProps = {
  getLogisticsAddressList: params => getLogisticsAddressList(params),
  postChooseReceiveAddress: params => postChooseReceiveAddress(params),
  postDeleteAddress: params => postDeleteAddress(params),
  initChooseReceiveAddress: () => initChooseReceiveAddress(),
  putEditOneAddress: params => putEditOneAddress(params),
  addOrganizationAddress: params => addOrganizationAddress(params),
  initLocationData: () => initLocationData(),
  initAllLocationData: () => initAllLocationData(),
  getLocationId: params => getLocationId(params),
}

// 绑定store中对应的组件key
const mapStateToProps = state => ({
  globalStore: state.globalStore,
  chooseReceiveAddress: state.chooseReceiveAddress,
  // locationData: state.LocationReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseReceiveAddress)
