

import React, { Component, PropTypes } from 'react';
import StandardDataGrid from 'components/StandardDataGrid';
import './LogisticsDeliveryPrint.scss';
import _ from 'lodash';
import moment from 'lib/moment'
import GoBackButton from 'components/GoBackButton';
import jsbarcode from 'jsbarcode';

let isLoadBarCode = false;
export default class LogisticsDeliveryPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_production_data: {},
      storageNameArray: [],
      crkdidArray: [],
      SPSL: 0,
      WLDB: null,
      DDB: {},
    }
  }
  static propTypes = {
    // 引用外部Props
    getWarehouseOutDetailData: PropTypes.func,
    location: PropTypes.object,
    getPersonalBasicInfo: PropTypes.func
  }
  /**
   * 解析出入库单表
   * */
  analyseCRKDBData = crkdb => ({ orderInfo: [crkdb.CKCK, crkdb.CJSJ, crkdb.YHXM], CRKDID: crkdb.GUID })
  print = () => {
    const body = window.document.body.innerHTML;
    const printContent = document.getElementById('printWrapper').innerHTML;
    window.document.body.innerHTML = printContent;
    const navIsShow = document.getElementById('navIsShow');
    const outWarehouseDetailTable = document.querySelectorAll('#outWarehouseDetailTable');
    for (let i = 0; i < outWarehouseDetailTable.length; i++) {
      outWarehouseDetailTable[i].classList.add('tableA4');
    }
    navIsShow.style.display = 'none';
    const A4FontStyle = document.querySelectorAll('.A4FontStyle');
    for (let i = 0; i < A4FontStyle.length; i++) {
      A4FontStyle[i].classList.add('A4fontSize');
    }
    const logistics_divOne = document.querySelectorAll('.logistics_divOne');
    for (let i = 0; i < logistics_divOne.length; i++) {
      logistics_divOne[i].classList.add('A4production_title1');
    }
    document.querySelector('.LogisticsDeliveryPrint_headner_title').classList.add('A4TitleFont');
    const logZCZBM = document.querySelectorAll('#logZCZBM');
    for (let i = 0; i < logZCZBM.length; i++) {
      logZCZBM[i].classList.add('A4ZCBH');
    }
    document.querySelector('.LogisticsDeliveryPrint_totalCount').classList.add('A4TitleFont');
    const production_title1 = document.querySelectorAll('.production_title1');
    for (let i = 0; i < production_title1.length; i++) {
      production_title1[i].classList.add('A4production_title1');
    }
    const A4info1 = document.querySelectorAll('.A4info1');
    for (let i = 0; i < A4info1.length; i++) {
      A4info1[i].classList.add('headerHeight');
    }
    const A4info2 = document.querySelectorAll('.A4info2');
    for (let i = 0; i < A4info2.length; i++) {
      A4info2[i].classList.add('headerHeight2');
    }
    const infoHeight = document.querySelectorAll('.LogisticsDeliveryPrint_headerInfo_info');
    for (let i = 0; i < infoHeight.length; i++) {
      infoHeight[i].classList.add('headerInfo_infoHeight');
    }
    document.getElementsByTagName('title')[0].innerHTML = `${this.state.DDB.JSJXSMC} > ${this.state.DDB.SHJXSMC}  订单编号：${this.state.DDB.GUID}`;
    window.print();
    window.document.body.innerHTML = body;
    navIsShow.style.display = 'block';
    document.getElementsByTagName('title')[0].innerHTML = '医捷云综合医疗供应链管理平台';
    location.reload(true);
  }
  /* 条形码生成*/

  logisticsBarcode=() => {
    const barcode = document.createElement('img');
    const logBarcode = document.getElementById('logBarcode');
    logBarcode.appendChild(barcode);
    const str = this.state.WLDB.WLDH;
    //  let str = '1254966333333333';
    const options = {
      format: 'CODE128',
      displayValue: false,
      fontSize: 18,
      height: 40,
      lineColor: '#4A4A4A'
    };
    isLoadBarCode = true;
    jsbarcode(barcode, str, options);
  };

  componentDidUpdate = (prevProps, prevStates) => {
    if (!isLoadBarCode) {
      this.logisticsBarcode();
    }
  }
  componentWillUnmount = () => {
    isLoadBarCode = false;
  }
  /**
   * 数据解析出入库明细表
   * */
  analyseCRKMXBData = (crkmxbArray) => {
    // 解析出入库明细表
    const tempSet = new Set();
    const CRKIDSet = new Set();
    const CKIDSet = new Set();
    // //提取相同的库位名称
    crkmxbArray.map((value) => {
      tempSet.add(value.KWLJ);
      CRKIDSet.add(value.KWID);
      CKIDSet.add(value.CKID);
    });
    // Set 2 Array
    const KWMCArray = Array.from(tempSet);
    const KWIDArray = Array.from(CRKIDSet);
    const CKIDArray = Array.from(CKIDSet);
    const CKMCArray = [];
    // 存放库位数组
    // const containerArray = [];
    const tempContainerArray = [];
    let SL = 0
    // KWMCArray.map(() => containerArray.push(new Array()));
    CKIDArray.map(() => tempContainerArray.push(new Array()));
    crkmxbArray.map((value) => {
      // KWMCArray.map((sub_value, sub_index) => {
      //   if (value.KWLJ === sub_value) {
      //     containerArray[sub_index].push(value);
      //     SL += value.SL;
      //   }
      // });
      CKIDArray.map((value_sub, index_sub) => {
        if (value.CKID === value_sub) {
          tempContainerArray[index_sub].push(value);
          CKMCArray[index_sub] = `${value.KWLJ.substring(0, value.KWLJ.indexOf(value.CKMC))}${value.CKMC}`;
          SL += value.SL;
        }
      })
    });
    // 解析后的数据
    const resultData = {};
    const tempResult = {};
    // KWMCArray.map((value, index) => {
    //   resultData[value] = containerArray[index];
    // });
    CKMCArray.map((value, index) => {
      tempResult[value] = tempContainerArray[index];
    });
    // 要库位 取 KWMCArray, resultData, KWIDArray
    // 要仓库 取  tempResult, CKMCArray
    return { KWMCArray, resultData, KWIDArray, SL, tempResult, CKMCArray };
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
   * 判断空值
   */
  isEmptyValue = (value, key) => {
    if (_.has(value, key)) {
      if (value[key] !== null) {
        return value[key];
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  }
  componentWillMount() {
    this.props.getWarehouseOutDetailData(this.props.location.state.param);
  }
  componentWillReceiveProps(nextValue) {
    if (nextValue.warehouseOutDetailDialog.warehouseOutDetailData === {}) {
      this.props.getWarehouseOutDetailData(nextValue.location.state.param);
    }
    const SPArray = [];
    const KWMCArray = [];
    const CRKDIDArray = [];
    let SL = 0;
    nextValue.warehouseOutDetailDialog.warehouseOutDetailData.map((value, index) => {
      SPArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).tempResult);
      KWMCArray.push(this.analyseCRKMXBData(value[1].Result.CRKMXB).CKMCArray);
      CRKDIDArray.push(this.analyseCRKDBData(value[0].Result.CRKDB).CRKDID);
      SL += this.analyseCRKMXBData(value[1].Result.CRKMXB).SL;
    });
    this.setState({
      DDB: this.props.location.state.DDB,
      WLDB: this.props.location.state.WLDB,
      SPSL: SL,
      crkdidArray: CRKDIDArray,
      table_production_data: SPArray,
      storageNameArray: KWMCArray });
  }
  static contextTypes = {};

  render() {
    const printButton = {
      width: '10rem',
      cursor: 'pointer',
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '18px',
      color: '#F5A959',
      letterSpacing: '0.64px'
    }
    return (
      <StandardDataGrid iconPosition='-150px 0px' message='' childrenStyle={{ padding: '0' }} title='物流发货' filterTitle='按发货状态筛选：'>
        <div id='printWrapper' style={{ display: 'flex', flexDirection: 'column', padding: '0px' }}>
          <div className='LogisticsDeliveryPrint_headner'>
            <div className='LogisticsDeliveryPrint_headner_title'>物流发货单</div>
            <nav style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }} id='navIsShow'>
              <GoBackButton />
              <div style={printButton} onClick={this.print}><i className='printBottonIcon' />打印</div>
            </nav>
          </div>
          <div className='LogisticsDeliveryPrint_headerInfo myDiv'>
            <div>
              <div className='col-lg-6 col-md-6 col-xs-6 '>
                <div className='LogPrint_info A4info1'>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>客户名称:</div>
                    <div className='section_content A4FontStyle'>{this.state.DDB.CJJXSMC}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>订货时间:</div>
                    <div className='section_content A4FontStyle'>
                      {moment(this.isEmptyValue(this.state.DDB, 'CJSJ')).formatStandard('Y', 'M', 'D')}
                    </div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>订单类型:</div>
                    <div className='section_content A4FontStyle'>{this.orderTypeJudge(this.isEmptyValue(this.state.DDB, 'DDLX'))}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>订单编号:</div>
                    <div className='section_content A4FontStyle'>{this.state.DDB.GUID}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>发货人:</div>
                    <div className='section_content A4FontStyle' style={{ paddingLeft: 35 }}>
                      {this.isEmptyValue(this.props.getPersonalBasicInfo.userdata, 'name')}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-xs-6 '>
                <div className='LogPrint_info A4info1'>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>物流公司:</div>
                    <div className='section_content A4FontStyle'>{this.isEmptyValue(this.state.WLDB, 'GSMC')}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>物流单号:</div>
                    <div className='section_content A4FontStyle' >{this.isEmptyValue(this.state.WLDB, 'WLDH')}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle' style={{ opacity: '0' }}>物流单号:</div>
                    <div className='section_content A4FontStyle' id='logBarcode' style={{ lineHeight: '0' }} />
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='section_title A4FontStyle'>发货日期:</div>
                    <div className='section_content A4FontStyle'>
                      {moment(this.isEmptyValue(this.state.WLDB, 'SFSJ')).formatStandard('Y', 'M', 'D')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='col-lg-6 col-md-6 col-xs-6 'style={{ borderTop: '1px solid #D8D8D8' }}>
                <div className='LogPrint_info A4info2'>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='section_title A4FontStyle'>收货人:</div>
                    <div className='section_content A4FontStyle' style={{ paddingLeft: 35 }}>{this.isEmptyValue(this.state.DDB, 'SHLXR')}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='section_title A4FontStyle'>收货仓库:</div>
                    <div className='section_content A4FontStyle'>
                      {Number(this.state.DDB.DDLX) !== 7 && Number(this.state.DDB.DDLX) !== 8 ?
                        this.isEmptyValue(this.state.DDB, 'SHDZ') !== '-' ?
                        this.state.DDB.SHDZ.split('\n')[1] : '' : '-'}
                    </div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>收货地址:</div>
                    <div className='section_content A4FontStyle'>
                      {Number(this.state.DDB.DDLX) !== 7 && Number(this.state.DDB.DDLX) !== 8 ?
                        this.isEmptyValue(this.state.DDB, 'SHDZ') !== '-' ?
                        this.state.DDB.SHDZ.split('\n')[0] : '' : '-'}
                    </div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='section_title A4FontStyle'>送货日期:</div>
                    <div className='section_content A4FontStyle'>
                      {moment(this.isEmptyValue(this.state.WLDB, 'SFSJ')).formatStandard('Y', 'M', 'D')}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-xs-6 ' style={{ borderTop: '1px solid #D8D8D8' }}>
                <div className='LogPrint_info A4info2' style={{ display: this.isEmptyValue(this.state.WLDB, 'WLLX') === '0' ? 'block' : 'none' }}>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='inforFlex' style={{ width: '15rem' }} >
                      <div className='section_title A4FontStyle'>保价金额:</div>
                      <div className='section_content A4FontStyle'>{this.isEmptyValue(this.state.WLDB, 'BJJE')}</div>
                    </div>
                    <div className='inforFlex' >
                      <div className='section_title A4FontStyle' style={{ float: 'right' }}>共计金额:</div>
                      <div className='section_content A4FontStyle'>{this.isEmptyValue(this.state.WLDB, 'WLZFY')}</div>
                    </div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='section_title A4FontStyle'>加急费用:</div>
                    <div className='section_content A4FontStyle'>{this.isEmptyValue(this.state.WLDB, 'JJFY')}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section'>
                    <div className='section_title A4FontStyle'>保险金额:</div>
                    <div className='section_content A4FontStyle'>{this.isEmptyValue(this.state.WLDB, 'BFJE')}</div>
                  </div>
                  <div className='LogisticsDeliveryPrint_headerInfo_info_section' >
                    <div className='section_title A4FontStyle'>物流费用:</div>
                    <div className='section_content A4FontStyle'>{this.isEmptyValue(this.state.WLDB, 'WLFY')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='clearfix' />
          <div className='LogisticsDeliveryPrint_contentInfo'>
            <div className='LogisticsDeliveryPrint_totalCount'>{`商品数共计：${this.state.SPSL}件`}</div>
            {
              this.state.storageNameArray.map((value, index) => (
                <div key={`LogisticsDetailDialog_production_title${index}`} style={{ width: '100%' }}>
                  <thead key={`LogisticsDetailDialog_production_title1${index}`} className='production_title1'>
                    {`出库单号:${this.state.crkdidArray[index]}`}
                  </thead>
                  {

                    <table id='outWarehouseDetailTable' className='BodyFont' >
                      {
                        this.state.storageNameArray[index].map((father_value, father_Index) => (
                          <thead
                            style={{ color: '#979797' }}
                          >
                            <thead />
                            <tr style={{pageBreakAfter: 'always'}} className="pageBreakPage">
                              <th colSpan='9' style={{height: '30px'}} id={father_Index===0 ? 'logistics_tableTow' : 'logistics_tableOne'}>
                                {this.state.storageNameArray[index][father_Index].replace(/-/g, '>')}
                              </th>
                            </tr>
                            <tr>
                              <th className='tableWidth'>物料编号</th>
                              <th className='tableWidth'>批号</th>
                              <th className='tableWidth'>商品描述</th>
                              <th className='tableWidth'>注册证编号</th>
                              <th className='tableWidth'>生产日期</th>
                              <th className='tableWidth'>有效期</th>
                              <th className='tableWidth'>出库数量</th>
                              <th className='tableWidth'>备注</th>
                            </tr>
                            {
                              this.state.table_production_data[index][father_value].map((value, index) =>
                                <tr key={`LogisticsDetailDialog_table_body_data_${index}`}>
                                  <td className='tableWidth'>{value.SPBH}</td>
                                  <td className='tableWidth'>{value.SPPH}</td>
                                  <td className='tableWidth'>{value.SPMS}</td>
                                  <td className='tableWidth' id="logZCZBM">{value.ZCZBM}</td>
                                  <td className='tableWidth'>
                                    {moment(value.SCRQ).formatStandard('Y', 'M', 'D') === '-' ? '' : moment(value.SCRQ).formatStandard('Y', 'M', 'D')}
                                  </td>
                                  <td className='tableWidth'>
                                    {moment(value.YXQZ).formatStandard('Y', 'M', 'D') === '-' ? '' : moment(value.YXQZ).formatStandard('Y', 'M', 'D') }
                                  </td>
                                  <td className='tableWidth'>{value.SL}</td>
                                  <td className='tableWidth'>{value.BZ || ''}</td>
                                </tr>)
                            }
                          </thead>
                        ))
                      }
                    </table>
                  }
                </div>))
            }
          </div>
        </div>
      </StandardDataGrid>
    )
  }

}
