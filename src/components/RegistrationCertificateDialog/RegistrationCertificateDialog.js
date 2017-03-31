/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react';
import './RegistrationCertificateDialog.scss';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import moment from 'lib/moment'
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
/**
 * 场景:注册证
 * */
export default class RegistrationCertificateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      openError: false,
    }
  }
  componentWillReceiveProps(nextValue) {
    if (_.has(nextValue.registrationCertificateDialog.error, 'code')) {
      if (nextValue.registrationCertificateDialog.error.response.Code === -20000) {
        this.setState({ message: '从药监获取注册证信息失败', openError: true, historyBadRegistrationCA: nextValue.registrationCertificateNum });
      }
      this.props.initRegistrationCAData();
    }
    if (nextValue.open !== this.props.open || nextValue.registrationCertificateNum !== this.props.registrationCertificateNum) {
      const params = { registractionCertificateNum: nextValue.registrationCertificateNum, timestamps: nextValue.SCRQ }
      this.props.getRegistrationCertificateInfoDate(params)
    }
  }
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    registrationCertificateNum: PropTypes.string,
    getRegistrationCertificateInfoDate: PropTypes.func.isRequired,
    registrationCertificateDialog: PropTypes.object.isRequired,
    initRegistrationCAData: PropTypes.func
  }
  static defaultProps = {
    registrationCertificateNum: ''
  }
  componentWillMount() {
  }
  isInportedProduction = (certificationNum) => {
    switch (certificationNum) {
      case '准':
        return '国产器械'
      case '进':
        return '进口器械'
      case '许':
        return '港澳台器械'
      default:
        break;
    }
  }
  handleCloseError = () => {
    this.setState({ openError: false });
  }
  render() {
    const actions = [
      <FlatButton
        label='关闭'
        primary
        onTouchTap={this.props.handleClose}
        labelStyle={{ fontSize: '16px', color: '#979797' }}
      />,
    ];
    return (
      <div>
        {
        (() => {
          if (_.has(this.props.registrationCertificateDialog.registrationCertificateData, 'Result')) {
            return (
              <div>
                <Dialog
                  actions={actions}
                  modal
                  open={this.props.open}
                  title={'注册证详细信息'}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', width: '50rem' }}>
                    <div className='RegistrationCertificateDialog_title'>{this.isInportedProduction(this.props.registrationCertificateDialog.registrationCertificateData.Result.zczbh.substring(6, 7))}</div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'产品名称'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.cpmc}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'注册证编号'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.zczbh}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'注册人名称'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.zcrmc}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'注册人住所'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.zcrzs}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }} >
                      <span className='RegistrationCertificateDialog_tableTitle'>{'生产地址'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.scdz}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'代理人名称'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.dlrmc}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'代理人住所'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.dlrzs}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'型号、规格'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.xhgg}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'结构及组成'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.jgjzc}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'适用范围'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.syfw}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'其他内容'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.qtnr}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'备注'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.bz}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'批准日期'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{moment(this.props.registrationCertificateDialog.registrationCertificateData.Result.pzrq).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'有效期至'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{moment(this.props.registrationCertificateDialog.registrationCertificateData.Result.yxqz).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'附件'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.fj}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'产品标准'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.cpbz}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'变更日期'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.bgrq}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'邮编'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.yb}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'主要组成成分'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.zyzccf}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'预期用途'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.yqyt}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'产品储存条件及有效期'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.cpcctj}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '##EFF6FF' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'审批部门'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.spbm}</span>
                    </div>
                    <div className='RegistrationCertificateDialog_tableCell' style={{ background: '#FAFAFA' }}>
                      <span className='RegistrationCertificateDialog_tableTitle'>{'变更情况'}</span>
                      <span className='RegistrationCertificateDialog_tableContent'>{this.props.registrationCertificateDialog.registrationCertificateData.Result.bgqk}</span>
                    </div>
                  </div>
                </Dialog>

              </div>
            );
          } else {
            return (<div />);
          }
        })()
      }
        <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleCloseError} />
      </div>
    );
  }

}
