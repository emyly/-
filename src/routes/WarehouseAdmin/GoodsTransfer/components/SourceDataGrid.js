/**
 * Created by niexq on 17/3/26.
 */

import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import SourceBox from './SourceBox';
import './GoodsTransferList.scss';

/**
 * 拖拽对象集
 */
export default class SourceDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: []
    }
  }
  static propTypes = {
    goods: PropTypes.array.isRequired,
    KWMC: PropTypes.string.isRequired,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      goods: nextProps.goods
    })
  }

  renderProductionList = () => {
    if (this.props.goods.length) {
      return this.props.goods.map((value, index) => <SourceBox key={index} dataObject={{ ...value, KWMC: this.props.KWMC }} />)
    } else {
      return (<TableRow>
        <TableRowColumn
          style={{ textAlign: 'center' }}
        >暂无数据.</TableRowColumn>
      </TableRow>)
    }
  }

  render() {
    return (
      <Table displaySelectAll={false} selectable={false} style={{ paddingTop: '0px' }} wrapperStyle={{ overflow: 'hidden' }}>
        <TableHeader
          displaySelectAll={false} adjustForCheckbox={false}
          style={{ border: 'none',
            fontFamily: 'SourceHanSansCN-Bold',
            backgroundColor: '#788ba7',
            height: '36px' }}
        >
          <TableRow className='sourceDataRow'>
            <TableHeaderColumn
              className='onetrTd'
              style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
            >物料编号</TableHeaderColumn>
            <TableHeaderColumn
              className='towtrTd'
              style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
            >批号</TableHeaderColumn>
            <TableHeaderColumn
              style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
            >型号规格</TableHeaderColumn>
            <TableHeaderColumn
              className='fourtrTd'
              style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
            >库存</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows>
          {
            this.renderProductionList()
          }
        </TableBody>
      </Table>
    );
  }
}

