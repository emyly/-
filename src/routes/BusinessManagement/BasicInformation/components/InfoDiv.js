/**
 * Created by liuyali on 2017/3/27.
 */
import React, { Component, PropTypes } from 'react';
/*
 * 企业基本信息，一条信息，title为标题，content为内容
 * */
export default class InfoDiv extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }
  render() {
    const props = this.props;
    return (<div className='col-md-4 col-sm-6 infoDiv'>
      <div className='infoTitle'>
        {props.title}
      </div>
      <div className='infocontext'>
        {props.content}
      </div>
    </div>)
  }
}
