/**
 * Created by wangming on 2016/12/12.
 */


import React, { Component } from 'react';
import SelectPrintTable from 'components/SelectPrintTable';

export default class SelectPrintRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    }
  }

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    /**
     * 当前组织机构id
     */
    location: React.PropTypes.object,
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
    this.setState({ stockData: this.props.location.state.stockData });
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <SelectPrintTable stockData={this.state.stockData} />
      </div>
    )
  }
}
