/**
 * Created by niexq on 17/3/26.
 */

import React, { Component, PropTypes } from 'react';
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


class TargetBox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };
  handleDrop = (items) => {

  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={{ width: '50%', height: '300px' }}>测试接收</div>
    );
  }
}

export default DropTarget(type, spec, collect)(TargetBox);
