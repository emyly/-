/**
 * Copyright 2017 by FirstGrid
 * Created by wangming on 2017/3/13.
 */
import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './DataGridHeadHolder.scss'


/**
 * 数据表格控件
 */
export default class DataGridHeadHolder extends Component {

  // select = (index) => this.setState({selectedIndex: index});

  static propTypes = {
    options: PropTypes.object.isRequired, // 非锁定的表格参数
    dataSource: PropTypes.array, // 非锁定的表格数据
    dataGridStyle: PropTypes.object, // 整体元素样式
    tablekey: PropTypes.string || PropTypes.number,
    // lockOptions: PropTypes.object, //锁定的表格参数
    // lockDataSource: PropTypes.array, //锁定的表格数据
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource || this.props.options.dataSource || [],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    const showTooltip = () => Array.from(document.querySelectorAll('._table_tooltip'), (td) => { td.title = td.innerText });
    // window.onload=showTooltip;
    setInterval(showTooltip, 1000);

    // console.debug('datagrid componentDidMount:',  document.querySelector('.dataGrid_Unlock_TableBody').parentNode.parentNode);
    // 获取unlock表格体的scroll元素

    const unlockScrollEle = document.querySelector(`.dataGrid_Unlock_TableBody_${this.props.tablekey}`);
    let parrentUnlockScrollEle = '';
    if (unlockScrollEle) {
      parrentUnlockScrollEle = unlockScrollEle.parentNode.parentNode;
    }

    const lockScrollEle = document.querySelector(`.dataGrid_Lock_TableBody_${this.props.tablekey}`);
    let parrentLockScrollEle = '';
    if (lockScrollEle) {
      parrentLockScrollEle = lockScrollEle.parentNode.parentNode;
    }

    if (parrentUnlockScrollEle && parrentLockScrollEle) {
      parrentLockScrollEle.style.height = `${parrentUnlockScrollEle.clientHeight}px`;
      parrentUnlockScrollEle.addEventListener('scroll', this.handleScroll);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const unlockScrollEle = document.querySelector(`.dataGrid_Unlock_TableBody_${this.props.tablekey}`);
    let parrentUnlockScrollEle = '';
    if (unlockScrollEle) {
      parrentUnlockScrollEle = unlockScrollEle.parentNode.parentNode;
    }

    const lockScrollEle = document.querySelector(`.dataGrid_Lock_TableBody_${this.props.tablekey}`);
    let parrentLockScrollEle = '';
    if (lockScrollEle) {
      parrentLockScrollEle = lockScrollEle.parentNode.parentNode;
    }

    if (parrentUnlockScrollEle && parrentLockScrollEle) {
      parrentLockScrollEle.style.height = `${parrentUnlockScrollEle.clientHeight}px`;
      parrentUnlockScrollEle.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillReceiveProps(nextProps) {

  }
  componentWillUpdate(nextProps, nextState) {

  }

  handleScroll = (e) => {
    const lockScrollEle = document.querySelector(`.dataGrid_Lock_TableBody_${this.props.tablekey}`).parentNode.parentNode;
    const unlockScrollEle = document.querySelector(`.dataGrid_Unlock_TableBody_${this.props.tablekey}`).parentNode.parentNode;
    const lockScrollEleHead = document.querySelector(`.dataGrid_Unlock_TableHead_${this.props.tablekey}`).parentNode.parentNode;

    lockScrollEle.scrollTop = unlockScrollEle.scrollTop;
    lockScrollEleHead.scrollLeft = unlockScrollEle.scrollLeft;
  }


  indexTitle = (isShow) => {
    if (isShow) {
      return (<TableHeaderColumn
        style={{ backgroundColor: '#364357',
          width: 30,
          paddingLeft: 3,
          paddingRight: 3,
          textAlign: 'center',
          fontSize: '16px',
          color: '#5B83B4',
          letterSpacing: '0.26px',
          ...this.props.options.indexTitleStyle }}
      >No.</TableHeaderColumn>);
    }
  };

  indexList = (isShow, index) => {
    if (isShow) {
      return (<TableRowColumn
        style={{ width: 30,
          paddingLeft: 3,
          paddingRight: 3,
          textAlign: 'center',
          ...this.props.options.indexListStyle }}
      >{index + 1}</TableRowColumn>);
    }
  };

  showRender = (row, col) => {
    switch (typeof col.render) {
      case 'function':
        return col.render(row);
      case 'object':
        return col.render;
      default:
        return this.formater(row, col);
    }
  };

  formater = (row, col) => {
    switch (typeof col.formater) {
      case 'function':
        return col.formater(row[col.attr], row);
      default:
        return row[col.attr];
    }
  };

  getLockHeaderCol = () => {
    const options = this.props.options;
    const colLength = options.columnOptions.length;
    const unlockNum = options.unlockNum || 0;
    const lockOptions = options.columnOptions.slice(0, colLength - unlockNum);
    return lockOptions;
  };

  getUnlockHeaderCol = () => {
    const options = this.props.options;
    const colLength = options.columnOptions.length;
    const unlockNum = options.unlockNum || 0;
    const unlockOptions = options.columnOptions.slice(colLength - unlockNum);
    return unlockOptions;
  };


  showLockData = () => {
    const dataSet = this.props.dataSource || this.props.options.dataSource || [];
    const unlockNum = this.props.options.unlockNum || 0;

    const colNum = this.props.options.columnOptions.length;
    const lockWidth = 12 - Math.floor((unlockNum / colNum) * 12);
    let wholeWidth = 0;
    if (document.querySelector('.dataGridHolder')) { wholeWidth = document.querySelector('.dataGridHolder').clientWidth; }
    const lckStyle = this.props.options.lockWidth > wholeWidth - this.props.options.unlockWidth ? { width: this.props.options.lockWidth } : { width: `calc(100% - ${this.props.options.unlockWidth}px` };
    if (lockWidth && dataSet.length !== 0) {
      const lockHeaderCol = this.getLockHeaderCol();
      return (<div
        className='tableDiv'
        style={{ ...lckStyle, ...this.props.options.lockStyle }}
      >
        <Table
          {...this.props.options.tableAttrs}
          style={{ color: '#5B83B4' }}
          bodyStyle={{ overflow: 'hidden', ...this.props.options.bodyStyle }}
          wrapperStyle={{ overflow: 'hidden' }}
        >
          <TableHeader
            {...this.props.options.tableHeaderAttrs} style={{
              border: 'none',
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: '#364357',
              ...this.props.options.TableHeaderStyle }}
          >
            <TableRow>
              {this.indexTitle(this.props.options.showIndex)}
              {lockHeaderCol.map((col, index) => (
                <TableHeaderColumn
                  key={index}
                  style={{
                    backgroundColor: '#364357',
                    paddingLeft: 3,
                    paddingRight: 3,
                    fontSize: '16px',
                    color: '#5B83B4',
                    letterSpacing: '0.26px',
                    textAlign: 'center',
                    ...col.tableHeaderColumnStyle }}
                >
                  {col.label}
                </TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={`dataGrid_Lock_TableBody_${this.props.tablekey}`} {...this.props.options.tableBodyAttrs} >
            {(dataSet).map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                {this.indexList(this.props.options.showIndex, index)}
                {lockHeaderCol.map((col, index) => (
                  <TableRowColumn
                    key={index}
                    style={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      ...col.style
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} className='_table_tooltip'>
                      {this.showRender(row, col)}
                    </span>
                  </TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>)
    }
  };

  showUnlockData = () => {
    const dataSet = this.props.dataSource || this.props.options.dataSource || [];
    const unlockNum = this.props.options.unlockNum || 0;
    const colNum = this.props.options.columnOptions.length;
    const unlockWidth = Math.floor((unlockNum / colNum) * 12);
    let wholeWidth = 0;
    if (document.querySelector('.dataGridHolder')) { wholeWidth = document.querySelector('.dataGridHolder').clientWidth; }
    console.log('document.querySelector(\'.dataGridHolder\')', document.querySelector('.dataGridHolder'), this.props.wholeWidth)
    console.log('document.querySelector(\'.dataGridHolder\')', document.getElementsByClassName('dataGridHolder')[0], this.props.wholeWidth)

    // const parentWidth = document.querySelector('.dataGridHolder').clientWidth;

    const unlckWidth = this.props.options.lockWidth > wholeWidth - this.props.options.unlockWidth ? { width: `calc(100% - ${this.props.options.lockWidth}px` } : { width: this.props.options.unlockWidth };
    // const unlckWidth = this.props.options.lockWidth > wholeWidth - this.props.options.unlockWidth?{width:this.props.options.lockWidth} :{width:`calc(100% - ${this.props.options.unlockWidth}`};
    console.log('unlckWidth', wholeWidth, this.props.options.lockWidth, this.props.options.unlockWidth, unlckWidth)
    if (dataSet.length !== 0) {
      const unlockHeaderCol = this.getUnlockHeaderCol();
      return (<div
        className={'tableDiv'}
        style={{ ...unlckWidth, ...this.props.options.lockStyle }}
      >
        <Table
          {...this.props.options.tableAttrs}
          style={{ color: '#5B83B4' }}
          bodyStyle={{ overflow: 'auto', ...this.props.options.bodyStyle }}
          headerStyle={{ overflow: 'hidden', ...this.props.options.headerStyle }}
          wrapperStyle={{ overflow: 'hidden' }}
        >
          <TableHeader
            className={`dataGrid_Unlock_TableHead_${this.props.tablekey}`}
            {...this.props.options.tableHeaderAttrs} style={{
              border: 'none',
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: '#364357',
              ...this.props.options.TableHeaderStyle }}
          >
            <TableRow>
              {unlockHeaderCol.map((col, index) => (
                <TableHeaderColumn
                  key={index}
                  style={{
                    backgroundColor: '#364357',
                    paddingLeft: 3,
                    paddingRight: 3,
                    fontSize: '16px',
                    color: '#5B83B4',
                    letterSpacing: '0.26px',
                    textAlign: 'center',
                    ...col.tableHeaderColumnStyle }}
                >{col.label}</TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={`dataGrid_Unlock_TableBody_${this.props.tablekey}`}{...this.props.options.tableBodyAttrs} >
            {(dataSet).map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                {unlockHeaderCol.map((col, index) => (
                  <TableRowColumn
                    key={index}
                    style={{
                      paddingLeft: 3,
                      paddingRight: 3,
                      textAlign: 'center',
                      ...col.style
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} className='_table_tooltip'>
                      {this.showRender(row, col)}
                    </span>
                  </TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>)
    }
  };

  showEmptyTable = () => {
    const dataSet = this.props.dataSource || this.props.options.dataSource || [];

    if (dataSet.length === 0) {
      return (<Table
        {...this.props.options.tableAttrs}
        style={{ color: '#5B83B4' }}
        bodyStyle={{ overflow: 'auto' }}
        wrapperStyle={{ overflow: 'hidden' }}
      >
        <TableHeader
          {...this.props.options.tableHeaderAttrs} style={{
            border: 'none',
            fontFamily: 'SourceHanSansCN-Bold',
            backgroundColor: '#364357',
            ...this.props.options.TableHeaderStyle }}
        >
          <TableRow>
            {this.indexTitle(this.props.options.showIndex)}
            {this.props.options.columnOptions.map((col, index) => (
              <TableHeaderColumn
                key={index}
                style={{
                  backgroundColor: '#364357',
                  paddingLeft: 3,
                  paddingRight: 3,
                  fontSize: '16px',
                  color: '#5B83B4',
                  letterSpacing: '0.26px',
                  textAlign: 'center',
                  ...col.tableHeaderColumnStyle }}
              >{col.label}</TableHeaderColumn>
                ))}
          </TableRow>
        </TableHeader>
        <TableBody {...this.props.options.tableBodyAttrs} >
          <TableRow>
            <TableRowColumn
              colSpan={this.props.options.columnOptions.length}
              style={{ textAlign: 'center' }}
            >
                  暂无数据.
                </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>)
    }
  };

  render() {
    return (
      <div
        className='dataGridHolder row'
        style={{
          margin: 0,
          padding: 0,
          ...this.props.dataGridStyle
        }}
      >
        {
        this.showEmptyTable()
      }
        {
        this.showLockData()
      }
        {
        this.showUnlockData()
      }
      </div>
    );
  }
}
