/**
 * Created by liuyali on 2016/12/2.
 */
import {
  connect
} from 'react-redux'

import {
  inventorySee
} from '../modules/inventorySee'

import InventorySee from '../components/inventorySee'

const mapDispatchToProps = {
  inventorySee: (page, id, params) => inventorySee(page, id, params)
}

const mapStateToProps = state => ({
  inventorySeeData: state.inventorySeeData,

})


export default connect(mapStateToProps, mapDispatchToProps)(InventorySee)
