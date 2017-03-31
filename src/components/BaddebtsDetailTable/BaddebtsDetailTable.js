/**
 * Created by wangming on 2016/10/24.
 */

import React, { Component, PropTypes } from 'react';
import './BaddebtsDetailTable.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import CardUI from 'components/StandardUI/StandardCard';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
/**
 * 使用场景：使用场景：订单详情，坏账明细
 * API接口: 销售坏账->订单坏账明细查询
 *          GET /DDB/:ddid/HZMX
 *          成功返回值：
 *{
*	 "Code":0,
*	 "Message":"成功",
*	 "Result":{
*		 "HZMX": [{
*			 "CKDH": "出库单号",
*			 "HZJE": "坏账金额",
*			 "HZYY": "坏账原因",
*			 "CJRXM": "创建人姓名"
*		 }]
*	 }
 *}
 */
export default class BaddebtsDetailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baddebtsData: []
    }
  }

  // static defaultProps = {
  //   tableData: ''
  // };
  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    /**
     * 当前组织机构id
     */
    orgId: React.PropTypes.number.isRequired
  };

  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
    console.log('componentWillUnmount');
    // this.setState({open : this.props.open});
  };

  /**
   * 数据初始化
   */
  // componentWillMount  = () => {
  //   console.log("componentWillMount");
  //   this.setState(
  //     {
  //       HZMX : [
  //         {
  //           CKDH: 1000001,
  //           HZJE: 100000,
  //           HZYY : `baddebts test`
  //         },
  //         {
  //           CKDH: 1000002,
  //           HZJE: 100000,
  //           HZYY : `baddebts test`
  //         },
  //         {
  //           CKDH: 1000003,
  //           HZJE: 100000,
  //           HZYY : `baddebts test`
  //         },
  //         {
  //           CKDH: 1000004,
  //           HZJE: 100000,
  //           HZYY : `baddebts test`
  //         }
  //       ]
  //     });
  // };

  componentWillMount = () => {
    console.log('componentWillMount');

    this.props.getBaddebtsDetail(this.props.orderId);

    console.log('componentWillMount orderData:', this.props.baddebtsDetailTable.baddebtsData);
    this.setState(
      {
        baddebtsData: this.props.baddebtsDetailTable.baddebtsData
      });
    // this.setState(
    //   {
    //     urgentData : [{
    //       CZJE: 10,
    //       CZBZ : 'urgent test'
    //     }]
    //   });
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('OB componentWillReceiveProps:', nextProps);
    this.setState(
      {
        baddebtsData: nextProps.baddebtsDetailTable.baddebtsData
      });
  };

  // componentDidMount  = () => {
  //   console.log("componentDidMount");
  //   // this.setState({open : this.props.open});
  // };

  render() {
    const cardHeaderStyle = {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgb(239, 235, 233)'
    };
    return (
      <CardUI CardStyle={this.props.style} expanded title='坏账明细' avatar={this.props.avatar} label=''>
        <Table displaySelectAll={false} selectable={false} onCellClick={this.handleCellClick}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>出库单号</TableHeaderColumn>
              <TableHeaderColumn>坏账金额</TableHeaderColumn>
              <TableHeaderColumn>坏账原因</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover>
            {
            this.state.baddebtsData.map((value, index) => (
              <TableRow key={value.CKDH}>
                <TableRowColumn>{value.CKDH}</TableRowColumn>
                <TableRowColumn>{value.HZJE}</TableRowColumn>
                <TableRowColumn>{value.HZYY}</TableRowColumn>
              </TableRow>
              ))
          }
          </TableBody>
        </Table>
      </CardUI>
    )
  }

}
