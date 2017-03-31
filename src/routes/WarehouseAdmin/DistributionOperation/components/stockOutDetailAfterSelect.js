/**
 * Created by wangming on 2016/10/29.
 */


import React, { Component } from 'react';
import './StockOutDetailAfterSelect.scss';
import StockOutDetail from './StockOutDetail';
import HistoryOutBoundDetail from './HistoryOutBoundDetail';
import CurrentOutBoundDetail from './CurrentOutBoundDetail';

export default class StockOutDetailAfterSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false,
      curWarehouseId: 0,
      historyDialogOpen: false,
      curDialogOpen: false,
      oprator: ''

    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    /**
     * 当前组织机构id
     */
    orgId: React.PropTypes.number,
    orderId: React.PropTypes.number.isRequired,
    dataInArray: React.PropTypes.array.isRequired,
    dataInArrayByMatch: React.PropTypes.array.isRequired,
    orderInfo: React.PropTypes.object,
    submitCallback: React.PropTypes.func,
    stockOutDetailAfter: React.PropTypes.object,
  };

  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
  };

  goNextDetail = (returnValue) => {
    if (returnValue.GUID === '本次拣货记录') {
      this.setState({ curDialogOpen: true });
      this.setState({ curWarehouseId: returnValue.GUID });
      this.setState({ oprator: returnValue.YHXM });
    } else {
      this.setState({ historyDialogOpen: true });
      this.setState({ curWarehouseId: returnValue.GUID });
    }
  };

  historyDialoghandleClose = () => {
    this.setState({ historyDialogOpen: false });
  };

  curDialoghandleClose = () => {
    this.setState({ curDialogOpen: false });
  };

  getUndistributionNum = (num) => {
    if (num > 0) {
      this.setState({ ifShowButton: true });
    } else {
      this.setState({ ifShowButton: false });
    }
  };

  render() {
    return (
      <div>
        <StockOutDetail
          orderId={this.props.orderId}
          submitCallback={this.props.submitCallback}
          dataInArray={this.props.dataInArray}
          dataInArrayByMatch={this.props.dataInArrayByMatch}
          orgId={0}
          rowClickCallback={this.goNextDetail}
          ifShowCurrentSelect
          operator={this.props.stockOutDetailAfter.YHXM}
          selectCallback={this.getUndistributionNum}
        />
        <HistoryOutBoundDetail
          orderId={this.props.orderId} warehouseId={String(this.state.curWarehouseId)} open={this.state.historyDialogOpen}
          handleClose={this.historyDialoghandleClose}
        />
        <CurrentOutBoundDetail
          orderInfo={this.props.orderInfo}
          orderId={this.props.orderId}
          warehouseId={String(this.state.curWarehouseId)}
          open={this.state.curDialogOpen}
          handleClose={this.curDialoghandleClose}
          oprator={this.state.oprator}
          dataInArray={this.props.dataInArray}
          dataInArrayByMatch={this.props.dataInArrayByMatch}
        />
      </div>
    )
  }

}
