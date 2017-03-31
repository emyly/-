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

import EditCell from 'components/EditCell';
import { DropTarget } from 'react-dnd';
import Types from './Types';

const type = Types.GOODSDRAG;

const spec = {
  drop(props, monitor, component) {
    component.handleDrop(monitor.getItem());
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  type: monitor.getItemType(),
});

/**
 * 拖拽目标表格
 */
class TargetDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: props.tranGoods[props.CKID] || []
    }
  }
  static propTypes = {
    CKID: PropTypes.number.isRequired,
    tranGoods: PropTypes.object,
    handleTotalKinds: PropTypes.func,
    changeTranGoods: PropTypes.func,
    connectDropTarget: PropTypes.func,

  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.tranGoods !== nextProps.tranGoods) {
      this.setState({
        goods: nextProps.tranGoods[nextProps.CKID] || []
      })
    }
  }

  /**
   * drop事件
   */
  handleDrop = (items) => {
    if (items.KWID !== this.props.CKID) {
      let pushFlag = true;
      this.state.goods.map((val) => {
        if (val.SPID === items.SPID && val.SPBH === items.SPBH && val.SPPH === items.SPPH && val.YCKW === items.KWID) pushFlag = false;
      })
      if (pushFlag) {
        items.YCKW = items.KWID;
        items.KWID = this.props.CKID;
        items.KCSL = items.SL;
        items.SL = 0;
        this.state.goods.push(items);
        this.setState({
          goods: this.state.goods
        })
        let total = 0;
        this.state.goods.map((val) => { total += Number(val.SL) })
        this.props.handleTotalKinds({ total, kinds: this.state.goods.length });
      }
    }
  }

  handleNumberChange = (value, number) => {
    const { tranGoods, CKID } = this.props;
    value.SL = Number(number)
    let total = 0;
    this.state.goods.map((val) => { total += Number(val.SL) })
    this.props.handleTotalKinds({ total, kinds: this.state.goods.length });
    this.setState({
      goods: this.state.goods
    })
    if (!value.SL) {
      tranGoods[CKID].some((good, index) => {
        if (good.SPPHID === value.SPPHID) {
          tranGoods[CKID].splice(index, 1);
          return true;
        }
      })
    }
    tranGoods[CKID] = tranGoods[CKID] || [];
    if (!tranGoods[CKID].length) {
      tranGoods[CKID].push(value)
    } else {
      tranGoods[CKID].some((good) => {
        if (good.SPPHID === value.SPPHID) {
          good.SL = value.SL;
          return true;
        }
      })
    }
    this.props.changeTranGoods(tranGoods);
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <Table displaySelectAll={false} selectable={false} style={{ paddingTop: '0px' }} className='targetDataGrid'>
          <TableHeader
            displaySelectAll={false} adjustForCheckbox={false}
            style={{ border: 'none',
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: '#788ba7',
              height: '36px' }}
          >
            <TableRow>
              <TableHeaderColumn
                className='onetrTd'
                style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
              >物料编号</TableHeaderColumn>
              <TableHeaderColumn
                className='towtrTd'
                style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
              >批号</TableHeaderColumn>
              <TableHeaderColumn
                className='threetrTd col_threeTd'
                style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
              >源库位</TableHeaderColumn>
              <TableHeaderColumn
                className='fourtrTd'
                style={{ height: '36px', color: '#fff', fontFamily: 'SourceHanSansCN-Bold' }}
              >数量</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            {
              (() => {
                if (this.state.goods.length) {
                  return this.state.goods.map((value, index) => {
                    return (<TableRow key={index}>
                      <TableRowColumn className='onetrTd' style={{ height: '36px' }}>{value.SPBH}</TableRowColumn>
                      <TableRowColumn className='towtrTd' style={{ height: '36px' }}>{value.SPPH}</TableRowColumn>
                      <TableRowColumn className='threetrTd col_threeTd' style={{ height: '36px', textAlign: 'center' }}>{value.SPMC}</TableRowColumn>
                      <TableRowColumn className='fourtrTd' style={{ height: '36px', textAlign: 'right' }}>
                        <EditCell id={index} onChange={number => this.handleNumberChange(value, number)} row={value} value={value.SL || 0} />
                      </TableRowColumn>
                    </TableRow>)
                  })
                } else {
                  return (<TableRow>
                    <TableRowColumn
                      style={{ textAlign: 'center' }}
                    >暂无数据.</TableRowColumn>
                  </TableRow>)
                }
              })()
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default DropTarget(type, spec, collect)(TargetDataGrid);
