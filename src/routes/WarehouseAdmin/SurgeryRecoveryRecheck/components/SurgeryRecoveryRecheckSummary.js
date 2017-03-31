/**
 * Created by sjf on 2016/11/7.
 */
import React, { Component } from 'react'
import StandardDataGrid from 'components/StandardDataGrid'
import OperationReceiveRecheckList from 'components/OperationReceiveRecheckList'
import FilterTabs from 'components/FilterTabs';

export default class SurgeryRecoveryRecheckSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataValue: '',
      orderState: 0
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount = () => {
    this.setState({
      dataValue: 0
    })
  }

  handleReturnOrderClick = (e) => {
    this.context.router.push(`/surgeryRecoveryRecheck/${e.GUID}/${this.state.orderState}`)
  }

  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({ orderState: value })
    this.setState({ dataValue: value })
  }

  render() {
    const checkConditionDropdown = <FilterTabs tabs={['待复核', '已复核']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid iconPosition='-0px -90px' title='手术回收复核' filter={checkConditionDropdown} filterTitle='按订单状态筛选'>
        <OperationReceiveRecheckList rowClick={this.handleReturnOrderClick} requredStatus={this.state.orderState} />
      </StandardDataGrid>
    )
  }
}
