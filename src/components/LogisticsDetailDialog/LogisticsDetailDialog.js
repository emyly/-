/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react';
import './LogisticsDetailDialog.scss';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import moment from 'lib/moment'
import Checkbox from 'material-ui/Checkbox';
import ThirdLogisticsDialog from 'components/ThirdLogisticsDialog'
import RegistrationCertificateDialog from 'components/RegistrationCertificateDialog'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
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
export default class LogisticsDetailDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      WLDB: {},
      table_production_data: {},
      storageNameArray: [],
      crkdidArray: [],
      SPSL: 0,
      isCardExpanded: true,
      // 全部库位数量
      totalStorageCount: null,
      isOpenThirdInfoDialog: false,
      isOpenRegistrationCertificateDialog: false,
      ZCZBM: null,
      SCRQ: null

    }
  }
  handleSecondDialogClose = () => {
    this.setState({ isOpenThirdInfoDialog: false, isOpenRegistrationCertificateDialog: false });
  };

  handleClose = () => {
    this.setState({ open: false, isOpenThirdInfoDialog: false });
  };

  static propTypes = {
    // 调用组件所需参数
    // 传入物流单ID
    CKDID: PropTypes.number,
    open: PropTypes.bool.isRequired,
    // 确认
    confirmCallBack: PropTypes.func.isRequired,
    // 是否显示发货按钮
    isShowSendbtn: PropTypes.bool.isRequired,
    // 点击发货回调
    clickSendCallBack: PropTypes.func,
    // 发货确认页传入WLDB对象
    paramsObj: PropTypes.object,
    // 传入出入库单和订单号数组[{DDID:900000000038,CRKDID:186},{DDID:900000000306,CRKDID:569}]
    CRKDIDArray: PropTypes.array.isRequired,
    clickPrintLogisticsCallback: PropTypes.func,
    // 引入外部props
    getWarehouseOutDetailData: PropTypes.func,
    getLogisticsDetailData: PropTypes.func,
    logisticsDetailDialog: PropTypes.object,
    orderBasicInfoForm: PropTypes.object
  }
  static defaultProps = {
    isShowSendbtn: false,

  }
  /**
   * 数据解析出入库明细表
   * */
  analyseCRKMXBData = (crkmxbArray) => {
    // 解析出入库明细表
    const tempSet = new Set();
    const CRKIDSet = new Set();
    // //提取相同的库位名称
    crkmxbArray.map((value) => {
      tempSet.add(value.KWLJ);
      CRKIDSet.add(value.KWID);
    });
    // Set 2 Array
    const KWMCArray = Array.from(tempSet);
    const KWIDArray = Array.from(CRKIDSet);
    // 存放库位数组
    const containerArray = [];
    // 商品数量
    let SPSL = 0;
    KWMCArray.map(() => containerArray.push(new Array()));
    crkmxbArray.map((value) => {
      KWMCArray.map((sub_value, sub_index) => {
        if (value.KWLJ === sub_value) {
          containerArray[sub_index].push(value);
          SPSL += value.SL;
        }
      });
    });
    // 解析后的数据
    const resultData = {};
    KWMCArray.map((value, index) => {
      resultData[value] = containerArray[index];
    });
    return { KWMCArray, resultData, KWIDArray, SPSL };
  }
  /**
   * 解析出入库单表
   * */
  analyseCRKDBData = crkdb => ({ orderInfo: [crkdb.CKCK, crkdb.CJSJ, crkdb.YHXM], CRKDID: crkdb.GUID })
  componentWillReceiveProps(nexValue) {
    if (this.props.open !== nexValue.open) {
      this.props.getWarehouseOutDetailData(nexValue.CRKDIDArray);
      this.fetchDataFromServer(nexValue.CKDID);
    }
    if (nexValue.warehouseOutDetailDialog.warehouseOutDetailData) {
      const SPArray = [];
      const KWMCArray = [];
      const CRKDIDArray = [];
      let SL = 0;
      let storageCount = 0;
      nexValue.warehouseOutDetailDialog.warehouseOutDetailData.map((value, index) => {
        SPArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).resultData);
        KWMCArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).KWMCArray);
        CRKDIDArray.push(this.analyseCRKDBData(value[0].Result.CRKDB).CRKDID);
        SL += this.analyseCRKMXBData(value[1].Result.CRKMXB).SPSL;
        storageCount += this.analyseCRKMXBData(value[1].Result.CRKMXB).KWMCArray.length;
      })
      this.setState({
        totalStorageCount: storageCount,
        SPSL: SL,
        crkdidArray: CRKDIDArray,
        table_production_data: SPArray,
        storageNameArray: KWMCArray
      });
    }
    this.setState({ open: nexValue.open });
  }
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value) => {
    this.props.getLogisticsDetailData(value);
  }
  componentWillMount() {

  }
  /**
   * 订单类型判断
   * */
  orderTypeJudge = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return '铺货订单';
      case 1:
        return '备货订单';
      case 2:
        return '手术订单';
      case 3:
        return '借货订单';
      case 4:
        return '调货订单';
      case 5:
        return '铺货补货订单';
      case 6:
        return '铺货销售订单';
      case 7:
        return '调拨订单';
      default:
        return '';
    }
  }
  /**
   * 添加￥符号
  **/
  addRMBMark = (str) => {
    if (str === null || str === '') {
      return ''
    }
    return `￥${str}`;
  }

  /**
   * Card展开/关闭
  */
  handleExpandChange = () => {
    this.setState({ isCardExpanded: !this.state.isCardExpanded });
  }

  /**
   * 判断值是否为空,对象是否有key
   * */
  isValueEmpty = (value, checkValue) => {
    if (value !== null && _.has(value, checkValue)) {
      return value[checkValue] === null ? '' : value[checkValue];
    }
    return '';
  }
  handleOpenLogisticsDialog = () => {
    if (!this.props.isShowSendbtn) {
      this.setState({ isOpenThirdInfoDialog: true });
    }
  }
  handleClickCertificate = (ZCZBM, SCRQ) => () => {
    this.setState({ ZCZBM, SCRQ, isOpenRegistrationCertificateDialog: true });
  }
  handleClickPrintLogistics = () => {
    this.props.clickPrintLogisticsCallback(this.props.logisticsDetailDialog.logisticsDetailData.Result.WLDB)
  }
  render() {
    const actions = [
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <FlatButton
          label='打印发货单'
          primary
          onTouchTap={this.handleClickPrintLogistics}
        />
        <FlatButton
          label='确认'
          primary
          onTouchTap={this.props.confirmCallBack}
        />
      </div>

    ];
    const sendAction = [
      <FlatButton
        label='关闭'
        onTouchTap={this.props.confirmCallBack}
      />,
      <FlatButton
        label='确定'
        primary
        onTouchTap={this.props.clickSendCallBack}
      />
    ];
    return (
      <div>
        <Dialog
          actions={this.props.isShowSendbtn ? sendAction : actions}
          modal
          open={this.state.open}
          bodyStyle={customContentStyle}
          title={this.props.isShowSendbtn ? '发货确认单' : '已发货物流详情单'}
          contentStyle={{ maxWidth: '70rem', width: '70rem' }}
        >
          <div>
            <div className='LogisticsDetailDialog_LogisticsContent'>
              <div className='LogisticsDetailDialog_LogisticsInfo'>
                <div className='LogisticsDetailDialog_LogisticsInfo_box' style={{ background: 'rgba(65,161,255,0.08)' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>物流公司：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {this.props.isShowSendbtn === true ?
                        this.isValueEmpty(this.props.paramsObj.WLDB, 'GSMC') === '' ? '自有物流'
                        : typeof (this.props.paramsObj.WLDB.GSMC) === 'undefined' ? '自有物流'
                        : this.props.paramsObj.WLDB.GSMC
                        : this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').GSMC}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>物流单号：</div>
                    <div
                      className='LogisticsDetailDialog_LogisticsInfo_box_content'
                      onClick={this.handleOpenLogisticsDialog}
                      style={{
                        cursor: this.props.isShowSendbtn === true ?
                        null : 'pointer',
                        textDecoration: this.props.isShowSendbtn === true ?
                        null : this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').WLLX === '1' ?
                         'none' : 'underLine'}}
                    >
                      {this.props.isShowSendbtn === true ?
                        this.isValueEmpty(this.props.paramsObj.WLDB, 'WLDH') :
                        this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').WLDH}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>订单类型：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {this.orderTypeJudge(this.props.isShowSendbtn === true ?
                        this.isValueEmpty(this.props.paramsObj.WLDB, 'DDLX')
                        : this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').DDLX)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>发货日期：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {this.props.isShowSendbtn === true ?
                        moment(this.isValueEmpty(this.props.paramsObj.WLDB, 'SFSJ')).formatStandard('Y', 'M', 'D')
                        : moment(this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB')).formatStandard('Y', 'M', 'D')
                        }
                    </div>
                  </div>
                </div>
                <div className='LogisticsDetailDialog_LogisticsInfo_box' style={{ background: 'rgba(0,190,156,0.08)' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>收货人：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {this.isValueEmpty(this.props.orderBasicInfoForm.orderData, 'SHLXR')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>联系方式：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {this.isValueEmpty(this.props.orderBasicInfoForm.orderData, 'SHLXRDH')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>收货地址：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {this.isValueEmpty(this.props.orderBasicInfoForm.orderData, 'SHDZ').split('\n')[0]}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_title'>送货日期：</div>
                    <div className='LogisticsDetailDialog_LogisticsInfo_box_content'>
                      {moment(this.isValueEmpty(this.props.orderBasicInfoForm.orderData, 'DHRQ')).formatStandard('Y', 'M', 'D') }
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='LogisticsDetailDialog_priceInfo'
                style={{
                  display: this.props.isShowSendbtn === false ?
                  this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').WLLX === '0' ?
                  'flex' : 'none' : this.props.isShowSendbtn === false ?
                  'flex' : this.isValueEmpty(this.props.paramsObj, 'WLDB') === '' ?
                  'none' : this.isValueEmpty(this.props.paramsObj.WLDB, 'SFDF') === '' ? 'none' : 'flex', flexDirection: 'row' }}
              >
                <div
                  className='LogisticsDetailDialog_priceInfo_box'
                  style={{ justifyContent: 'center', background: '#FFF6EE', flexDirection: 'column' }}
                >
                  <div style={{ marginLeft: '1.5rem' }}>
                    {
                    (() => {
                      if (this.props.isShowSendbtn) {
                        return (
                          <Checkbox
                            labelStyle={{ fontFamily: 'SourceHanSansCN-Normal', fontSize: '14px', color: 'rgba(0,0,0,0.38)' }}
                            checked={this.props.isShowSendbtn === true ?
                              this.isValueEmpty(this.props.paramsObj.WLDB, 'SFDF') === '' ?
                              false : this.isValueEmpty(this.props.paramsObj.WLDB, 'SFDF') !== '0' :
                              this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').SFDF !== '0'}
                            label={'到付'}
                          />);
                      }
                      return (
                        <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.38)', paddingLeft: '2.4rem' }}>
                          {this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').SFDF !== '0' ? '到付' : '非到付'}
                        </span>);
                    })()
                  }

                  </div>
                </div>
                <div className='LogisticsDetailDialog_priceInfo_box' style={{ background: '#FDECDD' }}>
                  <div className='LogisticsDetailDialog_priceInfo_box_title'>保价金额：</div>
                  <div className='LogisticsDetailDialog_priceInfo_box_content'>
                    {this.addRMBMark(this.props.isShowSendbtn === true ?
                      this.isValueEmpty(this.props.paramsObj.WLDB, 'BJJE') :
                      this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').BJJE)}
                  </div>
                </div>
                <div className='LogisticsDetailDialog_priceInfo_box' style={{ background: '#FFF6EE' }}>
                  <div className='LogisticsDetailDialog_priceInfo_box_title'>加急费用：</div>
                  <div className='LogisticsDetailDialog_priceInfo_box_content'>
                    {this.addRMBMark(this.props.isShowSendbtn === true ?
                      this.isValueEmpty(this.props.paramsObj.WLDB, 'JJFY') :
                      this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').JJFY)}
                  </div>
                </div>
                <div className='LogisticsDetailDialog_priceInfo_box' style={{ background: '#FDECDD' }}>
                  <div className='LogisticsDetailDialog_priceInfo_box_title'>保险金额：</div>
                  <div className='LogisticsDetailDialog_priceInfo_box_content'>
                    {this.addRMBMark(this.props.isShowSendbtn === true ?
                      this.isValueEmpty(this.props.paramsObj.WLDB, 'BFJE') :
                      this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').BFJE)}
                  </div>
                </div>
                <div className='LogisticsDetailDialog_priceInfo_box' style={{ background: '#FFF6EE' }}>
                  <div className='LogisticsDetailDialog_priceInfo_box_title'>物流费用：</div>
                  <div className='LogisticsDetailDialog_priceInfo_box_content'>
                    {this.addRMBMark(this.props.isShowSendbtn === true ? this.isValueEmpty(this.props.paramsObj.WLDB, 'WLFY') :
                    this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').WLFY)}
                  </div>
                </div>
                <div className='LogisticsDetailDialog_priceInfo_box' style={{ background: '#FFA95D' }}>
                  <div className='LogisticsDetailDialog_priceInfo_box_title' style={{ color: '#FFFFFF' }}>总计金额：</div>
                  <div className='LogisticsDetailDialog_priceInfo_box_content' style={{ color: '#FFFFFF' }}>
                    {this.addRMBMark(this.props.isShowSendbtn === true ?
                      this.isValueEmpty(this.props.paramsObj.WLDB, 'WLZFY') :
                      this.isValueEmpty(this.props.logisticsDetailDialog.logisticsDetailData.Result, 'WLDB').WLZFY)}
                  </div>
                </div>
              </div>
            </div>
            <div className='LogisticsDetailDialog_production' style={{ marginTop: '1.4rem' }}>
              <Card
                expanded={this.state.isCardExpanded}
                onExpandChange={this.handleExpandChange}
                id='cardBorderStyle'
                style={{ width: '100%', height: 'auto' }}
              >
                <CardHeader
                  title={`共计商品数量:${this.state.SPSL}`}
                  actAsExpander
                  showExpandableButton
                  style={{ background: '#FFA95D', width: '100%' }}
                  titleStyle={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '14px', color: '#FFFFFF' }}
                />
                {/* this.state.SPSL*48+this.state.storageNameArray.length*30+this.state.totalStorageCount*(20+56)+150*/}
                <CardText expandable style={{ padding: '0px' }}>
                  {
                this.state.storageNameArray.map((value, index) => (
                  <div key={`LogisticsDetailDialog_production_title${index}`} style={{ width: '100%', height: 'auto' }} className='logisticsTabel'>
                    <div
                      key={`LogisticsDetailDialog_production_title1${index}`}
                      style={{
                        paddingLeft: '1.4rem',
                        paddingBottom: '10px',
                        width: '100%',
                        height: '30px',
                        lineHeight: '30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#979797',
                        background: '#364357'}}
                    >
                      {`出库单号:${this.state.crkdidArray[index]}`}
                    </div>
                    {
                      this.state.storageNameArray[index].map((father_value, father_Index) => (
                        <div
                          key={`outWarehouseDetailProductionDIV${father_value}`} className='productList' style={{ color: '#979797',
                            height: (() => {
                              let height = 20 + 56.25;
                              height += this.state.table_production_data[index][father_value].length * 80;
                              return `${height}px`;
                            })() }}
                        >
                          <div
                            style={{
                              paddingLeft: '1.4rem',
                              height: '20px',
                              lineHeight: '20px',
                              width: '100%',
                              background: '#364357' }}>
                            {this.state.storageNameArray[index][father_Index]}
                          </div>
                          <Table
                            displaySelectAll={false}
                            selectable={false}
                            style={{ width: '100%' }}
                            wrapperStyle={{ overflowX: 'hidden' }}
                            className='table_log'
                          >
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ background: '#364357' }}>
                              <TableRow>
                                <TableHeaderColumn
                                  style={{
                                    textAlign: 'center',
                                    fontFamily: 'SourceHanSansCN-Bold',
                                    fontSize: '16px',
                                    color: '#5B83B4',
                                    paddingLeft: 0,
                                    paddingRight: 0 }}
                                >
                                  物料编号
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  style={{
                                    textAlign: 'center',
                                    fontFamily: 'SourceHanSansCN-Bold',
                                    fontSize: '16px',
                                    color: '#5B83B4',
                                    paddingLeft: 0,
                                    paddingRight: 0 }}
                                >
                                  商品名称
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  style={{
                                    textAlign: 'center',
                                    fontFamily: 'SourceHanSansCN-Bold',
                                    fontSize: '16px',
                                    color: '#5B83B4',
                                    paddingLeft: 0,
                                    paddingRight: 0 }}
                                >
                                  规格
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  style={{
                                    textAlign: 'center',
                                    fontFamily: 'SourceHanSansCN-Bold',
                                    fontSize: '16px',
                                    color: '#5B83B4',
                                    paddingLeft: 0,
                                    paddingRight: 0 }}
                                >
                                批号
                                </TableHeaderColumn>
                                <TableHeaderColumn style={{
                                  textAlign: 'center',
                                  fontFamily: 'SourceHanSansCN-Bold',
                                  fontSize: '16px',
                                  color: '#5B83B4',
                                  paddingLeft: 0,
                                  paddingRight: 0 }}
                                >
                                注册证编号
                                </TableHeaderColumn>
                                <TableHeaderColumn style={{
                                  textAlign: 'center',
                                  fontFamily: 'SourceHanSansCN-Bold',
                                  fontSize: '16px',
                                  color: '#5B83B4',
                                  paddingLeft: 0,
                                  paddingRight: 0 }}
                                >
                                {this.props.isShowSendbtn ? '待发货数量' : '已发货数量'}
                                </TableHeaderColumn>
                              </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} stripedRows showRowHover >
                              {
                                  this.state.table_production_data[index][father_value].map((value, index) => {
                                    return (
                                      <TableRow key={`LogisticsDetailDialog_table_body_data_${index}`}>
                                        <TableRowColumn
                                          title={value.SPBH}
                                          style={{ whiteSpace: 'inherit', textOverflow: 'inherit', textAlign: 'center', height: '80px' }}
                                        >
                                          {value.SPBH}
                                        </TableRowColumn>
                                        <TableRowColumn
                                          title={value.SPMC}
                                          style={{ whiteSpace: 'inherit', textOverflow: 'inherit', textAlign: 'center', height: '80px' }}
                                        >
                                          {value.SPMC}
                                        </TableRowColumn>
                                        <TableRowColumn
                                          title={value.SPMS}
                                          style={{ whiteSpace: 'inherit', textOverflow: 'inherit', textAlign: 'center', height: '80px' }} >
                                          {value.SPMS}
                                        </TableRowColumn>
                                        <TableRowColumn
                                          title={value.SPPH}
                                          style={{ whiteSpace: 'inherit', textOverflow: 'inherit', textAlign: 'center', height: '80px' }}
                                        >
                                          {value.SPPH}
                                          </TableRowColumn>
                                        <TableRowColumn
                                          title={value.ZCZBM}
                                          style={{ whiteSpace: 'inherit', textOverflow: 'inherit', textAlign: 'center', height: '80px' }}
                                        >
                                          <div style={{ wordWrap: 'breakWord', cursor: 'pointer', color: '#00A0FF', textAlign: 'center' }} onClick={this.handleClickCertificate(value.ZCZBM, value.SCRQ)}>
                                            {value.ZCZBM}
                                          </div>
                                        </TableRowColumn>
                                        <TableRowColumn title={value.SL} style={{ textAlign: 'center', height: '80px' }} >{value.SL}</TableRowColumn>
                                      </TableRow>
                                    );
                                  }
                                  )
                                }
                            </TableBody>
                          </Table>
                        </div>
                        ))
                    }
                  </div>))
              }
                </CardText>
              </Card>
            </div>
          </div>
          <ThirdLogisticsDialog open={this.state.isOpenThirdInfoDialog} handleClose={this.handleSecondDialogClose} />
          <RegistrationCertificateDialog SCRQ={this.state.SCRQ} registrationCertificateNum={this.state.ZCZBM} open={this.state.isOpenRegistrationCertificateDialog} handleClose={this.handleSecondDialogClose} />
        </Dialog>
      </div>
    );
  }

}
