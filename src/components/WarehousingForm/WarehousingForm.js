

/* Created by qyf on 2016/11/11.*/
/* -这里是收货入库的组件*!*/
import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DepotSelectDialog from 'components/DepotSelectDialog';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import BarCodeTextField from 'components/BarCodeTextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DataGrid from 'components/DataGrid';
import CardUI from 'components/StandardUI/StandardCard'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import AtMessage from 'components/AtMessage'
import AtSelect from 'components/AtSelect'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import './WarehouseForm.scss';
import _ from 'lodash';
// noinspection JSDuplicatedDeclaration

const textStyle = {
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',

}
export default class WarehousingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      SFRK: 0,
      warehouseOpen: false,
      retValue: '',
      warehouseSlect: [],
      showCheckboxes: false,
      Index: '',
      AppBarOpen: false,
      clickObj: {},
      kindsOfGoods: 0,                 // 商品种类
      totalGoods: 0,
      wareBox: false, // 选中背景高亮
      resultArray: [], // 返回商品
      goods: [],
      warehouseValue: '', // 当前选中的仓库
      currentKWID: 0,
      currentKWName: '',
      currentKWLX: 0, // 商品种类
      currentGoods: 0, // 商品数量,
      WarehouseInChecking: '', // 当扫描数量大于等于未入库数量时提示
      checking: false,
      WarehouseInputChecking: '',
      inputChecking: false,
      openError: false,
      WarehouseKW: '', // 库位验证
      KWopenError: false,
      atSlectPerson: [],
      atMessage: '',
      options: {
        columnOptions: [
          {
            label: '物料编号',
            attr: 'WLBH',
            style: {
              textAlign: 'left',
              width: '15%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '15%'
            }
          }, {
            label: '商品批号',
            attr: 'SPPH',
            style: {
              textAlign: 'right',
              width: '10%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '10%'
            }
          }, {
            label: '商品规格',
            attr: 'SPMS',
            style: {
              textAlign: 'center',
              width: '25%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '25%'
            }
          },
          {
            label: '发货数量',
            attr: 'SL',
            style: {
              textAlign: 'right',
              width: '10%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '10%'
            }
          },
          {
            label: '未入库',
            attr: 'SYSL',
            style: {
              textAlign: 'right',
              width: '10%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '10%'
            }
          },
          {
            label: '历史入库',
            attr: 'YRKSL',

            style: {
              textAlign: 'right',
              width: '10%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '10%'
            }
          },
          {
            label: '正在入库',
            attr: 'DRKSL',
            style: {
              textAlign: 'right',
              width: '10%',
              paddingLeft: 16,
              paddingRight: 16
            },
            tableHeaderColumnStyle: {
              textAlign: 'center',
              width: '10%'
            }
          }
        ],
        dataSource: [],
        showIndex: true,
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          enableSelectAll: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        }
      }

    }
  }
  static defaultProps = {
    ckmc: '',
    logisticsDetail: {},
    subData: []
  };


  static propTypes = {
    ckmc: React.PropTypes.string,
    logisticsDetail: React.PropTypes.Object,
    subData: React.PropTypes.Array,
    handleChangeInputChecking: React.PropTypes.func,
    modCurrentKWID: React.PropTypes.func,
    addOrSubtract: React.PropTypes.func,
    dealCurrentWLD: React.PropTypes.func,
    fetchOrderLogisticsInfo: React.PropTypes.func,
    guid: React.PropTypes.string,
    ddlx: React.PropTypes.string,
    globalStore: React.PropTypes.Object,
    orderLogisticsInfo: React.PropTypes.Object,
    ckid: React.PropTypes.string,
    selectPerson: React.PropTypes.func,
    aTMessage: React.PropTypes.func


  };
  componentDidMount() {
    document.getElementById('barCodeTextField').focus();
  }
  /* 选择仓库关闭按钮*/
  handleButtonClickTaggle = (obj) => {
    this.setState({
      warehouseOpen: !this.state.warehouseOpen
    })
  }
  /* 选择仓库回调函数*/
  handleButtonClick1 = (retValue) => {
    const i_index = _.findIndex(this.state.warehouseSlect, value => value.kwid === retValue.id)
    if (i_index !== -1) {
      return (this.setState({
        WarehouseKW: '您已选择此库位请进行扫描', // 库位验证
        KWopenError: true
      }))
    } else {
      this.state.warehouseSlect.push({ kwName: retValue.name, kwid: retValue.id, isSelected: false });
      this.setState({
        warehouseSlect: this.state.warehouseSlect,
        Index: retValue.name,
        warehouseOpen: !this.state.warehouseOpen
      });
    }
    // 扫描区域
    // this.props.callback(retValue);
  };
  handleGetCount = () => {
    let count = 0;
    this.props.logisticsDetail.subData[this.props.logisticsDetail.currentKWID].map((value) => {
      count += value.CRKMXB.length
    });
    const index = _.findIndex(this.state.warehouseSlect, value => (value.kwid === this.props.logisticsDetail.currentKWID));
    if (index >= 0) {
      this.state.warehouseSlect[index].currentKWLX = count;
    }
    // this.setState({warehouseSlect: this.state.warehouseSlect});
    return count;
  }
  handleGetGoodsCount = () => {
    let count1 = 0;
    this.props.logisticsDetail.subData[this.props.logisticsDetail.currentKWID].map((value) => {
      value.CRKMXB.map((yrksl) => {
        count1 += yrksl.SL
      })
    });
    const index = _.findIndex(this.state.warehouseSlect, value => (value.kwid === this.props.logisticsDetail.currentKWID));
    if (index >= 0) {
      this.state.warehouseSlect[index].currentGoods = count1;
    }
    // this.setState({warehouseSlect: this.state.warehouseSlect});
    return count1;
  }

  /**
   * warehouseSlect isSelect false
   */
  handleWareHouseSelect = () => {
    this.state.warehouseSlect.map((value) => {
      value.isSelected = false;
    })
    this.setState({
      warehouseSlect: this.state.warehouseSlect,
    });
  }
  /* 侧边栏*/
  handleAppBar=(id, name, currentKWLX, currentGoods, value) => () => {
    this.handleWareHouseSelect();
    this.wareHouseActive = true
    value.isSelected = true;
    this.props.handleChangeInputChecking();
    if (!this.state.AppBarOpen || (this.state.AppBarOpen && this.state.currentKWID !== id)) {
      this.setState(
        {
          AppBarOpen: true,
          currentKWID: id,
          currentKWName: name,
          currentKWLX,
          currentGoods
        }
        );
      this.props.modCurrentKWID(id, name, currentKWLX, currentGoods);
    } else {
      this.setState(
        {
          AppBarOpen: false
        }
        );
    }

    if (this.state.AppBarOpen) {
      document.getElementById('barCodeTextField').focus();
    }
  };
  componentDidUpdate = (prevProps, prevStates) => {
    if (this.state.AppBarOpen && !prevStates.prevStates) {
      document.getElementById('barCodeTextField').focus();
    }
  };

  /* 删除单个入库商品*/
  goodsDeleteButton=(kwid, wldh, ddid, ddlx, spph, spbh, mount, data) => () => {
    this.props.addOrSubtract(kwid, wldh, ddid, ddlx, spph, spbh, 0 - mount, data);
    this.setState({
      currentKWLX: this.handleGetCount(),
      currentGoods: this.handleGetGoodsCount(),
      warehouseSlect: this.state.warehouseSlect
    })
  };
  /* 扫描后确认入库*/
  warehoseSubmit=() => {
    // this.props.updateReceivingGoods(this.props.logisticsDetail.subData);
  };
  /* 清空已选择商品*/
  handleClearGoods=() => {
    const btnARR = document.querySelectorAll('.clearAll');
    for (let i = 0; i < btnARR.length; i++) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      btnARR[i].dispatchEvent(e);
    }
    this.setState({
      currentKWLX: this.handleGetCount(),
      currentGoods: this.handleGetGoodsCount(),
      warehouseSlect: this.state.warehouseSlect
    })
  }
  /* 扫描商品清单表格*/
  getRows = (KWData) => {
    const rows = [];
    const bgimage = {
      background: 'url(/11.png) 1px -8px no-repeat',
      display: 'inline-block',
      paddingLeft: '35px',
      fontWeight: 800
    };

    KWData.map((inventory, index) => {
      const col = [];
      if (inventory.CRKMXB.length <= 0) {
        return;
      }
      for (const key in inventory) {
        if (key === 'CRKDB') {
          col.push(
            <TableRow selectable={this.state.showCheckboxes} key={`${(index + 1).toString()}1`}>
              <TableRowColumn columnNumber={index + 1} colSpan='5'>
                <span style={bgimage}>物流单号:{inventory[key].WLDH}</span>
              </TableRowColumn>
            </TableRow>
          )
        } else if (key === 'CRKMXB') {
          const mutRow = inventory[key].map((row, index2) => {
            if (row.SL > 0) {
              const details = [];
              details.push(<TableRowColumn key={3} style={textStyle}>{row.WLBH }</TableRowColumn>);
              details.push(<TableRowColumn key={3} style={textStyle}>{row.SPPH }</TableRowColumn>);
              details.push(<TableRowColumn key={1} style={textStyle}>{row.SPMC }</TableRowColumn>);
              details.push(<TableRowColumn key={3} style={textStyle}>{row.SL }</TableRowColumn>);
              details.push(<TableRowColumn key={4} style={textStyle}>
                <button
                  className='clearAll'
                  onClick={this.goodsDeleteButton(this.props.logisticsDetail.currentKWID,
                   inventory.CRKDB.WLDH, inventory.CRKDB.DDID,
                    inventory.CRKDB.DDLX, row.SPPHID, row.SPBH, row.SL, row)}
                >
                  <img
                    style={{ display: 'inline-block', width: '1.7rem', height: '1.7rem' }}
                    src='/receving/sc.png' alt=''
                  />
                </button>
              </TableRowColumn>);
              return <TableRow>{details}</TableRow>;
            }
          });
          col.push(mutRow);
        }
      }
      rows.push(col);
    });
    if (this.props.logisticsDetail.subFlag) {
      return rows;
    }
    /*
    * 调整当前物流单号最靠前
    * */
    if (this.props.logisticsDetail.currentWLDHindex !== -1) {
      rows.splice(this.props.logisticsDetail.currentWLDHindex, 1);
    } else {
      const crtRow = rows[rows.length - 1];
      rows.unshift(crtRow);
      rows.pop();
    }
    /*
    * 调整正在扫码的SPID最靠前
    * */
    if (this.props.logisticsDetail.currentSPIDindex !== -1) {
      const crtRow = rows[0][1];
      const crtCol = crtRow[this.props.logisticsDetail.currentSPIDindex];
      crtRow.splice(this.props.logisticsDetail.currentSPIDindex, 1);
      crtRow.unshift(crtCol);
    } else {
      const crtRow = rows[0][1];
      const crtCol = crtRow[crtRow.length - 1];
      crtRow.unshift(crtCol);
      crtRow.pop();
    }
    return rows;
  }

  handleOrderStateDropDownMenuChange=(event, index, value) => {
    this.props.dealCurrentWLD(value);
  };
  componentWillReceiveProps(nextProps) {
    /* const tableData = this.props.logisticsDetail.data[this.props.logisticsDetail.currentWLD]||[];*/
    this.setState({
      SFRK: nextProps.logisticsDetail.currentWLD,
      options: Object.assign({},
        this.state.options,
        { dataSource: nextProps.logisticsDetail.data[nextProps.logisticsDetail.currentWLD] || [] }),
    })
  }

  componentWillMount() {
    this.props.fetchOrderLogisticsInfo(this.props.guid);
  }
  selectPerson =(user) => {
    this.setState({
      atSlectPerson: user
    })
  }
  /* 留言*/
  aTMessage = (message) => {
    this.setState({
      atMessage: message
    })
  }
  /* s模拟扫描部分*/
  saomiaoDeal = (value) => {
    const index = _.findIndex(this.props.logisticsDetail.data[this.props.logisticsDetail.currentWLD],
      sp => (sp.SPID === value.SPID));
    if (index >= 0) {
      if (this.props.logisticsDetail.data[this.props.logisticsDetail.currentWLD][index].SYSL <= 0) {
        this.setState({
          openError: true,
          WarehouseInChecking: '此商品已扫描完毕请确认入库'
        })
      } else {
        this.props.addOrSubtract(this.state.currentKWID,
          this.props.logisticsDetail.currentWLD, this.props.guid,
          this.props.ddlx, value.SPBH, value.SPPHID, Number(value.SL), value);
      }
    }
  }
  appbuton=() => {
    this.setState(
      {
        AppBarOpen: !this.state.AppBarOpen,
      }

    );
  }
  getKWData = () => {
    if (this.props.logisticsDetail.currentKWID
      && this.props.logisticsDetail.subData[this.props.logisticsDetail.currentKWID]) {
      this.state.currentKWLX = this.handleGetCount();
      this.state.currentGoods = this.handleGetGoodsCount();
      return this.props.logisticsDetail.subData[this.props.logisticsDetail.currentKWID];
    }
    return [];
  }
  componentWillUnmount = () => {

  };
  /* 错误处理*/
  handleRequestClose = () => {
    this.setState({
      openError: false,
      WarehouseInChecking: '',
      WarehouseKW: '', // 库位验证
      KWopenError: false
    });
  };
  /* 进行扫描的商品*/
  render() {
    const KWData = this.getKWData();
    const colBoder = {
      color: '#6D93C1',
      textAlign: 'center !important'
    }
    const WarehouseActions = [
      <FlatButton
        key='warehousingForm_appbar_1'
        label={`当前${this.props.logisticsDetail.currentKWName}进行扫描`}
        style={{ color: 'rgb(250,250,250)' }} labelStyle={{ fontSize: '20px', color: ' #FFFFFF', paddingLeft: 0, paddingRight: 0 }}
        primary
      />
    ];

    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    const CardHeight = {
      height: '21.4rem'
    }
    return (
      <div>
        <div className='waretableWidth' >
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <CardUI
              expanded title='选择物流单号'
              avatar='/logistIcon/icon-07.png'
              label={`处理人：${this.props.globalStore.YHXM}`}
              CardStyle={CardHeight}
              topStyle={topStyle}
            >
              <div
                style={{ lineHeight: '10.5rem',
                  fontFamily: 'SourceHanSansCN-Normal',
                  display: 'flex',
                  margin: '0 auto',
                  width: '32rem',
                  fontSize: '14px',
                  color: 'rgba(0,0,0,0.38)' }}
              >
                <span className='ContentColorOne'>请选择物流单号：</span>
                <span className='WareContentMenu'>
                  <DropDownMenu id='OrderStateDropDownMenu' value={this.state.SFRK} onChange={this.handleOrderStateDropDownMenuChange}>
                    {
                     this.props.orderLogisticsInfo.data.map((data, index) => <MenuItem key={index} value={data.WLDH} primaryText={data.WLDH} />)
                   }
                  </DropDownMenu>
                </span>
              </div>
            </CardUI>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <CardUI
              expanded
              style={{ float: 'right' }}
              title='@谁和备注' avatar='/logistIcon/icon-07.png'
              label='选填' topStyle={topStyle}
              CardStyle={CardHeight}
            >
              <div className='cardSlectWrite'>
                <div className='inforFlex orderSlect'>
                  <span className='textFlexadd'>{this.state.text}选择@谁：</span>
                  <div style={{ display: 'inline-block' }}>
                    <AtSelect
                      callback={this.props.selectPerson}
                      className='AtTextFieldStyle'
                      isSingle
                      organizationId={Number(this.props.globalStore.organizationId)}
                    />
                  </div>
                </div>
                <div className='inforFlex'>
                  <span className='textFlexadd'>填写备注：</span>
                  <div style={{ display: 'inline-block' }}>
                    <AtMessage
                      callback={this.props.aTMessage}
                      className='AtTextFieldStyle' style={{ height: '4rem' }}
                    />
                  </div>
                </div>
              </div>
            </CardUI>
          </div>
          <div className='warehouseStyle'>
            <div className='warehouseBottonWarp'>
              <div className='warehouseXZKW' onClick={this.handleButtonClickTaggle}>
                <div className='warehouseSelect' >选择库位</div>
                <div className='wareAddicon'><span /></div>
                <DepotSelectDialog
                  title='选择库位'
                  ifCanSelectDepotOrLocation='2'
                  parentDepotName={this.props.ckmc}
                  parentDepotId={this.props.ckid || 0}
                  ifChildDepotId handleButtonClick={this.handleButtonClickTaggle}
                  open={this.state.warehouseOpen}
                  currentOrg={1}
                  callback={this.handleButtonClick1}
                />
              </div>
              <ErrorSnackBar
                message={this.state.WarehouseKW} open={this.state.KWopenError}
                onRequestClose={this.handleRequestClose}
              />
              {
                this.state.warehouseSlect.map((value, index) => (
                  <div>
                    <div className='warehouseTop' style={{ display: value.isSelected ? 'block' : 'none' }}>正在入库</div>
                    <RaisedButton
                      primary={false}
                      style={{ width: '12.7rem', height: '10.7rem', marginLeft: 20 }}
                      key={`warehouseSlect_${index}`}
                      onClick={this.handleAppBar(value.kwid, value.kwName, value.currentKWLX, value.currentGoods, value)}
                      label={value.kwName}
                      labelStyle={{
                        fontSize: '16px',
                        color: '#F4F4F4',
                        paddingLeft: 0,
                        paddingRight: 0,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 35
                      }}
                      buttonStyle={{ backgroundColor: value.isSelected ? '#00A0FF' : '#364356' }}
                    >
                      {
                          (() => {
                            if (this.props.logisticsDetail.currentWLD) {
                              return (<div
                                style={{ position: 'absolute',
                                  fontSize: '14px',
                                  color: '#F4F4F4',
                                  bottom: 0,
                                  padding: 0,
                                  textAlign: 'center',
                                  left: 0,
                                  right: 0,
                                  top: 85 }}
                              >
                                {`已扫描:${value.currentGoods || 0}件`}
                                {/* {`已放入${value.currentKWLX || 0}种商品,合计${value.currentGoods || 0}件`}*/}
                              </div>)
                            }
                          })()
                        }
                    </RaisedButton>
                  </div>
                  ))
              }
              <div className='col-lg-12 col-md-12 col-sm-12' style={{ margin: '20px auto 0 auto' }}>
                <DataGrid options={this.state.options} />
              </div>
              <Drawer
                openSecondary
                open={this.state.AppBarOpen}
                className='app-bar' width={450}
                containerStyle={{ overflow: 'hidden' }}
              >
                <AppBar
                  title={WarehouseActions}
                  onLeftIconButtonTouchTap={this.appbuton}
                  iconElementLeft={<IconButton><NavigationClose /></IconButton>} style={{ fontSize: '12px' }}
                />
                <div style={{ width: '450px', margin: '10px auto', padding: '20px 0px 30px 27px' }}>
                  <BarCodeTextField
                    logisticId={String(this.props.logisticsDetail.currentWLD)}
                    hintText={'扫描区域'}
                    inOut={false}
                    orderId={Number(this.props.guid)}
                    orderType={this.props.ddlx}
                    onChange={this.saomiaoDeal}
                  />
                  <ErrorSnackBar
                    message={this.state.WarehouseInChecking} open={this.state.openError}
                    onRequestClose={this.handleRequestClose}
                  />
                  <span
                    style={{ color: 'red',
                      fontSize: 12,
                      display: this.state.checking ? 'block' : 'none' }}
                  >
                    {this.state.WarehouseInChecking}
                  </span>
                </div>
                <div className='appBarTop'>
                  <span style={{ paddingLeft: '32px' }}>
                    共<span>
                      {this.state.currentKWLX || 0}
                    </span>种商品  合计<span>{this.state.currentGoods || 0}</span>件
                  </span>
                  <span>
                    <RaisedButton
                      label='一键清空'
                      style={{ margin: 10 }}
                      secondary
                      onTouchTap={this.handleClearGoods}
                    />
                  </span>
                </div>
                <div className='appBarTable'>
                  <Table height='27rem'>
                    <TableHeader
                      adjustForCheckbox={this.state.showCheckboxes}
                      displaySelectAll={this.state.showCheckboxes} style={{ background: '#EAECEE' }}
                    >
                      <TableRow displayBorder>
                        <TableHeaderColumn style={colBoder}>商品编号</TableHeaderColumn>
                        <TableHeaderColumn style={colBoder}>商品批号</TableHeaderColumn>
                        <TableHeaderColumn style={colBoder}>商品名称</TableHeaderColumn>
                        <TableHeaderColumn style={colBoder}>数量</TableHeaderColumn>
                        <TableHeaderColumn style={colBoder}>操作</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes} stripedRows showRowHover>
                      {

                        (() => {
                          if (KWData.length > 0) {
                            return this.getRows(KWData)
                          } else {
                            return (
                              <TableRow>
                                <TableRowColumn
                                  id='WareWldh'
                                  style={{ backgroundColor: 'rgb(204,241,246)',
                                    textAlign: 'center' }} colSpan='4'
                                >
                                  暂无数据.
                                </TableRowColumn>
                              </TableRow>
                            )
                          }
                        })()

                      }
                    </TableBody>
                  </Table>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

