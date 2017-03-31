/**
 * Created by SJF on 2016/11/7.
 */
import React, { Component, PropTypes } from 'react';
import './RecycledGoodsSummary.scss';
import CardUI from 'components/StandardUI/StandardCard';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import WarehouseInDetailDialog from 'components/WarehouseInDetailDialog'

export default class BeforeRecycling extends Component {
  constructor(props) {
    super(props);
    // 出入库：术后回收——商品的回收汇总
    this.state = {
      // logisticsEditOpen:false,
      dialogContent: '',
      handleDialog: true
    }
  }
  static propTypes = {
    tableData: PropTypes.array.isRequired,
    orderId: PropTypes.number.isRequired
  }

  checkStateJudge = (e) => {
    const num = parseInt(e);
    switch (num) {
      case 1:
        return '通过';
      case 2:
        return '退回';
      case 3:
        return '转续';
      default: return '待审核';
    }
  };
  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
   * 时间格式转换 true为需要时分秒
   * */

  handlelink = CRKDID => () => {
    this.setState({
      dialogContent: <WarehouseInDetailDialog
        confirmCallBack={this.handleDialog}
        isShowRecheckBtn={false} open={this.state.handleDialog} title='回收单详情' paramsObj={[{ DDID: this.props.orderId, CRKDID }]}
      />
    });
  };

  handleDialog = () => () => {
    this.setState({
      handleDialog: false
    })
  }
  componentWillMount = () => {
  };

  render() {
    const TableHeaderColumnStyle = {
      paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center', backgroundColor: '#EAECEE'
    };
    return (
      <CardUI
        expanded title='历次回收记录'
        iconStyleLeft={{ marginTop: '20px', marginRight: '23px', marginLeft: '-16px' }} avatar='/Shape.png' label='' CardTextStyle={{ padding: 0 }}
      >
        <Table displaySelectAll={false} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ backgroundColor: '#EAECEE', fontFamily: 'SourceHanSansCN-Bold' }}>
            <TableRow>
              <TableHeaderColumn style={TableHeaderColumnStyle}>回收历史</TableHeaderColumn>
              <TableHeaderColumn style={TableHeaderColumnStyle}>操作人</TableHeaderColumn>
              <TableHeaderColumn style={TableHeaderColumnStyle}>状态</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows showRowHover>
            {
            (
              () => {
                let rows = [];
                if (this.props.tableData.length > 0) {
                  rows = this.props.tableData.map((value, index) => (
                    <TableRow key={`table_body_data_${value.GUID}`}>
                      <TableRowColumn style={{ textAlign: 'center' }}>
                        <a onClick={this.handlelink(value.GUID)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                          {value.GUID}
                        </a>
                      </TableRowColumn>
                      <TableRowColumn style={{ textAlign: 'center' }}>{value.YHXM}</TableRowColumn>
                      <TableRowColumn style={{ textAlign: 'center' }}>{this.checkStateJudge(value.SHZT)}</TableRowColumn>
                    </TableRow>
                    ));
                } else {
                  return (<TableRow key={'table_body_data_1'}>
                    <TableRowColumn colSpan='3'>
                        暂无数据...
                    </TableRowColumn>
                  </TableRow>)
                }
                return rows;
              }
            )()
          }
          </TableBody>
        </Table>
        {this.state.dialogContent}
      </CardUI>
    )
  }

}
