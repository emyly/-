/**
 * Created by niexq on 17/3/26.
 */

import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import Types from './Types';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import './GoodsTransferList.scss';

const type = Types.GOODSDRAG;

const spec = {
  beginDrag(props, monitor, component) {
    return {
      ...props.dataObject
    };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});

/**
 * 使用场景：拖拽对象
 */
class SourceBox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func,
    dataObject: PropTypes.object
  };

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(<div className='goodsTransferDataRow'><TableRow >
      <TableRowColumn className='onetrTd'>{this.props.dataObject.SPBH}</TableRowColumn>
      <TableRowColumn className='towtrTd'>{this.props.dataObject.SPPH}</TableRowColumn>
      <TableRowColumn className='sourceTtd' style={{ width: 279, textAlign: 'center' }}>{this.props.dataObject.SPMC}</TableRowColumn>
      <TableRowColumn className='fourtrTd'>{this.props.dataObject.SL}</TableRowColumn>
    </TableRow></div>)
  }
}

export default DragSource(type, spec, collect)(SourceBox);

