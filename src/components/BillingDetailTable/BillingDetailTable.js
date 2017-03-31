/**
 * Created by wangming on 2016/10/24.
 */

import React, { Component, PropTypes } from 'react';
import './BillingDetailTable.scss';
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
 * 使用场景：订单详情，开票明细
 * api接口： 订单-> 查询订单的已开票明系
 *  GET DDB/:ddid/KPMX/YKP
 *  成功返回值示例：
 *  {
* 	 "Code":0,
* 	 "Message":"查询成功",
* 	 "Result":{
* 		 "SKMX": {
* 			 "YKPMX": [{
* 								 "CRKDID": "出库单号",
* 								 "FPHM": "发票号码",
* 								 "YKPJE": "已开票金额"
* 						 }]
* 		 }
* 	 }
 *  }
 *
 *
 * 订单-> 查询订单的未开票明系
 *   GET DDB/:ddid/KPMX/WKP
 *  成功返回值示例：
 *  {
* 	 "Code":0,
* 	 "Message":"查询成功",
* 	 "Result":{
* 		 "SKMX": {
* 			 "WKPMX": [{
* 								 "CRKDID": "出库单号",
* 								 "WKPJE": "未开票金额"
* 						 }]
* 		 }
* 	 }
 *  }
 */
export default class BillingDetailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billingData: [],
      tableHeader: [],
      title: ''
    }
  }

  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    /**
     * true: 显示已开票，flase: 显示未开票
     */
    ifBillinged: React.PropTypes.bool.isRequired,
    operationCardStyle: React.PropTypes.object
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    if (this.props.ifBillinged) {
      this.setState({
        tableHeader: [
          {
            name: '发票号'
          },
          {
            name: '出库单号'
          },
          {
            name: '已开票金额'
          }
        ]
      });
      this.setState(
        {
          title: '已开票明细'
        }
        );
      this.props.getBillingedDetail(this.props.orderId);
      this.setState(
        {
          billingData: this.props.billingDetailTable.billingData
        });
    } else {
        /**
         * 未开票表头
         */
      this.setState({
        tableHeader: [
          {
            name: '出库单号'
          },
          {
            name: '未开票金额'
          }
        ]
      });
      this.props.getUnbillingDetail(this.props.orderId);
      this.setState(
        {
          billingData: this.props.billingDetailTable.unBillingData
        });
      this.setState(
        {
          title: '未开票明细'
        }
        );
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.ifBillinged != this.props.ifBillinged) {
      if (nextProps.ifBillinged) {
        this.setState({
          tableHeader: [
            {
              name: '发票号'
            },
            {
              name: '出库单号'
            },
            {
              name: '已开票金额'
            }
          ]
        });
        this.setState(
          {
            title: '已开票明细'
          }
        );

        this.props.getBillingedDetail(nextProps.orderId);
      } else {
        /**
         * 未开票表头
         */
        this.setState({
          tableHeader: [
            {
              name: '出库单号'
            },
            {
              name: '未开票金额'
            }
          ]
        });
        this.setState(
          {
            title: '未开票明细'
          }
        );

        this.props.getUnbillingDetail(nextProps.orderId);
      }
    }
  };

  render() {
    const cardHeaderStyle = {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'rgb(239, 235, 233)'
    };

    return (
      <CardUI CardStyle={this.props.style || this.props.operationCardStyle} expanded title={this.state.title} avatar={this.props.avatar} label={this.props.orderId} CardTextStyle={{ padding: 0 }}>
        <Table displaySelectAll={false} selectable={false} onCellClick={this.handleCellClick}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ border: 'none', backgroundColor: 'rgba(53,67,87,0.10)', fontFamily: 'SourceHanSansCN-Bold' }}>
            <TableRow>
              {
              this.state.tableHeader.map((value, index) => <TableHeaderColumn key={index} style={{ paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center' }}>{value.name}</TableHeaderColumn>)
            }
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover>
            {
            (() => {
              if (this.props.ifBillinged) {
                return this.props.billingDetailTable.billingData.map((value, index) => (
                  <TableRow key={value.CRKDID}>
                    <TableRowColumn>{value.FPHM}</TableRowColumn>
                    <TableRowColumn>{value.CRKDID}</TableRowColumn>
                    <TableRowColumn>{value.YKPJE}</TableRowColumn>
                  </TableRow>
                  ))
              } else {
                return this.props.billingDetailTable.unBillingData.map((value, index) => (
                  <TableRow key={value.CRKDID}>
                    <TableRowColumn>{value.CRKDID}</TableRowColumn>
                    <TableRowColumn>{value.WKPJE}</TableRowColumn>
                  </TableRow>
                  ))
              }
            })()
          }
          </TableBody>
        </Table>
      </CardUI>
    )
  }

}
