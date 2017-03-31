/**
 * Created by NXQ on 10/22/2016.
 */

import React, { Component, PropTypes } from 'react';

import './TempCreditQueryDataGrid.scss';

import DataGrid from 'components/DataGrid';

import RaisedButton from 'material-ui/RaisedButton';

import _ from 'lodash';

/**
 * 使用场景：临时信用查询列表
 * 接口： 信用.md --> 经销商信用明细查询 --> /JXSXYMXB
 * 接口： 信用.md --> 经销商信用删除 --> /JXSXYMXB/:id
 */
export default class TempCreditQueryDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        columnOptions: [
          {
            label: '信用ID',
            attr: 'GUID'
          },
          {
            label: '有效期始',
            attr: 'YXQS'
          },
          {
            label: '有效期止',
            attr: 'YXQZ'
          },
          {
            label: '授信额度',
            attr: 'XYED'
          },
          {
            label: '有效额度',
            attr: 'YXED'
          },
          {
            label: '操作',
            render: row => (<div>
              <RaisedButton
                label={new Date(row.YXQZ) < new Date() ? '信用过期' : '撤销授信'}
                style={{ margin: 10 }}
                fullWidth={true}
                style={{minWidth:'70%'}}
                secondary
                disabled={new Date(row.YXQZ) < new Date() ? true : false}
                onTouchTap={this.handleTouchTapDelete(row)}
              />
            </div>)
          }
        ],
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 30,
          prePageCount: 1,
          pageLength: 4
        }
      }
    }
  }

  static defaultProps = {
    /**
     * 列表模式 '0'表示显示全部 '1'表示已生效 '2'表示未生效 '3'表示已过期
     */
    dataGridType: '0',  // 默认为显示全部
    dataGridStyle:{
      width:'54rem',
      height:'28.9rem'
    }


  };
  static propTypes = {
    /**
     * 卖方经销商id
     */
    AuthorizeOrganizationId: PropTypes.number.isRequired,
    /**
     * 买方经销商id
     */
    AuthorizedOrganizationId: PropTypes.number.isRequired,
    /**
     * 列表模式
     */
    dataGridType: PropTypes.string.isRequired

  };
  componentWillReceiveProps = (nextProps) => {
    if (_.has(nextProps.tempCreditQueryDataGrid.deleteObject, 'GUID')) {
      const dataSource = this.state.options.dataSource;
      _.remove(dataSource, nextProps.tempCreditQueryDataGrid.deleteObject);
      this.setState({
        options: Object.assign({}, this.state.options, {
          dataSource
        })
      })
    }
    if (nextProps.tempCreditQueryDataGrid.tempCreditQueryData) {
      this.setState({
        options: Object.assign({}, this.state.options, {
          dataSource: nextProps.tempCreditQueryDataGrid.tempCreditQueryData
        })
      })
    }
  };
  componentWillMount = () => {
    this.props.getTempCreditQueryData({
      AuthorizeOrganizationId: this.props.AuthorizeOrganizationId,
      AuthorizedOrganizationId: this.props.AuthorizedOrganizationId
    });
  };
  /**
   * 删除信用
   */
  handleTouchTapDelete = value => () => {
    this.props.deleteSingleTempCreditData(value);
  };

  render() {
    return (
      <div className='temp-credit-query-datagrid'>
        <DataGrid options={this.state.options} dataGridStyle={this.props.dataGridStyle} />
      </div>
    )
  }
}

