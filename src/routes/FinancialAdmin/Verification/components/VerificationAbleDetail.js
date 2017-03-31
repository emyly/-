
/**
 * Created by wangming on 2016/1/9.
 */

import React, { Component, PropTypes } from 'react';

import FinancialOrderDetail from 'components/FinancialOrderDetail'
import Constant from 'lib/constant'
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import GoBackButton from 'components/GoBackButton';
import VerificationConfirmDialog from 'components/VerificationConfirmDialog';

export default class VerificationAbleDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
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
    location: PropTypes.object.isRequired,
    postFinancialVerificationData: PropTypes.func.isRequired,
    globalStore: PropTypes.func.isRequired
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    this.setState({ orderInfo: this.props.location.state.orderInfo });
  };

  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
   * 核销
   */
  handleVerificationSubmit = () => {
    this.setState({
      openDialog: true
    })
  }
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
    this.props.postFinancialVerificationData({
      body: {
        DDB: {
          SHJXSID: Number(this.props.globalStore.organizationId), // 当前组织机构GUID
          DDID: [Number(this.state.orderInfo.GUID)]  // 当前要核销的订单ID列表
        }
      }
    })
    this.context.router.push('/verification');
  }
  render() {
    const actions = (<nav>
      <GoBackButton style={{ width: '120px', marginRight: '15px' }} />
      <RaisedButton
        onTouchTap={this.handleVerificationSubmit}
        label='核销'
        style={{ width: '120px', marginRight: '15px' }} labelColor='#fff' backgroundColor='#00A0FF'
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
      />
    </nav>)
    return (
      <StandardDataGrid
        title='核销管理'
        actions={actions}
        iconPosition={'-180px -150px'}
      >
        <FinancialOrderDetail
          orderId={Number(this.state.orderInfo.GUID)} orderType={String(this.state.orderInfo.DDLX)}
          financialType={Constant.SAAS.financial.VERIFICATION} ifSubmit
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

