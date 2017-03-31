import React from 'react'
import VariableValidator from 'lib/VariableValidator'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class FormValidationDemo extends React.Component {
  constructor(props) {
    super(props)

    this.trackingVars = {}

    this.state = {
      openFormValidataion: false,
      formValidator: new VariableValidator(),
      errorMessage: '',
      requiredValue: '',
      noLessValue: '',
      largeThanValue: '',
    }

    /**
     * NOTE: STEP 1:
     * register variables that required to be checked
     */
    this.trackingVars.requiredId = this.state.formValidator.registerRequired('requiredValue')
    this.trackingVars.noLessId = this.state.formValidator.registerStrNoLess('noLessValue', 3)
    this.trackingVars.largeId = this.state.formValidator.registerNumNoLess('largeThanValue', 25)
  }

    /**
     * NOTE: STEP 2:
     * set all controlled variable to this.state
     */
  handleRequired = (event) => {
    this.setState({
      requiredValue: event.target.value
    })
  }

  handleNoLess = (event) => {
    this.setState({
      noLessValue: event.target.value
    })
  }

  handleLargeThan = (event) => {
    this.setState({
      largeThanValue: event.target.value
    })
  }

  constructErrorMessage = (failedVars) => {
    let errorStr = ''
    failedVars.forEach((item) => {
      switch (item.id) {
        case this.trackingVars.requiredId:
          errorStr += '缺少必填项\n'
          break
        case this.trackingVars.noLessId:
          errorStr += '输入不得少于限定长度\n'
          break
        case this.trackingVars.largeId:
          errorStr += '输入不得小于设定数值\n'
          break
        default:
          break
      }
    })
    return errorStr
  }

  handleSubmit = () => {
    /**
     * NOTE: STEP 3:
     * call checkAllState with this.state object
     * do something with the result
     */
    const res = this.state.formValidator.checkAllState(this.state)
    if (res.result === false) {
      this.setState({
        openFormValidataion: true,
        errorMessage: this.constructErrorMessage(res.failedVars)
      })
    }
  }

  handleClose = () => {
    this.setState({
      openFormValidataion: false
    })
  }

  render() {
    return (
      <div>
        <div>
          必填文字<TextField value={this.state.requiredValue} onChange={this.handleRequired} hintText='必需填' />
        </div>
        <div>
          不少于三个字符<TextField value={this.state.noLessValue} onChange={this.handleNoLess} hintText='不少于3个字符' />
        </div>
        <div>
          数字至少25<TextField value={this.state.largeThanValue} onChange={this.handleLargeThan} hintText='大于25' />
        </div>
        <div>
          随意<TextField hintText='不必需填' />
        </div>

        <FlatButton primary label='确定' onTouchTap={this.handleSubmit} />
        <ErrorSnackBar message={this.state.errorMessage} open={this.state.openFormValidataion} onRequestClose={this.handleClose} />
      </div>
    )
  }
}
