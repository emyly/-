/**
 * Created by wangming on 2016/10/24.
 */

import React, { Component, PropTypes } from 'react';
import './UrgentDetailTable.scss';
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
 * 使用场景：使用场景：订单详情，加急费明细
 * API接口: 加急费用->订单加急明细查询
 *          GET /DDB/:ddid/JJMX
 *          成功返回值：
 *{
*	 "Code":0,
*	 "Message":"操作成功",
*	 "Result":{
*		 "MX": {
*			 "CZJE": "金额",
*			 "CZSJ": "折扣时间",
*			 "CZBZ": "操作备注",
*			 "CZJXSID": "操作经销商id",
*			 "CZJXSMC": "操作经销商名称",
*			 "BCZJXSID": "被操作经销商id",
*			 "BCZJXSMC": "被操作经销商名称"
*		 }
*	 }
 *}
 */
export default class UrgentDetailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urgentData: []
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
    // this.setState({open : this.props.open});
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    console.log('componentWillMount');

    this.props.getUrgentDetail(this.props.orderId);

    console.log('componentWillMount orderData:', this.props.urgentDetailTable.urgentData);
    this.setState(
      {
        urgentData: this.props.urgentDetailTable.urgentData
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
        urgentData: nextProps.urgentDetailTable.urgentData
      });
  };

  isEmpty = (obj) => {
    for (const tp in obj) {
      return false;
    }

    return true;
  };

  showTableRow = () => {
    const tableRow = [];
    console.log('tableRow:', this.state.urgentData);
    if (!this.isEmpty(this.state.urgentData)) {
      tableRow.push(this.state.urgentData);
    }
    return tableRow.map((value, index) => <TableRow key={index}>
      <TableRowColumn>{this.state.urgentData.CZJE}</TableRowColumn>
      <TableRowColumn>{this.state.urgentData.CZBZ}</TableRowColumn>
    </TableRow>)
  };

  render() {
    const cardHeaderStyle = {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgb(239, 235, 233)'
    };
    return (
      <CardUI CardStyle={this.props.style} expanded title='加急费明细' avatar={this.props.avatar} label={this.props.orderId}>
        <Table displaySelectAll={false} selectable={false} onCellClick={this.handleCellClick}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>加急金额</TableHeaderColumn>
              <TableHeaderColumn>加急原因</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover>
            {
               this.showTableRow()
             }
          </TableBody>
        </Table>
      </CardUI>
    )
  }

}
