/**
 * Created by SJF on 2016/10/26.
 */
import React, { Component, PropTypes } from 'react'
import OrderRecheckList from 'components/OrderRecheckList';
import StandardDataGrid from 'components/StandardDataGrid';
import './OrderSummary.scss';

import FilterTabs from 'components/FilterTabs';

export default class orderSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderState: 0
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value });
  };

  handleClick = (e) => {
    this.setState({ orderId: e.GUID });
    this.context.router.push({
      pathname: `/orderCheckList/orderCheck/${e.GUID}`,
      state: { orderState: this.state.orderState }
    });
  };

  render() {
    const filter = <FilterTabs tabs={['待审核', '已审核', '已退回', '已转单']} callback={this.handleOrderStateDropDownMenuChange} />;
    return (
      <StandardDataGrid iconPosition='-30px 0' title='订单审核' message='...' filter={filter} filterTitle='按订单状态筛选：'>
        <OrderRecheckList MKID={2} rowClick={this.handleClick} requredStatus={this.state.orderState} organizationID={Number(this.props.globalStore.organizationId)} currentPageCount={13} pageCountPerPage={32} />
      </StandardDataGrid>
    );
  }
}
