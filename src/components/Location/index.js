/**
 * Created by liuyali on 2016/12/2.
 */
import {
  connect
} from 'react-redux'

import {
  getLocationData, getCityOrAreaData, initLocationData, initAllLocationData, getAllLocationData
} from './modules/location'

import Location from './Location';

const mapDispatchToProps = {
  getLocationData: () => getLocationData(),
  getCityOrAreaData: (id, LX) => getCityOrAreaData(id, LX),
  initLocationData: () => initLocationData(),
  initAllLocationData: () => initAllLocationData(),
  getAllLocationData: params => getAllLocationData(params),
}

const mapStateToProps = state => ({
  locationData: state.LocationReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(Location)
