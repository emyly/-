import React, { Component, PropTypes } from 'react';
import './OrderGoodsDetailDateGrid.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import DataGrid from 'components/DataGrid';
/*
 * 使用场景:订单详情的商品清单
 * 接口:查看订单关联的商品清单* */
export default class OrderGoodsDetailDateGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        columnOptions: [

          {
            label: '物料编号',
            attr: 'SPBH'
          },
          {
            label: '商品名称',
            attr: 'SPMC'
          },
          {
            label: '商品描述',
            attr: 'SPMS'
          },
          {
            label: '订购总数量',
            attr: 'SL'
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
    };
  }
  static propTypes = {
    // 列表模式 0为全部  1为已发货
    requredStatus: PropTypes.number.isRequired,
    // 当前组织机构ID
    organizationID: PropTypes.number.isRequired,
    // 当前订单ID
    orderId: PropTypes.number.isRequired
  };
  static defaultProps = {
    // 显示全部
    requredStatus: '0'
  };
  // 数据初始化
  componentWillMount = () => {
    this.props.getOrderGoodsDetailDate(this.props.orderId)
  }
  // 退出组件前，数据清理
  componentWillUnmount = () => {
    // this.setState({open : this.props.open});
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        options: Object.assign({}, this.state.options, { dataSource: nextProps.orderGoodsDetailDateGrid.orderGoodsDetailData }),
      });
  }

  render() {
    // const tableForm = {
    //   textAlign: 'center',
    //   fontSize:'16px',
    //   color:'#5B83B4',
    //   letterSpacing:'0.26px',
    //   fontFamily:'SourceHanSansCN-Bold'
    // };
    return (
      <div className='col-lg-12 col-md-12 col-sm-12'>
        <DataGrid options={this.state.options} dataGridStyle={{ margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }} />
      </div>
    )
  }

}
