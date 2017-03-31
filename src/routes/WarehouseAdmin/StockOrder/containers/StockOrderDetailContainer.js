import { connect } from 'react-redux'

import StockOrderDetail from '../components/StockOrderDetail'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(StockOrderDetail)
