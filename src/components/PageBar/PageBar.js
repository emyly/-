/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/10/19.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './PageBar.scss';

/**
 * 分页表格使用到的分页标签
 */
export default class PageBar extends Component {

  /**
   * 依次对应:当前页(从第一页开始),总记录条数,每页记录条数,显示分页数,分页事件
   * @type {{currentPage: *, totalCount: (module.exports.isRequired|Function|*),
   * prePageCount: *, pageLength: *, pageFunc: (module.exports.isRequired|Function|*)}}
   */
  static propTypes = {
    currentPage: PropTypes.number,
    totalCount: PropTypes.number.isRequired,
    prePageCount: PropTypes.number,
    pageLength: PropTypes.number,
    pageFunc: PropTypes.func.isRequired,
    totalLabel: PropTypes.string,
  };

  componentWillMount() {

  }

  nav = (page) => {
    const totalPage = this.getTotalPage();
    page = totalPage > page ? page : totalPage;
    page = page < 1 ? 1 : page;
    return () => this.props.pageFunc(page);
  };

  navStyle = {
    style: {
      height: '1.7rem',
      lineHeight: '1.7rem',
    },
    backgroundColor: 'rgba(207,228,255,0.1)',
    buttonStyle: {
      fontFamily: 'SourceHanSansCN-Regular',
      height: '1.7rem',
      lineHeight: '1.7rem',
      fontSize: '16px',
      color: '#53504F',
    }
  }

  firstPage = () => (
    <RaisedButton className='pgBtn' onTouchTap={this.nav(1)} {...this.navStyle} disabled={this.props.currentPage < 2}>
      {'<<'}
    </RaisedButton>
  );

  prePage = () => (
    <RaisedButton className='pgBtn' onTouchTap={this.nav(this.props.currentPage - 1)} {...this.navStyle} disabled={this.props.currentPage < 2}>
      {'<'}
    </RaisedButton>
  );

  nextPage = () => (
    <RaisedButton className='pgBtn' onTouchTap={this.nav(this.props.currentPage + 1)} {...this.navStyle} disabled={this.props.currentPage >= this.getTotalPage()}>
      {'>'}
    </RaisedButton>
  );

  lastPage = () => (
    <RaisedButton className='pgBtn' onTouchTap={this.nav(this.getTotalPage())} {...this.navStyle} disabled={this.props.currentPage >= this.getTotalPage()}>
      {'>>'}
    </RaisedButton>
  );

  getTotalPage = () => Math.ceil(this.props.totalCount / this.props.prePageCount);

  pageList = (showPages = 5) => {
    // 总共可分页数
    const totalPage = this.getTotalPage();
    showPages = showPages < totalPage ? showPages : totalPage;
    let currentPage = this.props.currentPage > 0 ? this.props.currentPage : 1;
    currentPage = totalPage < currentPage ? totalPage : currentPage;

    let startPage = currentPage - ~~(showPages / 2);
    startPage = (totalPage - startPage) < showPages ? (totalPage - showPages + 1) : startPage;
    startPage = startPage < 1 ? 1 : startPage;

    return Array(showPages).fill(0).map((v, k) => {
      const count = startPage + k;
      if (count > totalPage) {
        return;
      }
      return (<RaisedButton
        backgroundColor={count === currentPage ? '#00A0FF' : 'rgba(207,228,255,0.1)'}
        key={k}
        onTouchTap={this.nav(count)}
        className='pgBtn'
        style={{ height: '1.7rem', lineHeight: '1.7rem' }}
        buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular', height: '1.7rem', lineHeight: '1.7rem', fontSize: '16px', color: count === currentPage ? '#fff' : '#53504F' }}
      >
        {count}
      </RaisedButton>);
    });
  };

  render() {
    if (this.props.totalCount < 1) {
      return null;
    }
    return (
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'inline-block', position: 'absolute', left: 0, margin: 20, fontFamily: 'SourceHanSansCN-Regular', color: '#53504F', letterSpacing: '0.23px' }}>{this.props.totalLabel || '总计'}：{this.props.totalCount}</div>
        <div style={{ display: 'inline-block' }}>
          {this.firstPage()}
          {this.prePage()}
          {this.pageList(this.props.pageLength)}
          {this.nextPage()}
          {this.lastPage()}
        </div>
        {/* <div style={{width:'100px',height:'30px',margin:'0 auto',backgroundColor:'red'}}></div>*/}
      </div>
    );
  }
}
