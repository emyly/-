/**
 * Created by liuyali on 2016/12/2.
 */


import './inventorySee.scss'

import React, { Component } from 'react';
import moment from 'moment';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { Card, CardText } from 'material-ui/Card';
/* 公共组件*/
import StandardDataGrid from 'components/StandardDataGrid';
import PageGrid from '../../../../components/PageGrid';
import GoodsSearchIndex from 'components/GoodsSearch'
import BdMap from 'components/BdMap';

export default class InventorySee extends Component {

  state = {
    params: { SL: 1, WQ: { WDKC: 1 } },
    open: false,
    KCXX: {},
    currentIndex: null,
    marker: [],
    data: {},
    showList: true

  }
  static propTypes = {
    inventorySee: React.PropTypes.func,
    inventorySeeData: React.PropTypes.object,
  }
  componentWillMount() {
    /* 此处获取上一步传入的仓库id*/
    this.props.inventorySee(1, this.state.params);
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  // 点击单个订单查看订单详情
  getGoodDetail = (row, col) => {
    const markerArr = [];
    const temptData = this.props.inventorySeeData.data[row];
    temptData.KCXX.map((KC, index) => {
      if (KC.JD !== null && KC.WD !== null) {
        markerArr.push({ point: { lat: KC.WD, lng: KC.JD } });
      }
    });
    this.setState({
      marker: markerArr,
      data: temptData,
      showList: false
    });
    // this.context.router.push({ pathname: '/inventorySee/getInventoryGoodDetail', state: { data: this.props.inventorySeeData.data[row] } });
  }
  componentDidUpdate() {
    if (this.state.showList) {
      document.querySelector('#listContent').style.display = 'block';
      document.querySelector('#detailContent').style.display = 'none';
    } else {
      document.querySelector('#listContent').style.display = 'none';
      document.querySelector('#detailContent').style.display = 'block';
    }
  }
  getTableData =() => ({
    columnOptions: [
      {
        label: '品牌',
        attr: 'SPPPMC',
        render: row => (<div>
          {row.SPPPMC || '-'}
        </div>),
        style: { textAlign: 'center' }
      },
      {
        label: '商品编号',
        attr: 'SPBH',
        style: { textAlign: 'center', }
      }, {
        label: '商品名称',
        attr: 'SPMC',
        style: { textAlign: 'center' }
      },
      {
        label: '批号',
        attr: 'SPPH',
        style: { textAlign: 'center' }
      }, {
        label: '商品描述',
        attr: 'SPMS',
        style: { textAlign: 'center' }
      }, {
        label: '效期',
        attr: 'YXQZ',
        formater: (time) => {
          const date = moment(time).format('YYYY/MM/DD') === 'Invalid date' ? '--' : moment(time).format('YYYY/MM/DD');
          return date;
        },
        style: { textAlign: 'center' }
      }, {
        label: '生产日期',
        attr: 'SCRQ',
        formater: (time) => {
          const date = moment(time).format('YYYY/MM/DD') === 'Invalid date' ? '--' : moment(time).format('YYYY/MM/DD');
          return date;
        },
        style: { textAlign: 'center' }
      }, {
        label: '数量',
        attr: 'SL',
        style: { textAlign: 'center' }
      }
    ],
    dataSource: this.props.inventorySeeData.data || [],
    tableAttrs: {
      onCellClick: this.getGoodDetail
    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false,
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    TableHeaderStyle: {
      backgroundColor: 'transparent'
    },
    showIndex: true,
    pagination: {
      currentPage: this.props.inventorySeeData.currentPage || 1,
      totalCount: this.props.inventorySeeData.total || 0,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        this.props.inventorySee(page, this.state.params);
      }
    }
  })
  getFilterResult = (params) => {
    this.setState({
      params
    })
    this.props.inventorySee(1, params);
  }
  /* 产品详情部分*/
  getTime = (time) => {
    const date = moment(time).format('YYYY/MM/DD') === 'Invalid date' ? '--' : moment(time).format('YYYY/MM/DD');
    return date;
  }
  getKWXX = () => {
    const style = {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: 16,
      color: '#333',
    }
    if (this.state.KCXX.KWLJ) {
      const kwxx = this.state.KCXX.KWLJ;
      const kwArr = kwxx.split('-');
      const kws = kwArr.map((kw, index) => {
        if (index === kwArr.length - 1) {
          return (<li key={`li${index}${1}`} className='KWLI'>
            <img className='LiImg' src='/KW-icon.png' alt='' />
            <span style={style}>{kw}</span>
          </li>)
        } else if (kw.indexOf('库位') === -1) {
          return (<li key={`li${index}${1}`} className='KWLI'>
            <img className='LiImg' src='/inventory-icon.png' alt='' />
            <div className='verticalLine' />
            <span style={style}>{kw}</span>
          </li>)
        }
        return (<li key={`li${index}${1}`} className='KWLI'>
          <img className='LiImg' src='/KW-icon bule.png' alt='' />
          <div className='verticalLine' />
          <span style={style}>{kw}</span>
        </li>)
      });
      return (<ul>
        {
          kws
        }
      </ul>)
    }
  }
  closeDraw = () => {
    this.setState({
      open: false,
      currentIndex: null,
    })
  }
  toggleDraw = (index) => {
    if (index === this.state.currentIndex) {
      this.setState({
        open: false,
        currentIndex: null,
      })
    } else {
      const newMarkerArr = this.state.marker;

      newMarkerArr.map((mk, idx) => {
        mk.selected = false;
        if (mk.point.lat === this.state.data.KCXX[index].WD && mk.point.lng === this.state.data.KCXX[index].JD) {
          mk.selected = true;
        }
      });
      this.setState({
        KCXX: this.state.data.KCXX[index],
        open: true,
        currentIndex: index,
        marker: newMarkerArr,
      })
    }
  }
  switchListContent = () => {
    this.setState({
      showList: true
    });
  }
  // switchShow = (showList)=> {
  //
  // }
  render() {
    const greycolor = { color: '#808080' };
    const BJ = { fontFamily: 'SourceHanSansCN-Regular', margin: 0, padding: '8px 0' };
    const inventoryTablebodyStyle = {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '16px',
      color: 'black',
      whiteSpace: 'normal'
    }
    const tiltestyle = {
      fontFamily: 'SourceHanSansCN-Regular',
      color: '333333',
      fontSize: '20px'
    }
    return (
      <div style={{ height: '100%' }}>
        <StandardDataGrid
          iconPosition='-30px -120px' title='库存查看' message='...
' filterTitle=''
        >
          <div id='listContent'>
            <GoodsSearchIndex callback={this.getFilterResult} filters={['lobBrandThreeType', 'property', 'pack', 'expireDate']} />
            <PageGrid options={this.getTableData()} />
          </div>
          <div className='inventorySee' id='detailContent' style={{ position: 'relative', display: 'none' }}>
            {
              this.state.data.KCXX ? (<div>
                <img className='goback' src='Group 7.png' onClick={this.switchListContent} alt='' />
                <div style={{ margin: 'auto', width: '80%' }}>
                  <div style={{ padding: 16 }}>
                    <div className='inventorySee-Card-List'>
                      <ul className='ListItem'>
                        <li style={{ fontSize: '20px', fontFamily: 'SourceHanSansCN-Medium', paddingLeft: '10px' }}>商品信息</li>
                      </ul>
                      <div style={{ padding: '0 16px' }}>
                        <p style={{ ...greycolor, ...BJ, padding: '16px 0', fontSize: '16px' }}>
                          <span>物料编号：{this.state.data.SPBH}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span>批号：{this.state.data.SPPH}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span>有效期：{this.getTime(this.state.data.YXQZ)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span>有货库位：{this.state.data.KCXX.length}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </p>
                        <div className='horizon' />
                        <p style={tiltestyle}>{this.state.data.SPMC}</p>
                        <p style={{ ...greycolor, ...BJ, fontSize: '16px' }}>{this.state.data.SPMS}</p>
                        <p style={{ ...BJ, fontSize: '16px' }}>库存总量（件）
                          <span style={{ color: '#00A0FF', fontFamily: 'Roboto-Regular', fontSize: 28 }}>
                            {this.state.data.SL}
                          </span></p>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div className='inventorySee-Card-List'>
                      <ul className='ListItem'>
                        <li style={{ fontSize: '20px', fontFamily: 'SourceHanSansCN-Medium', paddingLeft: '10px' }}>有货仓库地理信息</li>
                      </ul>
                      <div style={{ padding: '0 16px' }}>
                        <BdMap
                          id='myBdMap' ref='myBdMap' city='杭州市' scale={14} style={{ height: 600 }}
                          mouseScale={false}
                          marker={this.state.marker}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <Table onCellClick={this.toggleDraw} className='inventoryTable'>
                      <TableHeader className='inventoryTableheader' adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow style={{ background: '#364356' }}>
                          <TableHeaderColumn style={{ width: 100 }}>在库量</TableHeaderColumn>
                          <TableHeaderColumn>仓储信息</TableHeaderColumn>
                          <TableHeaderColumn>详细地址</TableHeaderColumn>
                          <TableHeaderColumn style={{ width: 200 }}>联系方式</TableHeaderColumn>
                          <TableHeaderColumn style={{ width: 200 }}>联系人</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody className='inventoryTablebody' displayRowCheckbox={false}>
                        {
                          this.state.data.KCXX.map((KC, index) => <TableRow key={index + 1}>
                            <TableHeaderColumn key={`${index}0`} style={{ fontSize: 14, width: 100, color: '#00bcdd' }}>{KC.SL}</TableHeaderColumn>
                            <TableHeaderColumn key={`${index}1`} style={inventoryTablebodyStyle}>{KC.KWLJ}</TableHeaderColumn>
                            <TableHeaderColumn key={`${index}2`} style={inventoryTablebodyStyle}>{KC.SZDZ}</TableHeaderColumn>
                            <TableHeaderColumn key={`${index}3`} style={{ ...inventoryTablebodyStyle, width: 200 }}>{KC.LXR}</TableHeaderColumn>
                            <TableHeaderColumn key={`${index}4`} style={{ ...inventoryTablebodyStyle, width: 200 }}>{KC.LXDH}</TableHeaderColumn>
                          </TableRow>)
                        }
                      </TableBody>
                    </Table>
                  </div>
                  <Drawer width={400} openSecondary open={this.state.open} >
                    <div style={{ marginBottom: 30 }}>
                      <p style={{ margin: 0, fontSize: 16 }}><IconButton onTouchTap={this.closeDraw}><NavigationClose /></IconButton></p>
                      <p
                        style={{ padding: '0 12px', margin: 0, fontSize: 20, fontFamily: 'SourceHanSansCN-Medium', color: '#2C4669' }}
                      >商品库存及地理信息详情</p>
                    </div>
                    <div>
                      <div className='content'>
                        <div>
                          <div style={{ background: '#00A0FF' }} className='headLogo' />
                          <h3 className='headTitle'>商品信息</h3>
                        </div>
                        <div style={{ padding: '0 10px' }}>
                          <p style={{ ...greycolor, ...BJ, fontSize: 16 }}>
                            <span>物料编号：{this.state.data.SPBH}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>批号：{this.state.data.SPPH}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                          <p style={{ fontSize: 20, fontFamily: 'SourceHanSansCN-Regular', color: '#333', ...BJ }}>{this.state.data.SPMC}</p>
                          <p style={{ ...greycolor, ...BJ, fontSize: 16 }}>{this.state.data.SPMS}</p>
                        </div>
                      </div>
                      <div className='content'>
                        <div>
                          <div style={{ background: '#11CD6E' }} className='headLogo' />
                          <h3 className='headTitle'>在库量</h3>
                        </div>
                        <div style={{ padding: '0 10px' }}>
                          <p style={{ ...BJ }}>
                            <span style={{ color: 'rgb(0, 188, 221)', fontSize: 25 }}>{this.state.KCXX.SL || ''}</span>
                            <span style={{ color: 'black', fontSize: 25 }}>件</span>
                          </p>
                        </div>
                      </div>
                      <div className='content'>
                        <div>
                          <div style={{ background: '#E64C4C' }} className='headLogo' />
                          <h3 className='headTitle'>详细地址、联系方式</h3>
                        </div>
                        <div style={{ padding: '0 10px' }}>
                          <p style={{ color: '#53504F', ...BJ, fontSize: 16 }}>{this.state.KCXX.SZDZ || ''}</p>
                          <p style={{ color: '#53504F', ...BJ, fontSize: 16 }}>{this.state.KCXX.LXR || ''}</p>
                          <p style={{ color: '#53504F', ...BJ, fontSize: 16 }}>{this.state.KCXX.LXDH || ''}</p>
                        </div>
                      </div>
                      <div className='content'>
                        <div>
                          <div style={{ background: '#FC8359' }} className='headLogo' />
                          <h3 className='headTitle'>仓储路径信息</h3>
                        </div>
                        <div style={{ padding: '10px 10px' }}>
                          <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 1px' }}>
                            <CardText>
                              {
                                this.getKWXX()
                              }
                            </CardText>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
              </div>) : ''
            }
          </div>
        </StandardDataGrid>
      </div>
    );
  }
}
