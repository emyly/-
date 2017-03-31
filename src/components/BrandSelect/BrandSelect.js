/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './BrandSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import SelectDropMenu from 'components/SelectDropMenu';

/**
 * 使用场景：选择品牌
 */
export default class BrandSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  static defaultProps = {
    contractType: '',
    style: {}
  }

  static propTypes = {
    // 买方组织机构ID
    buyerOrganizationId: PropTypes.number.isRequired,
    // 卖方组织机构ID
    sellerOrganizationId: PropTypes.number,
    // 业务线id
    LOBId: PropTypes.number.isRequired,
    contractType: PropTypes.string,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    callback: PropTypes.func,
    getBrandData: PropTypes.func.isRequired,
    errorText: PropTypes.bool,
    newStyleFlag: PropTypes.bool
  }
  static defaultPropTypes = {
    newStyleFlag: false
  }

  componentWillMount() {
    // 此处willMount内容可去除

    this.setState({ value: this.props.value });
    if (this.props.LOBId && this.props.LOBId !== -1) {
      this.props.getBrandData({
        contractType: this.props.contractType,
        businessLineId: this.props.LOBId,
        authorizeOrgId: this.props.sellerOrganizationId,
        authorizedOrgId: this.props.buyerOrganizationId
      });
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== undefined) {
      this.setState({ value: nextProps.value });
    }
    if (!!nextProps.LOBId && nextProps.LOBId !== -1 && nextProps.LOBId !== this.props.LOBId) {     // 当业务线存在时请求数据
      this.setState({ value: '' }); // 业务线请求把品牌选择置为空
      this.props.fetchbrandSelectInitData(); // 初始化品牌选择器store数据
      this.props.getBrandData({
        contractType: nextProps.contractType,
        businessLineId: nextProps.LOBId,
        authorizeOrgId: nextProps.sellerOrganizationId,
        authorizedOrgId: nextProps.buyerOrganizationId
      });
    }
  }

  handleChange = (event, index, value) => {
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.newStyleFlag ? this.props.callback(value.id, event.target.innerText) : this.props.callback(value, event.target.innerText)
    }
    this.props.newStyleFlag ? this.setState({ value: value.id }) : this.setState({ value });
  };

  render() {
    return (
      () => {
        const items = this.props.brandSelect.brandData.map(value => ({ id: value.brand_id, price: value.type_money, name: value.brand_name }));
        if (this.props.newStyleFlag) {
          return (<SelectDropMenu
            title={'品牌'}
            backgroundColor={'#fdf9f5'}
            borderColor={'#ff9336'}
            items={items}
            onChange={this.handleChange}
            isShowError={this.props.errorText ? true : false}
          />)
        } else {
          return (<SelectField
            {...this.props.styleOptions}
            value={this.state.value} hintText={this.props.hintText || ' '} labelStyle={{ lineHeight: '40px', ...this.props.labelStyle }} errorText={this.props.errorText}
            menuStyle={this.props.menuStyle}
            onChange={this.handleChange} maxHeight={200} style={{ marginRight: 15, height: 40, overflow: 'hidden', ...this.props.style }}
          >
            {this.props.brandSelect.brandData.map(brand =>
              <MenuItem value={brand.brand_id} key={brand.brand_id} primaryText={brand.brand_name} />
            )}

          </SelectField>)
        }
      }
    )()
  }
}
