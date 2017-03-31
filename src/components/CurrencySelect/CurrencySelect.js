/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './CurrencySelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/**
 * 使用场景：选择币种
 */
export default class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultCurrency
    };
  }

  static propTypes = {
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    callback: PropTypes.func,
    defaultCurrency: PropTypes.string
  }

  static defaultProps = {
    defaultCurrency: 'CNY',
    style: {}
  }

  componentWillMount() {
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback(this.props.defaultCurrency);
    }
    this.props.getCurrency()
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    if (Object.prototype.toString.call(this.props.callback) === '[object Function]') {
      this.props.callback(value);
    }
  };

  render() {
    return (
      <div>
        <SelectField value={this.state.value} hintText='选择币种' onChange={this.handleChange} maxHeight={200} style={{ ...this.props.style }} labelStyle={{ ...this.props.labelStyle }}>
          {this.props.currencySelect.currencyData.map(o => (<MenuItem value={o.HBDM} key={o.HBDM} primaryText={o.HBMC} />))}
        </SelectField>
      </div>
    )
  }
}
