/**
 * Created by wangming on 2016/10/19.
 */
import React, { Component, PropTypes } from 'react';
import './DepotSelectDialogByText.scss';
import DepotSelectDialog from '../DepotSelectDialog'
import TextField from 'material-ui/TextField';

/**
 * 使用场景：通过text选择仓库
 * 返回值： {
 *      id : 0,
 *       name: "主仓库1",
 *      total: 100,
 *      need : 10
 * }
 */
export default class DepotSelectDialogByText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      open: false,
      storage: [],
      currentState: 0,
      level: 0,
      currentValue: {
        id: 0,
        name: '主仓库1',
        total: 100,
        need: 10
      },
      depotPath: [],
      textValue: ''
    };
  }

  static defaultProps = {
		/**
		 * 父级仓库id（可以为空）
		 */
    parentDepotId: 0,
		/**
		 * 是否显示子仓库（默认是）
		 */
    ifChildDepotId: true,
		/**
		 * 是否显示子库位（默认是）
		 */
    ifStorage: true,
		/**
		 * 是否显示订单库存匹配度（默认否） true显示订购总数和库存总数 false显示商品种类和商品库存总数
		 */
    ifShowOrder: false,
		/**
		 * 订单id（默认不传, 在需要显示订单库存匹配度时，需要传入）
		 */
    orderId: 0,
		/**
		 * 是否需要显示加号ICON
		 */
    isShowAddIcon: false,
    /**
     * 是否显示缺货提示
     */
    ifShowOutStockTips: false
  };

  static propTypes = {
		/**
		 * 当前组织结构id
		 */
    currentOrg: React.PropTypes.number.isRequired,
		/**
		 * 父级仓库id（可以为空）
		 */
    parentDepotId: React.PropTypes.number.isRequired,
		/**
		 * 是否显示子仓库（默认是）
		 */
    ifChildDepotId: React.PropTypes.bool.isRequired,
		/**
		 * 是否显示子库位（默认是）
		 */
    ifStorage: React.PropTypes.bool.isRequired,
		/**
		 * 是否显示订单库存匹配度（默认否）true显示订购总数和库存总数 false显示商品种类和商品库存总数
		 */
    ifShowOrder: React.PropTypes.bool.isRequired,
		/**
		 * 订单id（默认不传, 在需要显示订单库存匹配度时，需要传入）
		 */
    orderId: React.PropTypes.number.isRequired,
		/**
		 * 回调，用于返回值
		 */
    callback: React.PropTypes.func.isRequired,
		/**
		 * 输入框样式
		 */
    style: React.PropTypes.string,
		/**
		 * 是否需要显示加号ICON
		 */
    isShowAddIcon: React.PropTypes.bool,
    /**
     * 输入框className类名
     */
    className: React.PropTypes.string,
    /**
     * 是否显示缺货提示
     */
    ifShowOutStockTips: React.PropTypes.bool
  };

  handleButtonClick = () => {
    console.log('handleButtonClick');
    this.setState({ open: !this.state.open });
  };

  handleCallback = (retValue) => {
    this.setState({ textValue: retValue.name });
    this.props.callback(retValue);
  };
  render() {
    return (
      <div>
        <div onClick={() => this.setState({ open: true })} className='inforFlex'>
          <TextField
            value={this.state.textValue} multiLine
            rowsMax={8} hintText='选择仓库和库位' className={this.props.className} style={this.props.style} errorText={this.props.errorText}
          />
          {
            (() => {
              if (this.props.isShowAddIcon) {
                return <span className='atSelectIcon atSlectAddIcon' />
              }
            })()
          }
        </div>
        <DepotSelectDialog
          ifShowOutStockTips={this.props.ifShowOutStockTips}
          handleButtonClick={this.handleButtonClick} open={this.state.open}
          currentOrg={this.props.currentOrg} ifStorage={this.props.ifStorage} parentDepotId={this.props.parentDepotId}
          ifChildDepotId={this.props.ifChildDepotId} ifShowOrder={this.props.ifShowOrder} orderId={this.props.orderId} callback={this.handleCallback}
        />
      </div>
    )
  }
}
