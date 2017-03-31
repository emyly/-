/**
 * Created by wangming on 2016/10/19.
 */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './DepotSelectDialog.scss';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import WarehouseOutStockGoodsDialog from 'components/WarehouseOutStockGoodsDialog';
import Toggle from 'material-ui/Toggle';

/**
 * 使用场景：选择仓库
 * 返回值： {
 *      id : 0,
 *       name: "主仓库1",
 *      total: 100,
 *      need : 10
 * }
 */
export default class DepotSelectDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      open: this.props.open,
      storage: [],
      currentState: 0,
      level: 0, // level: 主仓库 0， 子仓库： 1， 子库位: 2
      ifNothing: false,
      currentValue: {
        // id : 0,
        // name: "主仓库1",
        // total: 100,
        // need : 10
      },
      depotPath: [],
      storageMap: [],
      cardStateCss: [],
      disabled: false,
      curDepot: {},
      tempCurrentValue: {},
      outStockGoodsDialogOpen: false,
      curWarehouseId: 0,               // 当前点击的仓库ID,缺货清单使用
      curWarehouseName: '',            // 当前点击的仓库名称,缺货清单使用
      curWarehouseClickValue: {},      // 当前点击的仓库信息
      isToggleHaveAGoods: true,        // 全部/有货 标识位
      isInit: true                     // 首次获取顶层仓库使用
    };
  }

  static defaultProps = {
    title: '选择仓库',
    /**
     * 父级仓库id（可以为空）
     */
    parentDepotId: 0,
    /**
     * 父级仓库名称（可以为空）
     */
    parentDepotName: '',
    /**
     * 是否显示子仓库（默认是）
     */
    ifChildDepotId: true,
    /**
     * 是否显示子库位（默认是）
     */
    ifStorage: true,
    /**
     * 是否显示订单库存匹配度（默认否）true显示订购总数和库存总数 false显示商品种类和商品库存总数
     */
    ifShowOrder: false,
    /**
     * 是否显示缺货提示
     */
    ifShowOutStockTips: false,
    /**
     * '0'表示既可以选择仓库也可以选择库位 '1'表示只可以选择仓库 '2'表示只可以选择库位
     */
    ifCanSelectDepotOrLocation: '0',
    /**
     * 传入参数，用于删选库位数据
     */
    storageId: [],
  };

  static propTypes = {
    title: React.PropTypes.string,
    /**
     * 父级仓库id（可以为空）
     */
    parentDepotId: React.PropTypes.number,
    /**
     * 父级仓库名称（可以为空）
     */
    parentDepotName: React.PropTypes.string,
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
    ifShowOrder: React.PropTypes.bool,
    /**
     * 订单id（默认不传, 在需要显示订单库存匹配度时，需要传入）
     */
    orderId: React.PropTypes.number,
    /**
     * 回调，用于返回值
     */
    callback: React.PropTypes.func.isRequired,
    /**
     * 控制模态对话框打开关闭
     */
    open: React.PropTypes.bool.isRequired,
    /**
     * 控制模态对话框打开关闭
     */
    handleButtonClick: React.PropTypes.func.isRequired,
     /**
     * 是否显示缺货提示
     */
    ifShowOutStockTips: React.PropTypes.bool,
    /**
     * '0'表示既可以选择仓库也可以选择库位 '1'表示只可以选择仓库 '2'表示只可以选择库位
     */
    ifCanSelectDepotOrLocation: React.PropTypes.string,
    getWarehouseForNeedData: React.PropTypes.func.isRequired,
    getWarehouseData: React.PropTypes.func.isRequired,
    getLocationForNeedData: React.PropTypes.func.isRequired,
    getLocation: React.PropTypes.func.isRequired,
    getChildLocation: React.PropTypes.func.isRequired,
    storageId: React.PropTypes.array,
    initIsTopWarehouseStatus: React.PropTypes.func,
  };
  /**
   * 按钮点击弹框
   */
  // handleClick = () => {
  // // alert('按钮被点击了');
  // this.setState({open: !this.state.open});
// };

  getWarehouse = (objectValue) => {
    if (this.props.ifShowOrder) {
      this.props.getWarehouseForNeedData(objectValue.orderId, objectValue.depotId);
    } else {
      this.props.getWarehouseData(objectValue.depotId);
    }
  };

  handleRefreshStorage = (dataArray) => {
    return () => {
      this.setState({
        storage: dataArray,
        currentValue: {}
      });
    }
  };

  handleDepotPath = (dataArray) => {
    const value = this.state.tempCurrentValue;
    if (this.state.depotPath.findIndex(val => Number(val.id) === Number(value.id) && val.name === value.name) === -1) { // 判断之前是否点击过
      const depotPath = this.state.depotPath;
      if (_.has(this.state.tempCurrentValue, 'id'))depotPath.push(this.state.tempCurrentValue);
      this.setState({ depotPath });
    }
  };

  /**
   * 获取数据初始化
   */
  componentWillReceiveProps = (nextProps) => {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        if (this.props.parentDepotId === 0) {
          // 是否顶级仓库
          // this.setState({level: 0});
          this.setState({
            currentValue: {},
            tempCurrentValue: {}
          });
          this.getWarehouse({ orderId: this.props.orderId, depotId: this.props.parentDepotId });
        } else if (this.props.ifChildDepotId) {
          // 子仓库
          // this.setState({level: 1});
          this.state.depotPath.push({
            id: this.props.parentDepotId,
            name: this.props.parentDepotName,
            type: 0,
            isWareHouse: true
          })
          this.setState({
            currentValue: {
              id: this.props.parentDepotId,
              name: this.props.parentDepotName,
              type: 0,
              isWareHouse: true
            },
            tempCurrentValue: {
              id: this.props.parentDepotId,
              name: this.props.parentDepotName,
              type: 0,
              isWareHouse: true
            },
            depotPath: this.state.depotPath
          });
          this.getWarehouse({ orderId: this.props.orderId, depotId: this.props.parentDepotId });
        }
      } else {
        this.setState({
          isToggleHaveAGoods: true,
          depotPath: [],
          currentValue: {},
          tempCurrentValue: {},
          isInit: true
        });
      }
    } else {
      const dataArray = nextProps.depotSelectDialog.warehouseData;
      if (Object.prototype.toString.call(dataArray) === '[object Array]') {
        // level: 主仓库 0， 子仓库： 1， 子仓库->子库位: 2 ,子库位->子库位 : 3
        if (dataArray.length === 0) {
          // if (this.state.level === 0) {
          //   //如果没有顶级仓库 显示 '什么也没有'
          //   this.setState({ifNothing: true});
          // } else if (this.state.level === 1) {
          if (this.state.tempCurrentValue.type === 0) {
            // 如果是子仓库 调用子库位
            this.state.tempCurrentValue.type = 2;
            if (this.props.ifStorage) {
              // this.setState({level: 2});
              if (this.props.ifShowOrder) {
                this.props.getLocationForNeedData(this.props.orderId, this.state.tempCurrentValue.id, 0);
              } else {
                this.props.getLocation(this.state.tempCurrentValue.id);
              }
            }
          }
        } else {
          this.setState({
            storage: [],
          });

          this.handleDepotPath(dataArray);
          if (nextProps.depotSelectDialog.isTopWarehouse && this.state.isInit) {
            this.props.initIsTopWarehouseStatus();
            this.getNextLevel(nextProps.depotSelectDialog.warehouseData[0]);
            this.state.tempCurrentValue = nextProps.depotSelectDialog.warehouseData[0];
            this.handleDepotPath();
            this.setState({
              tempCurrentValue: {},
              currentValue: {},
              isInit: false
            });
          } else {
            setTimeout(this.handleRefreshStorage(dataArray), 1000); // 定时刷新界面，产生动态刷新效果，
          }
          dataArray.map((value) => {
            value.isChecked = false;
            value.isHovered = false;
          });
        }
      }
    }
  };

  componentWillMount = () => {
    if (this.props.ifStorage) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOK = () => {
    const dataObject = this.state.currentValue;
    dataObject.curDepot = this.state.curDepot;
    this.props.callback(dataObject);
    this.props.handleButtonClick();
  };

  handleClose = () => {
    this.setState({ storage: [] });
    this.props.handleButtonClick();
  };

  handleSubmit = () => {

  };
  /**
   * 异步调用获取远端数据获取仓库
   */
  handleGetDepot = (value) => {
    /**
     * 异步调用获取远端数据获取仓库
     */

    /**
     * 根据获取的数据判断当前是否存在子级，如果不存在子仓库则远程获取子库位
     */
    this.getWarehouse({ orderId: this.props.orderId, depotId: value.id });
    this.setState({ curDepot: value });
    // this.props.getWarehouseForNeedData(this.props.orderId, value.id);
    // if(this.state.level === 2) {
    //   let a = 1;
    //   this.setState({currentState: this.state.currentState + 1});
    //   console.log(this.state.currentState);
    //   this.handleGetStorage(value);
    // }else{
    //   this.setState({level: this.state.level + 1});
    //   this.state.depotPath.push(value);
    //   console.log("level:", this.state.level);
    //   this.setState({storage : [
    //     {
    //       id : 0,
    //       name: '子仓库1',
    //       total: 100,
    //       need : 10
    //     },
    //     {
    //       id : 1,
    //       name: "子仓库2",
    //       total: 200,
    //       need : 20
    //     },
    //     {
    //       id : 2,
    //       name: "子仓库3",
    //       total: 100,
    //       need : 10
    //     },
    //     {
    //       id : 3,
    //       name: "子仓库4",
    //       total: 100,
    //       need : 10
    //     },
    //     {
    //       id : 4,
    //       name: "子仓库5",
    //       total: 100,
    //       need : 10
    //     },
    //     {
    //       id : 5,
    //       name: "子仓库6",
    //       total: 100,
    //       need : 10
    //     }
    //   ]});
    // }
  };
  /**
   * 异步调用获取远端数据获取库位
   */
  handleGetStorage = (value) => {
    if (this.props.ifStorage) {
      if (this.props.ifShowOrder) {
        this.props.getLocationForNeedData(this.props.orderId, this.state.curDepot.id, value.id);
      } else {
        this.props.getChildLocation(value.id);
      }
    }
  };
  /**
   * 异步调用获取远端数据获取仓库与库位
   */
  getNextLevel = (value) => {
    if (value.type === 0) {
      if (!this.props.ifChildDepotId) {
        /**
         * 直接返回当前id
         */
        // this.setState({currentState: 0});
        // this.props.callback({
        //   depot : {
        //     id : value. id,
        //     name : value.name
        //   }
        // })
      } else {
        this.handleGetDepot(value);
      }
    } else {
      this.handleGetStorage(value);
    }
  };

  /**
   * 点击仓库或库位，获取下一级子列表或者返回结果
   */
  handleCardClick(value) {
    return (event) => {
      this.getNextLevel(value);
      this.setState({
        tempCurrentValue: value,
      });
    }
  }
   /**
   * checkbox div onclick事件
   */
  handleCheckBoxClick = index => (event) => {
    if (!this.state.storage[index].isChecked) {
      this.state.storage.map((value) => {
        value.isChecked = false;
        value.isHovered = false;
      });
    }
    this.state.storage[index].isChecked = !this.state.storage[index].isChecked;
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      storage: this.state.storage,
      currentValue: this.state.storage[index].isChecked ? this.state.storage[index] : {}
    });
  }

  /**
   * 仓库库存缺货警告Dialog
   */
  handleWarehouseOutStock = value => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      outStockGoodsDialogOpen: true,
      curWarehouseId: value.id,
      curWarehouseName: value.name,
      curWarehouseClickValue: value
    });
  }

  goToDepot = (value, index) => () => {
    if (value.type === 0 || value.type === 3) {
      this.handleGetDepot(value);
      if (this.props.ifStorage) {
        this.setState({ disabled: true });
      }
    } else {
      this.handleGetStorage(value);
      if (this.props.ifStorage) {
        this.setState({ disabled: false });
      }
    }
      // this.setState({currentValue: value});
    this.setState({ tempCurrentValue: value });
    // let tpDepotPath = this.state.depotPath;
    // tpDepotPath.splice(index, this.state.depotPath.length - index);

    const tpDepotPath =
      this.state.depotPath.slice(0, this.state.depotPath.findIndex(val => Number(val.id) === Number(value.id) && val.name === value.name) + 1);

    this.setState({ depotPath: tpDepotPath });
  };

  CardOnMouseOver = (value, index) => () => {
    const dataArray = this.state.cardStateCss;
    dataArray[index] = { backgroundColor: 'red' };
    this.setState({ cardStateCss: dataArray });
  };
  /**
   * RaiseButton onMouseEnter 事件
   */
  handleRaiseButtonMouseEnter = value => () => {
    if (!value.isHovered) {
      value.isHovered = true;
      this.setState({ storage: this.state.storage });
    }
  };

  /**
   *RaiseButton onMouseLeave 事件
   */
  handleRaiseButtonMouseLeave = value => () => {
    if (value.isHovered) {
      value.isHovered = false;
      this.setState({ storage: this.state.storage });
    }
  };

  disableBtn = () => {
    if (_.has(this.state.currentValue, 'id') &&
        (this.props.ifCanSelectDepotOrLocation === '0' ||
         (this.props.ifCanSelectDepotOrLocation === '1' && this.state.currentValue.isWareHouse === true) ||
         (this.props.ifCanSelectDepotOrLocation === '2' && this.state.currentValue.isWareHouse === false))) {
      return false;
    }
    return true;
  };
  /**
   * 缺货清单Dialog切换
   */
  handleOutStockGoodsDialog = () => {
    this.setState({
      outStockGoodsDialogOpen: !this.state.outStockGoodsDialogOpen
    });
  }
  /**
   * 显示全部/有货切换事件
   */
  handleToggleHaveAGoods = () => () => {
    this.setState({
      isToggleHaveAGoods: !this.state.isToggleHaveAGoods
    })
  }

  render() {
    const actions = (
      <nav
        style={{
          display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', paddingLeft: '15px', paddingRight: '10px' }}
      >
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
          <span style={{ color: '#808080', fontSize: '14px', fontFamily: 'SourceHanSansCN-Regular', width: '40px', textAlign: 'left' }}>全部</span>
          <Toggle
            style={{ width: '30px' }}
            label=''
            defaultToggled
            onToggle={this.handleToggleHaveAGoods()}
          />
          <span
            style={{ color: '#808080', fontSize: '14px', fontFamily: 'SourceHanSansCN-Regular', width: 50, textAlign: 'left', paddingLeft: '22px' }}
          >
            有货
          </span>
        </div>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
          <FlatButton
            label='关闭'
            style={{ margin: 10, color: '#E64C4C', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
            primary
            onTouchTap={this.handleClose}
          />
          <FlatButton
            label='确定'
            style={{ margin: 10, color: '#00A0FF', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', opacity: this.disableBtn() ? '0.5' : '1' }}
            primary
            disabled={this.disableBtn()}
            onTouchTap={this.handleOK}
          />
        </div>
      </nav>
      );
    return (
      <div>
        <Dialog
          title={
            <div>
              <span style={{ fontSize: '20px', color: '#000', fontFamily: 'SourceHanSansCN-Regular' }}>{this.props.title}</span>
              <span style={{ fontSize: '16px', color: '#41a1ff', fontFamily: 'SourceHanSansCN-Regular', marginLeft: '2rem' }}>
                {_.has(this.state.currentValue, 'id') ? `已选择：${this.state.currentValue.name}` : ''}</span>
            </div>
          }
          titleClassName='dialog-title'
          actions={actions}
          modal
          open={this.props.open}
          repositionOnUpdate
          autoScrollBodyContent
          titleStyle={{ height: '70px', padding: 0, paddingLeft: '25px', lineHeight: '70px', border: 'none' }}
          actionsContainerStyle={{ height: '55px', paddingTop: '0px', border: 'none' }}
          // onRequestClose = {this.props.handleButtonClick}
        >
          <div className='ware-house-path'>
            {
              this.state.depotPath.map((value, index) => {
                if (index === 0) {
                  return (<a
                    key={index}
                    onClick={this.goToDepot(value, index)}
                    className='path-name'
                  > {value.name} </a>)
                } else {
                  return (<div key={index}>
                    <span className='path-point'> {'>'} </span>
                    <a
                      key={index}
                      onClick={this.goToDepot(value, index)}
                      className='path-name'
                    > {value.name} </a>
                  </div>)
                }
              })
            }
          </div>

          <div className='ware-house-choose-content'>
            <ReactCSSTransitionGroup
              transitionName='depotSelectAnimation'
              className='choose-boxes-data-content'
              component='div'
            >
              {
                this.state.storage.map((value, index) => {
                  if (!value.isWareHouse) {
                    if (this.props.storageId.some((sd) => {
                      return Number(sd) === Number(value.id);
                    })) {
                      // console.debug('DepotSelectDialog:', sd, value.KWID);
                      return;
                    }
                  }
                  if (!this.state.isToggleHaveAGoods
                    || (this.state.isToggleHaveAGoods
                    && (this.props.ifShowOrder ? value.total : value.goodsTotals) > 0)) {
                    const isWareHouse = value.isWareHouse ? '#364356' : '#a8ade3';
                    return (<div
                      key={index}
                      className='single-ware-house'
                      style={{
                        border: (value.isHovered || value.isChecked) ? '1px solid #41A1FF' : '1px solid transparent',
                        boxShadow: value.isHovered ? '0 0 8px rgba(65, 161, 255, .5)' : 'none' }}
                              // onClick={this.handleCardClick(Object.assign({}, value))}
                      onClick={this.handleCardClick(value)}
                      onMouseEnter={this.handleRaiseButtonMouseEnter(value)}
                      onMouseLeave={this.handleRaiseButtonMouseLeave(value)}
                    >

                      <div
                        className='single-ware-house-top-area'
                        style={{
                          backgroundColor: (value.isHovered || value.isChecked) ? '#41A1FF' : isWareHouse
                        }}
                      >
                        <img
                          style={{
                            width: value.isWareHouse ? '20px' : '17px',
                            height: value.isWareHouse ? '16px' : '20px' }}
                          src={value.isWareHouse ? '/warehouseGeneralIcon/warehouse.png' : '/warehouseGeneralIcon/locationStorage.png'} alt='仓库/库位'
                        />
                        <span className='single-ware-house-title' title={value.name}>{value.name}</span>
                      </div>
                      <div className='single-ware-house-bottom-area'>
                        <div style={{ width: '194px', height: '100%', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                          <div className='ware-house-checkbox-div' onClick={this.handleCheckBoxClick(index)}>
                            <Checkbox
                              style={{ width: '100%', height: '100%' }}
                              inputStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
                              labelStyle={{ width: '100%', height: '100%', overflow: 'hidden' }}
                              disabled={false}
                              checked={value.isChecked}
                              iconStyle={{
                                display: 'inline-block',
                                color: '#979797',
                                fill: (value.isHovered || value.isChecked) ? '#41A1FF' : '#979797',
                                width: '100%',
                                height: '100%',
                                userSelect: 'none'
                              }}
                            />
                          </div>
                          {
                                  (() => {
                                    if (this.props.ifShowOrder) {
                                      return (<div className='ware-house-goods-statistics-div'>
                                        <span className='goods-statistics-word'>订购：{value.need}种</span>
                                        <span className='goods-statistics-word'>库存：{value.total}种</span>
                                      </div>)
                                    } else {
                                      return (<div className='ware-house-goods-statistics-div'>
                                        <span className='goods-statistics-word'>种类：{value.goodsTypes}</span>
                                        <span className='goods-statistics-word'>数量：{value.goodsTotals}</span>
                                      </div>)
                                    }
                                  })()
                                }
                        </div>
                        {
                                (() => {
                                  if (this.props.ifShowOutStockTips && value.need > value.total) {
                                    return (<div onClick={this.handleWarehouseOutStock(value)} style={{ width: '24px' }}>
                                      <img src='/WarehouseAdmin/showOutStockIcon.png' style={{ width: '24px', height: '24px' }} alt='备货' />
                                    </div>)
                                  }
                                })()
                              }
                      </div>
                    </div>)
                  }
                })
              }
            </ReactCSSTransitionGroup>
          </div>

        </Dialog>
        <WarehouseOutStockGoodsDialog
          depotPath={this.state.depotPath || []}
          orderId={this.props.orderId}
          warehouseValue={this.state.curWarehouseClickValue}
          warehouseName={this.state.curWarehouseName || ''}
          warehouseId={Number(this.state.curWarehouseId)}
          open={this.state.outStockGoodsDialogOpen}
          handleDialogClose={this.handleOutStockGoodsDialog}
        />
      </div>
    )
  }
}

