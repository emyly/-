import { connect } from 'react-redux'

import OrderSummary from '../components/OrderSummary'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
