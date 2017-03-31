/**
 * Created by wangming on 2016/10/28.
 */

import React, { Component, PropTypes } from 'react';

import './StockOutSummary.scss';
import { Tabs, Tab } from 'material-ui/Tabs';
import StandardDataGrid from 'components/StandardDataGrid';
import PickingProductionList from 'components/PickingProductionList';

import FilterTabs from 'components/FilterTabs';

export default class StockOutSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: 0,
    }
  }
	/**
	 * 退出组件前，数据清理
	 */
  componentWillUnmount = () => {
    console.log('componentWillUnmount');
		// this.setState({open : this.props.open});
  };

	/**
	 * 数据初始化
	 */
  componentWillMount = () => {
    console.log('componentWillMount');
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

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleChange = (value) => {
    console.log('handleChange:', value);
    this.setState({
      status: value
    });
  };

  handleClickRow = (value) => {
    console.debug('handleClickRow:', value);
    this.context.router.push({
      pathname: `/stockOut/stockOutDetailBeforeSelect/${value.GUID}`,
      state: { orderInfo: value, state: this.state.status }
    });
  };

  handleOrderStateDropDownMenuChange = value => this.setState({ status: value });

  render() {
    const filter = <FilterTabs tabs={['待出库', '已配货']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <div className='OutWarehouseCheck-Summary' >
        <StandardDataGrid iconPosition={'-30px -60px'} title='备货出库' message='...' filter={filter} filterTitle='按订单状态筛选：'>
          <PickingProductionList orderType={'1'} requredStatus={this.state.status} organizationID={0} currentPageCount={1} pageCountPerPage={10} rowClick={this.handleClickRow} />
        </StandardDataGrid>
      </div>
    )
  }

}
