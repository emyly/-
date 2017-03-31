/**
 * Created by wangming on 2016/1/9.
 */

import React, { Component } from 'react';
import './FinancialBillingDetail.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import CardUI from 'components/StandardUI/StandardCard';
import TextField from 'material-ui/TextField';

/**
 * 使用场景：订单，查询订单的已收账明细
 *  api接口 ：
 *  已收款
*/

const tableHeader = [
  '出库号',
  '折扣金额',
  '坏账金额',
  '已开票金额',
  '未开票金额',
  '发票号',
  '已收款金额',
  '未收款金额',
]

export default class FinancialBillingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '账单详情',
      checkBoxList: [],
      dataList: [],
    }
  }

  static propTypes = {
    /**
     * 当前订单id
     */
    orderId: React.PropTypes.number.isRequired,
    /**
     * 是否显示checkbox
     */
    ifCheckBox: React.PropTypes.bool.isRequired,
    /**
     * checkBox回调函数
     */
    checkRowBack: React.PropTypes.func,
    getFinancialBillingDetail: React.PropTypes.func,
    // financialBillingDetail: React.PropTypes.object,
    style: React.PropTypes.object,
    // avatar: React.PropTypes.object,
    ifBaddebtsSubmit: React.PropTypes.bool,
  };

  static defaultProps = {
    ifBaddebtsSubmit: false
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    this.props.getFinancialBillingDetail({ ddid: this.props.orderId });
  };

  componentWillReceiveProps = (nextProps) => {
    // console.debug('FinancialBillingDetail:', nextProps);
    const tpArray = this.state.checkBoxList;
    tpArray.length = nextProps.financialBillingDetail.financialListData.length;
    this.setState({ checkBoxList: tpArray });
    // console.debug('FinancialBillingDetail:', tpArray.length);
    this.setState({ dataList: nextProps.financialBillingDetail.financialListData });
  };

  showTableHeader = () =>
    // console.debug('FinancialBillingDetail:', tableHeader);
     (
       <TableHeader
         displaySelectAll={this.props.ifCheckBox} adjustForCheckbox={false}
         enableSelectAll={false}
         style={{ border: 'none', backgroundColor: 'rgba(53,67,87,0.10)', fontFamily: 'SourceHanSansCN-Bold' }}
       >
         <TableRow>
           {
            tableHeader.map((value, index) => (
              <TableHeaderColumn
                key={index}
                style={{ paddingLeft: 3, paddingRight: 3, fontSize: '16px', color: '#6D93C1', letterSpacing: '0.26px', textAlign: 'center' }}
              >
                {value}
              </TableHeaderColumn>))
          }
         </TableRow>
       </TableHeader>);

  handleTextChange = index => (
    (event, newValue) => {
      if (this.props.ifCheckBox) {
        this.state.dataList[index].NEWHZJE = Number(newValue);
        console.debug('handleTextChange:', this.state.dataList[index]);
        this.setState({ dataList: this.state.dataList });
        // this.handleCellClick(index);
        const tpList = this.state.checkBoxList;
        const retVal = [];
        this.state.dataList.map((value, index) => {
          if (tpList[index]) {
            retVal.push(value);
          }
        });
        // this.setState({ checkBoxList: tpList });
        this.props.checkRowBack(retVal);
      }
    }
  )

  handleTextFocus = (event) => {
    event.stopPropagation();
  };

  showBaddebtsCol = (value, index) => {
    const tpList = this.state.checkBoxList;
    if (this.props.ifBaddebtsSubmit && tpList[index]) {
      return (<TableRowColumn>
        <TextField
          style={{ background: '#fff',
            color: '#C4C4C4',
            width: '4rem',
            height: '2.0rem',
            borderRadius: '4px',
            paddingLeft: '4px',
            position: 'relative',
            fontFamily: 'SourceHanSansCN-Regular' }}
          underlineShow={false}
          inputStyle={{ textAlign: 'center', border: '1px solid #d2d6de', borderRadius: '4px' }}
          value={Number(value.NEWHZJE) || ''}
          onChange={this.handleTextChange(index)}
          onClick={this.handleTextFocus}
          id={`FinancialBilling${index}`}
          ref={`FinancialBilling${index}`}
        />
      </TableRowColumn>)
    } else {
      return <TableRowColumn>{value.HZJE}</TableRowColumn>
    }
  };

  showTableBody = () => {
    if (this.state.dataList.length === 0) {
      return (<TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        stripedRows
        showRowHover
      >
        <TableRow>
          <TableRowColumn colSpan={tableHeader.length}>暂无数据.</TableRowColumn>
        </TableRow>
      </TableBody>);
    } else {
      return (<TableBody deselectOnClickaway={false} displayRowCheckbox={this.props.ifCheckBox} stripedRows showRowHover>
        {
          this.state.dataList.map((value, index) => <TableRow key={index} selected={this.state.checkBoxList[index]}>
            <TableRowColumn>{value.CRKDID}</TableRowColumn>
            <TableRowColumn>{value.ZKJE}</TableRowColumn>
            {this.showBaddebtsCol(value, index)}
            <TableRowColumn>{value.YKPJE}</TableRowColumn>
            <TableRowColumn>{value.WKPJE}</TableRowColumn>
            <TableRowColumn>
              {value.XSKPBs.map((data, subIndex) => (<div style={{ height: '25px', lineHeight: '25px' }}>{data.FPHM}</div>))}
            </TableRowColumn>
            <TableRowColumn>{value.YSZJE}</TableRowColumn>
            <TableRowColumn>{value.WSZJE}</TableRowColumn>
          </TableRow>)
        }
      </TableBody>);
    }
  }

  handleCellClick = (row, col) => {
    if (this.props.ifCheckBox) {
      const tpList = this.state.checkBoxList;
      if (tpList[row] === true) {
        tpList[row] = false;
      } else {
        tpList[row] = true;
      }

      const retVal = [];
      this.state.dataList.map((value, index) => {
        if (tpList[index]) {
          retVal.push(value);
        }
      });

      this.setState({ checkBoxList: tpList });
      this.props.checkRowBack(retVal);
    }
  };

  render() {
    return (
      <CardUI
        CardStyle={this.props.style}
        expanded title={this.state.title}
        avatar={'/orderCheckIcon/icon-08.png'}
        label={this.props.orderId}
        CardTextStyle={{ padding: 0, height: '100%' }}
      >
        <Table displaySelectAll={false} selectable={this.props.ifCheckBox} multiSelectable={this.props.ifCheckBox} onCellClick={this.handleCellClick}>
          {
            this.showTableHeader()
          }
          {
            this.showTableBody()
          }
        </Table>
      </CardUI>
    )
  }

}
