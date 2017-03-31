

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardForm from 'components/StandardForm';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import HistoryWarehousingDataGrid from 'components/HistoryWarehousingDataGrid';
import OrderDetailForm from 'components/OrderDetailForm'
import DataGrid from 'components/DataGrid';
import './ReceivingWarehousing.scss';
import GoBackButton from 'components/GoBackButton';

export default class RecevingWareDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTitle: '122122',
      RecevingOpen: false,
      warehouseInOpen: false,
      Index: 0,
      dialogOpen: false,
      WarehouseInputCheckErorr: '',
      openCheckErorr: false,
      WareHousedisabled: false,
      options: {
        columnOptions: [
          {
            label: '物料编号',
            attr: 'SPBH',
            style: {
              width: '10%'
            },
            tableHeaderColumnStyle: {
              width: '10%'
            }
          },
          {
            label: '商品描述',
            attr: 'SPMS',
            style: {
              width: '20%'
            },
            tableHeaderColumnStyle: {
              width: '20%'
            }
          },
          {
            label: '商品批号',
            attr: 'SPMS',
            style: {
              width: '20%'
            },
            tableHeaderColumnStyle: {
              width: '20%'
            }
          },
          {
            label: '发货数量',
            attr: 'SL',
            style: {
              width: '10%'
            },
            tableHeaderColumnStyle: {
              width: '10%'
            }
          },
          {
            label: '已入库数量',
            attr: 'YRKSL',
            style: {
              width: '15%'
            },
            tableHeaderColumnStyle: {
              width: '15%'
            }
          },
          {
            label: '未入库数量',
            attr: 'WRKSL',
            style: {
              width: '15%'
            },
            tableHeaderColumnStyle: {
              width: '15%'
            }
          }
        ],
        dataSource: [],
        showIndex: true,
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          enableSelectAll: false,
          className: 'tableHeader'
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        tableAttrs: {
          className: 'tableContent',

        }
      }
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  handleCancle = () => {
    this.context.router.push('/ReceivingWarehousing');
  };
  static propTypes = {
    // id: React.PropTypes.string,
    // DDLX: React.PropTypes.string,
    // SPWU: React.PropTypes.string,
    getRecevingGoodsData: React.PropTypes.Fun,
    orderBasicInfoForm: React.PropTypes.Object,
    globalStore: React.PropTypes.Object,
    params: React.PropTypes.Object,
    location: React.PropTypes.Object,
    historyWarehousingDataGrid: React.PropTypes.Object,


  };
  static defaultProps = {

  }
  componentWillUnmount = () => {

    // this.setState({open : this.props.open});
  };

  componentWillMount() {
    this.props.getRecevingGoodsData(this.props.params.id, '1', this.props.location.state.e.DDLX);
  }
  /* 节流函数*/
  throttle = (func, wait, mustRun, ...rest) => {
    let timeout;
    let startTime = new Date();
    return function () {
      const context = this;
      const curTime = new Date();
      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
        func.apply(context, rest)();
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(func(...rest), wait);
      }
    };
  };

  /* 表头固定函数*/
  tableHeaderFixed = (fixDom, fixGateDis, fixTop) => {
    return function () {
      if (document.querySelector('#scrollWrapper').scrollTop >= fixGateDis) {
        fixDom.style.position = 'fixed';
        fixDom.style.top = `${fixTop}px`;
      } else {
        fixDom.style.position = 'relative';
        fixDom.style.top = 'auto';
      }
    }
  };

  componentDidUpdate() {
    const athis = this;
    const fixDom = document.querySelector('.tableHeader').parentNode.parentNode;
    const fixGateDis = fixDom.offsetParent.offsetTop + fixDom.offsetTop;
    const fixTop = document.querySelector('#scrollWrapper').offsetTop;
    const parent = fixDom.offsetParent;
    const PL = Number(document.defaultView.getComputedStyle(parent, null).paddingLeft
      .slice(0, document.defaultView.getComputedStyle(parent, null).paddingLeft.length - 2)
    );
    const PR = Number(document.defaultView.getComputedStyle(parent, null).paddingLeft
      .slice(0, document.defaultView.getComputedStyle(parent, null).paddingLeft.length - 2)
    );
    const fixWidth = parent.offsetWidth - PL - PR;
    fixDom.style.width = `${fixWidth}px`;

    document.querySelector('#scrollWrapper')
    .addEventListener('scroll', this.throttle(athis.tableHeaderFixed, 500, 100, fixDom, fixGateDis, fixTop), false);
  }
  /* 点击入库进入*/
  handleClick = () => {
  };
  closeWarehouseInDetailDialog = () => {
    this.setState({ warehouseInOpen: false });
  }
  handleRequestClose = () => {
    this.setState({
      WarehouseInputCheckErorr: '',
      openCheckErorr: false
    });
  };
  handleButtonClick1 = () => {
    this.context.router.push({ pathname: '/receivingWarehousing/RecevingStorage',
      state: { ckmc: this.props.orderBasicInfoForm.orderData.RKCKMC,
        ckid: this.props.orderBasicInfoForm.orderData.RKCKID,
        ddlx: this.props.location.state.e.DDLX,
        ddgu: this.props.location.state.e.GUID,
        guid: this.props.params.id,
        wlbh: this.props.location.state.e.SPWU,
        dataSource: this.state.options.dataSource } });
    this.setState({
      WareHousedisabled: false
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        options: Object.assign({}, this.state.options, { dataSource: nextProps.recevingWareDetail.GathringData })
      });
    let total = 0;
    this.state.options.dataSource.map((spW) => {
      total += spW.WRKSL;
    })
    if (Number(this.props.location.state.SFRK) === 0 && total <= 0) {
      this.setState({
        WareHousedisabled: true,
        openCheckErorr: true,
        WarehouseInputCheckErorr: '当前没有可入库的商品'
      })
    } else {
      this.setState({
        WareHousedisabled: false,
        openCheckErorr: false,
        WarehouseInputCheckErorr: ''
      })
    }
  }
  handleButtonClick2 = (returnValue) => {
    this.setState({
      dialogOpen: true
    });
  };
  handleCallback = (returnValue) => {
    this.setState({ Index: returnValue.id });
  };
  warehouseInHandleOpen1 = () => {
    this.setState({
      warehouseInOpen: true,
      warehouseOutOpen: false,
      logisticsCheckOpen: false,
      logisticsEditOpen: false
    });
  };
  render() {
    const actions = [
      // <FlatButton label="返回" onTouchTap={this.handleCancle}/>,
      <GoBackButton key='recevingWare_1' />,
      <RaisedButton
        key='recevingWare_2' label='入库' style={{ display: this.props.location.state.SFRK === 0 ? 'block' : 'none' }} primary
        onTouchTap={this.handleButtonClick1} disabled={this.state.WareHousedisabled}
        buttonStyle={{ background: this.state.WareHousedisabled ? 'rgb(229, 229, 229)' : '#FDA95B',
          boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)',
          borderRadius: '2px' }}
      />
    ];
    // const tableForm = {
    //   textAlign: 'center',
    //   fontSize:'16px',
    //   color:'#5B83B4',
    //   letterSpacing:'0.26px',
    //   fontFamily:'SourceHanSansCN-Bold'
    // };
    const contentFlex = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
    };
    return (
      <div style={{ height: '100%' }}>
        <StandardForm iconPosition={'-90px -60px'} title='订单详情' message={`您当前正在处理订单号为<${this.props.params.id}>的订单`} showCardContent={false}>
          <StandardFormCardList activeStep={0}>
            <StandardFormCard title='订单信息查看' stepName='订单信息查看' actions={actions} completed showContent={false} />
            <StandardFormCard title='确认入库' message='请查看或选择' stepName='收货入库' avatar='fg-128.jpg' showContent={false} />
          </StandardFormCardList>
        </StandardForm>
        <StandardFormCard
          title='入库单详情' message='请查看或选择' actions={actions} showStep={false} expanded style={{ position: 'relative' }} id='scrollWrapper'
        >
          <div style={contentFlex} >
            <OrderDetailForm
              orderId={Number(this.props.params.id)} orgId={Number(this.props.globalStore.organizationId)} sort={['OrderBasicInfoForm']}
            >
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <HistoryWarehousingDataGrid
                  CGRK='1' orderId={this.props.params.id} ddgu={this.props.location.state.e.GUID}
                  style={this.props.historyWarehousingDataGrid.historyWarehousingDate.length > 0 ? {} : { display: 'none' }}
                />
              </div>
            </OrderDetailForm>
            {/* <OrderBasicInfoForm orderId={Number(this.props.params.id)} orgId={this.props.orgId}/>*/}
          </div>
          <div className='out-warehouse-check col-lg-12 col-md-12 col-sm-12'>
            <DataGrid
              options={this.state.options} dataGridStyle={{ margin: '0 auto',
                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
            />
          </div>
          <ErrorSnackBar
            message={this.state.WarehouseInputCheckErorr} open={this.state.openCheckErorr}
            onRequestClose={this.handleRequestClose}
          />
        </StandardFormCard>
      </div>
    )
  }
}
/*
 <Table displaySelectAll={false} selectable={false}  onCellClick={this.handleCellClick}>
 <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
 <TableRow style={{background: '#364357'}}>
 <TableHeaderColumn style={tableForm}>物料编号</TableHeaderColumn>
 <TableHeaderColumn style={tableForm}>商品名称</TableHeaderColumn>
 <TableHeaderColumn style={tableForm}>商品描述</TableHeaderColumn>
 <TableHeaderColumn style={tableForm}>订购总数量</TableHeaderColumn>
 <TableHeaderColumn style={tableForm}>已入库数量</TableHeaderColumn>
 <TableHeaderColumn style={tableForm}>未入库数量</TableHeaderColumn>
 </TableRow>
 </TableHeader>
 <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
 {
 this.props.recevingWareDetail.GathringData.map((value, index) => {
 return(
 <TableRow key={'table_body_data_' + index}>
 <TableRowColumn style={{textAlign:'center'}}>{value.SPBH === null?'-------':value.SPBH}</TableRowColumn>
 <TableRowColumn style={{textAlign:'center'}}>{value.SPMC === null?'-------':value.SPMC}</TableRowColumn>
 <TableRowColumn style={{textAlign:'center'}}>{value.SPMS === null?'-------':value.SPMS}</TableRowColumn>
 <TableRowColumn style={{textAlign:'center'}}>{value.SL === null?'-------':value.SL}</TableRowColumn>
 <TableRowColumn style={{textAlign:'center'}}>{value.YRKSL === null?'-------':value.YRKSL}</TableRowColumn>
 <TableRowColumn style={{textAlign:'center'}} >{value.WRKSL === null?'-------':value.WRKSL}</TableRowColumn>
 </TableRow>
 )
 })
 }
 </TableBody>
 </Table>*/
