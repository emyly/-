/**
 * Created by wangming on 2016/10/29.
 */


import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
const debug = require('debug')('app: sodbs');
import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import './StockOutDetailBeforeSelect.scss';
import StockOutDetail from './StockOutDetail';
import HistoryOutBoundDetail from './HistoryOutBoundDetail';
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import GoBackButton from 'components/GoBackButton';

export default class StockOutDetailBeforeSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: true,
      currentOrderState: 0,
      action: '',
      filter: '',
      currrentOrder: { GUID: 0 },
      selectData: [],
      orderInfo: {},
      dialogOpen: false,
      curWarehouseId: 0
    }
  }

	// static contextTypes = {
	// 	router: React.PropTypes.object
	// };
	/**
	 * 退出组件前，数据清理
	 */
  componentWillUnmount = () => {
    debug('componentWillUnmount');
		// this.setState({open : this.props.open});
  };

  componentWillReceiveProps = (nextProps) => {
    console.debug('Stockout before 1:', nextProps);
    this.setState({ orderInfo: nextProps.stockOutDetailBefore.orderData });
  };

	/**
	 * 数据初始化
	 */
  componentWillMount = () => {
    debug('componentWillMount');
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

    console.debug('stockOut componentWillMount:', this.props.location.state);
    this.setState({ currrentOrder: this.props.location.state.orderInfo });
    console.debug('stockOut 2:', this.props.location.state.orderInfo);
    this.setState({ currentOrderState: this.props.location.state.state });
    console.debug('StockOutDetailBeforeSelect order:', this.props.location.state.orderInfo);
  };

  goNextDetail = (returnValue) => {
    console.log('goNextDetail:', returnValue);
    this.setState({ dialogOpen: true });
    this.setState({ curWarehouseId: returnValue.GUID });
		// this.context.router.push({pathname: '/stockOut/historyOutBoundDetail'});
  };

  getDistributionData = (value) => {
    console.debug('getDistributionData:', value);
    this.setState({ selectData: value });
  };

  getUndistributionNum = (num) => {
    console.log('getUndistributionNum:', num);
    if (!this.state.currentOrderState) {
      if (num > 0) {
        this.setState({ ifShowButton: true });
      } else {
        this.setState({ ifShowButton: false });
      }
    }
  };

	// gotoSelectingGoods = () => {
	// 	console.log("gotoSelectingGoods");
	// 	this.context.router.push({pathname: `/distributionOperation/selectingGoods/${this.state.currrentOrder.GUID}`,state: {orderId: this.state.currrentOrder.GUID, selectData: this.state.selectData, orderInfo: this.state.orderInfo}});
	// };

  showButton = () => {
    if (this.state.currentOrderState === 0) {
      console.log('showButton true');
      return (<nav style={{ display: 'flex', alignItems: 'center' }}>
        <GoBackButton />
        <Link
          to={{
            pathname: `/stockOut/selectingGoods/${this.state.currrentOrder.GUID}`,
            state: { orderId: this.state.currrentOrder.GUID, selectData: this.state.selectData, orderInfo: this.state.orderInfo }
          }}
        >

          <RaisedButton
            label='下一步'
						// primary={true}
						// icon={<ContentAddCircle />}
            style={{ marginLeft: '5px' }}
          />
        </Link>
      </nav>)
    } else {
      console.log('showButton false');
      return ''
    }
  };

  showFilter = () => {
    if (this.state.ifShowButton) {
      console.log('showFilter true');
      return <div />
    } else {
      console.log('showFilter false');
      return ''
    }
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  showStandard = () => {
    const actions = this.showButton();

    const filter = this.showFilter();
    if (this.state.currentOrderState === 1) {
      return (<StandardForm iconPosition={'-30px -60px'} title='备货出库' message='...'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='拣货详情' message='...' actions={''} showStep={false} expanded>
            <StockOutDetail
              orgId={0} orderId={this.state.currrentOrder.GUID} orderType={String(this.state.currrentOrder.DDLX)}
              rowClickCallback={this.goNextDetail} selectCallback={this.getDistributionData}
            />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>)
    } else {
      return (<StandardForm iconPosition={'-30px -60px'} title='备货出库' message='...'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard
            title='拣货详情' message='...'
            stepName='查看拣货详情' actions={actions} completed={false} showContent expanded
          >
            <StockOutDetail
              orgId={0} orderId={this.state.currrentOrder.GUID} orderType={String(this.state.currrentOrder.DDLX)}
              rowClickCallback={this.goNextDetail} selectCallback={this.getDistributionData}
            />
          </StandardFormCard>
          <StandardFormCard
            title='拣货提示单' message='请选择库位拣货' stepName='拣货' actions={actions} completed={false}
            showContent={false} expanded={false}
          >
            <div />
          </StandardFormCard>
          <StandardFormCard
            title='拣货提交' message='提交拣货记录或点击记录查看详情' stepName='拣货提交' completed={false}
            actions={actions} showContent={false} expanded={false}
          >
            <div />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>)
    }
  };

  render() {
		// console.log("OrderBasicInfoForm:",this.props.location.state);
		// let orderId = this.props.location.state.GUID;


    return (
      <div style={{ height: '100%' }}>
        {
					this.showStandard()
				}
        <HistoryOutBoundDetail orderId={this.state.currrentOrder.GUID} warehouseId={String(this.state.curWarehouseId)} open={this.state.dialogOpen} handleClose={this.handleClose} />
      </div>
    )
  }

}
