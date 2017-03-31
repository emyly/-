/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './OrderMessage.scss'
import TextField from 'material-ui/TextField';

/**
 * 使用场景：填写备注（订单）
 */
export default class OrderMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  static propTypes = {
    style: PropTypes.object,
  }


  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <TextField
          floatingLabelText='填写备注'
          value={this.state.value}
          onChange={this.handleChange}
          multiLine
          rows={2}
          rowsMax={4}
          style={this.props.style}
        />
      </div>
    )
  }
}
