import React from 'react'
import Dialog from 'components/StandardUI/StandardDialog'
import FlatButton from 'material-ui/FlatButton'

export default class FormValidationDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  static propTypes = {
    title: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    modal: React.PropTypes.bool,
    open: React.PropTypes.bool.isRequired,
    closeCallback: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    modal: true,
    errorMessage: '有必需填写或选择的内容未填写',
    title: '验证提示'
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open
      })
    }
  }

  handleClose = () => {
    this.props.closeCallback()
  }

  render() {
    const actions = [
      <FlatButton label='确定' onTouchTap={this.handleClose} />
    ]

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={this.props.modal}
        open={this.state.open}
      >
        {this.props.errorMessage}
      </Dialog>
    )
  }
}
