/**
 * Created by sjf on 2016/12/1.
 */
import './GoodsSearchIndex.scss'

import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FiveCategorySelector from 'components/FiveCategorySelector'

export default class GoodsSearchIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needFilter: [],
      /* type = 1 多选，type = 2 单选，type = 3个性化*/
      filtrateOptions: {

        brand: {
          key: 'brand',
          title: '按品牌',
          type: 1,
          isShowColor: false,
          isShowCheck: false,
          isShowChecked: false,
          func: this.props.getFilterBrandData,
          value: [
            {
              filtrateVal: '经销商甲',
              checkState: false
            },
            {
              filtrateVal: '经销商乙',
              checkState: false
            },
            {
              filtrateVal: '某经销丙',
              checkState: false
            },
            {
              filtrateVal: '浙一医院',
              checkState: false
            },
            {
              filtrateVal: '浙二医院',
              checkState: false
            },
            {
              filtrateVal: '邵逸夫医院',
              checkState: false
            }
          ]
        }, lob: {
          key: 'lob',
          title: '按业务线',
          type: 1,
          isShowColor: false,
          isShowCheck: false,
          isShowChecked: false,
          func: this.props.getFilterLobData,
          value: [
            {
              filtrateVal: '备货订单',
              checkState: false
            },
            {
              filtrateVal: '手术订单',
              checkState: false
            },
            {
              filtrateVal: '调拨订单',
              checkState: false
            },
            {
              filtrateVal: 'xx订单',
              checkState: false
            },
            {
              filtrateVal: 'xx订单',
              checkState: false
            },
            {
              filtrateVal: 'xx订单',
              checkState: false
            }
          ]
        },
        lobBrandThreeType: {
          key: 'lobBrandThreeType',
          title: '按业务线、品牌、分类',
          type: 3,
          isShowColor: false,
          isShowCheck: false,
          isShowChecked: false,
          func: this.props.getFilterBrandData,
          value: <div style={{ margin: '.8rem 0 2rem 0' }}><FiveCategorySelector
            params={{
              selectLineId: -1,
              selectBrandId: -1,
              firstClassId: -1,
              secondClassId: -1,
              thirdClassId: -1,
            }}
            callback={this.fiveCategoryDeal} authorizedOrganizationId={Number(this.props.globalStore.organizationId)}
          /></div>
        },
        property: {
          key: 'property',
          title: '按物权',
          type: 1,
          isShowColor: false,
          isShowCheck: false,
          isShowChecked: false,
          func: this.props.getFilterPropertyData,
          value: [
            {
              value: 'WDKC',
              filtrateVal: '我的库存',
              checkState: false
            },
            {
              value: 'PJLDH',
              filtrateVal: '铺出去的商品',
              checkState: false
            },
            {
              value: 'PCQDH',
              filtrateVal: '铺进来的商品',
              checkState: false
            }
          ]
        },
        pack: {
          key: 'pack',
          title: '按包装',
          type: 1,
          func: this.props.getFilterPackData,
          isShowColor: false,
          isShowCheck: false,
          isShowChecked: false,
          value: [
            {
              value: 1,
              filtrateVal: '消毒包装',
              checkState: false
            },
            {
              value: 2,
              filtrateVal: '非消毒包装',
              checkState: false
            }
          ]
        },
        expireDate: {
          key: 'expireDate',
          title: '按有效期',
          type: 2,
          func: this.props.getFilterExpireDateData,
          isShowColor: false,
          isShowCheck: false,
          isShowChecked: false,
          value: [
            {
              value: 1,
              filtrateVal: '全部',
            },
            {
              value: 3,
              filtrateVal: '3个月以内',
            },
            { value: 6,
              filtrateVal: '6个月以内',
            },
            {
              value: 9,
              filtrateVal: '9个月以内',
            },
            {
              value: 12,
              filtrateVal: '1年以内',
            },
            {
              value: 13,
              filtrateVal: '1年以上',
            }
          ]
        }

      },
      optionsData: {},
      filterResult: {}
    }
  }
  /*
  * 五分类选择器
  * */
  fiveCategoryDeal = (params) => {
    this.setState({
      filterResult: {
        ...this.state.filterResult, [this.state.optionsData.key]: params
      }
    });
    this.state.needFilter.map((filter) => {
      if (filter.key === 'lobBrandThreeType') {
        filter.value = (<div style={{ margin: '.8rem 0 2rem 0' }}><FiveCategorySelector
          params={params}
          callback={this.fiveCategoryDeal} authorizedOrganizationId={Number(this.props.globalStore.organizationId)}
        /></div>);
      }
    });
  }

  /* 点击重置按钮处理*/
  resetClick = () => {
    const params = { SL: 1 };
    this.props.callback(params);

    const needFilter = this.state.needFilter;
    needFilter.map((filter) => {
      filter.isShowColor = false;
      filter.isShowChecked = false;
      if (filter.type === 1 || filter.type === 2) {
        filter.value.map((value, index) => {
          value.checkState = false;
        });
      }

      /*
       * 重置5分类选择器
       * */
      if (filter.key === 'lobBrandThreeType') {
        filter.value = (<div style={{ margin: '.8rem 0 2rem 0' }}><FiveCategorySelector
          params={{
            selectLineId: -1,
            selectBrandId: -1,
            firstClassId: -1,
            secondClassId: -1,
            thirdClassId: -1,
          }}
          callback={this.fiveCategoryDeal} authorizedOrganizationId={Number(this.props.globalStore.organizationId)}
        /></div>);
      }
    });

    needFilter[0].isShowColor = true;

    this.state.filterResult = {};
    this.setState({
      needFilter,
      optionsData: {
        key: needFilter[0].key,
        data: needFilter[0].value,
        type: needFilter[0].type,
      },
      filterResult: this.state.filterResult
    });
  };

  dealTime = (type) => {
    const date = new Date();
    const QSSJ = date.getTime();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let endYear = year;
    let endMonth = month;

    switch (type) {
      case 1:
        return {};
      case 3:
        endMonth = month + 3;
        break;
      case 6:
        endMonth = month + 6;
        break;
      case 9:
        endMonth = month + 9;
        break;
      case 12:
        date.setFullYear(year + 1);
        return {  // 有效期止 ,选择非消毒包装时不传
          QSSJ,  // 起始时间
          JZSJ: date.getTime()   // 截止时间，勾选“一年以上”选项时不传
        }
      case 13:
        date.setFullYear(year + 1);
        return {  // 有效期止 ,选择非消毒包装时不传
          QSSJ: date.getTime()  // 起始时间
        }
    }

    if (endMonth > 11) {
      endMonth -= 12;
      endYear += 1;
    }
    date.setFullYear(endYear, endMonth);
    return {  // 有效期止 ,选择非消毒包装时不传
      QSSJ,  // 起始时间
      JZSJ: date.getTime()   // 截止时间，勾选“一年以上”选项时不传
    }
  }

  searchClick = () => {
    let params = { SL: 1 };

    if (this.state.filterResult.property) {
      this.state.filterResult.property.map((wq, index) => {
        params.WQ = { ...params.WQ, [wq]: 1 };
      });
    }
    if (this.state.filterResult.expireDate) {
      const expireDate = this.dealTime(this.state.filterResult.expireDate);
      params = { ...params, BZ: { YXQZ: expireDate } };
    } else if (this.state.filterResult.pack && this.state.filterResult.pack.length === 1 && this.state.filterResult.pack[0] === 1) {
      params = { ...params, BZ: { YXQZ: {} } };
    } else if (this.state.filterResult.pack && this.state.filterResult.pack.length === 1 && this.state.filterResult.pack[0] === 2) {
      params = { ...params, BZ: {} };
    }
    if (this.state.filterResult.lobBrandThreeType) {
      if (this.state.filterResult.lobBrandThreeType.selectLineId && this.state.filterResult.lobBrandThreeType.selectLineId !== -1) {
        params = { ...params, YWXID: this.state.filterResult.lobBrandThreeType.selectLineId };
      }

      if (this.state.filterResult.lobBrandThreeType.selectBrandId && this.state.filterResult.lobBrandThreeType.selectBrandId !== -1) { params = { ...params, SPPPID: this.state.filterResult.lobBrandThreeType.selectBrandId }; }

      if (this.state.filterResult.lobBrandThreeType.thirdClassId && this.state.filterResult.lobBrandThreeType.thirdClassId !== -1) { params = { ...params, SPFLID: this.state.filterResult.lobBrandThreeType.thirdClassId }; }
    }

    this.props.callback(params);
  };
  handleFiltrateTyple = data => () => {
    this.state.needFilter.map((filter, index) => {
      filter.isShowColor = false;
    });

    data.isShowColor = true;

    this.state.needFilter.map((filter, index) => {
      if (filter.type === 1) {
        if (this.state.filterResult[filter.key] && this.state.filterResult[filter.key].length > 0 && (!filter.isShowColor)) {
          filter.isShowChecked = true;
        } else {
          filter.isShowChecked = false;
        }
      } else if (filter.type === 2) {
        filter.isShowChecked = this.state.filterResult[filter.key] && (!filter.isShowColor) ? true : false;
      } else if (filter.type === 3) {
        let flag = false;
        if (!filter.isShowColor) {
          for (const key in this.state.filterResult[filter.key]) {
            if (this.state.filterResult[filter.key][key] !== -1) {
              flag = true;
            }
            break;
          }
        }
        filter.isShowChecked = flag;
      }
    });
    return this.setState({
      optionsData: {
        key: data.key,
        data: data.value,
        type: data.type,
      },
      needFilter: this.state.needFilter
    })
  };

  radioFilterDeal = opData => (event, value) => {
    this.state.filterResult[opData.key] = value;
    this.setState({
      filterResult: this.state.filterResult,
      [opData.key]: value
    })
  }

  checkboxFiltrateOptions = (ckey, valueData) => (event) => {
    valueData.checkState = !valueData.checkState;

    const checkedArr = [];
    this.state.optionsData.data.map((option, index) => {
      if (option.checkState) { checkedArr.push(option.value) }
    });
    this.state.filterResult[ckey] = checkedArr;

    this.state.needFilter.map((filter, index) => {
      if (filter.key === ckey) {
        filter.value = this.state.optionsData.data;
      }
    });
    this.setState({
      optionsData: this.state.optionsData,
      needFilter: this.state.needFilter,
      filterResult: this.state.filterResult,
    })
  };
  getFirstFilter = (allFilterArr, filterArr) => {
    const needFilterArr = [];
    for (let i = 0; i < filterArr.length; i++) {
      if (filterArr[i] in allFilterArr) {
        needFilterArr.push(allFilterArr[filterArr[i]]);
      }
    }
    needFilterArr[0].isShowColor = true;
    return needFilterArr;
  }
  /*
  * 不同类型的二级选择器处理 type =1 多选，2单选，3自定义
  * */
  getSecondFilter = (opData) => {
    let filterArr = [];
    if (opData.type === 1) {
      filterArr = opData.data.map((valueData, valueIndex) => <li key={`filtrateOptions${valueIndex}`}>
        <label><input type='checkbox' className='optionsFiltrateCheckbox' value={valueData.value} checked={valueData.checkState} onChange={this.checkboxFiltrateOptions(this.state.optionsData.key, valueData)} /><i>✓</i>{valueData.filtrateVal}</label>
      </li>);

      return (<ul className='options'>
        {
          filterArr
        }
      </ul>)
    } else if (opData.type === 2) {
      const radioButton = {
        marginRight: '2.1rem',
        width: 'auto',
        display: 'inline-block'
      };
      filterArr = opData.data.map((valueData, valueIndex) => <RadioButton
        key={`readio${valueIndex}`}
        value={valueData.value}
        label={valueData.filtrateVal}
        style={radioButton}
        labelStyle={{
          fontFamily: 'SourceHanSansCN-Regular',
          width: 'auto'
        }}
      />)
      return (<div  style={{ margin: '.8rem 0 2rem 0' }}>
        <RadioButtonGroup
          onChange={this.radioFilterDeal(opData)}
          name={opData.key}
          defaultSelected={this.state.filterResult[opData.key] ? this.state.filterResult[opData.key] : ''}
        >
          {
            filterArr
          }
        </RadioButtonGroup>
      </div>)
    } else if (opData.type === 3) {
      return opData.data;
    }
  }
  componentWillMount() {
    const needFilter = this.getFirstFilter(this.state.filtrateOptions, this.props.filters);
    this.setState({
      backUpneedFilter: needFilter,
      backUpoptionsData: { ...this.state.backUpoptionsData, key: needFilter[0].key,
        data: needFilter[0].value },
      needFilter,
      optionsData: {
        key: needFilter[0].key,
        type: needFilter[0].type,
        data: needFilter[0].value
      }
    })
  }
  handleCheckBox =() => {

  }
  render() {
    return (
      <div>

        <div>
          {/* style={{display:this.state.display ? 'block' : 'none'}}*/}
          <div>
            <div className='filtrate'>
              <ul>
                {
                  this.state.needFilter.map((data, index) => <li key={`filtrateTyple${index}`} onClick={this.handleFiltrateTyple(data)} style={{ backgroundColor: data.isShowColor ? '#00A0FF' : '#fff', color: data.isShowColor ? '#fff' : '#00A0FF' }}>
                    <div className='filtrateCondition' style={{ color: data.isShowColor ? '#fff' : '#00A0FF' }}>
                      <label><input type='checkbox' onChange={this.handleCheckBox} className='filtrateCheckbox' checked={data.isShowChecked ? 'true' : 'false'} /><i style={{ visibility: data.isShowChecked ? 'visible' : 'hidden' }}>✓</i></label>
                      {data.title}
                      {/* ,visibility:this.state.display ? 'visible' : 'hidden'*/}
                    </div>
                  </li>)
                }
                <li className='ResetBtn'>
                  <FlatButton
                    label='重置'
                    style={{ color: '#F5A959', minWidth: '3rem', fontFamily: 'SourceHanSansCN-Regular' }}
                    onTouchTap={this.resetClick}
                  />
                  <FlatButton
                    label='确定'
                    style={{ color: '#D43F3C', minWidth: '3rem', fontFamily: 'SourceHanSansCN-Regular' }}
                    onTouchTap={this.searchClick}
                  />
                </li>
              </ul>
              <div>
                {
                  this.getSecondFilter(this.state.optionsData)
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
