/**
 * Created by WMT on 2016/10/19.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import './OrderSelect.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
/**
 * 使用场景：选择订单
 */
export default class OrderSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  static defaultprops= {
    // 显示类型
    orderType: ''
  }
  static propTypes = {

    // 当前组织机构ID
    organizationId: PropTypes.number.isRequired,


    // 订单类型:1.采购 已提交 订单列表 , 2.采购 已审核 订单列表 , 3.采购 已退回 订单列表 , 4.采购复核 待复核 订单列表 , 5.采购复核 已复核 订单列表
    // 6.订单审核 待审核 订单列表 , 7.订单审核 已审核 订单列表  ,8.订单审核 已退回 订单列表 , 9.查询可折扣、物流加急、添加物流费用订单列表
    // 10.查询我给出折扣的订单列表 , 11.查询我获得折扣的订单列表 ,12.查询已加急订单列表 ,13.查询已添加物流费用的订单列表 ,14.查询可做坏账登记、收账的订单列表
    // 15.查询可做开票的订单列表 ,16.查询有坏账的订单 ,17.查询全额收账的订单 ,18.查询未全额开票的订单
    orderType: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'])
  }

  // 首次加载组件之前
  componentWillMount() {
    this.props.getOderData(this.props.organizationId, this.props.orderType)
  }
  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
    if (nextProps.organizationId !== this.props.organizationId || nextProps.orderType !== this.props.orderType) {
      this.props.getOderData(nextProps.organizationId, nextProps.orderType)
    }
  }
  handleChange = (event, index, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <SelectField value={this.state.value} hintText='选择订单' onChange={this.handleChange} maxHeight={200}>
          {
            (() => {
              if (this.props.orderSelectReducer.orderData.length) {
                { this.props.orderSelectReducer.orderData.map(info => <MenuItem value={info.GUID} key={info.GUID} primaryText={info.GUID} />) }
              }
            })()
          }
        </SelectField>
      </div>
    )
  }
}
