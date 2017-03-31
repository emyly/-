/**
 * Created by wangming on 2016/11/1.
 */


import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './CurrentOutBoundDetail.scss';
import OutBoundDetail from 'components/OutBoundDetail'
import BusinessDialog from 'components/StandardUI/StandardBusinessDialog';

export default class CurrentOutBoundDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: false,
      objectInDetail: {}
    }
  }

  static propTypes = {
    /**
     * 当前组织机构id
     */
    warehouseId: React.PropTypes.string.isRequired,
    orderId: React.PropTypes.number.isRequired,
    orderInfo: React.PropTypes.object.isRequired,
    oprator: React.PropTypes.string.isRequired,
    dataInArray: React.PropTypes.array.isRequired,
    dataInArrayByMatch: React.PropTypes.array.isRequired,
    handleClose: React.PropTypes.func,
    open: React.PropTypes.bool,
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
    const basicInfo = {
      CKCK: this.props.orderInfo.CKCKMC,
      CJSJ: (new Date()).valueOf(),
      YHXM: this.props.oprator
    };

    const detail = this.props.dataInArray;

    const objectInDetail = {
      basicInfo,
      detailArray: detail
    };

    this.setState({ objectInDetail });
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

  componentWillReceiveProps = (nextProps) => {
    const basicInfo = {
      CKCK: this.props.orderInfo.CKCKMC,
      CJSJ: (new Date()).valueOf(),
      YHXM: nextProps.oprator
    };

    const detail = this.props.dataInArray;

    const objectInDetail = {
      basicInfo,
      detailArray: detail
    };

    this.setState({ objectInDetail });
  };

  render() {
    const actions = [
      <FlatButton
        label='关闭'
        primary
        onTouchTap={this.props.handleClose}
      />
    ];
    return (
      <BusinessDialog
        title='本次拣货详情'
        actions={actions}
        modal
        open={this.props.open}
        repositionOnUpdate
      >
        <div style={{ height: '500px' }}>
          <OutBoundDetail
            orderId={Number(this.props.orderId)} warehouseId={String(this.props.warehouseId)}
            dataObject={this.state.objectInDetail} dataInArrayByMatch={this.props.dataInArrayByMatch}
          />
        </div>
      </BusinessDialog>
    )
  }

}
