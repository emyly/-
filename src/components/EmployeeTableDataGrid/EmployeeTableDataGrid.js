/**
 * Created by sjf on 2016/10/21.
 */
import React, { Component, PropTypes } from 'react';
import EditButton from './EditButtonDialog';
import RaisedButton from 'material-ui/RaisedButton';
import StandardDataGrid from 'components/StandardDataGrid';
import PageGrid from 'components/PageGrid';
import AuthorizationButton from './AuthorizationButtonDialog';
import EmployeeInfoDialog from './EmployeeInfoDialog';
import DeleateButton from './DeleateButton'
import './EmployeeTableDataGrid.scss';
/**
 * 使用场景：企业员工列表
 */

export default class EmployeeTableDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Add_employee_dialog_open: false,
      verify: false,
      openError: false,
    }
  }
  /* Load Organization EmployeeList here */
  componentWillMount() {
    /* TODO: orgId should be passed in from parent compoent */
    this.props.fetchEmployeeList(this.props.globalStore.organizationId, 1);
  }

  static defaultProps = {
    tableType: '1', // '1'显示全部;'2'显示禁用;'3'显示全部
    currentPageCount: '1', // 第一页
    pageCountPerPage: '10'// 一页10条数据
  };

  static propTypes = {
    // 当前第几页
    // currentPageCount: PropTypes.string.isRequired,
    // // 每页显示多少条
    // pageCountPerPage: PropTypes.string.isRequired,
    /* this.props.createEmployeeRemote(orgId) */
    globalStore: PropTypes.object,
    employeeList: PropTypes.object,
    currentPage: PropTypes.number,
    roleEditInfo: PropTypes.func,
    employeeRoleEditFetching: PropTypes.func,
    createEmployeeRemote: PropTypes.func.isRequired,
    /* this.props.fetchEmployeeList(orgId) */
    fetchEmployeeList: PropTypes.func.isRequired,
    /* this.props.editEmployeeInfo(YHB) */
    editEmployeeInfo: PropTypes.func.isRequired,
    /* this.props.editEmployeeInfo(id) */
    deleteEmployeeRemote: PropTypes.func.isRequired,
    editEmployeeInfoFetching: PropTypes.func,
    createEmployeeFetching: PropTypes.func,
    deleteEmployeeRemoteFetching: PropTypes.func,
  };
  options = () => ({
    columnOptions: [
      {
        label: '员工ID',
        attr: 'GUID',
      },
      {
        label: '员工姓名',
        attr: 'YHXM',
      },
      {
        label: '操作',
        formater: (attr, value) => {
          if (value !== null) {
            return (<div>
              <EditButton
                EmployeeName={value.YHXM} Password={value.MM} Number={value.SJHM}
                StateID={value.ZTBS} editEmployeeInfo={this.props.editEmployeeInfo} OrderId={value.GUID}
              />
              <AuthorizationButton GUID={value.GUID} roleEditInfo={this.props.roleEditInfo} fetchEmployeeList={this.props.fetchEmployeeList} />
              <DeleateButton OrderId={value.GUID} deleteEmployeeRemote={this.props.deleteEmployeeRemote} />
            </div>);
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
    dataSource: this.props.employeeList.result.Result.YHB || [],
    showIndex: true,
    pagination: {
      currentPage: this.props.currentPage || 1,
      totalCount: this.props.employeeList.result.Result.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.props.fetchEmployeeList(this.props.globalStore.organizationId, page);
      }
    }
  });
  handleAddEmployeeDialogToggle = () => {
    this.setState({
      Add_employee_dialog_open: !this.state.Add_employee_dialog_open,
      verify: false,
    });
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.employeeRoleIsEditing) {
      this.props.fetchEmployeeList(this.props.globalStore.organizationId, 1);
      this.props.employeeRoleEditFetching();
    }
    if (nextProps.employeeIsEditing) {
      this.props.fetchEmployeeList(this.props.globalStore.organizationId, 1);
      this.props.editEmployeeInfoFetching();
    }
    if (nextProps.employeeIsCreating) {
      this.props.fetchEmployeeList(this.props.globalStore.organizationId, 1);
      this.props.createEmployeeFetching();
    }
    if (nextProps.employeeIsDeleting) {
      this.props.fetchEmployeeList(this.props.globalStore.organizationId, 1);
      this.props.deleteEmployeeRemoteFetching();
    }
  }
  render() {
    const filter = <div />;
    const actions =
      (<nav>
        <RaisedButton
          label='添加员工'
          style={{ marginLeft: '5px' }}
          onTouchTap={this.handleAddEmployeeDialogToggle}
          buttonStyle={{ backgroundColor: '#00A0FF' }}
          labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
        />
      </nav>);
    return (
      <div className='employee'>
        <StandardDataGrid title='员工/组织机构管理' message='...' filter={filter} actions={actions} filterTitle='' iconPosition='-120px -90px'>
          <EmployeeInfoDialog
            title='添加员工'
            open={this.state.Add_employee_dialog_open}
            handleEmployeeDialogToggle={this.handleAddEmployeeDialogToggle} createEmployeeRemote={this.props.createEmployeeRemote}
            verify={this.state.verify}
          />
          <PageGrid options={this.options()} dataSource={this.props.employeeList.result.Result.YHB} pagination={this.options().pagination} />
        </StandardDataGrid>

      </div>
    )
  }
}
