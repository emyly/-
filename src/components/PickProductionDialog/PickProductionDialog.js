/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import './PickProductionDialog.scss'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

/**
 * 使用场景：拣货
 */
export default class PickProductionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dialogOpen: false
    }
  }


  static propTypes = {
    // 库位id
    KWID: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleEvent = (event) => {
    if (event.key === 'Enter') {
      this.props.getProductionData(this.state.text, this.props.KWID)
      this.setState({
        text: ''
      })
    }
  }

    // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.pickProductionDialog.productionData, this.props.pickProductionDialog.productionData)) {
      this.props.callback(nextProps.pickProductionDialog.productionData)
    }
  }

  handleDialogClose =() => {
    window.removeEventListener('keydown', this.handleEvent);
    this.setState({ dialogOpen: false })
  }

  handleDialogOpen =() => {
    this.setState({ dialogOpen: true })
    window.addEventListener('keydown', this.handleEvent);
  }

  render() {
    return (
      <div>
        <RaisedButton label='条形码输入框' primary onTouchTap={this.handleDialogOpen} />
        <Dialog
          title='条形码输入框'
          actions={[
            <FlatButton label='关闭' primary onTouchTap={this.handleDialogClose} />,
          ]}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          <BarCodeTextField text={this.state.text} onChange={this.handleChange} />
        </Dialog>
      </div>
    )
  }
}

class BarCodeTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    }
  }

  componentDidMount() {
    document.getElementById('barCodeTextField').focus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text
    });
  }

  render() {
    return (<TextField hintText='条形码输入区' value={this.state.text} ref='barCodeTextField' id='barCodeTextField' onChange={event => this.props.onChange(event)} />)
  }
}
