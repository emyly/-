/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/10/31.
 */
import React, { Component, PropTypes } from 'react';
// import MultiTree from 'components/MultiTree';
import RoleTree from 'components/MultiTree/RoleTree';
import AuthorityTree from 'components/MultiTree/AuthorityTree';
import Avatar from 'material-ui/Avatar';
import SocialGroup from 'material-ui/svg-icons/social/group';
import _ from 'lodash';

const log = require('debug')('app:MultiTreeDemo');

/**
 * 3态树例子
 *
 * @export
 * @class MultiTreeDemo
 * @extends {Component}
 */
export default class MultiTreeDemo extends Component {

  static propTypes = {
    getData: PropTypes.func.isRequired,
    mtree: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({ jsId: 0, userId: 999 });
    this.props.getData();
  }

  genAvatar = (item) => {
    const wdid = item.WDID;
    if (_.isNil(wdid)) {
      return (
        <Avatar
          size={32}
          icon={<SocialGroup />}
          style={{ marginLeft: 30, marginTop: 4, backgroundColor: '#0b97c4' }}
        />
      );
    }
    const path = '/api_firstgridFS/WDB';
    const pairs = {
      Token: '9118f9c6538990dc406ea2b728e8a6b3',
      ApplicationID: 10000,
      ClientID: 8888888,
      Timestamp: 1479279583725,
      Signature: 'bd5195c183fe62e7df5b377e8420d231',
      Body: '',
    };

    const imgSrc = `${path}/${wdid}?${_.reduce(pairs, (sum, v, k) => `${sum}&${k}=${v}`, '')}`;
    return (
      <Avatar
        size={32}
        src={imgSrc}
        style={{ marginLeft: 30, marginTop: 4, backgroundColor: '#0b97c4' }}
      />
    );
  };

  genLabel = item => <span style={{ marginLeft: 20 }}>{item.NAME}</span>;

  handlerLog = () => {
    log(this.refs.myMultiTree.getCheckedData().map(sub => JSON.stringify(sub)));
  };

  handlerRoleLog = () => {
    log(this.refs.myRoleTree.getWrappedInstance().getCheckedData().map(sub => JSON.stringify(sub)));
  };

  handlerAuthorityLog = () => {
    log(this.refs.myAuthorityTree.getWrappedInstance().getCheckedData().map(sub => JSON.stringify(sub)));
  };

  addJsId = () => {
    const jsId = this.state.jsId + 1;
    this.setState(Object.assign({}, this.state, { jsId }));
    log(jsId);
  }

  divJsId = () => {
    const jsId = this.state.jsId - 1;
    this.setState(Object.assign({}, this.state, { jsId }));
    log(jsId);
  }

  addUserId = () => {
    const userId = this.state.userId + 1;
    this.setState(Object.assign(this.state, { userId }));
    log(this.state);
  }

  divUserId = () => {
    const userId = this.state.userId - 1;
    this.setState(Object.assign(this.state, { userId }));
    log(this.state);
  }

  render() {
    log('render...');
    return (
      <div>
        <div style={{ float: 'left', backgroundColor: '#ffddcc', width: 300 }}>
          <button onClick={this.handlerRoleLog} >获取选中角色</button>
          <button onClick={this.addUserId} >用户id++</button>
          <button onClick={this.divUserId} >用户id--</button>
          <RoleTree
            ref='myRoleTree'
            userId={this.state.userId}
            style={{ width: 300 }}
            itemStyle={{ height: 30 }}
          />
        </div>

        <div style={{ float: 'left', backgroundColor: '#ddccbb', width: 300 }}>
          <button onClick={this.handlerAuthorityLog} >获取选中权限</button>
          <button onClick={this.addJsId} >角色id++</button>
          <button onClick={this.divJsId} >角色id--</button>
          <AuthorityTree
            ref='myAuthorityTree'
            jsId={this.state.jsId}
            style={{ width: '300px', height: '100px' }}
            itemStyle={{ height: 30 }}
          />
        </div>
        {/* <div style={{ marginLeft: 0 }} >
          <button onClick={this.handlerLog} >获取checked</button>
          <MultiTree dataSource={this.props.mtree.data}
            checkedData={this.props.mtree.checkedData}
            ref='myMultiTree'
            style={{ width: '300px', height: '100px' }}
            itemStyle={{ height: 30 }}
            labelAttr={this.genLabel}
            keyAttr='GUID'
            parentAttr='PARENT'
            leftAvatar={this.genAvatar} />;
        </div>*/}
      </div>
    );
  }
}
