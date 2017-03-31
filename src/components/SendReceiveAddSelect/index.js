import SendReceiveAddSelect from './SendReceiveAddSelect';

import {
  connect
} from 'react-redux'
import {
  getSendReceiveAddData,
} from './modules/sendReceiveAddSelect'
/**
 * 用户的操作当作 Action，传给 Store
 * */
const mapDispatchToProps = {
  getSendReceiveAddData: (JXSID, SFLX) => getSendReceiveAddData(JXSID, SFLX)
}

/**
 * 外部的state映射props
 * */
const mapStateToProps = state => ({
  sendReceiveAddSelect: state.sendReceiveAddSelect
})

export default connect(mapStateToProps, mapDispatchToProps)(SendReceiveAddSelect)

