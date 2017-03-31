/**
 * Created by sjf on 2016/11/7.
 */
import React, { Component } from 'react';

import StandardDataGrid from 'components/StandardDataGrid';

import OperationReceive from 'components/OperationReceiveList';
import './SurgeryRecoverySummary.scss'
import FilterTabs from 'components/FilterTabs';

export default class SurgeryRecoverySummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValue: '',
      orderState: 0,
      orderId: ''
    };
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value });
    this.setState({ dataValue: value });
  };
  handleClick = (e) => {
    this.context.router.push({
      pathname: `/surgeryRecovery/${e.GUID}`,
      state: {
        dataValue: this.state.dataValue
      }
    });
  };
  componentWillMount = () => {
    this.setState({
      dataValue: 0
    });
  };
  render() {
    const filter = <FilterTabs tabs={['待回收', '已回收']} callback={this.handleOrderStateDropDownMenuChange} />;

    const actions = '';
    const moreActions = '';
    return (
      <StandardDataGrid
        iconPosition='-60px -60px' title='手术回收' message='...' filter={filter} actions={actions} moreActions={moreActions}
        filterTitle='按订单状态筛选：'
      >
        <OperationReceive
          rowClick={this.handleClick} requredStatus={this.state.dataValue} organizationID={12} currentPageCount={13} pageCountPerPage={32}
        />
      </StandardDataGrid>
    );
  }
}

