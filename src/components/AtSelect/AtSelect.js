/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './AtSelect.scss'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import MultiTree from 'components/MultiTree';
import Avatar from 'material-ui/Avatar';
import SocialGroup from 'material-ui/svg-icons/social/group';
import { getImgSrc } from 'lib/utils';
import Chip from 'material-ui/Chip';
import _ from 'lodash';
/**
 * 使用场景：选择@谁
 */
export default class AtSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dialogOpen: false,
      atSelectData: []
    };
    this.choiceUser = [];
    this.choiceUserName = [];
    this.company = [];
  }
  static defaultProps = {
    isSingle: false,
    title: '选择@谁',
    isShowAddIcon: true,
    isShowHeadIcon: true,
    isShowError: false,
    isShowOldSelect: true,
    isClear: false,
    isDoctor: false
  }

  static propTypes = {
    // 当前组织机构ID
    organizationId: PropTypes.number,
    style: PropTypes.object,
    callback: PropTypes.func,
    isSingle: PropTypes.bool, // 是否单选
    title: PropTypes.string,
    dataSource: PropTypes.array, // 提供数据源
    errorText: PropTypes.bool, // 报错
    inputStyle: PropTypes.object,
    AtAddIcon: PropTypes.object, // 改变图标位置
    underlineStyle: PropTypes.object,
    className: PropTypes.string,
    hintStyle: PropTypes.object,
    errorStyle: PropTypes.object,
    isShowHeadIcon: PropTypes.bool,
    isShowError: PropTypes.bool,
    isShowOldSelect: PropTypes.bool,
    /**
     * 是否需要显示加号ICON默认为显示
     */
    isShowAddIcon: PropTypes.bool,
    divWidthStyle: PropTypes.object,
    isClear: PropTypes.bool,         // 是否清空
    isDoctor: PropTypes.bool,         // 是否是医生
  }

  handleClick = (event, isInputChecked) => {
    const value = JSON.parse(event.target.value);
    this.choiceUserName = [value.name]
    this.choiceUser = [value]
    this.handleDialogConfirm()
  }

  handleDialogConfirm = () => {
    if (this.props.isSingle !== true) {
      this.choiceUserName = [];
      this.choiceUser = this.refs.myMultiTree.getCheckedData().filter((sub) => {
        if (sub.id.toString().indexOf('@') == -1) return true;
      })
      this.choiceUser.forEach(user => this.choiceUserName.push(user.name));
    }
    if (this.props.isDoctor) {
      this.choiceUser = this.choiceUser.slice(0, 4);
    }
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback(this.choiceUser)
    }
    this.setState({
      value: this.choiceUserName.length ? this.choiceUserName.join(';') : '',
      dialogOpen: false
    });
  }

  // 处理parent关系
  HandleTree = (id, array) => {
    const ctx = this;
    if (array.length) {
      let restArray = [],
        newArray = array.slice(0);
      array.forEach((o, i) => {
        if (o.parent == id) {
          restArray.push(o);
          newArray.splice(newArray.indexOf(o), 1);
        }
      })
      restArray.forEach((o) => {
        o.children = ctx.HandleTree(o.id, newArray);
      });
      return restArray;
    }
    return [];
  }

  handleList = array => array.map((data) => {
    if (data.children.length) {
      const sub_listItem = this.handleList(data.children);
      return (<ListItem
        key={data.id} leftAvatar={this.genAvatar(data)} primaryText={this.genLabel(data)}
        nestedItems={sub_listItem}
        primaryTogglesNestedList
      />)
    } else if (data.id.toString().indexOf('@') != -1) {
      return (<ListItem
        key={data.id} leftAvatar={this.genAvatar(data)} primaryText={this.genLabel(data)}
        primaryTogglesNestedList
      />)
    } else {
      return (<ListItem
        key={data.id}
        leftAvatar={this.genAvatar(data)}
        leftCheckbox={<Checkbox
          value={JSON.stringify(data)}
          onCheck={this.handleClick}
          defaultChecked={this.choiceUser.some((user) => { if (user.id === data.id) return true; })}
        />}
        primaryText={this.genLabel(data)}
      />)
    }
  })

  componentWillMount() {
    if (this.props.organizationId && !this.props.dataSource) {
      this.props.getAtSelectDate(this.props.organizationId)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.organizationId !== this.props.organizationId && !this.props.dataSource) {
      this.props.getAtSelectDate(nextProps.organizationId)
    }
    if (nextProps.isClear && nextProps.isClear !== this.props.isClear) {
      this.choiceUser = [],
      this.choiceUserName = []
    }
  }

  componentWillUnmount() {
    this.choiceUser = [],
    this.choiceUserName = []
  }

  genAvatar = (item) => {
    const wdid = item.WDID;
    if (_.isNil(wdid)) {
      return (<Avatar size={32} icon={<SocialGroup />} style={{ marginLeft: 30, marginTop: 4, backgroundColor: '#0b97c4', }} />);
    }
    const imgSrc = getImgSrc(wdid);
    return (<Avatar size={32} src={imgSrc} icon={<SocialGroup />} style={{ marginLeft: 30, marginTop: 4, backgroundColor: '#0b97c4' }} />);
  }

  genLabel = item => <span style={{ marginLeft: 20 }}>{item.name}</span>

  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }
  handleRequestDelete = (index) => {
    this.choiceUser.splice(index, 1);
    const selectedValue = this.state.value;
    selectedValue.split(';').splice(index, 1).join(';');
    this.props.callback(this.choiceUser);
    this.setState({ value: selectedValue });
  }

  renderChip() {
    return this.choiceUser.map((value, index) => {
      let imgSrc;
      if (this.props.isShowHeadIcon && value.WDID !== null) {
        imgSrc = getImgSrc(value.WDID);
      }
      return (
        <Chip
          key={value.id}
          style={{ float: 'left', height: '30px', marginBottom: '5px', marginRight: '5px' }}
          onRequestDelete={() => this.handleRequestDelete(index)}
        >
          {
        (() => {
          if (value.WDID) {
            return (
              <Avatar src={this.props.isShowHeadIcon ? imgSrc : null} style={{ display: this.props.isShowHeadIcon ? 'block' : 'none' }} />
            );
          } else if (this.props.isShowHeadIcon) {
            return (
              <Avatar>
                {`${value.WDID === null ? value.name.substring(0, 1) : ''}`}
              </Avatar>
            );
          }
        })()
      }
          {value.name}
        </Chip>
      );
    });
  }
  render() {
    const actions = [<FlatButton label='关闭' onTouchTap={this.handleDialogClose} />,
      <FlatButton label='确定' primary onTouchTap={this.handleDialogConfirm} />]
    if (!this.props.isSingle) actions.push(<FlatButton style={{ float: 'left' }} label='清空' secondary onTouchTap={() => { this.choiceUser = []; this.setState({ value: '', dialogOpen: false }) }} />)
    return (
      <div style={{ display: 'flex' }}>
        {
          (() => {
            if (this.props.isShowOldSelect) {
              return (
                <div onClick={() => this.setState({ dialogOpen: true })} className='inforFlex' style={this.props.divWidthStyle}>
                  <TextField
                    hintStyle={this.props.hintStyle}
                    className={this.props.className} value={this.state.value} multiLine
                    rowsMax={8} hintText={this.props.title} style={this.props.style} errorText={this.props.errorText} errorStyle={this.props.errorStyle} inputStyle={this.props.inputStyle} underlineStyle={this.props.underlineStyle}
                  />
                  {
                  (() => {
                    if (this.props.isShowAddIcon) {
                      return <span className='atSelectIcon atSlectAddIcon' style={this.props.AtAddIcon} />
                    }
                  })()
                }
                </div>
              );
            } else {
              return (
                <div style={{ display: 'flex', flowFlow: 'row nowrap', alignItems: 'center' }}>
                  <div onClick={() => this.setState({ dialogOpen: true })} className='inforFlex' style={this.props.divWidthStyle}>
                    <img
                      src='/CreateOrder/AddIcon.png' alt=''
                      style={{ width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        marginBottom: '5px',
                        border: this.props.isShowError ? '1px solid #FF7C76' : null,
                        borderRadius: '15px' }}
                    />
                    {/* <img style={{border:this.props.isShowError?'1px solid #FF7C76': null,background: '#EBEBEB', borderRadius: '26px', width:'2.1rem', height: '2.1rem'}} src="/CreateOrder/Group10.png"></img>*/}
                    {
                        (() => {
                          if (this.props.isShowAddIcon) {
                            return <span className='atSelectIcon atSlectAddIcon' style={this.props.AtAddIcon} />
                          }
                        })()
                      }
                  </div>
                  <div style={{ display: 'flex', height: 'auto', alignItems: 'center', flexFlow: 'row wrap' }}>
                    {this.renderChip()}
                  </div>
                </div>

              );
            }
          })()
        }

        <Dialog
          title={this.props.title || '@谁'}
          actions={actions}
          modal
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          { this.props.isSingle ? <List style={{ height: 350, overflowY: 'auto' }}>
            {
            this.handleList(this.HandleTree('0', this.props.dataSource || this.props.atSelect.atSelectData))
          }</List>
          : <MultiTree
            dataSource={this.props.dataSource || this.props.atSelect.atSelectData}
            checkedData={this.choiceUser}
            ref='myMultiTree'
            keyAttr='id'
            parentAttr='parent'
            leftAvatar={this.genAvatar}
            labelAttr={this.genLabel}
            style={{ height: 350, overflowY: 'auto' }}
          />
        }
        </Dialog>
      </div>
    )
  }
}

