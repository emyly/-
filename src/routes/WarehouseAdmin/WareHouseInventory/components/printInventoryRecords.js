/**
 * Created by liuyali on 2016/10/21.
 */


import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import './WareHouseInventory.scss';

import StandardDataGrid from 'components/StandardDataGrid';

export default class PrintInventoryRecords extends Component {
  state = {
    showAmount: false,
    printTitle: ''
  }
  static propTypes = {
    DprintInventoryRecords: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    printInventoryRecords: React.PropTypes.object.isRequired,
  }
  indexShow = (show) => {
    if (show) {
      return <th>序号</th>
    }
  }
  indexList = (show, index) => {
    if (show) {
      return <td>index+1</td>;
    }
  }
  showAmount =(event) => {
    this.setState({ showAmount: !this.state.showAmount })
  }

  goBack = () => {
    window.history.back();
  }

  print = () => {
    // const title = document.title;
    const body = window.document.body.innerHTML;
    // document.title = this.state.printTitle;
    document.querySelector('.tableHeader').classList.add('A4tableHeader');
    document.querySelector('.printTable').classList.add('A4table');
    const printContent = document.getElementById('printWrapper').innerHTML;
    window.document.body.innerHTML = printContent;
    window.print();
    // document.title = title;
    window.document.body.innerHTML = body;
    location.reload();
  }
  componentWillMount() {
    if (this.props.location.state && this.props.location.state.id) {
      this.props.DprintInventoryRecords(this.props.location.state.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.printInventoryRecords.status) {
      this.getInventoryStr(nextProps.printInventoryRecords.data);
    }
  }
  getInventoryStr = (tabledata) => {
    let CKstr;
    tabledata.map((sp, index) => {
      const pos = sp.inventoryPosition.split('-');
      if (index === 0) {
        CKstr = pos.splice(0, pos.length - 1).join('-');
      }
      sp.inventoryPosition = pos[pos.length - 1];
    });
    this.setState({ printTitle: `盘存日期：${this.props.location.state.date}  盘存仓库：${CKstr}` })
  }
  render() {
    const tableData = {
      showIndex: false,
      tableHead: [
        {
          label: '序号',
          attr: 'index',
          style: { minWidth: 55 }
        }, {
          label: '库位',
          attr: 'inventoryPosition'
        }, {
          label: '品牌',
          attr: 'brand',
          style: { minWidth: 55 }
        },
        {
          label: '商品名称',
          attr: 'goodsName',
          style: { minWidth: 100 }
        },
        {
          label: '物料编号',
          attr: 'materialNum',
          style: { minWidth: 100 }
        },
        {
          label: '批号',
          attr: 'batchNum'
        }, {
          label: '数量',
          attr: 'amount',
          style: { minWidth: 65 }
        }, {
          label: '核对栏',
          attr: 'checkCol',
          style: { minWidth: 65 }
        }
      ],
      dataSource: this.props.printInventoryRecords.data || []
    };
    const header = tableData.tableHead;
    const dataSource = tableData.dataSource;
    const showIndex = tableData.showIndex;
    return (
      <StandardDataGrid iconPosition='0px -60px' title='仓库盘存' message={'""'} >
        <div style={{ position: 'relative' }}>
          <p
            style={{ position: 'absolute',
              top: '4rem',
              textAlign: 'right',
              margin: 0,
              width: '95%',
              fontFamily: 'PingFangSC-Regular',
              fontSize: 14,
              color: '#53504F' }}
          >
            <input type='checkbox' onTouchTap={this.showAmount} name='showAmount' /> 显示库存数</p>
          <RaisedButton
            onTouchTap={this.print}
            backgroundColor='#F6A959'
            labelColor='white'
            label='打印'
            style={{ position: 'absolute', right: '5%' }}
          />
          <div
            style={{
              margin: '0 auto',
              width: '90%',
              height: 'calc(100% - 56px)'
            }}
            id='printWrapper'
          >
            <div className='tableHeader'>
              <h2 className='printTitle'>{this.props.location.state.name}</h2>
              <p className='printInfo'>{this.state.printTitle}</p>
            </div>
            <table className='printTable'>
              <thead>
                <tr>
                  {this.indexShow(showIndex)}
                  {
                      header.map((col, index) => <th style={col.style} key={index + 1}>{col.label}</th>)
                    }
                </tr>
              </thead>
              <tbody>
                {dataSource.map((row, index) => <tr key={index + 1}>
                  {this.indexList(showIndex, index)}
                  {header.map((col, index) => {
                    if (col.attr === 'amount') {
                      if (this.state.showAmount) {
                        return <td key={index + 1}>{row[col.attr]}</td>
                      }
                      return <td key={index + 1} />
                    }
                    return <td key={index + 1}>{row[col.attr]}</td>
                  })}
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </StandardDataGrid>

    );
  }
}
