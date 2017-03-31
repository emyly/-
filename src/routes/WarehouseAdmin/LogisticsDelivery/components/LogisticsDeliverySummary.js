/**
 * Created by chenming on 2016/10/25.
 */
import React, { Component, PropTypes } from 'react';
import ProductionDeliverList from 'components/ProductionDeliverList'
import './LogisticsDeliverySummary.scss';
import StandardDataGrid from 'components/StandardDataGrid';
import FilterTabs from 'components/FilterTabs';

/**
 * 发货状态
 * */

export default class LogisticsDeliverySummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderState: 0
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
   * 路由
   * */
  handleClick = (e) => {
    this.context.router.push({
      pathname: `logisticsDelivery/logisticsDeliveryDetail/${e.GUID}`,
      state: { DDB: e, orderStatus: this.state.orderState }
    });
  }
  /**
   * 点击下拉筛选框
   * */
  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value });
  }
  render() {
    const filter = <FilterTabs tabs={['待发货', '已发货']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid iconPosition='-150px 0px' filter={filter} message='' title='物流发货' filterTitle='按发货状态筛选：'>
        <ProductionDeliverList requredStatus={this.state.orderState} rowClick={this.handleClick} />
      </StandardDataGrid>

    )
  }
}
