
/**
 * Created by wangming on 2016/1/9.
 */

import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { blue400, brown50, green100, green200 } from 'material-ui/styles/colors';
import FinancialOrderDetail from 'components/FinancialOrderDetail'
import Constant from 'lib/constant'
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';

export default class NotUrgentDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    /**
     * 当前组织机构id
     */
    // orgId: React.PropTypes.number,
    // orderId: React.PropTypes.number.isRequired,
    // dataInArray: React.PropTypes.array.isRequired,
    // dataInArrayByMatch: React.PropTypes.array.isRequired
  };

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
    console.debug('NotBaddebtsDetail:', Constant);
	 this.setState({ orderInfo: this.props.location.state.orderInfo });
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    const actions = (<nav>
      <GoBackButton style={{ width: '120px' }} />
    </nav>)
    return (
      <StandardDataGrid
        title='加急费管理'
        actions={actions}
        iconPosition={'-210px -150px'}
      >
        <FinancialOrderDetail
          orderId={Number(this.state.orderInfo.GUID)} orderType={String(this.state.orderInfo.DDLX)}
          financialType={Constant.SAAS.financial.URGENT} ifSubmit={false}
        />
      </StandardDataGrid>
    )
  }

}

