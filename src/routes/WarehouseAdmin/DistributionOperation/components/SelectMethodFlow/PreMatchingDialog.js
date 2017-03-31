/**
 * Created by wangming on 2017/3/29.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
Table,
TableHeader,
TableBody,
TableRow,
TableRowColumn,
TableHeaderColumn
} from 'material-ui/Table';
// import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CardUI from 'components/StandardUI/StandardCard';
import { ProductStockClass } from '../SelectProduction/SelectProductionData';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';

/**
 * 使用场景：预配套对话框
 */
export default class PreMatchingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageList: [],
      selectedStockObject: new ProductStockClass([]), // 拣货单数据实例
      newPrematchStockList: [],
      errorMessage: '',
      openError: false,
      alertMessage: {
        orderQuantity: {
          type: 0,
          count: 0,
        },
        selected: {
          type: 0,
          count: 0,
        },
        unselected: {
          type: 0,
          count: 0,
        }
      }
    };
    this.preMatchedStorageId = [];
    this.selectedDataList = [];
    this.newPrematchDataList = [];
  }

  static propTypes = {
    matchedStorages: PropTypes.array.isRequired,
    materialList: PropTypes.array.isRequired,
    dialogOpen: PropTypes.bool.isRequired,
    preMatchingDialogCloseCallback: PropTypes.func.isRequired,
    preMatchingDialogSubmitCallback: PropTypes.func.isRequired,
    orderId: PropTypes.number.isRequired,
    getPrematchingData: PropTypes.func.isRequired,
    preMatchingDialog: PropTypes.object.isRequired,
  };

  componentWillMount = () => {
  };

  // 接收上层的props更新(父组件或者store的state)
  componentWillReceiveProps(nextProps) {
    if (nextProps.dialogOpen) {
      // 刚打开
      if (nextProps.dialogOpen !== this.props.dialogOpen) {
        this.props.getPrematchingData({
          orderId: this.props.orderId,
          storage: this.props.matchedStorages
        });
        this.preMatchedStorageId = this.props.matchedStorages.slice(0);
      } else if (!nextProps.preMatchingDialog.errorData) {
          // this.setState({ newPrematchList: nextProps.preMatchingDialog.preMatchData.slice(0) });
        this.newPrematchDataList = nextProps.preMatchingDialog.preMatchData.slice(0);
        this.adaptnewPrematchData();
      } else {
        this.alertError(nextProps.preMatchingDialog.errorData);
        this.newPrematchDataList = [];
        this.adaptnewPrematchData();
      }
    }
  }

  alertError = (msg) => {
    this.setState({
      openError: true,
      errorMessage: msg
    });
  };

  adaptnewPrematchData = () => {
    if (this.newPrematchDataList.length <= 0) {
      this.setState({ newPrematchStockList: [] });
      return;
    }
    const newList = [];
    // let curStockId = Number(this.newPrematchDataList[0].KWID);
    this.newPrematchDataList.map((nl, index) => {
      if (!newList.some((nnl) => {
        if (Number(nnl.KWID) === Number(nl.KWID)) {
          nnl.materials.push(nl);
          return true;
        }
      })) {
        const newStockObj = {};
        newStockObj.KWID = nl.KWID;
        newStockObj.KWLJ = nl.KWLJ;
        newStockObj.materials = [];
        newStockObj.materials.push(nl);
        newList.push(newStockObj);
      }
    });

    this.setState({ newPrematchStockList: newList });
  };

  preMatchingDialogClose =() => {
    this.setState({
      storageList: [],
      selectedStockObject: new ProductStockClass([]), // 拣货单数据实例
      newPrematchStockList: [],
      errorMessage: '',
      openError: false,
    });
    this.preMatchedStorageId = [];
    this.selectedDataList = [];
    this.newPrematchDataList = [];
    this.props.preMatchingDialogCloseCallback();
  }

  preMatchingDialogSubmit = () => {
    this.props.preMatchingDialogSubmitCallback(this.selectedDataList);
    this.setState({
      storageList: [],
      selectedStockObject: new ProductStockClass([]), // 拣货单数据实例
      newPrematchStockList: [],
      errorMessage: '',
      openError: false,
    });
    this.preMatchedStorageId = [];
    this.selectedDataList = [];
    this.newPrematchDataList = [];
  }

  showSelectedTable = (dataNode, options) => {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {
              options.map((th, index) => {
                return (
                  <TableHeaderColumn
                    key={index}
                    style={{
                      ...th.headerColStyle
                    }}
                  >
                    {th.title}
                  </TableHeaderColumn>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows={false}>
          {
            dataNode.ProductListByMaterialID.map((pd, index) => (
              <TableRow key={index}>
                {
                  options.map((col, colindex) => (
                    <TableRowColumn
                      key={colindex}
                      style={{
                        ...col.bodyColStyle
                      }}
                    >
                      <span>
                        {
                          pd[col.name]
                        }
                      </span>
                    </TableRowColumn>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>

      </Table>
    )
  }

  handleUnselectStorage = (storage) => {
    return (e) => {
      const id = storage.StockPositionID;
      const idIndex = this.preMatchedStorageId.findIndex((pi => (pi === id)));
      if (idIndex !== -1) {
        this.preMatchedStorageId.splice(idIndex, 1);
      }

      const newSelectedDataList = [];
      this.selectedDataList.map((sl, index) => {
        if (sl.KWID !== storage.StockPositionID) {
          newSelectedDataList.push(sl);
        }
      })

      this.selectedDataList = newSelectedDataList;
      this.setState({ selectedStockObject: new ProductStockClass(this.selectedDataList) });

      this.props.getPrematchingData({
        orderId: this.props.orderId,
        storage: this.preMatchedStorageId,
      });
    }
  }

  showSelectedCard = () => {
    const topStyle = {
      backgroundColor: '#00A0FF',
      fontSize: '16px',
    }

    const labelStyle = {
      fontSize: '16px',
    }

    const titleStyle = {
      fontSize: '16px',
    }

    const tableOptions = [
      {
        title: '物料号',
        name: 'MaterialID',
        style: {

        },
      },
      {
        title: '规格型号',
        name: 'GoodsDestribution',
        style: {
        }
      },
      {
        title: '订购数量',
        name: 'LastNumber',
        style: {
        }
      },
      {
        title: '库存',
        name: 'TotalNum',
        style: {

        }
      }
    ]

    return (
      this.state.selectedStockObject.getProductStockByFilter('').map((sl, index) => {
        let goodsNumber = 0;
        sl.ProductListByMaterialID.map((pi) => {
          goodsNumber += pi.TotalNum;
        })
        return (<CardUI
          key={index}
          expanded
          topStyle={topStyle}
          titleStyle={titleStyle}
          labelStyle={labelStyle}
          title={<div onClick={this.handleUnselectStorage(sl)} style={{ cursor: 'pointer' }}>
            {sl.StockPositonName.split('-').join('>')}
          </div>}
          label={`拣货${sl.ProductListByMaterialID.length}种,${goodsNumber}件`}
          CardTextStyle={{ height: 'auto', padding: 0 }} CardStyle={{ overflow: 'hidden' }}
        >
          {
            this.showSelectedTable(sl, tableOptions)
          }
        </CardUI>)
      })
    )
  };

  handleSelectStorage = (storage) => {
    return (e) => {
      const id = storage.KWID;
      // // if (Object.prototype.toString.call(this.preMatchedStorageId.find(id))
      // // === '[object Undefined]') {
      this.preMatchedStorageId.push(id);
      this.selectedDataList = this.selectedDataList.concat(storage.materials);
      this.setState({ selectedStockObject: new ProductStockClass(this.selectedDataList) });
      this.props.getPrematchingData({
        orderId: this.props.orderId,
        storage: this.preMatchedStorageId,
      });

      // }
    }
  };

  showUnselectedCard = () => {
    const divStyle = {
      height: '64px',
      lineHeight: '64px',
    };

    return (
      this.state.newPrematchStockList.map((nl, index) => (
        <div style={divStyle} key={index} onClick={this.handleSelectStorage(nl)}>
          {nl.KWLJ.split('-').join('>')}
        </div>
      ))
    )
  };

  handleErrorClose = () => {
    this.setState({
      openError: false,
      errorMessage: '',
    })
  };

  getAlertMessage = () => {
    const alertObject = {
      orderQuantity: {
        type: 0,
        count: 0,
      },
      selected: {
        type: 0,
        count: 0,
        goods: {},
      },
      unselected: {
        type: 0,
        count: 0,
      }
    };

    const orderQuantity = alertObject.orderQuantity;
    const selected = alertObject.selected;
    const unselected = alertObject.unselected;

    orderQuantity.type = this.props.materialList.length;

    this.props.materialList.map((ml) => {
      orderQuantity.count += ml.DGSL;
      unselected.type += ml.WPHSL > 0 ? 1 : 0;
      unselected.count += Number(ml.WPHSL);
      selected.goods[ml.SPID] = {};
      selected.goods[ml.SPID].selectedCount = 0;
      // 获取已选中
      this.selectedDataList.map((sl) => {
        if (Number(sl.SPID) === Number(ml.SPID)) {
          selected.goods[ml.SPID].selectedCount += Number(sl.ZSL);
        }
      })


      if ((Number(ml.WPHSL) - selected.goods[ml.SPID].selectedCount) <= 0) {
        unselected.type -= 1;
      }
    })

    const selectedkeyArray = Object.keys(selected.goods);
    selectedkeyArray.map((sa) => {
      selected.type += selected.goods[sa].selectedCount > 0 ? 1 : 0;
      selected.count += selected.goods[sa].selectedCount;
    })

    unselected.count -= selected.count;
    return alertObject;
  };

  render() {
    // alertMessage: {
    //     orderQuantity: {
    //       type: 0,
    //       count: 0,
    //     },
    //     selected: {
    //       type: 0,
    //       count: 0,
    //     },
    //     unselected: {
    //       type: 0,
    //       count: 0,
    //     }
    //   }
    const alertObject = this.getAlertMessage();
    const actions = [
      <div
        className='row'
        style={{
          width: '100%',
          height: '85px',
          paddingLeft: '49px',
          lineHeight: '85px',
          fontFamily: 'SourceHanSansCN-Regular',
          color: '#00A0FF',
          fontSize: '16px',
        }}
      >
        <div className='col-xs-2' style={{ textAlign: 'left' }}>
          订购数量：{alertObject.orderQuantity.type}种 {alertObject.orderQuantity.count}件
        </div>
        <div className='col-xs-2' style={{ textAlign: 'left' }}>
          已选中：{alertObject.selected.type}种 {alertObject.selected.count}件
        </div>
        <div className='col-xs-2' style={{ textAlign: 'left' }}>
          待拣货：{alertObject.unselected.count}种 {alertObject.unselected.count}件
        </div>
        <div className='col-xs-3' />
        <div className='col-xs-3'>
          <FlatButton label='取消' onTouchTap={this.preMatchingDialogClose} />
          <FlatButton label='确定' primary onTouchTap={this.preMatchingDialogSubmit} />
        </div>
      </div>
    ]
    return (
      <div>
        <Dialog
          title={<div>
            <span className='bigTitle'>请选择配套库位 &nbsp;&nbsp;</span>
          </div>}
          actions={actions}
          modal
          open={this.props.dialogOpen}
          onRequestClose={this.preMatchingDialogClose}
          contentStyle={{ width: '90%', maxWidth: 'none', maxHeight: 'none' }}
        >
          <div style={{ height: '500px', overflow: 'auto' }} >
            <div>{this.showSelectedCard()}</div>
            <div>{this.showUnselectedCard()}</div>
          </div>
        </Dialog>
        <ErrorSnackBar
          message={this.state.errorMessage} open={this.state.openError}
          onRequestClose={this.handleErrorClose}
        />
      </div>
    )
  }
}
