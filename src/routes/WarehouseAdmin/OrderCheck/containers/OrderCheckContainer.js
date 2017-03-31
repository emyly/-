import { connect } from 'react-redux'

import OrderCheck from '../components/OrderCheck'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCheck)
