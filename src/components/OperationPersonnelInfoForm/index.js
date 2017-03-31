/**
 * Created by wangming on 2016/10/26.
 */

import {
	connect
} from 'react-redux'
import {
	getOrderDetail,
} from './modules/operationPersonnelInfoForm'
import OperationPersonnelInfoForm from './OperationPersonnelInfoForm';

const mapDispatchToProps = {
  getOrderDetail: (id, type) => getOrderDetail(id, type)
}

const mapStateToProps = state => ({
  operationPersonnelInfoForm: state.operationPersonnelInfoForm
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationPersonnelInfoForm)

