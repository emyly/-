/**
 * Created by wangming on 2017/1/5.
 */

import React, { Component, PropTypes } from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import StandardDataGrid from 'components/StandardDataGrid';
import FinancialDataGrid from 'components/FinancialDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import FilterTabs from 'components/FilterTabs';
import {
    FinancialType,
    BillingType,
    VerificationType
} from 'components/FinancialDataGrid/FinancialDataData';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';

export default class GatheringList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: 0,
      submitDataList: [],
      openMessageBar: false,
      message: '',
      disabledButton: true,
    }
  }
  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  handleChange = (value) => {
    this.setState({
      status: value
    });
  };

  handleClickRow = (value) => {
    if (this.state.status === 0) {
      this.context.router.push({
        pathname: `/gathering/gatheringAble/${value.GUID}`,
        state: { orderInfo: value }
      });
    } else {
      this.context.router.push({
        pathname: `/gathering/notGathering/${value.GUID}`,
        state: { orderInfo: value }
      });
    }
  };

  checkCallBack = (value) => {
    let disabledFlag = true;
    if (value.length <= 0) {
      disabledFlag = true
      this.setState({
        openMessageBar: false,
        disabledButton: disabledFlag,
        message: ''
      })
      return;
    } else {
      const orgId = Number(value[0].CJJXSID) || -1;
      value.map((val) => {
        if (disabledFlag) disabledFlag = disabledFlag && (Number(val.CJJXSID) === orgId);    // 判断是否有不同的购货单位ID存在
      })
    }

    this.setState({
      openMessageBar: !disabledFlag,
      disabledButton: !disabledFlag,
      message: !disabledFlag ? '不同的购货单位不能一起做收款登记,请重新选择！' : ''
    })

    if (this.state.status === 0) {
      this.setState({ submitDataList: value });
    }
  };
  /**
   * 批量收款登记
   */
  gotoBatchSubmit = () => {
    this.context.router.push({
      pathname: '/gathering/batchSubmit',
      state: {
        submitDataList: this.state.submitDataList
      }
    });
  };

  handleOrderStateDropDownMenuChange = value => this.setState({ status: value });

  /**
   *  提示信息框开关
   */
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar,
      message: ''
    });
  };
  render() {
    const actions = (<nav>
      <RaisedButton
        disabled={this.state.submitDataList.length <= 0 || this.state.disabledButton}
        onTouchTap={this.gotoBatchSubmit}
        label='批量收款登记'
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    console.log('~~~~this.state.submitDataList', this.state.submitDataList);
    const filter = <FilterTabs inkBarStyle={{ width: '6rem' }} tabs={['收款登记', '已收款']} callback={this.handleOrderStateDropDownMenuChange} />;
    return (
      <StandardDataGrid title='收款管理' actions={this.state.status === 0 ? actions : ''} message='...' iconPosition='-60px -150px' filter={filter} filterTitle='按订单状态筛选：'>
        <FinancialDataGrid
          financialType={FinancialType.gathering}
          requredStatus={this.state.status}
          currentPageCount={1}
          pageCountPerPage={10}
          rowClick={this.handleClickRow}
          ifCheckBox={this.state.status === 0}
          checkCallBack={this.checkCallBack}
        />
        <WarningSnackBar
          message={this.state.message || ''}
          autoHideDuration={4000}
          open={this.state.openMessageBar}
          onRequestClose={this.handleRequestClose}
        />
      </StandardDataGrid>
    )
  }

}
