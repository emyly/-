/**
 * Created by sjf on 2016/12/1.
 */
import {
  connect
} from 'react-redux'
import {

} from './modules/OrderSearch'
import OrderSearch from './OrderSearch';

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderSearch)
