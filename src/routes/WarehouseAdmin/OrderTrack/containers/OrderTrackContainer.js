/**
 * Created by liuyali on 2016/12/14.
 */

import {
  connect
} from 'react-redux'

import {
  getFilterOrderListData
} from '../module/OrderTrack'

import OrderTrack from '../component/OrderTrack'

const mapDispatchToProps = {
  getFilterOrderListData: (page, params) => getFilterOrderListData(page, params)
}

const mapStateToProps = state => ({
  OrderTrackData: state.OrderTrackData
})


export default connect(mapStateToProps, mapDispatchToProps)(OrderTrack)
