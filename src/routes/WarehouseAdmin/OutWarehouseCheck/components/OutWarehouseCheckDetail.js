/**
 * Created by chenming on 2016/10/25.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './OutWarehouseCheckDetail.scss'
import OrderDetail from 'components/OrderDetailForm'
import CardUI from 'components/StandardUI/StandardCard';
import SelectProductionRecordTable from 'components/SelectProductionRecordTable'
import WarehouseOutDetailDialog from 'components/WarehouseOutDetailDialog'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import _ from 'lodash';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import GoBackButton from 'components/GoBackButton';

export default class OutWarehouseCheckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 显示商品详情弹窗和复核确认页面
      isShowProductionDetail: false,
      // 订单表
      DDB: [],
      // 出库单详情参数
      OutWareDetailParamsArray: [],
      // 是否展示复核按钮
      isShowCheckBtn: null,
      // 通知内容
      TZNR: null,
      // @谁
      ATWho: [],
      message: '',
      openError: false
    }
  }
  static propTypes = {
    // 引用外部props
    orderBasicInfoForm: PropTypes.object,
    postOutWarehouseCheck: PropTypes.func,
    getSelectProductionRecord: PropTypes.func,
    selectProductionRecordTable: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    globalStore: PropTypes.object,
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
  * 关闭弹窗
  * */
  handleClose = () => {
    this.setState({ isShowProductionDetail: false });
  }
  /**
  * 点击复核按钮
  * */
  handleRecheck = () => {
    if (this.state.OutWareDetailParamsArray.length) {
      this.setState({
        isShowProductionDetail: true,
        isShowCheckBtn: true,
      });
    } else {
      this.setState({ openError: true, message: '请选择出库记录' });
    }
  }


  handleErrorClose = () => {
    this.setState({ openError: false });
  }
  /**
   *点击关闭
   * */
  clickConfirm = () => {
    this.handleClose();
  }
  /**
  * 复核通过
  * */
  confirmCheck = () => {
    this.outWarehouseCheck('1');
    this.handleClose();
  }
  /**
   * 复核退回
   * */
  confirmRefuse = () => {
    this.outWarehouseCheck('2');
    this.handleClose();
  }
  /**
   * 复核操作 '1'通过 '2'退回
   * */
  outWarehouseCheck = (e) => {
    const CRKDSHB = [];
    this.state.OutWareDetailParamsArray.map((value) => {
      CRKDSHB.push({ CRKDID: value.CRKDID, SHZT: e === '1' ? '1' : '2', CKRK: '0' });
    })
    const params = { CRKDSHB,
      DDB: { GUID: this.props.orderBasicInfoForm.GUID, DDLX: this.props.orderBasicInfoForm.DDLX },
      TZ: { BTZR: this.state.ATWho, TZNR: this.state.TZNR } }
    this.setState({ isShowCheckBtn: true, OutWareDetailParamsArray: [] });
    this.props.postOutWarehouseCheck(params);
  }
  /**
  * 点击拣货记录
  * */
  handleClickPikingRecord = (e) => {
    this.setState({ DDB: e });
    if (e.SHZT !== '0') {
      // 通过，退回状态
      this.setState({ isShowCheckBtn: false, isShowProductionDetail: true, OutWareDetailParamsArray: [{ DDID: e.DDID, CRKDID: e.GUID }] });
    }
  }
  /**
   * @谁
   * */
  handleClickMultiSelectPerson = (e) => {
    const atArray = [];
    e.map((value) => {
      atArray.push(value.id);
    });
    this.setState({ ATWho: atArray });
  }
  /**
   * 获取@谁内容
   * */
  clickATMessage = (e) => {
    this.setState({ TZNR: e });
  }
  /**
  * 点击checkbox 返回选中的数组
  * */
  handleClickCheckBox = (e) => {
    const paramsArray = _.cloneDeep(e);
    paramsArray.map((value) => {
      if (value.SHZT === '0') {
        value.CRKDID = value.GUID;
      }
    })
    this.setState({ OutWareDetailParamsArray: paramsArray });
  }

  componentWillMount = () => {

  }
  componentWillReceiveProps(nextValue) {
    if (nextValue.outWarehouseCheckDetail.Result.Code === 0) {
      this.props.getSelectProductionRecord(this.props.orderBasicInfoForm.GUID, '0');
      this.setState({ OutWareDetailParamsArray: [] });
      nextValue.outWarehouseCheckDetail.Result.Code = null;
    }
    let isTurnToList = true;
    if (nextValue.selectProductionRecordTable !== null && nextValue.selectProductionRecordTable !== this.props.selectProductionRecordTable) {
      nextValue.selectProductionRecordTable.selectData.map((value, index) => {
        if (value.SHZT === '0') {
          isTurnToList = false
        }
      })
      if (isTurnToList) {
        if (nextValue.location.state.orderStatus === 0) {
          window.history.back();
        }
      }
    }
  }
  render() {
    let actions;
    if (this.props.location.state.orderStatus === 0) {
      actions = (<nav>
        <GoBackButton />
        <RaisedButton
          label='复核'
          primary
          style={{ marginLeft: '5px' }}
          icon={<ContentAddCircle />}
          onTouchTap={this.handleRecheck}
        />
      </nav>)
    } else {
      actions = <GoBackButton />
    }
    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    const filter =
      <div />;
    return (
      <StandardForm
        iconPosition='-120px 0px'
        filter={filter}
        actions={actions}
        title={'出库复核详情页面'}
        message={`您当前正在处理订单号为<${this.props.params.id}>的订单`}
      >
        {/* 显示单个物流发货记录商品详情*/}
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='' message='' actions={actions} showStep={false} expanded>
            <WarehouseOutDetailDialog
              orderJson={this.props.orderBasicInfoForm}
              confirmCallBack={this.clickConfirm}
              clickRefusedCallBack={this.confirmRefuse}
              clickPassCallBack={this.confirmCheck}
              paramsObj={this.state.OutWareDetailParamsArray}
              isShowRecheckBtn={this.state.isShowCheckBtn}
              open={this.state.isShowProductionDetail}
            />
            <OrderDetail
              sort={['OrderBasicInfoForm', 'OperationPersonnelInfoForm']}
              orderId={Number(this.props.params.id)}
              orgId={Number(this.props.globalStore.organizationId)}
              position={0}
            >
              <div style={{ display: this.props.location.state.orderStatus === 0 ? 'block' : 'none' }} className='col-lg-6 col-md-6 col-sm-12'>
                <CardUI
                  expanded
                  title='出库复核'
                  avatar='/logistIcon/icon-07.png'
                  CardTextStyle={{ height: '23.4rem', padding: 0, position: 'relative', textAlign: 'center' }}
                  label=''
                  topStyle={topStyle}
                >
                  <div className='whoName'>
                    <div className='choseSb'>
                      <div className='who' >选择@谁：</div>
                      <div style={{ position: 'relative' }}>
                        <AtSelect
                          callback={this.handleClickMultiSelectPerson}
                          className='AtTextFieldStyle'
                          orderOrganizationId={this.props.orderBasicInfoForm.SHJXSID}
                          organizationId={this.props.globalStore.organizationId}
                          underlineStyle={{ width: '99%' }}
                          inputStyle={{ width: 'inherit' }}
                        />
                      </div>
                    </div>
                    <div className='choseSb' style={{ marginTop: '2rem' }}>
                      <div className='who' >填写备注：</div>
                      <div>
                        <AtMessage
                          callback={this.clickATMessage}
                          className='AtTextFieldStyle'
                          hintText=''
                          divStyle={{ width: '99%', overflow: 'hidden' }}
                        />
                      </div>
                    </div>
                  </div>
                </CardUI>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <SelectProductionRecordTable
                  topStyle={{ backgroundColor: `${this.props.location.state.orderStatus === 0 ? '#00A0FF' : '#364356'}` }}
                  isInitiallyExpanded
                  title={'出库记录'}
                  inOrOut={0}
                  orgId={this.props.globalStore.organizationId}
                  orderId={Number(this.props.params.id)}
                  ifShowCheckBox
                  checkboxCallback={this.handleClickCheckBox}
                  rowClickCallback={this.handleClickPikingRecord}
                />
              </div>
            </OrderDetail>
            <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleErrorClose} />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    );
  }
}
