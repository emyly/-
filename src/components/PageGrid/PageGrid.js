/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import DataGrid from '../DataGrid';
import PageBar from '../PageBar'

/**
 * 分页表格组件
 */
export default class PageGrid extends Component {
  static propTypes = {
    pagination: PropTypes.object,
    options: PropTypes.object.isRequired,
    style:PropTypes.object
  };
  static defaultProps = {
    style:{
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
    }
  };

  render() {
    let pageBar;
    if (this.props.pagination || this.props.options.pagination) {
      pageBar = <PageBar {...this.props.pagination || this.props.options.pagination} />
    }
    return (
      <div style={this.props.style}>
        <DataGrid {...this.props} />
        {pageBar || ''}
      </div>
    )
  }
}
