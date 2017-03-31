import {
  connect
} from 'react-redux'
import {
  getOderData,
} from './modules/orderSelect'
import OrderSelect from './OrderSelect';
const mapDispatchToProps = {
  getOderData: (id, type) => getOderData(id, type)
}

const mapStateToProps = state => ({
  orderSelectReducer: state.orderSelectReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelect)
