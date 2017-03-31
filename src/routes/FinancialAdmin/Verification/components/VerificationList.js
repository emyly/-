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
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';
import VerificationConfirmDialog from 'components/VerificationConfirmDialog';

export default class VerificationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      callBackValue: [],
      submitBtnDisabled: true,
      openMessageBar: false,
      message: '',
      openDialog: false
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    postFinancialVerificationData: PropTypes.func.isRequired,
    globalStore: PropTypes.func.isRequired,
    initFinancialVerificationSubmitPostState: PropTypes.func.isRequired,
    getFinancialListData: PropTypes.func.isRequired
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.verification.verificationStatus === '1') {
      this.setState({
        openMessageBar: true,
        message: '核销成功！',
        openDialog: false
      })
      this.props.initFinancialVerificationSubmitPostState();
    }
  }
  handleChange = (value) => {
    this.setState({
      status: value
    });
  };

  handleClickRow = (value) => {
    if (this.state.status === 0) {
      this.context.router.push({
        pathname: `/verification/verificationAble/${value.GUID}`,
        state: { orderInfo: value }
      });
    } else {
      this.context.router.push({
        pathname: `/verification/notVerification/${value.GUID}`,
        state: { orderInfo: value }
      });
    }
  };

  checkCallBack = (value) => {
    if (this.state.status === 0) {
      this.setState({
        callBackValue: value,
        submitBtnDisabled: value.length <= 0
      })
    }
  };

  handleOrderStateDropDownMenuChange = (value) => {
    this.setState({
      status: value,
      callBackValue: [],
      submitBtnDisabled: true,
      openMessageBar: false,
      message: ''
    });
  }
  /**
   * 核销
   */
  handleVerificationSubmit = () => {
    if (this.state.callBackValue.length) {
      this.setState({
        openDialog: true
      })
    }
  }
   // 提示信息框开关
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar,
      message: ''
    });
  };
  /**
   * Dialog Close
   */
  handleDialogClose = () => {
    this.setState({
      openDialog: false
    })
  }
  /**
   * Dialog 验证结果回调
   */
  handleDialogResultCallBack = () => {
    const orderIdArray = [];
    this.state.callBackValue.map(value => orderIdArray.push(Number(value.GUID)));
    // 核销订单列表
    this.props.postFinancialVerificationData({
      body: {
        DDB: {
          SHJXSID: Number(this.props.globalStore.organizationId), // 当前组织机构GUID
          DDID: orderIdArray  // 当前要核销的订单ID列表
        }
      }
    })
    // 获取未核销的订单列表(后期把此部分放入saga中)
    this.props.getFinancialListData({
      verType: VerificationType.UnverificationType,
      type: FinancialType.verification,
      param: {
        Page: 1,
        PageSize: 10,
        SortBy: '',
        SortOrder: 'desc',
        orgId: Number(this.props.globalStore.organizationId)
      }
    })
  }
  render() {
    const actions = (<nav>
      <RaisedButton
        onTouchTap={this.handleVerificationSubmit}
        label='核销'
        disabled={this.state.submitBtnDisabled}
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    const filter = <FilterTabs tabs={['未核销', '已核销']} callback={this.handleOrderStateDropDownMenuChange} />;
    return (
      <StandardDataGrid
        title='核销'
        actions={this.state.status === 0 ? actions : ''}
        message='...' iconPosition='-180px -150px' filter={filter} filterTitle='按订单状态筛选：'
      >
        <FinancialDataGrid
          financialType={FinancialType.verification}
          requredStatus={this.state.status}
          currentPageCount={1}
          pageCountPerPage={10}
          rowClick={this.handleClickRow}
          ifCheckBox={this.state.status === 0}
          checkCallBack={this.checkCallBack}
        />
        <InformationSnackBar
          message={this.state.message || ''}
          open={this.state.openMessageBar}
          onRequestClose={this.handleRequestClose}
        />
        <VerificationConfirmDialog
          open={this.state.openDialog}
          handleDialogClose={this.handleDialogClose}
          handleDialogResultCallBack={this.handleDialogResultCallBack}
        />
      </StandardDataGrid>
    )
  }

}
