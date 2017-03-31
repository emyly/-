import React, { Component, PropTypes } from 'react'

/**
 * 可编辑的表格单元格，避免因为单元格数据改动造成表格重新渲染
 * 当单元格失焦时，调用onChange方法
 */
export default class EditCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      isFocus: false
    }
  }

  static defaultProps = {
    onFocus: () => {},
    onBlur: () => {}
  }

  static propTypes = {
    onChange: PropTypes.func,
    row: PropTypes.object,
    value: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
    id: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  handleOnFocus = (event) => {
    this.setState({ isFocus: true });
    this.props.onFocus(event);
  }

  handleBlur = (event) => {
    this.setState({ isFocus: false })
    this.props.onChange(this.state.value);
    this.props.onBlur(event);
  }

  render() {
    const { value, isFocus } = this.state;
    return (
      <input type='number'
        id={this.props.id}
        value={value}
        style={{ width: 50, outline: 'medium', border: 'none', borderBottom: isFocus ? '2px solid #00A0FF' : '1px solid rgba(0,0,0,0.12)', background: 'none' }}
        min='0'
        onChange={(event) => { this.handleChange(event) }}
        onFocus={(event) => { this.handleOnFocus(event) }}
        onBlur={(event) => { this.handleBlur(event) }}
        placeholder='0'
      />
    );
  }
}
