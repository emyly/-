import { connect } from 'react-redux'

import StockOrderList from '../components/StockOrderList'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(StockOrderList)
