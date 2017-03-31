/**
 * Created by wmt on 2016/11/29.
 */
import React, { Component, PropTypes } from 'react'
import OrderRecheckList from 'components/OrderRecheckList'
import StandardDataGrid from 'components/StandardDataGrid'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import RaisedButton from 'material-ui/RaisedButton'
import FilterTabs from 'components/FilterTabs';

export default class SurgeryOrder extends Component {

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
      pathname: `/surgeryOrder/${e.GUID}`,
      // state:{orderState:this.state.orderState}
    });
  }

  handleCreateOrder = () => {
    this.context.router.push({
      pathname: '/surgeryOrder/createOrder',
    });
  }

  render() {
    const actions =
        (<nav>
          <RaisedButton labelPosition='after' onTouchTap={this.handleCreateOrder} label='新建订单' buttonStyle={{ backgroundColor: '#00A0FF', }} labelStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: 14, color: '#FFF' }} />
        </nav>)
    const filter = <FilterTabs tabs={['待审核', '已审核', '已退回']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid iconPosition={'-120px -120px'} actions={actions} title='手术订单下单' message='...' filter={filter} filterTitle='按订单状态筛选：'>
        <OrderRecheckList MKID={1} DDLX={['2']} rowClick={this.handleClick} requredStatus={this.state.orderState} organizationID={Number(this.props.globalStore.organizationId)} currentPageCount={13} pageCountPerPage={32} />
      </StandardDataGrid>
    );
  }
}
