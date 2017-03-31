import { connect } from 'react-redux'

import { actions } from '../modules/successRaisedButton'

import SuccessRaisedButton from '../components/SuccessRaisedButton'

const mapStateToProps = state => ({
  successRaisedButton: state.orderCheckList.successRaisedButton,
  globalStore: state.globalStore
})

export default connect(mapStateToProps, actions)(SuccessRaisedButton)
