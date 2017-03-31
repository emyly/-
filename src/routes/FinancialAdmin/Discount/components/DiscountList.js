/**
 * Created by wangming on 2017/1/5.
 */

import React, { Component, PropTypes } from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import StandardDataGrid from 'components/StandardDataGrid';
import FinancialDataGrid from 'components/FinancialDataGrid';

import FilterTabs from 'components/FilterTabs';
import {
    FinancialType,
    BillingType,
    VerificationType
} from 'components/FinancialDataGrid/FinancialDataData';

export default class DiscountList extends Component {

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
    if (this.state.status === 0) {
      this.context.router.push({
        pathname: `/discount/discountAble/${value.GUID}`,
        state: { orderInfo: value }
      });
    } else {
      this.context.router.push({
        pathname: `/discount/notDiscount/${value.GUID}`,
        state: { orderInfo: value }
      });
    }
  };


  handleOrderStateDropDownMenuChange = value => this.setState({ status: value });

  render() {
    const filter = <FilterTabs inkBarStyle={{ width: '7rem' }} tabs={['折扣登记', '已给出折扣']} callback={this.handleOrderStateDropDownMenuChange} />;
    return (
      <StandardDataGrid title='折扣管理' message='...' iconPosition='-120px -150px' filter={filter} filterTitle='按订单状态筛选：'>
        <FinancialDataGrid financialType={FinancialType.discount} requredStatus={this.state.status} currentPageCount={1} pageCountPerPage={10} rowClick={this.handleClickRow} />
      </StandardDataGrid>
    )
  }
}
