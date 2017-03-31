/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './DateRangePicker.scss'
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';

/**
 * 使用场景：选择时间范围
 */
export default class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginDate: new Date(),
      endDate: new Date(),
      minDate: this.props.minDate || new Date(0),
      maxDate: this.props.maxDate || new Date(2999, 1, 1),
      quickChoice: null,
      open: false
    };
  }

  static defaultProps = {
    isHorizontal: true,
    displayQuickChoice: true
  }

  static propTypes = {
    // 排列方式 是否横向
    isHorizontal: PropTypes.oneOf([true, false]),
    // 显示快速选择按钮
    displayQuickChoice: PropTypes.bool,
    // 最小选择时间
    minDate: PropTypes.any,
    // 最大选择时间
    maxDate: PropTypes.any
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeBeginDate = (event, date) => {
    this.setState({
      beginDate: date,
      quickChoice: null
    });
  };

  handleChangeEndDate = (event, date) => {
    this.setState({
      endDate: date,
      quickChoice: null
    });
  }

  handleChangeBeginTime = (event, date) => {
    if (date > this.state.endDate) {
      this.state.open = true
    }
    this.setState({
      quickChoice: null,
      beginTime: date
    });
  }

  handleChangeEndTime = (event, date) => {
    this.setState({
      quickChoice: null,
      endTime: date
    });
  }

  handleChangeQuickChoice = (event, index, value) => {
    this.setState({
      beginDate: moment().startOf(value).toDate(),
      endDate: moment().endOf(value).toDate(),
      quickChoice: value
    });
  }

  render() {
    return (
      <div>
        <SelectField style={this.props.displayQuickChoice ? { width: 70 } : { display: 'none' }} value={this.state.quickChoice} hintText='自定义' onChange={this.handleChangeQuickChoice}>
          <MenuItem value={'day'} primaryText='今天' />
          <MenuItem value={'week'} primaryText='本周' />
          <MenuItem value={'month'} primaryText='本月' />
        </SelectField>
        <div style={this.props.isHorizontal ? { display: 'flex', flexDirection: 'row' } : null}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ paddingTop: 12 }}>开始日期：</div>
            <DatePicker
              textFieldStyle={{ width: 90 }}
              onChange={this.handleChangeBeginDate}
              autoOk
              value={this.state.beginDate}
              disableYearSelection={false}
              shouldDisableDate={date => date > (this.state.endDate || this.state.maxDate) || date <= this.state.minDate}
            />
            <TimePicker
              textFieldStyle={{ width: 55 }}
              autoOk
              format='24hr'
              hintText='开始时间'
              value={this.state.beginDate}
              onChange={this.handleChangeBeginTime}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ paddingTop: 12 }}>&nbsp;&nbsp;结束日期：</div>
            <DatePicker
              textFieldStyle={{ width: 90 }}
              onChange={this.handleChangeEndDate}
              autoOk
              value={this.state.endDate}
              disableYearSelection={false}
              shouldDisableDate={date => date < (this.state.beginDate || this.state.minDate) || date >= this.state.maxDate}
            />
            <TimePicker
              textFieldStyle={{ width: 55 }}
              autoOk
              format='24hr'
              hintText='结束时间'
              value={this.state.endDate}
              onChange={this.handleChangeEndTime}
            />
          </div>
        </div>
        <Dialog
          actions={[<FlatButton label='确定' primary onTouchTap={this.handleClose} />]}
          modal={false}
          open={this.state.open}
        >
        选择时间错误
        </Dialog>
      </div>
    )
  }
}
