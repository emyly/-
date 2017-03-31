/**
 * Created by sjf on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardDialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './FinancialSubmitDialog.scss';
import Constant from 'lib/constant'
import InformationSnackBar from 'components/SnackBar/InformationSnackBar';

/**
 * 使用场景:财务提交Dialog
 */
export default class FinancialSubmitDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarksMessage: '',
      openMessageBar: false,
      message: '',
      submitBtnDisabled: false,
      submitBtnTitle: '提交'
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    // 列表模式 '0'为物流费登记 '1'为折扣登记  '2'为坏账登记 '3'为加急费登记
    type: PropTypes.string.isRequired,
    // Dialog open
    open: PropTypes.bool.isRequired,
    // Dialog change status
    handleDialogOpen: PropTypes.func.isRequired,
    // 当前订单ID
    orderId: PropTypes.number.isRequired,
    // 物流登记/折扣登记/加急费登记callback value
    // callbackValue: PropTypes.number.isRequired,
    // 成功后PUSH的url
    pushUrl: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open === false) {
      this.setState({
        remarksMessage: '',
        openMessageBar: false,
        message: '',
        submitBtnDisabled: false,
        submitBtnTitle: '提交'
      })
    } else if (nextProps.financialSubmitDialog.postLogisticsStatus === '1') {
      this.setState({
        openMessageBar: true,
        message: '物流费登记成功！',
      })
      this.props.initFinancialSubmitPostState();
    } else if (nextProps.financialSubmitDialog.postDiscountStatus === '1') {
      this.setState({
        openMessageBar: true,
        message: '折扣登记成功！',
      })
      this.props.initFinancialSubmitPostState();
    } else if (nextProps.financialSubmitDialog.postBaddebtsStatus === '1') {
      this.setState({
        openMessageBar: true,
        message: '坏账登记成功！',
      })
      this.props.initFinancialSubmitPostState();
    } else if (nextProps.financialSubmitDialog.postUrgentStatus === '1') {
      this.setState({
        openMessageBar: true,
        message: '加急费登记成功！',
      })
      this.props.initFinancialSubmitPostState();
    }
  }
  // 获取title
  getTitle = () => {
    let title = '物流费登记';
    switch (this.props.type) {
      case Constant.SAAS.financial.LOGISTICS:
        title = '物流费登记';
        break;
      case Constant.SAAS.financial.DISCOUNT:
        title = '折扣登记';
        break;
      case Constant.SAAS.financial.BADDEBTS:
        title = '坏账登记';
        break;
      case Constant.SAAS.financial.URGENT:
        title = '加急费登记';
        break;
    }
    return title;
  }
  // 提交
  handleSubmit = () => {
    switch (this.props.type) {
      case Constant.SAAS.financial.LOGISTICS:  // 物流登记
        this.props.postFinancialExpressOrLogisticsData({
          type: Constant.SAAS.financial.LOGISTICS,
          ddid: this.props.orderId,
          body: {
            XSDZKJJ: {
              CZJE: this.props.callbackValue,
              CZBZ: this.state.remarksMessage,
              CZLX: '2'    // 折扣'0' 加急'1' 物流'2'
            }
          }
        });
        break;
      case Constant.SAAS.financial.DISCOUNT:   // 折扣登记
        this.props.postFinancialExpressOrLogisticsData({
          type: Constant.SAAS.financial.DISCOUNT,
          ddid: this.props.orderId,
          body: {
            XSDZKJJ: {
              CZJE: this.props.callbackValue,
              CZBZ: this.state.remarksMessage,
              CZLX: '0'    // 折扣'0' 加急'1' 物流'2'
            }
          }
        })
        break;
      case Constant.SAAS.financial.BADDEBTS:   // 坏账登记
        this.props.postFinancialExpressOrLogisticsData({
          type: Constant.SAAS.financial.BADDEBTS,
          ddid: this.props.orderId,
          body: {
            XSHZMX: this.props.callbackValue.map(value => (
              {
                CRKDID: value.CRKDID,
                DDID: value.DDID,
                HZJE: value.NEWHZJE,
                YY: String(this.state.remarksMessage),
              }
            )),
            XSHZ: {
              FZJXSID: this.props.callbackValue[0].JXSID,
              SZJXSID: this.props.callbackValue[0].SHJXSID,
            }
          }
        })
        break;
      case Constant.SAAS.financial.URGENT:    // 加急登记
        this.props.postFinancialExpressOrLogisticsData({
          type: Constant.SAAS.financial.URGENT,
          ddid: this.props.orderId,
          body: {
            XSDZKJJ: {
              CZJE: this.props.callbackValue,
              CZBZ: this.state.remarksMessage,
              CZLX: '1'    // 折扣'0' 加急'1' 物流'2'
            }
          }
        })
        break;
    }
    this.setState({
      submitBtnDisabled: true,
      submitBtnTitle: '提交中...'
    })
  }
  // 备注onchange
  handleRemarks = (event) =>　{
    this.setState({
      remarksMessage: event.target.value
    })
  }
  // 提示信息框开关
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar
    });
    if (!this.state.openMessageBar) {
      this.props.handleDialogOpen();
      this.context.router.push(this.props.pushUrl);
    }
  };
  render() {
    const actions = [
      <FlatButton
        label='取消'
        onTouchTap={this.props.handleDialogOpen}
        style={{ fontFamily: 'SourceHanSansCN-Regular', color: '#979797' }}
      />,
      <FlatButton
        label={this.state.submitBtnTitle}
        disabled={this.state.submitBtnDisabled}
        primary
        onTouchTap={this.handleSubmit}
        style={{ color: '#DF3C3C', fontFamily: 'SourceHanSansCN-Regular' }}
      />
    ];
    const style = {
      float: 'right',
      width: '120px',
      marginRight: '30px',
      fontFamily: 'SourceHanSansCN-Regular',
      color: '#fff'
    };
    return (
      <Dialog
        actions={actions}
        open={this.props.open}
        title={this.getTitle()}
      >
        <div>
               填写备注：<br />
          <textarea name='aa' id='' style={{ width: '100%' }} onChange={this.handleRemarks} rows='100' className='backTextArea' />
        </div>
        <InformationSnackBar
          message={this.state.message || ''}
          autoHideDuration={1000}
          open={this.state.openMessageBar}
          onRequestClose={this.handleRequestClose}
        />
      </Dialog>
    )
  }

}
