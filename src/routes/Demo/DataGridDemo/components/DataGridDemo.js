import React, { Component, PropTypes } from 'react';
import DataGrid from 'components/DataGrid';
import RaisedButton from 'material-ui/RaisedButton';


export default class DataGridDemo extends Component {


  constructor(props) {
    super(props);
  }

  handleTouchTap = () => {
    alert(123);
  };

  options = {
    columnOptions: [
      {
        label: '姓名',
        attr: 'name'
      },
      {
        label: '状态',
        attr: 'status'
      },
      {
        label: '年龄',
        attr: 'age'
      },
      {
        label: '操作',
        render: <div>
          <RaisedButton label='编辑' style={{ marginRight: 15 }} onTouchTap={this.handleTouchTap} />
          <RaisedButton label='删除' style={{ marginRight: 15 }} onTouchTap={this.handleTouchTap} />
        </div>
      }
    ],
    dataSource: [
      {
        name: 'John Smith',
        status: 'Employed',
        age: 12,
        selected: true,
      },
      {
        name: 'Randal White',
        status: 'Unemployed',
        age: 12,
      },
      {
        name: 'Stephanie Sanders',
        status: 'Employed',
        age: 12,
        selected: true,
      },
      {
        name: 'Steve Brown',
        age: 12,
        status: 'Employed',
      },
      {
        name: 'Joyce Whitten',
        age: 18,
        status: 'Employed',
      },
      {
        name: 'Samuel Roberts',
        status: 'Employed',
        age: 10,
      },
      {
        name: 'Adam Moore',
        age: 12,
        status: 'Employed',
      }
    ],
    showIndex: true,
    tableBodyAttrs: {
      deselectOnClickaway: false
    },
  };

  render() {
    return (
      <div>
        <DataGrid options={this.options} />
      </div>
    )
  }

}
