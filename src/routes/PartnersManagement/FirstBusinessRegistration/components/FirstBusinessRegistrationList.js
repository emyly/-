/**
 * Created by liuyali on 2016/11/22.
 */
/**
 * Created by liuyali on 2016/10/21.
 */


import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PageGrid from '../../../../components/PageGrid';
import Visibility from 'material-ui/svg-icons/action/visibility'
import { Link } from 'react-router'

import StandardDataGrid from 'components/StandardDataGrid';
import moment from 'lib/moment.js'

import './FirstBusinessRegistration.scss';

export default class FirstBusinessRegistrationList extends Component {

  constructor(props) {
    super(props);
  }
  static contextTypes = {
    router: React.PropTypes.object,
  };
  static propTypes = {
    firstBusinessRegistrationList: PropTypes.object.isRequired,
    getRelatedOrg: PropTypes.func.isRequired,
    globalStore: PropTypes.object.isRequired,
  }

  handleClick = () => () => {
    this.context.router.push('/firstBusinessRegistrationList/register');
  }
  getTableData = (tableData) => {
    const dealData = tableData;
    dealData.map((org, index) => {
      if (Object.prototype.toString.call(org) === '[object Object]') {
        org.operator = (<Link
          to={{
            pathname: `/firstBusinessRegistrationList/${org.orgId}`,
            state: { status: org.status, getEnterpriseInformation: this.props.getEnterpriseInformation }
          }}
        >
          <FlatButton label='查看详情' style={{ backgroundColor: ' #00BD9C ', color: '#fff' }} />
        </Link>)
      }
    });
    // 合作伙伴名称 合作伙伴类型  申请时间  申请状态  进度描述
    return {
      columnOptions: [
        {
          label: 'ID',
          attr: 'orgId',
          style: { textAlign: 'center' }
        },
        {
          label: '伙伴名称',
          attr: 'cooperatorName',
          style: { textAlign: 'center' }
        },
        {
          label: '伙伴类型',
          attr: 'cooperatorType',
          style: { textAlign: 'center' }
        }, {
          label: '申请日期',
          attr: 'date',
          formater: (value) => {
            if (value === 0) {
              return '-';
            }
            return moment(value).format('YYYY-MM-DD  HH:mm:ss')
          },
          style: { textAlign: 'center' }
        }, {
          label: '申请状态',
          attr: 'status',
          style: { textAlign: 'center' }
        }, {
          label: '操作',
          attr: 'operator',
          style: { textAlign: 'center' }
        }
      ],
      dataSource: dealData || [],
      tableHeaderAttrs: {
        displaySelectAll: false,
        adjustForCheckbox: false
      },
      tableBodyAttrs: {
        displayRowCheckbox: false,
        stripedRows: true,
        showRowHover: true
      },
      showIndex: false,
      pagination: {
        currentPage: this.props.firstBusinessRegistrationList.currentPage || 1,
        totalCount: this.props.firstBusinessRegistrationList.total || 0,
        prePageCount: 10,
        pageLength: 4,
        pageFunc: (page) => {
          this.props.getRelatedOrg(page, this.props.globalStore.organizationId);
        }
      }
    };
  }
  componentWillMount() {
    this.props.getRelatedOrg(1, this.props.globalStore.organizationId);
  }
  render() {
    const actions =
        (<nav>
          <RaisedButton
            label='添加登记'
            primary
            style={{ marginLeft: '5px' }}
            onTouchTap={this.handleClick()}
          />
        </nav>)
      ;
    return (

      <div style={{ height: '100%' }}>
        <StandardDataGrid
          iconPosition='-120px -30px'
          title='首次经营登记' message='...' actions={actions} filterTitle=''
        >
          <PageGrid options={this.getTableData(this.props.firstBusinessRegistrationList.data)} />
        </StandardDataGrid>
      </div>
    )
  }
}
