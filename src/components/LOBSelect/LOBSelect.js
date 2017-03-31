/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './LOBSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import SelectDropMenu from 'components/SelectDropMenu';
/**
 * 使用场景：选择业务线
 */
export default class LOBSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  static defaultProps = {
    contract_type: '',
    style: {},
    menuStyle: {},
    labelStyle: {},
    callback: () => {},
    hintText: ''
  }

  static propTypes = {
    // 买方组织机构ID
    buyerOrganizationId: PropTypes.number.isRequired,
    // 卖方组织机构ID
    sellerOrganizationId: PropTypes.number,
    contract_type: PropTypes.string,
    style: PropTypes.object,
    menuStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    callback: PropTypes.func.isRequired,
    // value:PropTypes.number,
    errorText: PropTypes.bool,
    hintText: PropTypes.string
  }

  componentWillMount() {
    console.log('value====', this.props.value);
    this.setState({ value: this.props.value });
    if (this.props.buyerOrganizationId) { this.props.getLOBData(this.props.contract_type, this.props.sellerOrganizationId, this.props.buyerOrganizationId); }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === -1 || nextProps.value === '') { this.setState({ value: nextProps.value }); }
    if (nextProps.buyerOrganizationId != this.props.buyerOrganizationId || nextProps.sellerOrganizationId != this.props.sellerOrganizationId) {
      this.props.getLOBData(nextProps.contract_type, nextProps.sellerOrganizationId, nextProps.buyerOrganizationId);
      this.setState({
        value: ''
      });
    }
  }

  handleChange = (event, index, value) => {
    this.props.newStyleFlag ? this.props.callback(value.id, event.target.innerText) : this.props.callback(value, event.target.innerText);
    this.props.newStyleFlag ? this.setState({ value: value.id }) : this.setState({ value });
  };
  // handleChange = (event, index, value) => {
  //   if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
  //     this.props.newStyleFlag?this.props.callback(value.id, event.target.innerText):this.props.callback(value, event.target.innerText)
  //   }
  //   this.props.newStyleFlag?this.setState({ value:value.id }):this.setState({ value });
  // };
  render() {
    return (
      () => {
        const items = this.props.lobSelect.lobData.map(value => ({ id: value.business_line_id, name: value.business_line_name }));
        if (this.props.newStyleFlag) {
          return (<SelectDropMenu
            title={'业务线'}
            backgroundColor={'#fdf9f5'}
            borderColor={'#ff9336'}
            items={items}
            onChange={this.handleChange}
            isShowError={this.props.errorText ? true : false}
          />)
        } else {
          return (<SelectField
            {...this.props.styleOptions}
            value={this.state.value} hintText={this.props.hintText} errorText={this.props.errorText}
            labelStyle={{ lineHeight: '40px', ...this.props.labelStyle }}
            onChange={this.handleChange} maxHeight={200} style={{ marginRight: 15, height: 40, fontFamily: 'SourceHanSansCN-Regular', overflow: 'hidden', ...this.props.style }} menuStyle={this.props.menuStyle}
          >
            {this.props.lobSelect.lobData.map(line =>
              <MenuItem value={line.business_line_id} key={line.business_line_id} primaryText={line.business_line_name} />
            )}
          </SelectField>)
        }
      }
    )()
  }
}
