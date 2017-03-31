import {
  connect
} from 'react-redux'
import {
  getLOBData,
} from './modules/lobSelect'

import LOBSelect from './LOBSelect';

const mapDispatchToProps = {
  getLOBData: (contract_type, authorize_organization_id, authorized_organization_id) => getLOBData(contract_type, authorize_organization_id, authorized_organization_id)
}

const mapStateToProps = state => ({
  lobSelect: state.lobSelect
})
export default connect(mapStateToProps, mapDispatchToProps)(LOBSelect)
