/**
 * Created by sjf on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import TextField from 'material-ui/TextField';
import RoleTree from 'components/MultiTree/RoleTree';
import AuthorityTree from 'components/MultiTree/AuthorityTree';
import FlatButton from 'material-ui/FlatButton';
import Error from 'material-ui/svg-icons/action/report-problem';
import './AuthorizationDialog.scss';

const creatRole = '添加角色';
const editRole = '编辑角色';
export default class AuthorizationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllPermissions: [],
      SelectPermissions: [],
      arrayData: [],
      name: this.props.title === editRole ? this.props.name : '',
      GUID: '',
      roleEditInfo: '',
      employeeRoleEditFetching: '',
      verify: this.props.verify,
      RoleTree: [],
      AuthorityTree: [],
      beforeName: this.props.title === editRole ? this.props.name : '',
      beforeAuthorityTree: [],
      AuthorityTreeChange: false,
      nameChange: false,
      beforeRoleTree: [],
      RoleTreeChange: false
    };
  }
  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    verify: PropTypes.bool,
    CreatRoleList: PropTypes.func,
    editRoleName: PropTypes.func,
    getRoleList: PropTypes.func,
    handleRoleDialogtoggler: PropTypes.func,
    editRoleList: PropTypes.func,
    open: PropTypes.bool,
    Permissions: PropTypes.bool,
    GUID: PropTypes.number,
    organizationId: PropTypes.number,
    titleStyle: PropTypes.object,
    contentStyle: PropTypes.object,
  }
  static defaultProps = {
    name: ''
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      name: nextProps.name,
      AllPermissions: nextProps.AllPermissions || [],
      SelectPermissions: nextProps.SelectPermissions || [],
      GUID: Number(nextProps.GUID) || null,
      roleEditInfo: nextProps.roleEditInfo,
      employeeRoleEditFetching: nextProps.employeeRoleEditFetching,
      verify: nextProps.verify
    });
  };
  handleChange = (event) => {
    if (this.props.title === creatRole) {
      this.setState({
        name: event.target.value
      });
    } else if (this.state.name !== event.target.value) {
      this.setState({
        nameChange: true,
        beforeName: this.state.name,
        name: event.target.value
      });
    }
  };
  validator = (component) => {
    const verify = {
      name: !!this.state.name,
      AuthorityTree: !!this.state.AuthorityTree.length
    };
    return component === 'ALL' ? verify : verify[component];
  };
  handleRoleChange= val => () => {
    if (val === 'RoleTree') {
      this.setState({
        RoleTreeChange: true,
        beforeRoleTree: this.state.RoleTree,
        RoleTree: this.refs.RoleTree.getWrappedInstance().getCheckedData(),

      });
    } else if (this.state.AuthorityTree !== this.refs.AuthorityTree.getWrappedInstance().getCheckedData()) {
      this.setState({
        AuthorityTreeChange: true,
        beforeAuthorityTree: this.state.AuthorityTree,
        AuthorityTree: this.refs.AuthorityTree.getWrappedInstance().getCheckedData()
      })
    }
  };
  handleCancal = () => {
    this.setState({
      nameChange: false,
      name: this.props.name,
      beforeName: this.props.name,
    });
    this.props.handleRoleDialogtoggler();
  }
  handleDisabled = () => {
    if (this.props.title === creatRole) {
      return !this.validator('name') && !this.validator('AuthorityTree')
    } else if (this.props.title === editRole) {
      return !this.state.AuthorityTreeChange && !this.state.nameChange
    }
    return !this.state.RoleTreeChange || !this.state.RoleTree.length > 0
  }
  handleColorChange = () => {
    if (this.props.title === creatRole) {
      return (this.validator('name') || this.validator('AuthorityTree')) ? '#00A0FF' : '#c4c4c4';
    } else if (this.props.title === editRole) {
      return (this.state.AuthorityTreeChange || this.state.nameChange) ? '#00A0FF' : '#c4c4c4';
    }
    return (this.state.RoleTreeChange && this.state.RoleTree.length > 0) ? '#00A0FF' : '#c4c4c4';
  }
  handleSave = () => {
    this.setState({
      verify: true
    });
    if (this.props.title === creatRole) {
      const validatorList = this.validator('ALL');
      const dealfn = Object.keys(validatorList).every(key => validatorList[key] === true);
      if (dealfn) {
        const createRole = this.refs.AuthorityTree.getWrappedInstance().getCheckedData();
        const dataArray = [];
        createRole.map((data) => {
          dataArray.push(data.MKYWID)
        });
        this.props.CreatRoleList(this.state.name, dataArray);
        this.setState({
          RoleTree: []
        })
        this.props.handleRoleDialogtoggler();
        this.props.getRoleList(this.props.organizationId, 'E', 1)
      }
    } else if (this.props.title === editRole) {
      const editRoles = this.refs.AuthorityTree.getWrappedInstance().getCheckedData();
      const dataArray = [];
      editRoles.map((data) => {
        dataArray.push(data.MKYWID)
      });
      if (this.state.name !== this.state.beforeName && this.state.beforeAuthorityTree === this.state.AuthorityTree) {
        this.props.editRoleName(this.state.GUID, this.state.name);
        this.setState({
          AuthorityTreeChange: false,
          nameChange: false,
          AuthorityTree: []
        })
        this.props.handleRoleDialogtoggler();
        this.props.getRoleList(this.props.organizationId, 'E', 1)
      } else if (this.state.beforeAuthorityTree !== this.state.AuthorityTree && this.state.name === this.state.beforeName) {
        this.props.editRoleList(this.state.GUID, dataArray);
        this.setState({
          AuthorityTreeChange: false,
          nameChange: false,
          AuthorityTree: []
        })
        this.props.handleRoleDialogtoggler();
        this.props.getRoleList(this.props.organizationId, 'E', 1)
      } else if (this.state.name !== this.state.beforeName && this.state.beforeAuthorityTree !== this.state.AuthorityTree) {
        this.props.editRoleName(this.state.GUID, this.state.name);
        this.props.editRoleList(this.state.GUID, dataArray);
        this.setState({
          AuthorityTreeChange: false,
          nameChange: false,
          AuthorityTree: []
        })
        this.props.handleRoleDialogtoggler();
        this.props.getRoleList(this.props.organizationId, 'E', 1)
      }
    } else {
      const roleList = this.refs.RoleTree.getWrappedInstance().getCheckedData();
      const dataArray = [];
      roleList.map((data) => {
        dataArray.push(data.GUID)
      });
      this.state.roleEditInfo(this.state.GUID, dataArray);
      this.props.handleRoleDialogtoggler();
    }
  };

  render() {
    const authorization = {
      height: '24.5rem',
      width: '100%',
      overflow: 'hidden',
      overflowY: 'auto',
      float: 'left',
      marginTop: '6px',
      padding: '6px',
      backgroundColor: 'rgba(25,161,255,0.08)'
    };
    const inputStyle = {
      width: '80%',
      borderBottom: '1px solid #ddd',
      height: '28px',
      innerHeight: '28px',
      paddingLeft: '4px'
    };

    const createRoleDisable = (this.validator('name') || this.validator('AuthorityTree') ? 'false' : 'true')
    const editRoleDisable = ((this.state.beforeName !== this.state.name ||
    this.state.beforeAuthorityTree !== this.state.AuthorityTree) ? 'false' : 'true');
    const actionsEdit = [
      <FlatButton
        label='取消'
        style={{ color: '#979797', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', letterSpacing: '0.57px' }}
        onTouchTap={this.handleCancal}
      />,
      <FlatButton
        label='保存'
        style={{
          fontFamily: 'SourceHanSansCN-Medium',
          fontSize: '16px',
          letterSpacing: '0.57px',
          color: (this.handleColorChange())
        }}
        disabled={this.handleDisabled()}
        onTouchTap={this.handleSave}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        titleStyle={{
          fontFamily: 'SourceHanSansCN-Medium', fontsize: '20px', color: 'rgba(0,0,0,0.87)', lineHeight: '1.4rem', ...this.props.titleStyle }}
        contentStyle={{ width: '57.1rem', height: '42.7rem', maxWidth: '100rem', ...this.props.contentStyle }}
        actions={actionsEdit}
        modal={false}
        open={this.props.open}
        bodyStyle={{ overflowY: 'hidden' }}
      >
        <div className='roleDialog'>
          {
              (
                () => {
                  if (this.props.Permissions) {
                    return (<div style={{ marginBottom: 10, height: 76 }}>
                      <div style={{ height: '48px', lineHeight: '48px' }}>
                        <span style={{ marginRight: 15, fontFamily: 'SourceHanSansCN-Regular', fontSize: '16px', color: '#979797' }}>角色名称 ：</span>
                        <TextField
                          id='authorization' name='authorization' defaultValue={this.state.name}
                          inputStyle={inputStyle} underlineStyle={{ width: 0 }} onChange={this.handleChange}
                          style={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', color: '#4A4A4A' }}
                        />
                        <span>
                          <FlatButton
                            label='请设置角色名称' labelPosition='before'icon={<Error />}
                            style={{
                              display: this.state.verify && !this.validator('name') ? 'inline-block' : 'none',
                              color: 'red',
                              cursor: 'default' }} hoverColor='#fff'
                          />
                        </span>
                      </div>
                      <div style={{ height: '36px', lineHeight: '36px' }}>角色权限:
                        <span>
                          <FlatButton
                            label='请设置角色权限' labelPosition='before' icon={<Error />}
                            style={{
                              display: this.state.verify && !this.validator('AuthorityTree') ? 'inline-block' : 'none',
                              color: 'red',
                              cursor: 'default' }} hoverColor='#fff'
                          />
                        </span>
                      </div>
                    </div>)
                  }
                  return null;
                }
              )()
            }
          <div>
            {
                (
                  () => {
                    const roleSet = '角色设置';
                    if (this.props.title === roleSet) {
                      return (<div style={authorization} onChange={this.handleRoleChange('RoleTree')}>
                        <RoleTree ref='RoleTree' userId={this.props.GUID} />
                      </div>)
                    }
                    return (<div style={authorization} onChange={this.handleRoleChange('AuthorityTree')}>
                      <AuthorityTree ref='AuthorityTree' jsId={this.state.GUID} />
                    </div>)
                  }
                )()
              }

          </div>
          <br />
        </div>
      </Dialog>
    )
  }
}
