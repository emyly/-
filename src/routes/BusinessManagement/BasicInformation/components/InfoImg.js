/**
 * Created by liuyali on 2017/3/24.
 */
import React, { Component, PropTypes } from 'react';

export default class InfoImg extends Component {
  static propTypes = {
    text: PropTypes.string,
    src: PropTypes.string,
  }
  render() {
    return (<div className='showDiv' style={{}}>
      <div className='showImg'>
        <img src={this.props.src || ''} alt='' />
        <p>未上传</p>
      </div>
      <p>
        {this.props.text}
      </p>
    </div>)
  }
}
