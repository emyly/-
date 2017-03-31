
import { connect } from 'react-redux';

import {
  handleToggleDrawer,getAllMenuBar,getUserMenuBar
} from './modules/menuBar';

import MenuBar from './MenuBar';

const mapDispatchToProps = {
  handleToggleDrawer,getAllMenuBar,getUserMenuBar
}

const mapStateToProps = state => ({
  menuBar: state.menuBar,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)

