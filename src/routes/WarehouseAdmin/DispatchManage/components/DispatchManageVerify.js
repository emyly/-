import React, { Component, PropTypes } from 'react'
import DataGrid from 'components/DataGrid'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DepotSelectDialogByText from 'components/DepotSelectDialogByText'
import moment from 'lib/moment';
import StandardBusinessDialog from 'components/StandardUI/StandardBusinessDialog'
import './DispatchManage.scss'

export default class DispatchManageVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoadingVerify: false,
      executeIndex: '',
      options: {
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        columnOptions: [{
          label: '物料号',
          attr: 'SPBH'
        }, {
          label: '商品名称',
          attr: 'SPMC',
          style: { overflow: 'hidden' }
        }, {
          label: '商品规格',
          attr: 'SPMS',
          style: { overflow: 'hidden' }
        }, {
          label: '数量',
          attr: 'SL'
        }]
      }
    }
  }

  componentWillMount() {
    this.props.getOrderDetail(this.props.applyId)
  }

  handleExecuteCallback = (returnValue) => {
    this.setState({ executeIndex: returnValue.id });
  }

  handleVerifyDialogOk =() => {
    this.props.postDispatchManageVerify(this.props.applyId, 1, '确认调拨', [this.props.dispatchManageVerify.orderDetail.CJR], this.state.executeIndex)
  }

  handleVerifyDialogRefuse =() => {
    this.props.postDispatchManageVerify(this.props.applyId, 2, '拒绝调拨', [this.props.dispatchManageVerify.orderDetail.CJR], '')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dispatchManageVerify.Code == 0) {
      this.props.initStore()
      this.props.getDispatchManageList(this.props.globalStore.organizationId, 0)
      this.props.handleVerifyDialogClose()
    }
    if (nextProps.applyId !== this.props.applyId) {
      this.props.getOrderDetail(nextProps.applyId)
    }
  }

  render() {
    return (
      <div className='dispatchManageVerify'>
        <StandardBusinessDialog
          title='审核调拨申请'
          open={this.props.verifyDialogOpen}
          onRequestClose={this.props.handleVerifyDialogClose}
          modal={this.state.confirmLoadingVerify}
          actions={[
            <FlatButton key='cancel' label='取消' style={{ marginRight: '10px' }} type='ghost' onTouchTap={this.props.handleVerifyDialogClose} />,
            <RaisedButton key='refuse' label='拒绝调拨' style={{ marginRight: '10px' }} secondary disabled={this.state.confirmLoadingVerify} onTouchTap={this.handleVerifyDialogRefuse} />,
            <RaisedButton key='submit' label='确认调拨' style={{ marginRight: '10px' }} primary disabled={this.state.confirmLoadingVerify} onTouchTap={this.handleVerifyDialogOk} />,
          ]}
        >
          <div className='span-two'>
            <span style={{ marginRight: 15, width: '50%' }}>申请人: {this.props.dispatchManageVerify.orderDetail.CJRXM}</span>
            <span style={{ marginleft: 15, width: '50%' }}>申请时间: {moment(this.props.dispatchManageVerify.orderDetail.CJSJ).formatStandard('Y', 'M', 'D', 'h', 'm', 's')}</span>
          </div>
          <div className='span-two'>
            <span style={{ marginleft: 15, width: '100%' }}>要求送达时间: {this.props.dispatchManageVerify.orderDetail.DHRQ ? moment(this.props.dispatchManageVerify.orderDetail.DHRQ).formatStandard('Y', 'M', 'D') : '--'}</span>
          </div>
          <div className='span-two'>
            <span style={{ marginRight: 15, width: '100%' }}>申请仓库:{this.props.dispatchManageVerify.orderDetail.RKCKMC}</span>
          </div>
          <div className='span-two'>
            <span style={{ marginRight: 15, width: '100%' }}>拟调仓库：<DepotSelectDialogByText currentOrg={this.props.globalStore.organizationId} ifStorage={false} ifShowOrder orderId={this.props.applyId} callback={this.handleExecuteCallback} /></span>
          </div>
          <DataGrid options={this.state.options} dataSource={this.props.dispatchManageVerify.dataSource} />
        </StandardBusinessDialog>
      </div>
    )
  }
}
