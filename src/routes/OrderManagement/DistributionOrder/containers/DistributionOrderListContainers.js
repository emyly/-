/**
 * Created by qyf on 2017/3/14.
 */
import { connect } from 'react-redux'

import DistributionOrderList from '../components/DistributionOrderList'

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  globalStore: state.globalStore
})


export default connect(mapStateToProps, mapDispatchToProps)(DistributionOrderList)
