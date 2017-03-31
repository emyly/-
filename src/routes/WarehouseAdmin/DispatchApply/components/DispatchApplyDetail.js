import React, { Component, PropTypes } from 'react'
import DataGrid from 'components/DataGrid';
import moment from 'lib/moment';

import './DispatchApply.scss';

class DispatchApplyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        }],
        dataSource: this.props.dispatchApplyDetail.dataSource
      }
    }
  }

  componentWillMount() {
    this.props.getDispatchApplyDetail(this.props.applyId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: Object.assign({}, this.state.options, nextProps.dispatchApplyDetail)
    })
    if (nextProps.applyId !== this.props.applyId) {
      this.props.getDispatchApplyDetail(nextProps.applyId)
    }
  }

  dispacthStatus = () => {
    switch (Number(this.props.dispatchApplyDetail.orderDetail.DDZT)) {
      case 0:
        return ('已提交申请，待审核')
      case 1:
        return ('审核通过，正在发货')
      case 2:
        return ('审核未通过')
      case 4:
        return ('已完成')
    }
  }

  render() {
    return (
      <div className='dispatchApplyDetail'>
        <div className='span-two'>
          <span style={{ marginRight: 15, width: '50%' }}>申请人: {this.props.dispatchApplyDetail.orderDetail.CJRXM}</span>
          <span style={{ marginleft: 15, width: '50%' }}>申请时间: {moment(this.props.dispatchApplyDetail.orderDetail.CJSJ).formatStandard('Y', 'M', 'D', 'h', 'm', 's')}</span>
        </div>
        <div className='span-two'>
          <span style={{ marginleft: 15, width: '100%' }}>要求送达时间: {this.props.dispatchApplyDetail.orderDetail.DHRQ ? moment(this.props.dispatchApplyDetail.orderDetail.DHRQ).formatStandard('Y', 'M', 'D') : '--'}</span>
        </div>
        <div className='span-two'>
          <span style={{ marginRight: 15, width: '50%' }}>审批人: {this.props.dispatchApplyDetail.orderDetail.WBSHRXM || '--'}</span>
          <span style={{ marginleft: 15, width: '50%' }}>审批时间: {this.props.dispatchApplyDetail.orderDetail.WBSHSJ ? moment(this.props.dispatchApplyDetail.orderDetail.WBSHSJ).formatStandard('Y', 'M', 'D', 'h', 'm', 's') : '--'}</span>
        </div>
        <div className='span-two'>
          <span style={{ marginRight: 15 }}>调拨状态: {this.dispacthStatus()}</span>
        </div>
        <DataGrid options={this.state.options} />
      </div>
    )
  }
}

export default DispatchApplyDetail
