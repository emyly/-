/**
 * Created by NXQ on 10/31/2016.
 */

import React, { Component, PropTypes } from 'react';

import './AuthorizationAdd.scss';

import AuthorizationDetailsDataGrid from 'components/AuthorizationDetailsDataGrid';

import RaisedButton from 'material-ui/RaisedButton';

import LOBSelect from 'components/LOBSelect'

import BrandSelect from 'components/BrandSelect'

import SelectField from 'material-ui/SelectField';

import MenuItem from 'material-ui/MenuItem';

import { List, ListItem } from 'material-ui/List';

import Checkbox from 'material-ui/Checkbox';

import MultiTree from 'components/MultiTree';

import Toggle from 'material-ui/Toggle';

import StandardDataGrid from 'components/StandardDataGrid';

import moment from 'moment';

export default class AuthorizationAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 'AuthorizationManagement',
      tabAuthorizationShow: true,
      category1_value: null,
      category2_value: null,
      category3_value: null,
      choiceGoods: [],
      showGoodsArea: false,
      area: [
        {
          GUID: 1,
          NAME: '浙江省',
          PARENT: 0
        },
        {
          GUID: 2,
          NAME: '江西省',
          PARENT: 0
        },
        {
          GUID: 3,
          NAME: '安徽省',
          PARENT: 0
        },
        {
          GUID: 4,
          NAME: '杭州市',
          PARENT: 1
        },
        {
          GUID: 5,
          NAME: '绍兴市',
          PARENT: 1
        }, {
          GUID: 6,
          NAME: '温州市',
          PARENT: 1
        }, {
          GUID: 7,
          NAME: '西湖区',
          PARENT: 4
        }, {
          GUID: 8,
          NAME: '拱墅区',
          PARENT: 4
        }, {
          GUID: 9,
          NAME: '省立同德医院',
          PARENT: 7
        }, {
          GUID: 10,
          NAME: '市一医院',
          PARENT: 7
        }, {
          GUID: 11,
          NAME: '南昌市',
          PARENT: 2
        },
        {
          GUID: 12,
          NAME: '九江市',
          PARENT: 2
        }, {
          GUID: 13,
          NAME: '青山湖区',
          PARENT: 11
        }, {
          GUID: 14,
          NAME: '龙湾区',
          PARENT: 6
        }

      ]
    };
  }
  static defaultProps = {
    /**
     * 缺省三分类数据,后期需要获取真实数据
     */
    selectCategoryItem1: [
      '商品分类1', '商品分类2', '商品分类3', '商品分类4', '商品分类5', '商品分类6', '商品分类7', '商品分类8', '商品分类8'
    ],
    selectCategoryItem2: [
      '商品分类1', '商品分类2', '商品分类3', '商品分类4', '商品分类5', '商品分类6', '商品分类7', '商品分类8', '商品分类8'
    ],
    selectCategoryItem3: [
      '商品分类1', '商品分类2', '商品分类3', '商品分类4', '商品分类5', '商品分类6', '商品分类7', '商品分类8', '商品分类8'
    ],
    goodsItems: [
      {
        id: '1',
        name: '商品1'
      },
      {
        id: '2',
        name: '商品2'
      },
      {
        id: '3',
        name: '商品3'
      },
      {
        id: '4',
        name: '商品4'
      },
      {
        id: '5',
        name: '商品5'
      },
      {
        id: '6',
        name: '商品6'
      },
      {
        id: '7',
        name: '商品7'
      },
      {
        id: '8',
        name: '商品8'
      }
    ]
  };
  /**
   * 商品分类选择器1事件
   */
  handleChangeSelectCategory1 = (event, index, value) => {
    this.setState({ category1_value: value });
  };
  /**
   * 商品分类选择器2事件
   */
  handleChangeSelectCategory2 = (event, index, value) => {
    this.setState({ category2_value: value });
  };
  /**
   * 商品分类选择器1事件
   */
  handleChangeSelectCategory3 = (event, index, value) => {
    this.setState({ category3_value: value });
  };

  handleClick = (event, isInputChecked) => {
    if (isInputChecked) {
      this.state.choiceGoods.push(event.target.value)
    } else {
      this.state.choiceGoods.splice(this.state.choiceGoods.indexOf(event.target.value), 1)
    }
  };
  handleToggleChooseGoods = () => {
    this.setState({ showGoodsArea: !this.state.showGoodsArea });
  };
  handleTouchTapMergeAuthorization = () => {
    alert('合并授权');
  };
  handleTouchTapCoverageAuthorization = () => {
    alert('覆盖授权');
  };
  handleTouchTapReverseAuthorization = () => {
    alert('反向授权');
  };
  /**
   * 获取合同有效期始/有效期止
   */
  handleGetContractTime(type) {
    if (type === 0) {           // 获取有效期始 后期如果加上了其他合同类型需要使用switch case方式获取
      return this.props.location.state.type ? moment(this.props.location.state['1'].start_time).format('YYYY-MM-DD') : moment(this.props.location.state['2'].start_time).format('YYYY-MM-DD')
    } else {                     // 获取有效期止
      return this.props.location.state.type ? moment(this.props.location.state['1'].stop_time).format('YYYY-MM-DD') : moment(this.props.location.state['2'].stop_time).format('YYYY-MM-DD')
    }
  }
  render() {
    return (
      <div className='authorization-add'>
        <StandardDataGrid
          iconPosition={'-90px -30px'}
          title='合同与授权管理'
          message={`您正在对：  ${this.props.location.state.partnerName} 新增授权`}
        >
          <div style={{ border: '1px solid #bbb', padding: 20, marginTop: 10, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, width: '100%', marginRight: 30, height: 40, lineHeight: '40px' }}>合同基本信息</div>
            <div style={{ paddingBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px', marginRight: 30 }}>合同甲方：              {this.props.location.state.currentOrganizationName}</div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>合同乙方：              {this.props.location.state.partnerName}</div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>
                <span>合同类型： { this.props.location.state.type ? '备货' : '手术' }</span>
              </div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>
                <span>合同期始： { this.handleGetContractTime(0) }</span>
              </div>
              <div style={{ fontSize: 16, width: 480, height: 40, lineHeight: '40px' }}>
                <span>合同期止： { this.handleGetContractTime(1) }</span>
              </div>
            </div>
          </div>
          <div style={{ border: '1px solid #bbb', padding: 20, marginTop: 30, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ border: '1px solid #bbb', width: 480, height: 480, padding: 20, overflow: 'auto' }}>
                <div style={{ fontSize: 24, lineHeight: '40px' }}>授权商品/种类</div>
                <div>
                  {/* <LOBSelect buyerOrganizationId={900000000204} contract_type={2} sellerOrganizationId={900000000207} /> */}
                  {/* <BrandSelect buyerOrganizationId={900000000207} contract_type={1} LOBId = {1} sellerOrganizationId={900000000206} />*/}
                  <SelectField hintText='选择品牌' maxHeight={200} />
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <SelectField
                      value={this.state.category1_value}
                      hintText='三分类选择'
                      onChange={this.handleChangeSelectCategory1}
                      maxHeight={200}
                    >
                      {
                        this.props.selectCategoryItem1.map((value, index) => <MenuItem key={index} value={index} primaryText={value} />)
                      }
                    </SelectField>
                    <SelectField
                      value={this.state.category2_value}
                      hintText='三分类选择'
                      onChange={this.handleChangeSelectCategory2}
                      maxHeight={200}
                    >
                      {
                        this.props.selectCategoryItem2.map((value, index) => <MenuItem key={index} value={index} primaryText={value} />)
                      }
                    </SelectField>
                    <SelectField
                      value={this.state.category3_value}
                      hintText='三分类选择'
                      onChange={this.handleChangeSelectCategory3}
                      maxHeight={200}
                    >
                      {
                        this.props.selectCategoryItem1.map((value, index) => <MenuItem key={index} value={index} primaryText={value} />)
                      }
                    </SelectField>
                  </div>
                  <Toggle style={{ width: 120 }} label='选择商品' onToggle={this.handleToggleChooseGoods} />
                </div>
                {
                  (() => {
                    if (this.state.showGoodsArea) {
                      return (<div>
                        <List>
                          {
                                    this.props.goodsItems.map((value, index) => <ListItem key={index} leftCheckbox={<Checkbox value={value.name} onCheck={this.handleClick} defaultChecked={this.state.choiceGoods.indexOf(value.name) != -1 ? true : false} />} primaryText={value.name} />)
                                  }
                        </List>
                      </div>)
                    }
                  })()
                }

              </div>
              <div style={{ border: '1px solid #bbb', width: 480, height: 480, padding: 20, overflow: 'auto' }}>
                <div style={{ fontSize: 24, lineHeight: '40px' }}>授权区域/伙伴</div>
                <MultiTree
                  dataSource={this.state.area}
                  checkedData={[]}
                  ref='myMultiTree'
                  labelAttr='NAME' keyAttr='GUID' parentAttr='PARENT'
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: 60 }}>
              <RaisedButton
                style={{ width: '20%', margin: 10 }}
                label='合并授权' disabled
                default
                onTouchTap={this.handleTouchTapMergeAuthorization}
              />
              <RaisedButton
                style={{ width: '20%', margin: 10 }}
                label='覆盖授权' disabled
                default
                onTouchTap={this.handleTouchTapCoverageAuthorization}
              />
              <RaisedButton
                style={{ width: '20%', margin: 10 }}
                label='不予授权' disabled
                default
                onTouchTap={this.handleTouchTapReverseAuthorization}
              />
            </div>
            <div style={{ display: this.state.tabAuthorizationShow ? 'flex' : 'none', padding: 20, height: 'auto', width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #bbb' }}>
              <AuthorizationDetailsDataGrid dataGridType='0' locationState={this.props.location.state} bottonType={false} />
            </div>
          </div>
        </StandardDataGrid>
      </div>
    )
  }

}
