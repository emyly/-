/**
 * Created by wangming on 2016/10/31.
 */


import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './HistoryOutBoundDetail.scss';
import OutBoundDetail from 'components/OutBoundDetail'
import BusinessDialog from 'components/StandardUI/StandardBusinessDialog';

export default class HistoryOutBoundDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false
    }
  }

  static propTypes = {
    open: React.PropTypes.bool,
    orderId: React.PropTypes.number,
    warehouseId: React.PropTypes.string,
    handleClose: React.PropTypes.func,
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
    /**
     * 订单类型：
     * 0：铺货订单，
     * 1：备货订单
     * 2：手术订单
     * 3: 借货订单
     * 4: 调货订单
     * 5: 铺货补货订单
     * 6: 铺货销售订单
     */
  };


  render() {
    const actions = [
      <FlatButton
        label='关闭'
        onTouchTap={this.props.handleClose}
        labelStyle={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: 16, color: '#00A0FF', letterSpacing: '0.57px' }}
      />
    ];
    return (
      <BusinessDialog
        title='历史拣货详情'
        actions={actions}
        modal
        open={this.props.open}
        repositionOnUpdate
      >
        <div className='currentOutBound'>
          <OutBoundDetail orderId={Number(this.props.orderId)} warehouseId={String(this.props.warehouseId)} />
        </div>
      </BusinessDialog>
    )
  }

}
