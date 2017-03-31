/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/22.
 */
import React, { Component, PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';
import _ from 'lodash';
import { getImgSrc } from 'lib/utils';
// import {users, getCurrentUser, setCurrentUser} from 'api/global';
let users,
  getCurrentUser,
  setCurrentUser;

/**
 * 分页表格组件
 */
export default class UserList extends Component {
  static propTypes = {
    style: PropTypes.object,
    changeUser: PropTypes.string,
    // dataSource: React.PropTypes.array.isRequired,
    // showIndex: React.PropTypes.bool
  };

  componentWillMount() {
    this.setState({ users, currentUser: getCurrentUser() });
  }

  componentWillReceiveProps(nextProp) {
    console.log(nextProp);
  }

  genAvatar = (wdId) => {
    if (_.isNil(wdId)) {
      return (
        <Avatar
          size={32}
          icon={<SocialPerson />}
          style={{ marginLeft: 30, marginTop: 4, backgroundColor: '#0b97c4' }}
        />
      );
    }

    return (
      <Avatar
        size={32}
        src={getImgSrc(wdId)}
      />
    );
  };

  changeUser = (e, v) => {
    setCurrentUser(this.state.users.find(u => u.GUID === v));
    this.setState({ users, currentUser: getCurrentUser() });
    this.props.changeUser(getCurrentUser())
  };

  genMenuItems = () => this.state.users.map((user, ind) => (
    <MenuItem value={user.GUID} key={user.GUID} >
      <ListItem
        primaryText={user.YHXM} leftAvatar={this.genAvatar(user.WDID)}
        style={this.state.currentUser.GUID === user.GUID ? { color: 'blue' } : {}}
      />
    </MenuItem>
      ))

  render() {
    return (
      <div style={{ ...this.props.style }}>
        {/* <DropDownMenu value={this.state.currentUser.GUID} onChange={this.changeUser}>*/}
        <IconMenu
          iconButtonElement={this.genAvatar(this.state.currentUser.WDID)}
          onChange={this.changeUser}
          value={this.state.currentUser.GUID}
          children={this.genMenuItems()}
        />
        {/* </DropDownMenu>*/}
      </div>
    )
  }
}
