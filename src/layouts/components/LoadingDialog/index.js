import {
  connect
} from 'react-redux'
import LoadingDialog from './LoadingDialog'

import { initGlobalLoading } from './modules/loadingDialog';

const mapDispatchToProps = {
  initGlobalLoading
};

const mapStateToProps = state => ({
  loadingDialog: state.loadingDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingDialog)
