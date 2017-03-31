/**
 * Created by 123 on 11/25/2016.
 */

import React, { Component, PropTypes } from 'react';

import './MakePriceSingleGoodsDialog.scss';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DataGrid from 'components/DataGrid';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import moment from 'components/Moment'
import MakePriceAddSingleGoodsDialog from 'components/MakePriceAddSingleGoodsDialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';

/**
 * 使用场景：单个商品定价Dialog
 */
export default class MakePriceSingleGoodsDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageMenuType: ['正生效', '未生效', '已失效'],
      pageType: 0,   // 列表模式 0表示正生效  1表示未生效 2表示已失效
      optionsNow: {
        columnOptions: [
          {
            label: '商品ID',
            attr: 'id',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品名称',
            attr: 'name',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '生效日期',
            render: row => (
              <div style={{ overflow: 'hidden' }} >
                {moment(row.effective_start_date).format('YYYY-MM-DD')}
              </div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '货币种类',
            render: row => (
              <div>{row.money_type === 'CNY' ? '人民币' : ''}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '税率%',
            render: row => (
              <div style={{ overflow: 'hidden' }}>{row.tax_rate}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '含税价',
            render: row => (
              <div style={{ overflow: 'hidden' }}>{row.price}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          }
        ],
        dataSource: [
          {
            id: 9001,
            no: 888888881,
            name: '正生效商品名称1',
            desc: '正生效商品描述1',
            tax_rate: 17,
            money_type: 'CNY',
            price: 200,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
          },
          {
            id: 9002,
            no: 888888882,
            name: '正生效商品名称2',
            desc: '正生效商品描述2',
            tax_rate: 17,
            money_type: 'CNY',
            price: 30,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))

          },
          {
            id: 9003,
            no: 888888883,
            name: '正生效商品名称3',
            desc: '正生效商品描述3',
            tax_rate: 17,
            money_type: 'CNY',
            price: 350,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
          }
        ],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableAttrs: {
          selectable: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 100,
          prePageCount: 5,
          pageLength: 4
        }
      },
      optionsFuture: {
        columnOptions: [
          {
            label: '商品ID',
            attr: 'id',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品名称',
            attr: 'name',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '生效日期',
            render: row => (
              <div style={{ overflow: 'hidden' }} >
                {moment(row.effective_start_date).format('YYYY-MM-DD')}
              </div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '货币种类',
            render: row => (
              <div>{row.money_type === 'CNY' ? '人民币' : ''}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '税率%',
            render: row => (
              <div style={{ overflow: 'hidden' }}>{row.tax_rate}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '含税价',
            render: row => (
              <div style={{ overflow: 'hidden' }}>{row.price}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '操作',
            render: row => (
              <FlatButton
                label='删除'
                secondary
                icon={<ActionDeleteForever />}
                onTouchTap={this.handleMakePriceDeleteSingleGoods(row)}
              />
            ),
            style: { overflow: 'hidden', textAlign: 'center', paddingLeft: 10, paddingRight: 10 }
          }
        ],
        dataSource: [
          {
            id: 5001,
            no: 888888881,
            name: '未生效商品名称1',
            desc: '未生效商品描述1',
            tax_rate: 17,
            money_type: 'CNY',
            price: 3200,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
          },
          {
            id: 5002,
            no: 888888882,
            name: '未生效商品名称2',
            desc: '未生效商品描述2',
            tax_rate: 17,
            money_type: 'CNY',
            price: 660,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))

          },
          {
            id: 5003,
            no: 888888883,
            name: '未生效商品名称3',
            desc: '未生效商品描述3',
            tax_rate: 17,
            money_type: 'CNY',
            price: 880,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
          }
        ],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableAttrs: {
          selectable: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 100,
          prePageCount: 5,
          pageLength: 4
        }
      },
      optionsPast: {
        columnOptions: [
          {
            label: '商品ID',
            attr: 'id',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品名称',
            attr: 'name',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '生效日期',
            render: row => (
              <div style={{ overflow: 'hidden' }} >
                {moment(row.effective_start_date).format('YYYY-MM-DD')}
              </div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '货币种类',
            render: row => (
              <div>{row.money_type === 'CNY' ? '人民币' : ''}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '税率%',
            render: row => (
              <div style={{ overflow: 'hidden' }}>{row.tax_rate}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '含税价',
            render: row => (
              <div style={{ overflow: 'hidden' }}>{row.price}</div>
            ),
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          }
        ],
        dataSource: [
          {
            id: 3001,
            no: 888888881,
            name: '已失效商品名称1',
            desc: '已失效商品描述1',
            tax_rate: 17,
            money_type: 'CNY',
            price: 200,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
          },
          {
            id: 3002,
            no: 888888882,
            name: '已失效商品名称2',
            desc: '已失效商品描述2',
            tax_rate: 17,
            money_type: 'CNY',
            price: 30,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))

          },
          {
            id: 3003,
            no: 888888883,
            name: '已失效商品名称3',
            desc: '已失效商品描述3',
            tax_rate: 17,
            money_type: 'CNY',
            price: 350,
            effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
          }
        ],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableAttrs: {
          selectable: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 100,
          prePageCount: 5,
          pageLength: 4
        }
      },
      makePriceGoodsObject: {
        id: 9001,
        name: '正生效商品名称1',
        no: 888888881,
        desc: '正生效商品描述1',
        money_type: 'CNY',            // 币种
        tax_rate: 17,                 // 税率
        tax_price: 200,               // 含税价
        price: -1,                    //  单价
        effective_start_date: new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
      },
      makePriceAddDialogOpen: false,
      echartsOption: {
        title: {
          text: '该商品近期价格趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ['line', 'bar'] },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          name: '日期',
          data: []
        },
        yAxis: {
          type: 'value',
          name: '价格(￥)',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: {
          name: '价格',
          type: 'line',
          data: []
        }
      }
    };
  }

  static propTypes = {
    /**
     * 当前Dailog开关状态
     */
    open: PropTypes.bool.isRequired
  };
  /**
   * componentWillMount
   */
  componentWillMount = () => {
  };
  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.open === true && nextProps.makePriceSingleGoodsDialog.getStatus === '0') {
      this.props.getMakePriceSingleGoodsDialogData({
        id: nextProps.goodsData.id,
        MCJXSID: nextProps.authorizeOrganizationId,
        MRJXSID: nextProps.authorizedOrganizationId,
        JGZT: 'now'
      });
      this.setState({ pageType: 0 });
    } else if (nextProps.open === false && nextProps.open !== this.props.open) {
      this.props.initMakePriceSingleGoodsDialogData();
      this.props.initGetMakePriceSingleGoodsLineChartData();
    }
    if (nextProps.open === true && nextProps.makePriceSingleGoodsDialog.getChartDataStatus === '0') {
      this.props.getMakePriceSingleGoodsLineChartData({
        id: nextProps.goodsData.id,
        MCJXSID: nextProps.authorizeOrganizationId,
        MRJXSID: nextProps.authorizedOrganizationId
      });
    }
    if (nextProps.open === true && nextProps.makePriceSingleGoodsDialog.getChartDataStatus === '1') {
      this.state.echartsOption.xAxis.data = nextProps.makePriceSingleGoodsDialog.xAxisChartData;
      this.state.echartsOption.series.data = nextProps.makePriceSingleGoodsDialog.seriesChartData;
      this.setState({
        echartsOption: this.state.echartsOption
      })
    }
    if (nextProps.open === true && nextProps.makePriceSingleGoodsDialog.deleteStatus === '1') {
      this.props.getMakePriceSingleGoodsLineChartData({
        id: nextProps.goodsData.id,
        MCJXSID: nextProps.authorizeOrganizationId,
        MRJXSID: nextProps.authorizedOrganizationId
      });
      this.props.initDeleteMakePriceSingleGoodsDialogData();
      _.remove(this.state.optionsFuture.dataSource, value => (value.price_id === nextProps.makePriceSingleGoodsDialog.deleteId)); // 删除对应的单条价格数据
    }
    if (nextProps.makePriceSingleGoodsDialog.nowGoodsData || nextProps.makePriceSingleGoodsDialog.futureGoodsData || nextProps.makePriceSingleGoodsDialog.pastGoodsData) {
      this.state.optionsNow.dataSource = nextProps.makePriceSingleGoodsDialog.nowGoodsData;
      this.state.optionsFuture.dataSource = nextProps.makePriceSingleGoodsDialog.futureGoodsData;
      this.state.optionsPast.dataSource = nextProps.makePriceSingleGoodsDialog.pastGoodsData;
      this.setState({
        optionsNow: this.state.optionsNow,
        optionsFuture: this.state.optionsFuture,
        optionsPast: this.state.optionsPast
      })
    }
  };
  /**
   * 正生效/未生效、已失效切换
   */
  handleSelectPageType = (event, index, value) => {
    this.setState({ pageType: Number(value) });
    let type = '';
    switch (Number(value)) {
      case 0:
        type = 'now';
        break;
      case 1:
        type = 'future';
        break;
      case 2:
        type = 'past';
        break;
      default:
        break;
    }
    this.props.getMakePriceSingleGoodsDialogData({
      id: this.props.goodsData.id,
      MCJXSID: this.props.authorizeOrganizationId,
      MRJXSID: this.props.authorizedOrganizationId,
      JGZT: type
    });
  };

  /**
   * 删除单个商品未生效定价
   */
  handleMakePriceDeleteSingleGoods = row => () => {
    this.props.deleteMakePriceSingleGoodsDialogData(row.price_id);
  }
  /**
   * 添加单个商品定价子Dialog
   */
  handleTouchTapMakePriceAddDailogOpen = () => {
    this.setState({ makePriceAddDialogOpen: !this.state.makePriceAddDialogOpen });
  }
  render() {
    const filter =
      (<DropDownMenu
        value={Number(this.state.pageType)}
        onChange={this.handleSelectPageType}
        style={{height:'auto'}}
      >
        {
          this.state.pageMenuType.map((value, index) => <MenuItem style={{fontFamily:'SourceHanSansCN-Regular',fontSize:'14px',color:'#4A4A4A',letterSpacing:'0px'}} key={index} value={index} primaryText={value} />)
        }
      </DropDownMenu>);
    const actions = [
      <FlatButton
        label={'添加定价'}
        style={{ margin: 10, float: 'left' }}
        primary
        icon={<ContentAdd />}
        onTouchTap={this.handleTouchTapMakePriceAddDailogOpen}
      />,
      <FlatButton
        label='关闭'
        style={{ margin: 10 }}
        primary
        onTouchTap={this.props.handleMakePriceDailog}
      />
    ];
    return (
      <div className='make-price-single-goods-dialog'>
        <Dialog
          title={`${this.props.goodsData ? this.props.goodsData.name : '单个商品'}--定价`}
          actions={actions}
          modal
          autoScrollBodyContent
          titleStyle={{ height: '4.64rem', padding: 0, paddingLeft: '25px', lineHeight: '4.64rem', border: 'none' }}
          actionsContainerStyle={{ height: '4.4rem', paddingTop: '0px', border: 'none' }}
          open={this.props.open}
        >
          <div style={{ height: '420px', overflow: 'hidden' }}>
            <ReactEcharts style={{ height: '220px' }} option={this.state.echartsOption} />
            <Toolbar style={{ fontSize: 16, height: '40px', overflow: 'hidden' }}>
              <ToolbarGroup firstChild style={{ height: '40px', lineHeight: '40px' }}>
                <ToolbarTitle text={'按商品定价状态筛选:'} className="toolbartMenu" style={{ fontSize: 16, marginLeft: 10, height: '40px', lineHeight: '40px' }} />
                {filter}
              </ToolbarGroup>
            </Toolbar>
            {
              (() => {
                if (this.state.pageType === 0) {       // 0表示正生效
                  return <DataGrid options={this.state.optionsNow} />
                } else if (this.state.pageType === 1) { // 1表示未生效
                  return <DataGrid options={this.state.optionsFuture} />
                } else if (this.state.pageType === 2) { // 2表示已失效
                  return <DataGrid options={this.state.optionsPast} />
                }
              })()
            }

          </div>
        </Dialog>
        <div>
          <MakePriceAddSingleGoodsDialog pageType={Number(this.state.pageType)} goodsData={this.props.goodsData} open={this.state.makePriceAddDialogOpen} handleMakePriceAddDailog={this.handleTouchTapMakePriceAddDailogOpen} contractType={this.props.contractType} authorizeOrganizationId={this.props.authorizeOrganizationId} authorizedOrganizationId={this.props.authorizedOrganizationId} />
        </div>
      </div>
    )
  }
}
