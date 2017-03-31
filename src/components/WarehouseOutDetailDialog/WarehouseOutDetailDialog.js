/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react';
import './WarehouseOutDetailDialog.scss';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import FlatButton from 'material-ui/FlatButton';
import CardUI from 'components/StandardUI/StandardCard';
import BillingUpload from '../../components/BillingUpload';
import _ from 'lodash'

import moment from 'moment'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '800px',
};
/**
 * 场景:出库单详情
 * 接口: 1.出库明细接口：出入库.md => 1.订单对应的出入库单列表查询
 *      2.出入库但信息：出入库.md => 2.出库复核——订单商品出库详情汇总
 * */
export default class WarehouseOutDetailDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderInfo: ['31323', '杭州仓库', '2016/09/11', 'haha'],
      // 库位名称
      storageNameArray: [],
      // 仓库ID数组
      storageIdArray: [],
      // 控制Card收展
      isCardExpandArray: [],
      // 当前第几个打开
      currentOpenIndex: 0,
      // 出入库单数组
      crkdidArray: [],
      CRKDBArray: [],
      DDIDArray: [],
      open: this.props.open,
      isShowRecheckBtn: false,
      showCheckboxes: false,
      table_production_data: [],
      tagCurt: false,
      SPSL: 0,
      typeCount: 0,
      YFHZL: 0,
      DFHZL: 0,
      YFHSL: 0,
      DFHSL: 0,
      SPBHArray: []
    }
  }
  handleClose = () => {
    this.props.confirmCallBack();
    this.setState({ open: false });
  };
  onExpandChange = (event) => {

  }
  handClickTag = (father_Index, index, sub_index) => () => {
    const productionData = this.state.table_production_data
    let YFHZL = 0;
    let DFHZL = 0;
    let YFHSL = 0;
    let DFHSL = 0;
    let SPBHYFHSet = new Set();
    let SPBHDFHSet = new Set();
    productionData[father_Index][Object.keys(productionData[father_Index])[index]][sub_index].isChecked = !productionData[father_Index][Object.keys(productionData[father_Index])[index]][sub_index].isChecked;
    for (const i in productionData[father_Index]) {
      productionData[father_Index][i].map((map_value, map_index) => {
        if (map_value.isChecked) {
          SPBHYFHSet.add(map_value.SPBH);
          YFHSL += map_value.SL;
        } else {
          SPBHDFHSet.add(map_value.SPBH);
          DFHSL += map_value.SL;
        }
      });
    }
    YFHZL = Array.from(SPBHYFHSet).length;
    DFHZL = Array.from(SPBHDFHSet).length;
    this.setState({ table_production_data: productionData, YFHZL, DFHZL, YFHSL, DFHSL });
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
    let SL = 0
    let typeCount = 0
    let SPBHSet = new Set();
    KWMCArray.map(() => containerArray.push(new Array()));
    crkmxbArray.map((value) => {
      KWMCArray.map((sub_value, sub_index) => {
        if (value.KWLJ === sub_value) {
          containerArray[sub_index].push(value);
          SL += value.SL;   
          typeCount += 1;
          SPBHSet.add(value.SPBH);     
        }
      });
    });
    typeCount = Array.from(SPBHSet).length;
    // 解析后的数据
    const resultData = {};
    KWMCArray.map((value, index) => {
      resultData[value] = containerArray[index];
    });
    return { KWMCArray, resultData, KWIDArray, SL, typeCount };
  }
  /**
   * 解析出入库单表
   * */
  analyseCRKDBData = crkdb => ({ orderInfo: [crkdb.CKCK, moment(crkdb.CJSJ).format('YYYY-MM-DD HH:mm'), crkdb.YHXM], CRKDID: crkdb.GUID })
  /**
   * 获取数据  在这里调用api
   * */
  fetchDataFromServer = (value) => {
    this.props.getWarehouseOutDetailData(value);
  }
  componentWillReceiveProps(nextValue) {
    const lastId = _.has(this.props.paramsObj[0], 'CRKDID') ? this.props.paramsObj[0].CRKDID : '';
    const nextId = _.has(nextValue.paramsObj[0], 'CRKDID') ? nextValue.paramsObj[0].CRKDID : '';
    /* id不同则重置商店*/
    if (nextId !== lastId) {
      this.props.setBillingUploadInit();
    }

    this.setState({ open: nextValue.open, CRKDIDArray: nextValue.CRKDIDArray, isShowRecheckBtn: nextValue.isShowRecheckBtn });
    if (this.props.paramsObj !== nextValue.paramsObj) {
      this.fetchDataFromServer(nextValue.paramsObj);
    }
    this.setState({ requredStatus: nextValue.requredStatus, open: nextValue.open });
    const KWMCArray = [];
    const SPArray = [];
    const orderInfoArray = [];
    const KWIDArray = [];
    const CRKDIDArray = [];
    const isExpandArray = [];
    let SL = 0;
    let typeCount = 0;
    if (nextValue.warehouseOutDetailDialog.warehouseOutDetailData) {
      nextValue.warehouseOutDetailDialog.warehouseOutDetailData.map((value, index) => {
        KWMCArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).KWMCArray);
        KWIDArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).KWIDArray);
        SPArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).resultData);
        orderInfoArray.push(this.analyseCRKDBData(value[0].Result.CRKDB).orderInfo);
        CRKDIDArray.push(this.analyseCRKDBData(value[0].Result.CRKDB).CRKDID);
        SL += this.analyseCRKMXBData(value[1].Result.CRKMXB).SL;
        typeCount += this.analyseCRKMXBData(value[1].Result.CRKMXB).typeCount;
        isExpandArray.push(false);
      })
    }
    this.setState({ DFHZL: typeCount, DFHSL: SL, typeCount, SPSL: SL, crkdidArray: CRKDIDArray, isCardExpandArray: isExpandArray, storageIdArray: KWIDArray, storageNameArray: KWMCArray, table_production_data: SPArray, orderInfo: orderInfoArray });
  }
  componentWillMount = () => {
    // let params = [{DDID:900000000306,CRKDID:571},{DDID:900000000038,CRKDID:186},{DDID:900000000306,CRKDID:569}];
    this.fetchDataFromServer(this.props.paramsObj);
  }
  static propTypes = {
    // 调用组件所需参数
    // 传入出库单ID和订单ID数组[{DDID:123,CRKDID:234},{DDID:123,CRKDID:234}]  传入对象格式
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
    isShowRecheckBtn: PropTypes.bool.isRequired,

    // 引入外部props
    getWarehouseOutDetailData: PropTypes.func,
    setBillingUploadInit: PropTypes.func

  }
  static defaultProps = {
    open: true,
    isShowRecheckBtn: false,
    CRKDIDArray: [],
    title: '出库单详情'
  }
  /**
   * 传入CRKMXB
   * */
  /**
   * CKRK:"0",DGSL:30,GUID:1552,JXSID:900000000207,KWID:900000000002,KWLJ:"默认仓库-默认库位",SL:30,SPBH:"60161500",SPMC:"脊柱内固定器 钉棒系统 棒",SPMS:"钛合金棒 5.5×500",SPPH:"1511106
   * */
  productionCell = (CRKMXB, index, father_Index) => (
      CRKMXB.map((value, subIndex) => (
        <div key={`WarehouseOutDetailDialog_${subIndex}`} style={{ marginBottom: '21px', overflowX: 'hidden' }} onClick={this.handClickTag(index, father_Index, subIndex)}>
          <Table style={{ width: '100%' }} wrapperStyle={{ overflowX: 'hidden' }} onCellClick={this.handClickTag(index, father_Index, subIndex)}>
            <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={false} style={{ overflowX: 'hidden' }}>
              <TableRow >
                <TableHeaderColumn colSpan='4' className='colTable tabBoderTop' style={{ height: '4rem', background: 'rgba(53,67,87,0.10)' }}>
                  <div style={{ lineHeight: '4rem', width: '100px', height: '4rem', color: '#6D93C1', paddingLeft: '12px', float: 'left' }}>{`物料编号:${value.SPBH}`}</div>
                  <div style={{ lineHeight: '4rem', width: '100px', height: '4rem', color: '#6D93C1', marginRight: '18px', float: 'right' }}>{`商品批号:${value.SPPH}`}</div>
                </TableHeaderColumn>
              </TableRow>
              <TableRow >
                <TableHeaderColumn colSpan='4' style={{ height: '6rem' }} className='colTable tabBoderTop' >
                  <div style={{ float: 'left' }}>
                    <strong className='tableColor'>{value.SPMC}</strong>
                    <p>{value.SPMS}</p>
                  </div>
                  <div style={{ float: 'right', display: this.props.isShowRecheckBtn ? value.isChecked ? 'block' : 'none' : 'none' }}><img src='/mark.png' /></div>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={false} style={{ overflowX: 'hidden' }}>
              <TableRow >
                <TableRowColumn className='colTable tableWidth tableHeight tabBoderTop ' rowSpan='2'>
                  <div>订购总数</div>
                  <div>{value.DGSL}</div>
                </TableRowColumn>
                <TableRowColumn className='colTable tableWidth colheight tabBoderTop'>
                  <div>已复核</div>
                  <div>{value.YFHSL}</div>
                </TableRowColumn>
                <TableRowColumn className='colTable tableWidth colheight tabBoderTop'>
                  <div>待复核</div>
                  <div>{value.DFHSL}</div>
                </TableRowColumn>
                <TableRowColumn className='colTable tableWidth tableHeight  tabBoderTop' rowSpan='2'>
                  <div>未拣货</div>
                  <div>{value.DGSL - value.YFHSL - value.DFHSL}</div>
                </TableRowColumn>
              </TableRow>
              <TableRow >
                <TableRowColumn colSpan='2' className='colTable  colheight tabBoderTop'>
                  <div>本次拣货</div>
                  <div>{value.SL}</div>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        ))
    )
  handleCloseDialog = () => {
    this.setState({ YFHZL: 0, DFHZL: 0, YFHSL: 0, DFHSL: 0 });
    this.props.confirmCallBack();
  }
  handleClickPassRecheck = () => {
    this.setState({ YFHZL: 0, DFHZL: 0, YFHSL: 0, DFHSL: 0 });
    this.props.clickPassCallBack();
  }
  render() {
    const actions = [<BillingUpload  id={_.has(this.props.paramsObj[0], 'CRKDID') ? this.props.paramsObj[0].CRKDID : ''} orderId={this.props.orderJson.GUID} DJLX='0' orderType={this.props.orderJson.DDLX} />, <FlatButton
      label='确认'
      primary
      onTouchTap={this.handleClose}
    />];
    const recheckAction = [
      <FlatButton
        label='取消'
        onTouchTap={this.handleCloseDialog}
        style={{ float: 'left', color: '#9B9B9B' }}
      />, <span style={{ fontSize: '1.2rem' }}>{`已复核${this.state.YFHZL}种`}</span>,
      <span style={{ fontSize: '1.2rem', marginRight: '1rem' }}>{`${this.state.YFHSL}件`}</span>,
      <span style={{ fontSize: '1.2rem' }}>{`未复核${this.state.DFHZL}种`}</span>,
      <span style={{ fontSize: '1.2rem', marginRight: '18rem' }}>{`${this.state.DFHSL}件`}</span>,
      <FlatButton
        label='复核退回'
        secondary
        onTouchTap={this.props.clickRefusedCallBack}
      />, <FlatButton
        label='复核通过'
        primary
        onTouchTap={this.handleClickPassRecheck}
        style={{ color: '#00BE9C' }}
      />];
    const CardStyle = {
      width: '100%',
      height: 'auto',
      margin: '0 auto',
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0 0 0, rgba(0, 0, 0, 0.117647) 0 0 0 !important'
    }
    const CardTextStyle = {
      width: '100%',
      height: 'auto'
    }
    const topStyle = {
      height: '2.5rem',
      lineHeight: '2.5rem',
      backgroundColor: '#00A0FF'
    };
    const titleStyle = {
      fontSize: '16px',
      lineHeight: '2.5rem',
      background: 'url(/kuwei.png) no-repeat 0 8px',
      paddingLeft: '25px'

    }
    return (
      <div>
        <Dialog
          actions={this.state.isShowRecheckBtn ? recheckAction : actions}
          modal
          open={this.state.open}
          contentStyle={{ width: '768px' }}
          title={<div><span>出库单详情</span><span>共{this.state.storageNameArray.length}张</span><span style={{ marginLeft: '1rem' }}>商品共{this.state.typeCount}种</span><span>{this.state.SPSL}件</span></div>}
        >
          <div>
            {
            this.state.storageNameArray.map((value, index) => (
              <Card onExpandChange={this.onExpandChange(index)} id='cardBorderStyle' key={`WarehouseOutDetailDialog_Card_${index}`} initiallyExpanded style={{ width: '100%', height: 'auto' }}>
                <CardHeader
                  actAsExpander
                  showExpandableButton
                  title={`出库单号: ${this.state.crkdidArray[index]}`}
                  titleStyle={{ color: '#00A0FF', fontFamily: 'SourceHanSansCN-Regular' }}
                />
                <CardText id='WareCardTex' expandable>
                  {
                        this.state.storageNameArray[index].map((father_value, father_Index) => (
                          <CardUI key={`WarehouseOutRecheckBottomContent${father_Index}`} cartText='' titleStyle={titleStyle} expanded CardStyle={CardStyle} CardTextStyle={CardTextStyle} topStyle={topStyle} dropMenuTitle={<span>{this.state.storageNameArray[index][father_Index]}</span>} >
                            <div className='bottomContent' >
                              <div key={`outWarehouseDetailProductionDIV${father_value}`} className='productList'>
                                <div>
                                  {this.productionCell(this.state.table_production_data[index][father_value], index, father_Index)}
                                </div>
                              </div>
                            </div>
                          </CardUI>
                          ))
                      }
                </CardText>
              </Card>
              ))
          }
          </div>
        </Dialog>
      </div>
    );
  }

}
