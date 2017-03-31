/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './ThreeCategorySelector.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/**
 * 使用场景：三分类选择
 */
export default class ThreeCategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstClassId: '',
      secondClassId: '',
      thirdClassId: ''
    };
  }
  static defaultProps = {
    contractType: '',
  }

  static propTypes = {
    // 买方组织机构ID
    buyerOrganizationId: PropTypes.number.isRequired,
    // 卖方组织机构ID
    sellerOrganizationId: PropTypes.number,
    // 业务线id
    businessLineId: PropTypes.number.isRequired,
    // 品牌id
    brandId: PropTypes.number.isRequired,
    // 合同类型
    contractType: PropTypes.string,
    style: PropTypes.object,
    callback: PropTypes.func
  }

  componentWillMount() {
    this.setState({
      firstClassId: this.props.firstClassId,
      secondClassId: this.props.secondClassId,
      thirdClassId: this.props.thirdClassId,
    });
    if (this.props.businessLineId !== -1 && this.props.brandId !== -1 && this.props.businessLineId !== undefined && this.props.brandId !== undefined) {
      this.props.fetchFirstClassSelection({
        contractType: this.props.contractType,
        businessLineId: this.props.businessLineId,
        brandId: this.props.brandId,
        authorizeOrgId: this.props.sellerOrganizationId,
        authorizedOrgId: this.props.buyerOrganizationId
      })
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.firstClassId !== undefined) {
      this.setState({
        firstClassId: nextProps.firstClassId,
        secondClassId: nextProps.secondClassId,
        thirdClassId: nextProps.thirdClassId,
      });
    }

    if (nextProps.businessLineId !== -1 && nextProps.brandId === -1 && nextProps.businessLineId !== this.props.businessLineId && nextProps.brandId !== this.props.brandId) { // 如果业务线重新选择,父组件需要把业务线id置为-1,初始化三分类所有数据
      this.props.fetchThreeCategorySelectorInitData();
      this.setState({
        firstClassId: '',
        secondClassId: '',
        thirdClassId: ''
      });
      if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
        this.props.callback({
          firstClassId: '',
          secondClassId: '',
          thirdClassId: ''
        })
      }
    }
    if (nextProps.businessLineId === this.props.businessLineId && nextProps.brandId !== this.props.brandId) { // 如果品牌重新选择,初始化三分类所有数据
      this.props.fetchThreeCategorySelectorInitData();
      this.setState({
        firstClassId: '',
        secondClassId: '',
        thirdClassId: ''
      });
      if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
        this.props.callback({
          firstClassId: '',
          secondClassId: '',
          thirdClassId: ''
        })
      }
    }
    if ((nextProps.businessLineId !== -1 && nextProps.brandId !== -1) && !(nextProps.businessLineId === this.props.businessLineId && nextProps.brandId === this.props.brandId)) { // 当业务线、品牌同时存在以及业务线和品牌不等于上次的数据时请求数据
      this.setState({
        firstClassId: '',
        secondClassId: '',
        thirdClassId: ''
      });
      this.props.fetchFirstClassSelection({
        contractType: nextProps.contractType || '',
        businessLineId: nextProps.businessLineId,
        brandId: nextProps.brandId,
        authorizeOrgId: nextProps.sellerOrganizationId,
        authorizedOrgId: nextProps.buyerOrganizationId
      })
    }
  }
  /**
   * first class selector
   */
  firstClassChange = (event, index, value) => {
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback({
        firstClassId: value,
        secondClassId: '',
        thirdClassId: ''
      })
    }
    this.setState({
      firstClassId: value,
      secondClassId: '',
      thirdClassId: ''
    }, () => {
      this.props.fetchSecondClassSelection({
        contractType: this.props.contractType || '',
        businessLineId: this.props.businessLineId,
        brandId: this.props.brandId,
        firstClassId: value,
        authorizeOrgId: this.props.sellerOrganizationId,
        authorizedOrgId: this.props.buyerOrganizationId
      })
    })
  }
  /**
   * second class selector
   */
  secondClassChange = (event, index, value) => {
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback({
        firstClassId: this.state.firstClassId,
        secondClassId: value,
        thirdClassId: ''
      })
    }
    this.setState({
      secondClassId: value,
      thirdClassId: ''
    }, () => {
      this.props.fetchThirdClassSelection({
        contractType: this.props.contractType || '',
        businessLineId: this.props.businessLineId,
        brandId: this.props.brandId,
        firstClassId: this.state.firstClassId,
        secondClassId: value,
        authorizeOrgId: this.props.sellerOrganizationId,
        authorizedOrgId: this.props.buyerOrganizationId
      })
    })
  }
  /**
   * third class selector
   */
  thirdClassChange = (event, index, value) => {
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback({
        firstClassId: this.state.firstClassId,
        secondClassId: this.state.secondClassId,
        thirdClassId: value
      })
    }
    this.setState({ thirdClassId: value }); // 三分类选择好后不做其他数据请求
  }
  render() {
    return (
      <div>
        <SelectField
          labelStyle={{ lineHeight: '40px',...this.props.labelStyle }}
          {...this.props.styleOptions}
          value={this.state.firstClassId} hintText={'一级分类'} maxHeight={200}
          style={{ marginRight: 15, height: 40, overflow: 'hidden' }} onChange={this.firstClassChange}
        >
          {this.props.threeCategorySelector.firstSelectorList.map((select, index) =>
            <MenuItem key={select.class_id} value={select.class_id} primaryText={select.class_name} />
          )}
        </SelectField>
        <SelectField
          labelStyle={{ lineHeight: '40px',...this.props.labelStyle}}
          {...this.props.styleOptions}
          value={this.state.secondClassId} hintText={'二级分类'} maxHeight={200}
          onChange={this.secondClassChange} style={{ marginRight: 15, height: 40, overflow: 'hidden' }}
        >
          {this.props.threeCategorySelector.secondSelectorList.map((select, index) =>
            <MenuItem key={select.class_id} value={select.class_id} primaryText={select.class_name} />
          )}
        </SelectField>
        <SelectField
          labelStyle={{ lineHeight: '40px',...this.props.labelStyle }}
          {...this.props.styleOptions}
          value={this.state.thirdClassId} hintText={'三级分类'} maxHeight={200}
          onChange={this.thirdClassChange} style={{ marginRight: 15, height: 40, overflow: 'hidden' }}
        >
          {this.props.threeCategorySelector.thirdSelectorList.map((select, index) =>
            <MenuItem key={select.class_id} value={select.class_id} primaryText={select.class_name} />
          )}
        </SelectField>
      </div>
    )
  }
}
