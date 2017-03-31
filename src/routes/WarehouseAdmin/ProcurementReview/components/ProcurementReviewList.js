/**
 * Created by wmt on 2016/12/12.
 */
import React, { Component, PropTypes } from 'react'
import ReviewList from '../containers/ReviewListContainer';
import StandardDataGrid from 'components/StandardDataGrid'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import RaisedButton from 'material-ui/RaisedButton'
import FilterTabs from 'components/FilterTabs';
import constant from 'lib/constant'
export default class ProcurementReviewList extends Component {

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
      pathname: `/procurementReview/${e.GUID}/${this.state.orderState}`
    });
  }

  handleCreateOrder = () => {
    this.context.router.push({
      pathname: '/procurementReview/procurementReviewDetail',
    });
  }

  render() {
    const {DISTRIBUTION_ORDER, STOCK_ORDER, DISTRIBUTION_SALE_ORDER } = constant.SAAS.CRK;
    const filter = <FilterTabs tabs={['待审核', '已审核', '已退回']} callback={this.handleOrderStateDropDownMenuChange} />;

    return (
      <StandardDataGrid iconPosition={'-150px -120px'} title='采购复核' message='...' filter={filter} filterTitle='按订单状态筛选：'>
        <ReviewList DDLX={[DISTRIBUTION_ORDER, STOCK_ORDER, DISTRIBUTION_SALE_ORDER]} rowClick={this.handleClick} requredStatus={this.state.orderState} organizationID={Number(this.props.globalStore.organizationId)} />
      </StandardDataGrid>
    );
  }
}
