/**
 * Created by chenming on 2016/10/25.
 */
import StorageOutRecheckList from 'components/StorageOutRecheckList';
import React, { Component } from 'react';
import './OutWarehouseCheckSummary.scss';
import StandardDataGrid from 'components/StandardDataGrid';
import FilterTabs from 'components/FilterTabs';

export default class OutWarehouseCheckSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      orderState: 0,
      logisticsCheckOpen: false
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    // children: React.PropTypes.element.isRequired
  }
  /**
  * 路由
  * */
  handleClick = (e) => {
    this.context.router.push({ pathname: `outWarehouseCheck/outWarehouseCheckDetail/${e.GUID}`, state: { orderStatus: this.state.orderState } });
  }

  /**
   * 点中筛选器
   * */
  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value });
  }
  /**
   *
   * */
  logisticsCheckHandleOpen = () => {
    this.setState({ logisticsCheckOpen: !this.state.logisticsCheckOpen });
  }
  /**
   *
   * */
  clickConfirm = () => {
  }
  render() {
    const filter = <FilterTabs tabs={['待复核', '已复核']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid
        iconPosition='-120px 0px'
        className='OutWarehouseCheck-Summary'
        title='出库复核'
        message=''
        filter={filter}
        filterTitle='按订单状态筛选：'
      >
        <StorageOutRecheckList requredStatus={this.state.orderState.toString()} rowClick={this.handleClick} />
      </StandardDataGrid>
    )
  }

}
