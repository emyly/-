/**
 * Created by sjf on 2016/11/7.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import RecycledGoodsSummary from './RecycledGoodsSummary';
import BeforeRecycling from './BeforeRecycling'
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import FlatButton from 'material-ui/FlatButton';
import './SurgeryRecoveryDetail.scss'

import OrderDetailForm from 'components/OrderDetailForm';
import GoBackButton from 'components/GoBackButton';

export default class SugeryRecoveryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValue: '',
      orderState: 0,
      open: false,
    };
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    historyRecoveryRecords: PropTypes.func,
    surgeryRecoveryGoodsSummary: PropTypes.func,
    surgeryRecoveryGoodsSummaryData: PropTypes.object,
    params: PropTypes.object,
    globalStore: PropTypes.object,
    orderBasicInfoForm: PropTypes.object,
    location: PropTypes.object,
    historyRecoveryRecordsData: PropTypes.object,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  /*
   * 1、扫描实物type =1
   * 2、扫描条形码 type = 2
   * */
  scanType = type => () => {
    this.context.router.push({
      pathname: `/surgeryRecovery/${this.props.params.id}/scanPhysical/scanPhysicalList`,
      state: {
        type,
        params: {
          WLLX: '1',
          SFLXR: this.props.globalStore.YHXM,
          SFLXRDH: this.props.globalStore.SJHM,
          DDLXR: this.props.orderBasicInfoForm.orderData.SHLXR,
          DDDD: this.props.orderBasicInfoForm.orderData.SHDZ,
          DDLX: '2',
          MDJXSID: this.props.globalStore.organizationId,
          DDID: this.props.params.id
        }
      }
    })
  };

  componentWillMount = () => {
    this.props.surgeryRecoveryGoodsSummary(Number(this.props.params.id));
    this.props.historyRecoveryRecords(Number(this.props.params.id));
  };

  render() {
    const filter = <div />;
    const actions =
      (<nav style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
        <GoBackButton style={{ marginRight: '10px' }} />
        <RaisedButton
          label='回收'
          style={{ marginLeft: '5px', display: this.props.location.state.dataValue ? 'none' : 'inline-block' }}
          buttonStyle={{
            background: '#00A0FF',
            boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)',
            borderRadius: 2
          }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Regular', fontSize: '14px', letterSpacing: 2 }}
          onTouchTap={this.handleOpen}
        />
      </nav>);
    const moreActions = '';
    const contentFlex = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center'
    };
    const surgeryRecoveryActions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div className='SurgeryRecoveryDetail' style={{ height: '100%' }}>
        <StandardForm iconPosition='-60px -60px' title='手术回收' message={'""'} filter={filter} moreActions={moreActions}>
          <StandardFormCardList activeStep={0}>
            <StandardFormCard
              message={`您当前正在处理的订单号为<${this.props.params.id}>`}
              title='手术' stepName='待回收信息查看' actions={actions} completed showContent showStep expanded
            >
              <div style={contentFlex}>
                <OrderDetailForm
                  orderId={Number(this.props.params.id)}
                  orgId={Number(this.props.globalStore.organizationId)} position={3} sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']}
                >
                  <div className='col-lg-6 col-md-6 col-sm-12'>
                    <BeforeRecycling orderId={Number(this.props.params.id)} tableData={this.props.historyRecoveryRecordsData.data} />
                  </div>
                </OrderDetailForm>
              </div>
              <div className='col-xs-12'>
                <RecycledGoodsSummary tableData={this.props.surgeryRecoveryGoodsSummaryData.data} />
              </div>

              <Dialog
                contentStyle={{ width: '576px' }}
                modal={false}
                open={this.state.open}
                actions={surgeryRecoveryActions}
              >
                <div className='SurgeryRecoveryhint'>
                  <span className='SurgeryRecoveryheader'>手术回收</span><span style={{ fontFamily: 'SourceHanSansCN-Regular' }}> 请选择您要回收扫描方式</span></div>
                <div className='SurgeryRecoveryicon'>
                  <div
                    onTouchTap={this.scanType(2)}
                    style={{ backgroundColor: 'rgba( 0, 160, 255 ,0.09)', float: 'left', cursor: 'pointer' }}
                  ><img src='/tiaoxingma.png' alt='' /><p style={{ fontFamily: 'SourceHanSansCN-Regular' }}>扫描条形码</p></div>
                  <div
                    onTouchTap={this.scanType(1)}
                    style={{ backgroundColor: 'rgba(0, 190, 156,0.09)', float: 'right', cursor: 'pointer' }}
                  ><img src='/shiwu.png' alt='' /><p style={{ fontFamily: 'SourceHanSansCN-Regular' }}>扫描实物</p></div>
                </div>
              </Dialog>
            </StandardFormCard>
            <StandardFormCard title='回收' message='请查看或选择' stepName='回收' avatar='fg-128.jpg' showContent={false} />
          </StandardFormCardList>


        </StandardForm>
      </div>
    );
  }
}
