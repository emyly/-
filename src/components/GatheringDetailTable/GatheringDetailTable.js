/**
 * Created by wangming on 2016/10/24.
 */

import React, { Component, PropTypes } from 'react';
import './GatheringDetailTable.scss';
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
 * 使用场景：订单，查询订单的已收账明细
 *  api接口 ：
 *  已收款
 *  GET /DDB/:ddid/SKMX/YSK
 *  成功返回值示例：
 *  {
  *     "Code":0,
  *     "Message":"查询成功",
  *     "Result":{
  *     	"YSKMX": [{
 *              "CRKDID": "出库单号",
 *              "YSKJE": "已收账金额"
 *          }]
*	}
*}
 *  未收款
 *  GET /DDB/:ddid/SKMX/WSK
 *  成功返回值示例：
 *  {
  *     "Code":0,
  *     "Message":"查询成功",
  *     "Result":{
  *     	"YSKMX": [{
 *              "CRKDID": "出库单号",
 *              "WSKJE": "未收账金额"
 *          }]
*	}
*}
 *
 */
export default class GatheringDetailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gatheringData: [],
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
     * 当前组织机构id
     */
    orgId: React.PropTypes.number.isRequired,
    /**
     * true: 显示已收款，flase: 显示未收款
     */
    ifGatheringed: React.PropTypes.bool.isRequired
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    if (this.props.ifGatheringed) {
      this.setState({
        tableHeader: [
          {
            name: '出库单号'
          },
          {
            name: '已收款金额'
          }
        ]
      });
      this.setState(
        {
          title: '已收款明细'
        }
      );
      this.props.getGatheringedDetail(this.props.orderId);
      this.setState(
        {
          gatheringData: this.props.gatheringDetailTable.gatheringData
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
            name: '未收款金额'
          }
        ]
      });
      this.props.getUngatheringDetail(this.props.orderId);
      this.setState(
        {
          gatheringData: this.props.gatheringDetailTable.unGatheringData
        });
      this.setState(
        {
          title: '未收款明细'
        }
      );
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.ifGatheringed !== this.props.ifGatheringed) {
      if (nextProps.ifGatheringed) {
        this.setState({
          tableHeader: [
            {
              name: '出库单号'
            },
            {
              name: '已收款金额'
            }
          ]
        });
        this.setState(
          {
            title: '已收款明细'
          }
        );
        this.props.getGatheringedDetail(nextProps.orderId);
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
              name: '未收款金额'
            }
          ]
        });

        this.setState(
          {
            title: '未收款明细'
          }
        );

        this.props.getUngatheringDetail(nextProps.orderId);
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
      <CardUI CardStyle={this.props.style} expanded title={this.state.title} avatar={this.props.avatar} label={this.props.orderId} CardTextStyle={{ padding: 0 }}>
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
                if (this.props.ifGatheringed) {
                  return this.props.gatheringDetailTable.gatheringData.map((value, index) => (
                    <TableRow key={value.CRKDID}>
                      <TableRowColumn>{value.CRKDID}</TableRowColumn>
                      <TableRowColumn>{value.YSKJE}</TableRowColumn>
                    </TableRow>
                    ))
                } else {
                  return this.props.gatheringDetailTable.unGatheringData.map((value, index) => (
                    <TableRow key={value.CRKDID}>
                      <TableRowColumn>{value.CRKDID}</TableRowColumn>
                      <TableRowColumn>{value.WSKJE}</TableRowColumn>
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
