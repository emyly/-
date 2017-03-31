import { connect } from 'react-redux'

import { postOrderCheckBack } from '../modules/backRaisedButton'

import BackRaisedButton from '../components/BackRaisedButton'

const mapDispatchToProps = {
  postOrderCheckBack
};

const mapStateToProps = state => ({
  backRaisedButton: state.orderCheckList.backRaisedButton,
  globalStore: state.globalStore
});

export default connect(mapStateToProps, mapDispatchToProps)(BackRaisedButton)
