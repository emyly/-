/**
 * Created by sjf on 2016/11/1.
 */
import React, { Component, PropTypes } from 'react';
import PageGrid from 'components/PageGrid';
import EditButton from './SaleEditButtonDialog';
import './SaleTable.scss';

/**
 * 使用场景：企业角色管理
 */
export default class SaleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // DataArray:'',
      requredStatus: 0,
      hospital: []

    }
  }
  static propTypes = {
    // 列表模式 1为销售代表 2.销售助理
    requredStatus: PropTypes.number.isRequired,
    organizationId: PropTypes.number,
    currentPage: PropTypes.number,
    totalCount: PropTypes.number,
    agencyListData: PropTypes.array,
    saleListData: PropTypes.array,
    fecthSalelist: PropTypes.func,
    CreatList: PropTypes.func,
    EditList: PropTypes.func,
    AgencyList: PropTypes.func,
    globalStore: PropTypes.object,

  };
  static defaultProps = {
    requredStatus: 0
  };
  componentWillReceiveProps(nexValue) {
    this.setState({ requredStatus: nexValue.requredStatus });
  }
  handleMap = value =>
    // return Object.prototype.toString.call(value)
    value.map((dataValue, dataValueIndex) => <p key={dataValueIndex}>{dataValue.GLJXSNAME}</p>);

  options = () => ({
    columnOptions: [
      {
        label: '员工ID',
        attr: 'XSRYID',
      },
      {
        label: '员工姓名',
        attr: 'XSRYNAME',
      },
      {
        label: '关联医院',
        formater: (attr, value) => {
          if (value !== null) {
            return this.handleMap(value.GLJXS);
          }
        }
      },
      {
        label: '操作',
        formater: (attr, value) => {
          if (value !== null) {
            return (<div>
              <EditButton
                organizationId={this.props.organizationId} saleId={value.XSRYID} tabValue={this.state.requredStatus}
                CreatList={this.props.CreatList} EditList={this.props.EditList}
                name={value.XSRYNAME} AgencyList={this.props.AgencyList} agencyListData={this.props.agencyListData}
                hospital={value.GLJXS} requredStatus={this.props.requredStatus}
              />
            </div>)
          }
        }
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,
    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    dataSource: this.props.saleListData || [],
    showIndex: true,
    pagination: {
      currentPage: this.props.currentPage || 1,
      totalCount: this.props.totalCount || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.props.fecthSalelist(this.props.globalStore.organizationId, this.state.orderState, page);
      }
    }
  });

  render() {
    return (
      <PageGrid options={this.options()} dataSource={this.props.saleListData} pagination={this.options().pagination} />
    )
  }
}
