/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react';
import './WarehouseInDetailDialog.scss';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '800px',
  maxHeight: 'none'
};
/**
 * 场景:出库单详情
 * 接口: 1.出库明细接口：出入库.md => 1.订单对应的出入库单列表查询
 *      2.出入库但信息：出入库.md => 2.出库复核——订单商品出库详情汇总
 * */
export default class WarehouseIntDetailDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderInfo: ['31323', '杭州仓库', '2016/09/11', 'haha'],
      // 库位名称
      storageNameArray: [],
      CRKDBArray: [],
      DDIDArray: [],
      open: this.props.open,
      isShowRecheckBtn: false,
      // 出入库单数组
      crkdidArray: [],
      table_production_data: {
      }
    }
  }
  handleClose = () => {
    this.props.confirmCallBack();
    this.setState({ open: false });
  };
  onExpandChange = (event) => {
    console.log(event);
  }
  /**
   * 数据解析出入库明细表
   * */
  analyseCRKMXBData = (crkmxbArray) => {
    // 解析出入库明细表
    const tempSet = new Set();
    // //提取相同的库位ID
    crkmxbArray.map((value) => {
      tempSet.add(value.KWLJ);
    });
    // Set 2 Array
    const KWMCArray = Array.from(tempSet);
    // 存放库位数组
    const containerArray = [];
    KWMCArray.map(() => containerArray.push(new Array()));
    crkmxbArray.map((value) => {
      KWMCArray.map((sub_value, sub_index) => {
        if (value.KWLJ === sub_value) {
          containerArray[sub_index].push(value);
        }
      });
    });
    // 解析后的数据
    const resultData = {};
    KWMCArray.map((value, index) => {
      resultData[value] = containerArray[index];
    });
    return [KWMCArray, resultData];
  }
  /**
   * 解析出入库单表
   * */
  analyseCRKDBData = (crkdb) => {
    const orderInfoArray = [];
    orderInfoArray.push(this.props.orderBasicInfoForm.orderData.SHJXSMC);
    orderInfoArray.push(crkdb.WLDH);
    // orderInfoArray.push(crkdb.GUID);
    orderInfoArray.push(this.changeDataFormat(crkdb.CJSJ, true));
    // orderInfoArray.push(crkdb.RKCK);
    orderInfoArray.push(crkdb.YHXM);
    return [orderInfoArray];
  }
  /**
   * 时间格式转换 true为需要时分秒
   * */
  changeDataFormat = (date, flag) => {
    const tempDate = new Date(date);
    const yy = `${tempDate.getFullYear()}-`;
    const mm = `${tempDate.getMonth() + 1}-`;
    const dd = `${tempDate.getDate()} `;
    const hh = `${tempDate.getHours()}:`;
    const ii = `${tempDate.getMinutes()}:`;
    const ss = tempDate.getSeconds();
    if (flag) {
      return (yy + mm + dd + hh + ii + ss);
    } else {
      return (yy + mm + dd);
    }
  }
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value) => {
    this.props.getWarehouseInDetailData(value);
  }
  componentWillReceiveProps(nextValue) {
    this.setState({ open: nextValue.open });
    this.setState({ CRKDIDArray: nextValue.CRKDIDArray, isShowRecheckBtn: nextValue.isShowRecheckBtn });
    if (this.props.paramsObj !== nextValue.paramsObj) {
      const params = [{ DDID: 900000000306, CRKDID: 571 }, { DDID: 900000000306, CRKDID: 569 }];
      // console.debug('CMCMCMC',params);
      this.fetchDataFromServer(nextValue.paramsObj);
    }
    this.setState({ requredStatus: nextValue.requredStatus, open: nextValue.open });
    const KWMCArray = [];
    const SPArray = [];
    const orderInfoArray = [];
    const CRKDIDArray = [];
    if (nextValue.warehouseInDetailDialog.warehouseInDetailData) {
      nextValue.warehouseInDetailDialog.warehouseInDetailData.map((value, index) => {
        KWMCArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB)[0]);
        // SPArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB[1]));
        SPArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB)[1]);
        orderInfoArray.push(this.analyseCRKDBData(value[0].Result.CRKDB));
        CRKDIDArray.push(this.analyseCRKDBData(value[0].Result.CRKDB)[2]);
      })
    }
    this.setState({ crkdidArray: CRKDIDArray, storageNameArray: KWMCArray, table_production_data: SPArray, orderInfo: orderInfoArray });
  }
  componentWillMount = () => {
    this.fetchDataFromServer(this.props.paramsObj);
  }
  static PropTypes = {
    // 传入入库单ID和订单ID数组[{DDID:123,CRKDID:234},{DDID:123,CRKDID:234}]  传入对象格式
    paramsObj: PropTypes.object.isRequired,
    // 传入订单ID
    // DDIDArray:PropTypes.string.isRequired,
    // 控制dialog打开关闭
    open: PropTypes.bool.isRequired,
    // 点击确认按钮回调
    confirmCallBack: PropTypes.func.isRequired,
    // 点击复核通过回调
    clickPassCallBack: PropTypes.func.isRequired,
    // 点击复核退回回调
    clickRefusedCallBack: PropTypes.func.isRequired,
    // 是否复核按钮
    isShowRecheckBtn: PropTypes.bool.isRequired
  }
  static defaultProps = {
    open: true,
    isShowRecheckBtn: false,
    CRKDIDArray: []
  }

  render() {
    const actions = [
      <FlatButton
        label='确认'
        primary
        onTouchTap={this.handleClose}
        style={{ fontFamily: 'PingFangSC-Medium', fontSize: '16px', color: '#00A0FF', letterSpacing: '0.57px' }}
      />
    ];
    const recheckAction = [<FlatButton
      label='复核退回'
      primary
      onTouchTap={this.props.clickRefusedCallBack}
    />, <FlatButton
      label='复核通过'
      primary
      onTouchTap={this.props.clickPassCallBack}
    />];
    const title = (<div className='title'>
      {
        this.state.storageNameArray.map((value, index) => (
          <div className='wareTitle' key={`WarehouseInDetailDialog_title_${index}`}>
            <span>{this.props.title || '入库单详情'}</span>
            <span>{`当前入库单:${this.props.paramsObj[index].CRKDID}`}</span>
          </div>
          ))
      }
    </div>);

    return (
      <div>
        <Dialog
          actions={this.state.isShowRecheckBtn ? recheckAction : actions}
          modal
          open={this.state.open}
          bodyStyle={customContentStyle}
          title={title}
          contentStyle={{ width: '768px' }}
        >
          <div>
            <div className='dialogWareScoroll'>
              {

              this.state.storageNameArray.map((value, index) => (
                <Card key={`WarehouseInDetailDialog_Card_${index}`} id='cardBorderStyle' initiallyExpanded style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <CardText expandable style={{ width: '100%', height: 'auto' }}>
                    <div style={{ width: '100%', height: 'auto' }}>
                      <div className='WarehouseInCenterContainer'>
                        <div className='WarehouseInLeftContainer' >
                          <span className='WarehouseInLeftContent' >供货商：</span>
                          <span className='WarehouseInLeftContent' >物流单号：</span>
                          <span className='WarehouseInLeftContent' >入库时间：</span>
                          <span className='WarehouseInLeftContent' >操作人：</span>
                        </div>
                        <div className='WarehouseInRightContainer'>
                          {
                              this.state.orderInfo[index].map((value, index) => value.map((value_value, value_index) => (
                                <span className='WarehouseInRightContent' key={`WarehouseInRightContent_${value_index}`}>{value_value}</span>
                                  )))
                            }
                        </div>
                      </div>
                      <div className='WarehouseInBottomContent'>
                        {
                            this.state.storageNameArray[index].map((father_value, father_Index) => (
                              <div
                                key={`warehouseInDetailDialogBotttom${index}`} className='productList' style={{ height: (() => {
                                  let height = 20 + 56.25 + 10;
                                  height += this.state.table_production_data[index][father_value].length * 47.5;
                                  return `${height}px`;
                                })() }}
                              >
                                <div className='warehouseInProduction_title'>
                                  <div key={`warehouseInDetailDialog_production_title1${index}`} className='warehouseInProduction_title1' title={value}>{value}</div>
                                </div>
                                <Table displaySelectAll={false} selectable={false}>
                                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                      <TableHeaderColumn>物料编号</TableHeaderColumn>
                                      {/* <TableHeaderColumn>商品名称</TableHeaderColumn> */}
                                      <TableHeaderColumn >型号规格</TableHeaderColumn>
                                      <TableHeaderColumn>批号</TableHeaderColumn>
                                      <TableHeaderColumn>入库数量</TableHeaderColumn>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody displayRowCheckbox={false} showRowHover >
                                    {
                                        this.state.table_production_data[index][father_value].map((value, index) => <TableRow key={`WarehouseOutDetailDialog_table_body_data_${index}`} style={{ background: '#E9F0FC' }}>
                                          <TableRowColumn style={{ background: '#E9F0FC' }}>{value.SPBH}</TableRowColumn>
                                          {/* <TableRowColumn>{value.SPMC}</TableRowColumn>*/}
                                          <TableRowColumn>{value.SPMS}</TableRowColumn>
                                          <TableRowColumn>{value.SPPH}</TableRowColumn>
                                          <TableRowColumn>{value.SL}</TableRowColumn>
                                        </TableRow>)
                                      }
                                  </TableBody>
                                </Table>
                              </div>
                              ))
                          }
                      </div>
                    </div>
                  </CardText>
                </Card>
                ))
            }
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

}
