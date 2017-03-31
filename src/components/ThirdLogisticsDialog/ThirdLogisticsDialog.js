/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react';
import './ThirdLogisticsDialog.scss';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import _ from 'lodash';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: 'auto',
};
/**
 * 场景:物流单详情
 * 接口:1.物流单详情接口：物流.md => 3.单个物流单查询
 * */
export default class ThirdLogisticsDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      openError: false
    }
  }
  handleCloseError = () => {
    this.setState({ openError: false });
  }
  componentWillReceiveProps(nextValue) {
    if (!_.isEmpty(nextValue.logisticsDetailDialog.error) && nextValue.open === true) {
      this.setState({ openError: true, message: nextValue.logisticsDetailDialog.error.response.Message });
      this.props.logisticsDetailDialog.error = {};
    }
  }
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    SCRQ: PropTypes.number,
    // 外部props
    logisticsDetailDialog: PropTypes.object
  }
  static defaultProps = {

  }
  showLogisticsInfoList = (logisticsArrayData) => {
    return logisticsArrayData.map((value, index) => (<div className={'ThirdLogisticsDialog_info_logisticsInfo_logisticsList'}>
      <div style={{ width: '4.2rem', marginTop: '0.3rem' }}>
        <div style={{ width: '2.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            alt=''
            src={index === 0 ? '/logistIcon/point1.png' : '/logistIcon/point2.png'}
            style={{ marginLeft: '0.2rem' }}
          />
          <div
            style={{
              display: index === logisticsArrayData.length - 1 ? 'none' : 'block',
              marginTop: '0.4rem',
              height: '1.1rem',
              width: '1px',
              background: '#D8D8D8' }}
          />
        </div>
      </div>
      <div style={{ width: '30%', color: index === 0 ? '#00A0FF' : '#979797' }}>{value.time}</div>
      <div style={{ width: '70%', color: index === 0 ? '#00A0FF' : '#979797' }}>{value.context}</div>
    </div>))
  }
  render() {
    const actions = [
      <FlatButton
        label='关闭'
        primary
        onTouchTap={this.props.handleClose}
      />,
    ];
    if (_.has(this.props.logisticsDetailDialog.thirdLogisticsInfo, 'Result')) {
      let chukuImageName;
      let fahuoImageName;
      let shouHuoImageName;
      let logisticsStatusName;
      switch (this.props.logisticsDetailDialog.thirdLogisticsInfo.Result.WL.showapi_res_body.status) {
        case 0:
          logisticsStatusName = '查询异常';
          break;
        case 1:
          chukuImageName = '/logistIcon/chuku.png';
          fahuoImageName = '/logistIcon/dengdaishouhuo.png';
          shouHuoImageName = '/logistIcon/daiqianshou.png';
          logisticsStatusName = '暂无记录';
          break;
        case 2:
          chukuImageName = '/logistIcon/chuku.png';
          fahuoImageName = '/logistIcon/dengdaishouhuo.png';
          shouHuoImageName = '/logistIcon/daiqianshou.png';
          logisticsStatusName = '在途中';
          break;
        case 3:
          chukuImageName = '/logistIcon/Group-5.png';
          fahuoImageName = '/logistIcon/Group.png';
          shouHuoImageName = '/logistIcon/daiqianshou.png';
          logisticsStatusName = '派送中';
          break;
        case 4:
          chukuImageName = '/logistIcon/Group-5.png';
          fahuoImageName = '/logistIcon/Group.png';
          shouHuoImageName = '/logistIcon/yiqianshou.png';
          logisticsStatusName = '已签收';
          break;
        case 5:
          logisticsStatusName = '用户拒签';
          break;
        case 6:
          logisticsStatusName = '疑难件';
          break;
        case 7:
          logisticsStatusName = '无效单';
          break;
        case 8:
          logisticsStatusName = '超时单';
          break;
        case 9:
          logisticsStatusName = '签收失败';
          break;
        case 10:
          logisticsStatusName = '退回';
          break;
        default:
          break;

      }
      return (
        <Dialog
          actions={actions}
          modal
          open={this.props.open}
          bodyStyle={customContentStyle}
          title={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddimgTop: '1rem' }}>
              <div>{'物流跟踪'}</div>
              <div style={{ fontSize: '1.2rem', color: '#4A4A4A' }}>
                {this.props.logisticsDetailDialog.thirdLogisticsInfo.Result.WL.showapi_res_body.expTextName}
              </div>
            </div>}
          contentStyle={{ maxWidth: '70rem' }}
        >
          <div className={'ThirdLogisticsDialog_info_container'}>
            <div className={'ThirdLogisticsDialog_Icon_box'}>
              <img alt='' className={'ThirdLogisticsDialog_Icon_box_Img'} src={chukuImageName} />
              <div>商品出库</div>
            </div>
            <div
              style={{
                fontSize: '2rem',
                color: this.props.logisticsDetailDialog.thirdLogisticsInfo.Result.WL.showapi_res_body.status >= 3 ?
                '#F5A623' : '#D8D8D8' }}
            >
              ............
            </div>
            <div className={'ThirdLogisticsDialog_Icon_box'}>
              <img alt='' className={'ThirdLogisticsDialog_Icon_box_Img'} src={fahuoImageName} />
              <div>等待收货</div>
            </div>
            <div
              style={{
                fontSize: '2rem',
                color: this.props.logisticsDetailDialog.thirdLogisticsInfo.Result.WL.showapi_res_body.status === 4 ?
              '#F5A623' : '#D8D8D8' }}
            >
              ............
            </div>
            <div className={'ThirdLogisticsDialog_Icon_box'}>
              <img alt='' className={'ThirdLogisticsDialog_Icon_box_Img'} src={shouHuoImageName} />
              <div>完成</div>
            </div>
          </div>
          <div className='ThirdLogisticsDialog_info_logisticsInfo'>
            <div className='ThirdLogisticsDialog_info_logisticsInfo_title' >
              <div className='ThirdLogisticsDialog_info_logisticsInfo_titleText'>{logisticsStatusName}</div>
              <div className='ThirdLogisticsDialog_info_logisticsInfo_logisticsNum'>
                {`物流单号：${this.props.logisticsDetailDialog.thirdLogisticsInfo.Result.WL.showapi_res_body.mailNo}`}
              </div>
            </div>
            <div>
              {
                this.showLogisticsInfoList(this.props.logisticsDetailDialog.thirdLogisticsInfo.Result.WL.showapi_res_body.data)
              }
            </div>
          </div>
        </Dialog>
      );
    } else {
      return (
        <div >
          <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleCloseError} />
        </div>);
    }
  }

}
