/**
 * Created by NXQ on 2017/1/9.
 */

import React, { Component, PropTypes } from 'react';
import './FinancialBillSummaryDataGrid.scss';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CardUI from 'components/StandardUI/StandardCard';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const cardHeaderStyle = {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'rgb(239, 235, 233)',
}

import TextField from 'material-ui/TextField';

/**
 * 使用场景：财务账单汇总
 */
export default class FinancialBillSummaryDataGrid extends Component {
  state = {
    tableData: {},
    logisticsCostError: '',   //物流费错误信息
    urgentCostError: '',      //加急费错误信息
    discountCoseError:''      //折扣费错误信息
  }
  static propTypes = {
    // 订单id
    orderId: PropTypes.number.isRequired,
    // 列表模式 '0'表示只显示 '1'表示物流费登记 '2'表示折扣登记 '3'表示加急费登记
    type: PropTypes.string.isRequired
  }
  static defaultProps = {
    type: '0' 
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getFinancialBillSummaryData(this.props.orderId);
  }
  // 换算单位
  plusYuan = num => (`￥${num || 0}.00`);
  // 回调输入值
  handleCallback = () => (event,newValue) => {
    if (this.props.callback){
      this.props.callback(newValue);
    }
  }
  // handle TextField Focus
  handleTextFieldFocus = () => () => {
    this.setState({
      logisticsCostError: '',   //物流费错误信息
      urgentCostError: '',      //加急费错误信息
      discountCoseError:''      //折扣费错误信息
    })
  }
  render() {
    const tabledata = this.props.financialBillSummaryDataGrid.data;

    return (
      <CardUI 
        CardStyle={{ height: 'auto' }}
        expanded title={'账单汇总'}
        avatar={'/FinancialIcon/BillSummaryIcon.png'}
        iconStyleLeft={{paddingTop:'13px', paddingLeft: '8px', paddingRight:'8px'}}
        expanded topStyle={{ backgroundColor: '#384357' }}
        CardTextStyle={{ padding: 0, overflow: 'hidden', height: 'auto' }} 
        >
        <Table className='summaryTable' selectable={false}>
          <TableBody displayRowCheckbox={false} stripedRows={false} showRowHover={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn className='bigTd' rowSpan='3'>
                <div className='bigFont'>应收金额</div>
                <div className='bigFont' style={{ color: 'red' }}> {this.plusYuan(tabledata.ysje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' rowSpan='3'>
                =
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>订单金额</div>
                <div className='lh'> {this.plusYuan(tabledata.ddje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                -
              </TableRowColumn>
              <TableRowColumn>
                <div className='lh'>折扣金额</div>
                {
                  (() => {
                    if (this.props.type === '2'){
                      return <TextField className='lh' style={{textAlign:'center',width:'95%'}} 
                                errorText={this.state.logisticsCostError} 
                                type='number' hintStyle={{textAlign:'center',width:'95%'}} 
                                inputStyle={{textAlign:'center',width:'95%'}}
                                hintText='请输入金额' onChange={this.handleCallback()} />
                    }else{
                      return <div className='lh'> {this.plusYuan(tabledata.zkje)}</div>
                    }
                  })()
                }
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>加急金额</div>
                {
                  (() => {
                    if (this.props.type === '3'){
                      return <TextField className='lh' style={{textAlign:'center',width:'95%'}} 
                                errorText={this.state.logisticsCostError} 
                                type='number' hintStyle={{textAlign:'center',width:'95%'}} 
                                inputStyle={{textAlign:'center',width:'95%'}}
                                hintText='请输入金额' onChange={this.handleCallback()} />
                    }else{
                      return <div className='lh'> {this.plusYuan(tabledata.jjje)}</div>
                    }
                  })()
                }
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>物流金额</div>
                {
                  (() => {
                    if (this.props.type === '1'){
                      return <TextField className='lh' style={{textAlign:'center',width:'95%'}} 
                                errorText={this.state.logisticsCostError} 
                                type='number' hintStyle={{textAlign:'center',width:'95%'}} 
                                inputStyle={{textAlign:'center',width:'95%'}}
                                hintText='请输入金额' onChange={this.handleCallback()} />
                    }else{
                      return <div className='lh'> {this.plusYuan(tabledata.wlfy)}</div>
                    }
                  })()
                }
                
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                -
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>坏账金额</div>
                <div className='lh'> {this.plusYuan(tabledata.hzje)}</div>
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn >
                <div className='lh'>已收款金额</div>
                <div className='lh'> {this.plusYuan(tabledata.yskje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>未收款金额</div>
                <div className='lh'> {this.plusYuan(tabledata.wskje)}</div>
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn >
                <div className='lh'>已开票金额</div>
                <div className='lh'> {this.plusYuan(tabledata.ykpje)}</div>
              </TableRowColumn>
              <TableRowColumn className='smTd' >
                +
              </TableRowColumn>
              <TableRowColumn >
                <div className='lh'>未开票金额</div>
                <div className='lh'> {this.plusYuan(tabledata.wkpje)}</div>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </CardUI>
    );
  }
}
