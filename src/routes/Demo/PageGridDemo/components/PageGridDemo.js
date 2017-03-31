/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import PageGrid from 'components/PageGrid';
import ActionHome from 'material-ui/svg-icons/action/home';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import IconButton from 'material-ui/IconButton';
import { fetchFS } from 'lib/utils';
import moment from 'moment';

const log = require('debug')('app:PageGridDemo');

/**
 * 分页表格例子
 */
export default class PageGridDemo extends Component {

  static propTypes = {
    getPageData: PropTypes.func.isRequired,
    pgd: PropTypes.object.isRequired,
  };

  handleTouchTap = (row) => {
    log(row.name);
    log(row.age);
  };

  componentWillMount() {
    this.props.getPageData();
  }

  touchHandle1 = row => () => this.handleTouchTap(row);
  touchHandle2 = () => alert('需要注意表格中的onCellClick事件，如果表格本身有该事件，会同时触发该事件。');

  options = () => ({
    columnOptions: [
      {
        label: '姓名',
        attr: 'name',
      },
      {
        label: '状态',
        attr: 'status',
      },
      {
        label: '生日',
        attr: 'age',
        formater: (value, row) => {
          const year = moment().year() - Number(value);
          return `${moment([year, 6, 10]).format('YYYY-MM-DD')}(${row.age}岁)`;
        },
        style: { width: 180, textAlign: 'right' },
      },
      {
        label: '操作',
        render: row => (<div>
          <IconButton onTouchTap={this.touchHandle1(row)}>
            <ActionHome />
          </IconButton>
          <IconButton onTouchTap={this.touchHandle2}>
            <FileCloudDownload />
          </IconButton>
        </div>),
      },
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
      onCellClick: (rowId, colId, cell) => {
        const data = this.props.pgd.data;
        const row = data[rowId];
        log(`row=${JSON.stringify(row)}`);
        log(`rowId=${rowId},colId=${colId},cell=${cell.target.innerHTML}`);
        alert(`点击了${cell.target.innerHTML},更多信息请看控制台！`);
      },
    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false,
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true,
    },
    showIndex: true,
    indexStyle: { width: 100 },
    pagination: {
      currentPage: this.props.pgd.currentPage,
      totalCount: this.props.pgd.total,
      prePageCount: 10,
      pageLength: 4,
      pageFunc: (page) => {
        log(`page=${page}`);
        this.props.getPageData(page);
      },
    },
  });

  uploadHandle = () => {
    const form = new FormData(document.getElementById('myForm'));
    console.log(Array.from(form.entries(), row => console.log(row)));
    fetchFS('/WDB', { body: form });
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.props.pgd.status === 'error') {
            alert(this.props.pgd.error);
          }
          if (this.props.pgd.status === true) {
            // PageGrid支持以下2种写法，或混合写法都可以
            // return <PageGrid options={this.options()}/>
            return (<PageGrid
              options={this.options()}
              dataSource={this.props.pgd.data}
              pagination={this.options().pagination}
            />);
          } else {
            return <div>loading....</div>;
          }
        })()}

        <form id='myForm'>
          <input type='file' name='file' />
          <input type='text' name='Body' />
          <a href='javascript:void(0);' onClick={this.uploadHandle}>上传</a>
        </form>
      </div>
    );
  }

}
