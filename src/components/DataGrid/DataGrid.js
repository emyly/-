/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './DataGrid.scss'


/**
 * 数据表格控件
 */
export default class DataGrid extends Component {

  // select = (index) => this.setState({selectedIndex: index});

  static propTypes = {
    options: PropTypes.object.isRequired,
    dataSource: PropTypes.array,
    dataGridStyle: PropTypes.object,
    TableHeaderStyle: PropTypes.object,
    TableRowColumnSpanStyle: PropTypes.object,
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
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, preState) {
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
          ...this.props.options.indexStyle }}
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

  render() {
    const dataSet = this.props.dataSource || this.props.options.dataSource || [];
    let empty = '';
    if (dataSet.length === 0) {
      empty = (<TableRow>
        <TableRowColumn
          colSpan={this.props.options.columnOptions.length}
          style={{ textAlign: 'center' }}
        >暂无数据.</TableRowColumn>
      </TableRow>);
    }
    return (
      <div className='dataGrid' style={this.props.dataGridStyle}>
        <Table {...this.props.options.tableAttrs} style={{ color: '#5B83B4' }}>
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
          <TableBody {...this.props.options.tableBodyAttrs}>
            {empty}
            {(dataSet).map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                {this.indexList(this.props.options.showIndex, index)}
                {this.props.options.columnOptions.map((col, index) => (
                  <TableRowColumn key={index} style={{ paddingLeft: 3, paddingRight: 3, textAlign: 'center', color: '#53504f', ...col.style }}>
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', ...this.props.options.TableRowColumnSpanStyle}} className='_table_tooltip'>
                      {this.showRender(row, col)}
                    </span>
                  </TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
