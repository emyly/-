

import React, { Component } from 'react';
import ReceiveProductionList from 'components/ReceiveProductionList'
import StandardDataGrid from 'components/StandardDataGrid';
import './ReceivingWarehousing.scss';
import FilterTabs from 'components/FilterTabs';

export default class ReceivingWarehousing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      SFRK: 0


    }
  }
  handleChange = (value) => {
    this.setState({
      value
    });
  };
  static contextTypes = {
    router: React.PropTypes.object

  };
  handleClick = (e) => {
    this.context.router.push(
      { pathname: `receivingWarehousing/RecevingWareDetail/${e.DDID}`, state: { e, SFRK: this.state.SFRK } });
  };
  static propTypes = {
    organizationID: React.PropTypes.number
  };
  static defaultProps = {
    primaryText: '待入库'
  }
  ReceivingNotPut= () => {
    if (this.state.SFRK === '0') {
      this.setState({ SFRK: '1' });
    }
  };
  RecevingPut = () => {
    if (this.state.SFRK === '1') {
      this.setState({ SFRK: '0' });
    }
  }
  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ SFRK: value });
  };
  render() {
    const filter = <FilterTabs tabs={['待入库', '已入库']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid
        iconPosition={'-90px -60px'} title='收货入库' message='您可以从这里审核您的经销商或您的销售代表提交的订单，也可以查看已经通过审核的订单
' filter={filter} filterTitle='按收货状态筛选：'
      >
        <div>
          <ReceiveProductionList
            rowClick={this.handleClick} requredStatus={this.state.SFRK} organizationID={Number(this.props.organizationID)}
            currentPageCount={13} pageCountPerPage={32}
          />
        </div>
      </StandardDataGrid>
    )
  }

}
