import {
  connect
} from 'react-redux'
import ErrorDialog from './ErrorDialog'

import { putChangeErrorStatus } from './modules/ErrorDialog';

const mapDispatchToProps = {
  putChangeErrorStatus
};

const mapStateToProps = state => ({
  errorDialog: state.errorDialog
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog)
