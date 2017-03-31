/**
 * Created by liuyali on 2017/3/15.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import {
  Table,
  TableBody,
  TableHeader,
  // TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import moment from 'moment'

export default class CheckProfitLossDialog extends Component {

  static propTypes = {
    tableData: React.PropTypes.array.isRequired,
    detail: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
  }

  state = {
    showCheckboxes: false,
    check_profitAndLost_dialog_open: false
  };
  checkProfitAndLostDialogOpen =() => {
    this.setState({ check_profitAndLost_dialog_open: true });
    this.props.callback();
  }
  checkProfitAndLostDialogClose =() => {
    this.setState({ check_profitAndLost_dialog_open: false });
  }
  componentWillReceiveProps(nextProps) {
  }
  getRows =(inventory, index) => {
    const rows = [];
    let details = [];
    for (const key in inventory) {
      if (key === 'KWLJ') {
        rows.push(<TableRow selectable={this.state.showCheckboxes} key={`${(index + 1).toString()}1`} >
          <TableRowColumn className='colRow' columnNumber={index + 1} colSpan='5'><span style={{ paddingRight: '10px' }} >
            <img alt='' src='/kuwei.png' /></span>{inventory[key]}
          </TableRowColumn>
        </TableRow>)
      } else if (key === 'SYMX') {
        details = inventory[key].map((row, index2) => {
          const cols = [];
          for (const col in row) {
            if (Object.prototype.hasOwnProperty.call(row, col)) {
              cols.push(<TableRowColumn style={{ whiteSpace: 'inhreit' }} className='col' key={index2 + 1}>{row[col]}</TableRowColumn>)
            }
          }
          return <TableRow selectable={this.state.showCheckboxes} key={(index + 1).toString() + (index2 + 1).toString()}>{cols}</TableRow>
        });
        rows.push(details);
      }
    }
    return rows;
  }

  render() {
    // 查看损溢dialog按钮
    const actions = [
      <FlatButton
        style={{ margin: 10, fontSize: '16px', color: '#9B9B9B', letterSpacing: '0.57px' }}
        onTouchTap={this.checkProfitAndLostDialogClose} label='关闭'
      />,
    ];
    return (
      <div>
        <RaisedButton labelColor='white' backgroundColor='#01BD9C' label='查看损溢' onTouchTap={this.checkProfitAndLostDialogOpen} />
        <Dialog
          label='Modal Dialog'
          title='回收单详情'
          actions={actions}
          open={this.state.check_profitAndLost_dialog_open}
          onRequestClose={this.checkProfitAndLostDialogClose}
          titleClassName='dialogTitle'
        >
          <div>

            <div style={{ background: 'rgba(65,161,255,0.08)', }}>
              <div className='divWrapper'>
                <div className='wd50'>
                  <span>盘存记录：</span><span>{this.props.detail.PDMC}</span>
                </div>
                <div className='wd50'>
                  <span>登记日期：</span><span>
                    {
                      (() => moment(this.props.detail.checkInDate).format('YYYY-MM-DD'))()
                    }
                  </span>
                </div>
              </div>
              <div className='divWrapper'>
                <div className='wd50'>
                  <span>盘存日期：</span><span> {
                  (() => moment(this.props.detail.PDSJ).format('YYYY-MM-DD'))()
                }</span>
                </div>
                <div className='wd50'>
                  <span>操作人：</span><span>{this.props.detail.profitAndLostOperator}</span>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader
                style={{ borderBottom: 'none' }}
                adjustForCheckbox={this.state.showCheckboxes}
                displaySelectAll={this.state.showCheckboxes}
              >
                <TableRow>
                  <TableHeaderColumn className='colH'>物料编号</TableHeaderColumn>
                  <TableHeaderColumn className='colH'>商品名称</TableHeaderColumn>
                  <TableHeaderColumn className='colH'>商品批号</TableHeaderColumn>
                  <TableHeaderColumn className='colH'>库存数量</TableHeaderColumn>
                  <TableHeaderColumn className='colH'>损溢后数量</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                {
                  this.props.tableData.map((inventory, index) => this.getRows(inventory, index))
                }
              </TableBody>

            </Table>
          </div>
        </Dialog>
      </div>
    )
  }
}
