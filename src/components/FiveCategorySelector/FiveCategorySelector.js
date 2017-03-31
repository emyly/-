/**
 * Created by liuyali on 2016/12/8.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'

import './FiveCategorySelector.scss'


import LOBSelect from 'components/LOBSelect'
import BrandSelect from 'components/BrandSelect'
import ThreeCategorySelector from 'components/ThreeCategorySelector';

export default class FiveCategorySelector extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    authorizedOrganizationId: PropTypes.number.isRequired,
    callback: PropTypes.func
  };

  state = {
    params: {
      selectLineId: -1,
      selectBrandId: -1,
      firstClassId: -1,
      secondClassId: -1,
      thirdClassId: -1
    }
  }
  /**
   * 业务线选择公共组件callback
   */
  handleLOBSelectCallBack = () => (lineId) => {
    this.setState({
      params: {
        ...this.state.params,
        selectLineId: lineId,
        selectBrandId: -1,    // 如果业务线重新选择需要把品牌ID重新置为-1,因为品牌选择器和三分类两公共组件方便判断
      }
    });

    this.props.callback({
      ...this.state.params,
      selectLineId: lineId,
      selectBrandId: -1,    // 如果业务线重新选择需要把品牌ID重新置为-1,因为品牌选择器和三分类两公共组件方便判断
    });
  }
  /**
   * 品牌选择器公共组件callback
   */
  handleBrandSelectCallBack = () => (brandId) => {
    this.setState({
      params: {
        ...this.state.params,
        selectBrandId: brandId   // 如果业务线重新选择需要把品牌ID重新置为-1,因为品牌选择器和三分类两公共组件方便判断
      }
    });

    this.props.callback({
      ...this.state.params,
      selectBrandId: brandId   // 如果业务线重新选择需要把品牌ID重新置为-1,因为品牌选择器和三分类两公共组件方便判断
    });
  }
  /**
   * 三分类公共组件CallBack
   */
  handleThreeCategorySelectorCallBack = () => ({ firstClassId, secondClassId, thirdClassId }) => {
    this.setState({
      params: {
        ...this.state.params,
        firstClassId, secondClassId, thirdClassId
      }
    });

    this.props.callback({
      ...this.state.params,
      firstClassId, secondClassId, thirdClassId
    });
  }

  componentWillMount() {
    this.setState({
      params: this.props.params
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      params: nextProps.params
    })
  }
  render() {
    /*
    * 选择器中，父级为-1时，不会发送action
    * 选择器的值为空字符串，显示提示
    * */
    return (<div>
      <LOBSelect
        hintText="选择业务线" labelStyle={{fontFamily:'SourceHanSansCN-Medium',fontSize:'1.2rem'}}
        styleOptions = {{hintStyle:{fontFamily:'SourceHanSansCN-Medium',fontSize:'1.2rem'}}}
        value={this.state.params.selectLineId === -1 ? '' : this.state.params.selectLineId}
        callback={this.handleLOBSelectCallBack()} buyerOrganizationId={Number(this.props.authorizedOrganizationId)} sellerOrganizationId={this.props.authorizeOrganizationId} />
      <BrandSelect hintText="选择品牌" value={this.state.params.selectBrandId === -1 ? '' : this.state.params.selectBrandId}
                   labelStyle={{fontFamily:'SourceHanSansCN-Medium',fontSize:'1.2rem'}}
                   styleOptions = {{hintStyle:{fontFamily:'SourceHanSansCN-Medium',fontSize:'1.2rem'}}}
                   callback={this.handleBrandSelectCallBack()} LOBId={this.state.params.selectLineId || -1} buyerOrganizationId={Number(this.props.authorizedOrganizationId)} sellerOrganizationId={this.props.authorizeOrganizationId} />
      <ThreeCategorySelector
        labelStyle={{fontFamily:'SourceHanSansCN-Medium',fontSize:'1.2rem'}}
        styleOptions = {{hintStyle:{fontFamily:'SourceHanSansCN-Medium',fontSize:'1.2rem'}}}
        callback={this.handleThreeCategorySelectorCallBack()}
        businessLineId={this.state.params.selectLineId || -1}
        brandId={this.state.params.selectBrandId || -1}
        buyerOrganizationId={Number(this.props.authorizedOrganizationId)}
        sellerOrganizationId={Number(this.props.authorizeOrganizationId)}
        firstClassId={this.state.params.firstClassId === -1 ? '' : this.state.params.firstClassId}
        secondClassId={this.state.params.secondClassId === -1 ? '' : this.state.params.secondClassId}
        thirdClassId={this.state.params.thirdClassId === -1 ? '' : this.state.params.thirdClassId}
      />
    </div>)
  }
}
