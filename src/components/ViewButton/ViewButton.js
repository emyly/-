/**
* Created by HJJ on 2016/4/13.
*/
import React, { Component, PropTypes } from 'react';

import './ViewButton.scss';

import Dialog from 'material-ui/Dialog';

/**
* 使用场景：用于测试的按钮
*/
export default class ViewButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      open: false
    }
  }
  static defaultProps = {
    /**
     * 缺省复制按钮名称
     */
    button_title: '缺省复制title'
  };
  static propTypes = {
      /**
       * 按钮名称
       */
    button_title: PropTypes.string.isRequired
  }
  /**
  * 按钮点击弹框
  */
  handleClick = () => {
    // alert('按钮被点击了');
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div
        style={{ width: this.state.width }}
        className='view-button' onClick={this.handleClick}
      >{this.props.button_title}
        <Dialog
          title='Dialog With Actions'
          modal={false}
          open={this.state.open}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>

      </div>
    )
  }
}
