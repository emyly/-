/**
 * Created by NXQ on 10/23/2016.
 */

import React, { Component, PropTypes } from 'react';

import './AuthorizationDetailsDataGrid.scss';

import { List, ListItem } from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：授权详情列表
 */
export default class AuthorizationDetailsDataGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentContractAuthorizedData: [],
      loadingText: '数据加载中...'
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static defaultProps = {
    /**
     * 是否允许编辑 '0'表示不允许编辑 '1'表示允许编辑
     */
    isAllowEditing: '0',   // 默认为不允许编辑,
    bottonType: true      // 默认为显示添加按钮

  };
  static propTypes = {
    /**
     * 是否允许编辑
     */
    isAllowEditing: PropTypes.string.isRequired,
    /**
     * 按钮类型
     */
    bottonType: PropTypes.bool.isRequired
  };
  componentWillMount = () => {
    const contractId = this.props.locationState.type ? this.props.locationState['1'].contract_id : this.props.locationState['2'].contract_id;
    this.props.getCurrentContractAuthorizedData(contractId);   // 后面此合同ID需要后台接口修改好后路由过来
  };
  componentWillReceiveProps = (nextProps) => {
    const loadingText = nextProps.authorizationDetailsDataGrid.currentContractAuthorizedData.length ? '' : '暂无授权数据'
    this.setState({
      currentContractAuthorizedData: nextProps.authorizationDetailsDataGrid.currentContractAuthorizedData,
      loadingText
    })
  };
  /**
   * 确认授权
   */
  handleTouchTapSubmitAuthorization = () => {
    alert('确认授权');
  };
  /**
   * 取消授权
   */
  handleTouchTapCancelAuthorization = () => {
    alert('取消授权');
  };
  /**
   * 获取不同的图标
   */
  handleGetIcon = (data) => {
    if (data.brands) {
      return <CommunicationCall />
    } else if (data.first_classes) {
      return <CommunicationChatBubble />
    } else if (data.second_classes) {
      return <ContentDrafts />
    } else if (data.third_classes) {
      return <CommunicationChatBubble />
    } else if (data.goodsIds) {
      return <ContentDrafts />
    } else {
      return <CommunicationChatBubble />
    }
  };
  /**
   * 获取区域string
   */
  handleGetLocation = (dataArray) => {
    let str = '';
    if (dataArray.length === 1) {
      str = dataArray[0].name
    } else {
      dataArray.map(value => str += `${str + value.name}-`);
    }

    return str;
  };
  /**
   * 获取不同的标题
   */
  handleGetTitle = (data) => {
    if (data.brands) {
      return '业务线：' + `${data.name} (正向授权商品个数:${data.forwardGoodsCount} 反向授权商品个数:${data.reverseGoodsCount} ${data.locations.length ? `区域:${this.handleGetLocation(data.locations)}` : ''})`;
    } else if (data.first_classes) {
      return '品牌：' + `${data.name} (正向授权商品个数:${data.forwardGoodsCount} 反向授权商品个数:${data.reverseGoodsCount} ${data.locations.length ? `区域:${this.handleGetLocation(data.locations)}` : ''})`;
    } else if (data.second_classes) {
      return '一级分类：' + `${data.name} (正向授权商品个数:${data.forwardGoodsCount} 反向授权商品个数:${data.reverseGoodsCount} ${data.locations.length ? `区域:${this.handleGetLocation(data.locations)}` : ''})`;
    } else if (data.third_classes) {
      return '二级分类：' + `${data.name} (正向授权商品个数:${data.forwardGoodsCount} 反向授权商品个数:${data.reverseGoodsCount} ${data.locations.length ? `区域:${this.handleGetLocation(data.locations)}` : ''})`;
    } else if (data.forward_authorize_goods || data.reverse_authorize_goods) {
      return '三级分类:' + `${data.name} (正向授权商品个数:${data.forwardGoodsCount} 反向授权商品个数:${data.reverseGoodsCount} ${data.locations.length ? `区域:${this.handleGetLocation(data.locations)}` : ''})`;
    } else {
      return '商品id：' + `${data.name}`;     // 后面获取对接口修改
    }
  };
  /**
   * 递归已授权详情
   */
  handleAuthorizedGoodsList = dataSource => dataSource.map((data, index) => {
    if (data.brands || data.first_classes || data.second_classes || data.third_classes || data.forward_authorize_goods || data.reverse_authorize_goods) {
      const sub_listItem = this.handleAuthorizedGoodsList(data.brands || data.first_classes || data.second_classes || data.third_classes || data.forward_authorize_goods || data.reverse_authorize_goods);

      return (<ListItem
        key={index} primaryText={<div style={{ width: '90%' }} >{this.handleGetTitle(data)}</div>}
        leftIcon={<ContentDrafts />}
        nestedItems={sub_listItem}
        primaryTogglesNestedList
      />)
    } else {
      return (<ListItem
        key={index} innerDivStyle={{ width: '88%' }} primaryText={<div style={{ width: '90%' }} >{this.handleGetTitle(data)}</div>}
        leftIcon={<ContentDrafts />}
        primaryTogglesNestedList
      />)
    }
  });
  handleAddAuthorization = () => {
    this.context.router.push({ pathname: '/contractAndAuthorization/authorizationAdd', state: this.props.locationState });
  };
  handleTouchTapAllClear = () => {
    // 此处获取真实数据后需要根据实际操作成功再决定是否清空
    this.setState({ authorizedData: { business_lines: [] } })
  };
  render() {
    return (
      <div className='authorization-details-datagrid'>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 70, borderBottom: '1px solid #ddd' }}>
          <div style={{ fontSize: 24, width: '100%', marginRight: 30, height: '100%', lineHeight: '40px' }}>已有授权清单</div>
          {
            (() => {
              if (this.props.bottonType) {
                return (<div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', width: '20%', alignItems: 'flex-start', height: '100%', overflow: 'hidden' }} onClick={this.handleAddAuthorization}>
                  <FloatingActionButton mini style={{ margin: 5, boxShadow: 'none' }}>
                    <ContentAdd />
                  </FloatingActionButton>
                  <div style={{ padding: '15px 0px 0px 10px' }}>增加授权</div>
                </div>)
              } else {
                return (<RaisedButton
                  style={{ width: '20%', margin: 10 }}
                  label='清空授权' disabled
                  secondary
                  onTouchTap={this.handleTouchTapAllClear}
                />)
              }
            })()
          }

        </div>
        {
          (() => {
            if (this.state.currentContractAuthorizedData.length) {
              return (<div>
                <List style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
                  {
                            this.handleAuthorizedGoodsList(this.state.currentContractAuthorizedData)
                          }
                </List>
                <div style={{ display: 'none', justifyContent: 'flex-end', marginTop: 100 }}>
                  <FlatButton
                    label='取消授权'
                    style={{ marginTop: 15, marginRight: 15, width: 60 }}
                    primary
                    onTouchTap={this.handleTouchTapCancelAuthorization}
                  />
                  <RaisedButton
                    label='确认授权'
                    style={{ marginTop: 15, marginRight: 15, width: 60 }}
                    primary
                    onTouchTap={this.handleTouchTapSubmitAuthorization}
                  />
                </div>
              </div>)
            } else {
              return <div style={{ paddingTop: 25 }}>{this.state.loadingText}</div>
            }
          })()
        }

      </div>
    )
  }
}

