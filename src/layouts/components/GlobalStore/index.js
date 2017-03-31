import {
  connect
} from 'react-redux'
import {
  getToken,
} from './modules/globalStore'
import GlobalStore from './GlobalStore'

const mapDispatchToProps = {
  getToken: () => getToken()
}

const mapStateToProps = state => ({
  globalStore: state.globalStore
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalStore)
