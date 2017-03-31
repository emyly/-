import React, { Component, PropTypes } from 'react';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import DataGridHeadHolder from 'components/DataGridHeadHolder'
import './RecycleGoods.scss';

export default class RecycleGood extends Component {
  get handleDecrease() {
    return this.handleDecrease;
  }

  set handleDecrease(value) {
    this.handleDecrease = value;
  }
  constructor(props) {
    super(props);
    this.unlockTdWidth = 70;
    this.tableHeaderColumnStyle = {
      backgroundColor: 'rgb(95,113,140)',
      textAlign: 'center',
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '14px',
      color: '#fff',
      width: this.unlockTdWidth,
    };
    this.noscroll = {
      backgroundColor: 'rgb(95,113,140)',
      textAlign: 'center',
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '14px',
      color: 'rgb(195, 195, 195)',
    };
    this.style = {
      width: this.unlockTdWidth,
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '12px',
      color: '#607189',
    };
    this.tableBodyHeight = '';

    this.state = {
      RecycleGood: true,
      showCheckboxes: false,
      viewFlag: true,
      a: false,
      tableData: [],
      tableSource: [],
      options: {
        unlockNum: 7,
        unlockWidth: (5 * this.unlockTdWidth) + 200,
        lockWidth: 775,
        bodyStyle: { height: '' },
        style: {
          tableLayout: 'auto',
        },
        indexTitleStyle: {
          backgroundColor: 'rgb(95,113,140)',
          fontSize: '14px',
          color: 'rgb(195, 195, 195)',
          fontFamily: 'SourceHanSansCN-Medium',
        },
        indexListStyle: {
          fontSize: '12px',
          fontFamily: 'SourceHanSansCN-Medium',
          color: '#607189'
        },
        TableHeaderStyle: {
          tableLayout: 'auto',
        },
        TableBodyStyle: {
          tableLayout: 'auto',
        },
        columnOptions: [
          { label: '物料号',
            attr: 'SPBH',
            tableHeaderColumnStyle: { ...this.noscroll, width: '200px' },
            style: {
              width: '200px',
              textAlign: 'center',
            }
          },
          {
            label: '批号',
            attr: 'SPPH',
            tableHeaderColumnStyle: { ...this.noscroll, width: '100px' },
            style: {
              width: '100px', textAlign: 'left',
            }
          },
          { label: '型号规格',
            attr: 'SPMS',
            tableHeaderColumnStyle: { ...this.noscroll },
            style: {
              textAlign: 'left',
            },
          },
          { label: '出库数',
            attr: 'SL',
            tableHeaderColumnStyle: this.tableHeaderColumnStyle,
            style: this.style },
          { label: this.props.valueData === 1 ? '本次使用' : '本次回收',
            attr: this.props.valueData === 1 ? 'SY' : 'HS',
            tableHeaderColumnStyle: this.tableHeaderColumnStyle,
            style: this.style },
          { label: '未回收',
            attr: 'TWHS',
            tableHeaderColumnStyle: { ...this.tableHeaderColumnStyle, width: 100 },
            style: { ...this.style, width: 100 }
          },
          { label: this.props.valueData === 1 ? '本次回收' : '本次使用',
            attr: this.props.valueData === 1 ? 'HS' : 'SY',
            tableHeaderColumnStyle: { ...this.tableHeaderColumnStyle, width: 100 },
            style: { ...this.style, width: 100 }
          },
          { label: '历史回收',
            attr: 'LCHS',
            tableHeaderColumnStyle: this.tableHeaderColumnStyle,
            style: this.style },
          { label: '历史使用',
            attr: 'LCSY',
            tableHeaderColumnStyle: this.tableHeaderColumnStyle,
            style: this.style },
          { label: '总明确数',
            attr: 'ZMQS',
            tableHeaderColumnStyle: this.tableHeaderColumnStyle,
            style: this.style
          },
        ],
        tableAttrs: {
          selectable: false,
        },
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,

        },
        showIndex: true,
        tableBodyAttrs: { displayRowCheckbox: false, stripedRows: true, showRowHover: true },
      }
    };
  }

  static propTypes = {
    addOrSubstractSurgeryRecoveryGoodsNum: PropTypes.func.isRequired,
    editUnRecovery: PropTypes.func,
    valueData: PropTypes.number.isRequired,
    currentID: PropTypes.number,
    tableData: PropTypes.array
  };
  getTableData = (tabledata = [], currentID) => {
    const tempData = tabledata;
    tempData.map((value, index) => {
      value.TWHS = this.getWHS(value); /* 该函数会根据valuedata的值是否为1，对应初始化BCSH和BCHS的值*/
      value.SY = this.addSpecialViewM(value, currentID);
      value.HS = this.addSpecialView(value, currentID);
      value.ZMQS = this.getZMQS(value);
    });
    return tempData;
  }
  getWHS = (value) => {
    value.WMQS = Object.prototype.toString.call(value.WMQS) === '[object Number]' ? value.WMQS : 0;
    if (this.props.valueData === 1) {
      value.BCHS = Object.prototype.toString.call(value.BCHS) === '[object Number]' ? value.BCHS : 0;
      return (<div className='mui-number'>
        <button
          type='button'
          className='decrease'
          onClick={this.handleIncrease(1, value, value.SL - value.BCHS - value.LCSY - value.LCHS, -1)}
        >-</button>
        <input
          onFocus={event => event.target.select()}
          className='inputNumber'
          style={{ textAlign: 'center', width: 40 }}
          max={value.SL - value.BCHS - value.LCSY - value.LCHS}
          min={0}
          type='number'
          value={value.WMQS}
          onChange={this.handleChangeValue(1, value.SPPHID, value.SL - value.BCHS - value.LCSY - value.LCHS)}
        />
        <button
          type='button'
          className='increase'
          onClick={this.handleIncrease(1, value, value.SL - value.BCHS - value.LCSY - value.LCHS, 1)}
        >+</button>
      </div>)
    }
    value.BCSH = Object.prototype.toString.call(value.BCSH) === '[object Number]' ? value.BCSH : 0;
    return (<div className='mui-number'>
      <button
        type='button'
        className='decrease'
        onClick={this.handleIncrease(2, value, value.SL - value.BCSH - value.LCSY - value.LCHS, -1)}
      >-</button>
      <input
        className='inputNumber'
        style={{ textAlign: 'center' }}
        max={value.SL - value.BCSH - value.LCSY - value.LCHS}
        min={0}
        type='number'
        value={value.WMQS}
        onFocus={event => event.target.select()}
        onChange={this.handleChangeValue(2, value.SPPHID, value.SL - value.BCSH - value.LCSY - value.LCHS)}
      />
      <button
        type='button'
        className='increase'
        onClick={this.handleIncrease(2, value, value.SL - value.BCSH - value.LCSY - value.LCHS, 1)}
      >+</button>
    </div>)
  }
  getZMQS =(value) => {
    value.WMQS = Object.prototype.toString.call(value.WMQS) === '[object Number]' ? value.WMQS : 0;
    return value.SL - value.WMQS;
  }
  handleChangeValue = (type, SPPHID, max) => (event) => {
    if (Number(event.target.value) > max) {
      return;
    }
    this.props.editUnRecovery(type, SPPHID, Number(event.target.value));
  };

  componentWillReceiveProps(nextProps) {
    const tableData = this.getTableData(nextProps.tableData, nextProps.currentID);
    if (tableData.length > 0) {
      this.getTableHeight(tableData.length);
    }
    this.setState({
      tableSource: tableData,
      viewFlag: true,
      tableData: nextProps.tableData,
      options: this.state.options,
    });
  }


  getTableHeight = (length) => {
    const node = document.querySelector('.holderHeaderTable');
    if (node) {
      const parentScrollNode = document.querySelector('.holderHeaderTable').parentNode.parentNode;
      const parentClientHeight = parentScrollNode.clientHeight;
      if (parentClientHeight < 100 + (50 * (length + 1))) {
        let tableBodyHeight = parentClientHeight - 150;
        if (tableBodyHeight < 50) {
          tableBodyHeight = 50;
        }

        this.tableBodyHeight = tableBodyHeight;
        this.state.options.bodyStyle.height = tableBodyHeight;
      }
    }
  }

  handleOnFocus = value => () => {
    const tableData = this.props.tableData;
    tableData.map((value) => { value.checkedBackground = false });
    value.checkedBackground = true;
    this.setState({
      tableData
    });
  };

  handleIncrease = (type, value, max, v) => () => {
    this.handleOnFocus(value)();
    if (value.WMQS + v > max || value.WMQS + v < 0) {
      return;
    }
    this.props.editUnRecovery(type, value.SPPHID, value.WMQS + v);
  };
  /* 直接输入商品数量*/
  handleEdit = (type, SPPHID, value, max) => (e) => {
    if (e.target.value > max) {
      return
    }
    const num = e.target.value - value;
    this.props.addOrSubstractSurgeryRecoveryGoodsNum(type, SPPHID, num)
  }
  /*
  * 点击按钮调整商品数量
  * */
  buttonEditGoodsMount = (type, SPPHID, num, cv, table) => (e) => {
    if (cv + num >= 0) {
      this.handleOnFocus(table)();
      this.props.addOrSubstractSurgeryRecoveryGoodsNum(type, SPPHID, num)
    }
  }
  /* 扫描实物*/
  addSpecialView = (value, currentID) => {
    if (this.props.valueData === 1) {
      value.WMQS = Object.prototype.toString.call(value.WMQS) === '[object Number]' ? value.WMQS : 0;
      value.BCHS = Object.prototype.toString.call(value.BCHS) === '[object Number]' ? value.BCHS : 0;
      if (currentID === value.SPPHID) {
        setTimeout(() => {
          if (document.querySelector('.activeColor')) { document.querySelector('.activeColor').classList.remove('activeColor') }
        }, 3000);
        return (<div className='mui-number'>
          <button type='button' className='decrease' onClick={this.buttonEditGoodsMount(1, value.SPPHID, -1, value.BCHS, value)}>-</button>
          <input
            onFocus={event => event.target.select()}
            className='inputNumber activeColor'
            style={{ textAlign: 'center' }}
            max={value.SL - value.LCSY - value.LCHS - value.WMQS}
            min={0}
            type='number'
            value={value.BCHS}
            onChange={this.handleEdit(1, value.SPPHID, value.BCHS, value.SL - value.LCSY - value.LCHS - value.WMQS)}
          />
          <button type='button' className='increase' onClick={this.buttonEditGoodsMount(1, value.SPPHID, 1, value.BCHS, value)}>+</button>
        </div>)
      }
      return (<div className='mui-number'>
        <button type='button' className='decrease' onClick={this.buttonEditGoodsMount(1, value.SPPHID, -1, value.BCHS, value)}>-</button>
        <input
          onFocus={event => event.target.select()}
          className='inputNumber'
          style={{ textAlign: 'center' }}
          max={value.SL - value.LCSY - value.LCHS - value.WMQS}
          min={0}
          type='number'
          value={value.BCHS}
          onChange={this.handleEdit(1, value.SPPHID, value.BCHS, value.SL - value.LCSY - value.LCHS - value.WMQS)}
        />
        <button type='button' className='increase' onClick={this.buttonEditGoodsMount(1, value.SPPHID, 1, value.BCHS, value)}>+</button>
      </div>)
    }
    value.BCHS = Object.prototype.toString.call(value.BCHS) === '[object Number]' ? value.BCHS : value.WHS;
    return <p style={{ margin: 0 }}>{value.BCHS}</p>;
  };
  /* 扫码*/
  addSpecialViewM = (value, currentID) => {
    if (this.props.valueData !== 1) {
      value.WMQS = Object.prototype.toString.call(value.WMQS) === '[object Number]' ? value.WMQS : 0;
      value.BCSH = Object.prototype.toString.call(value.BCSH) === '[object Number]' ? value.BCSH : value.WHS;
      if (currentID === value.SPPHID) {
        setTimeout(() => {
          if (document.querySelector('.activeColor')) { document.querySelector('.activeColor').classList.remove('activeColor') }
        }, 3000);
        return (<div className='mui-number'>
          <button type='button' className='decrease' onClick={this.buttonEditGoodsMount(2, value.SPPHID, -1, value.BCSH, value)}>-</button>
          <input
            onFocus={event => event.target.select()}
            className='inputNumber activeColor'
            style={{ textAlign: 'center' }}
            max={value.SL - value.LCSY - value.LCHS - value.WMQS}
            min={0}
            type='number'
            value={value.BCSH}
            onChange={this.handleEdit(2, value.SPPHID, value.BCSH, value.SL - value.LCSY - value.LCHS - value.WMQS)}
          />
          <button type='button' className='increase' onClick={this.buttonEditGoodsMount(2, value.SPPHID, 1, value.BCSH, value)}>+</button>
        </div>)
      }
      return (<div className='mui-number'>
        <button type='button' className='decrease' onClick={this.buttonEditGoodsMount(2, value.SPPHID, -1, value.BCSH, value)}>-</button>
        <input
          onFocus={event => event.target.select()}
          className='inputNumber'
          style={{ textAlign: 'center' }}
          max={value.SL - value.LCSY - value.LCHS - value.WMQS}
          min={0}
          type='number'
          value={value.BCSH}
          onChange={this.handleEdit(2, value.SPPHID, value.BCSH, value.SL - value.LCSY - value.LCHS - value.WMQS)}
        />
        <button type='button' className='increase' onClick={this.buttonEditGoodsMount(2, value.SPPHID, 1, value.BCSH, value)}>+</button>
      </div>)
    }
    value.BCSH = Object.prototype.toString.call(value.BCSH) === '[object Number]' ? value.BCSH : value.WHS;
    return <p style={{ margin: 0 }}>{value.BCSH}</p>;
  };
  render() {
    const contentFlex = {
      width: '100%',
      display: 'flex',
      padding: '0 16px',
      flexFlow: 'row wrap',
      justifyContent: 'space-between'
    };
    return (
      <div className='holderHeaderTable'>
        <div style={contentFlex}>
          <p className='scantitle'>{this.props.valueData === 1 ? '回收包装' : '扫描条形码'}</p>
          <DataGridHeadHolder options={this.state.options} dataSource={this.state.tableSource} />
        </div>
      </div>
    )
  }
}
