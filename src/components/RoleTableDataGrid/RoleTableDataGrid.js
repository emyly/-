/**
 * Created by sjf on 2016/10/21.
 */
import React, { Component, PropTypes } from 'react';
import AuthorizationRaisedButton from './AuthorizationRaisedButtonDialog';
import ForbiddenButton from 'components/ForbiddenButtonDialog';
import StandardDataGrid from 'components/StandardDataGrid';
import RaisedButton from 'material-ui/RaisedButton';
import PageGrid from 'components/PageGrid';
import AuthorizationDialog from 'components/AuthorizationDialog';
import './RoleTableDataGrid.scss';


/**
 * 使用场景：企业角色管理
 */
export default class RoleTableDataGrid extends Component {
  page=1;
  constructor(props) {
    super(props);
    // 角色 => 所有角色明细查询
    this.state = {
      add_employee_dialog_open: false,
      verify: false,
      title: ''
    };
  }

  handleAddRoleDialogtoggler = () => {
    this.setState({
      add_employee_dialog_open: !this.state.add_employee_dialog_open,
      verify: false,
      title: '添加角色'
    });
  };
  static defaultProps = {
    tableType: '1', // '1'显示全部;'2'显示禁用;'3'显示全部
    currentPageCount: '1', // 第一页
    pageCountPerPage: '10', // 一页10条数据
    organizationId: '3234234'
  };
  static propTypes = {
    // // 当前第几页
    // currentPageCount: PropTypes.string.isRequired,
    // // 每页显示多少条
    // pageCountPerPage: PropTypes.string.isRequired,
    organizationId: PropTypes.string.isRequired,
    getRoleData: PropTypes.func,
    roleSet: PropTypes.func,
    globalStore: PropTypes.object,
    RoleList: PropTypes.func,
    creatRoleListFetching: PropTypes.func,
    editRoleListFetching: PropTypes.func,
    editIsFetching: PropTypes.bool,
    creatIsFetching: PropTypes.bool,
    roleData: PropTypes.object,
    currentPage: PropTypes.number,
    creatRoleListData: PropTypes.array,
    AllPermissions: PropTypes.array,
    SelectPermissions: PropTypes.array,
    editRoleList: PropTypes.func,
    creatRoleList: PropTypes.func,
    editRoleName: PropTypes.func,
  };
  componentWillMount() {
    this.props.getRoleData(this.props.globalStore.organizationId, 'E', 1);
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.creatIsFetching) {
      this.props.getRoleData(this.props.globalStore.organizationId, 'E', 1);
      this.props.creatRoleListFetching();
    }
    if (nextProps.editIsFetching) {
      this.props.getRoleData(this.props.globalStore.organizationId, 'E', 1);
      this.props.editRoleListFetching();
    }
  };
  options = () => ({
    columnOptions: [
      {
        label: '角色ID',
        attr: 'GUID',
      },
      {
        label: '角色名称',
        attr: 'JSMC',
      },
      {
        label: '操作',
        render: (value) => {
          if (value !== null) {
            return (<div style={{ display: value.GLJS === '1' ? 'none' : 'inline-block' }}>
              <AuthorizationRaisedButton
                editRoleListFetching={this.props.editRoleListFetching}
                editRoleName={this.props.editRoleName}
                editIsFetching={this.props.editIsFetching}
                name={value.JSMC} editRoleList={this.props.editRoleList}
                getRoleList={this.props.getRoleData} SelectPermissions={this.props.SelectPermissions}
                GUID={value.GUID} RoleList={this.props.RoleList} AllPermissions={this.props.AllPermissions}
                organizationId={this.props.globalStore.organizationId}
              />
              <ForbiddenButton
                roleSet={this.props.roleSet}
                GUID={value.GUID} label={value.ZTBS === 'E' ? '禁用' : '恢复'}
                page={this.page} organizationId={this.props.globalStore.organizationId} getRoleData={this.props.getRoleData}
              />
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
    dataSource: this.props.roleData.JSB || [],
    showIndex: false,
    pagination: {
      currentPage: this.props.currentPage || 1,
      totalCount: this.props.roleData.Total || 0,
      prePageCount: 15,
      pageLength: 4,
      pageFunc: (page) => {
        this.page = page;
        this.props.getRoleData(this.props.globalStore.organizationId, 'E', page);
      }
    }
  });
  render() {
    const filter =
      <div />;
    const actions =
        (<nav>
          <RaisedButton
            label='添加角色'
            style={{ marginLeft: '5px' }}
            onTouchTap={this.handleAddRoleDialogtoggler}
            buttonStyle={{ backgroundColor: '#FFA95D' }}
            labelStyle={{ color: '#fff', fontFamily: 'SourceHanSansCN-Medium', fontSize: 14 }}
          />
        </nav>);
    return (
      <div className='employee'>
        <StandardDataGrid title='角色权限管理' message='...' filter={filter} actions={actions} filterTitle='' iconPosition='-90px -90px'>
          <AuthorizationDialog
            creatIsFetching={this.props.creatIsFetching}
            creatRoleListFetching={this.props.creatRoleListFetching}
            verify={this.state.verify} title={this.state.title}
            getRoleList={this.props.getRoleData}
            creatRoleListData={this.props.creatRoleListData}
            CreatRoleList={this.props.creatRoleList}
            open={this.state.add_employee_dialog_open}
            handleRoleDialogtoggler={this.handleAddRoleDialogtoggler} Permissions AllPermissions={this.props.AllPermissions}
            organizationId={this.props.globalStore.organizationId}
          />
          <PageGrid options={this.options()} dataSource={this.props.roleData.JSB} pagination={this.options().pagination} />
        </StandardDataGrid>
      </div>
    )
  }
}
