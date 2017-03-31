/**
 * Author: wangming 2017/2/14
 */
import React from 'react'
import {
Dialog,
RaisedButton,
FlatButton
} from 'material-ui'

import { ProductStockClass } from './SelectProduction/SelectProductionData'

import SelectOtherTable from './SelectOtherTable';

export default class SelectOtherDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      otherStockObject: new ProductStockClass([]),
    }
  }

  static defaultProps = {
    btnText: '其他可选库位',
    stockList: []
  };

  static propTypes = {
    btnText: React.PropTypes.string,
    stockList: React.PropTypes.array,
    outBandStockId: React.PropTypes.number.isRequired,
    goodsId: React.PropTypes.number.isRequired,
    orderId: React.PropTypes.number.isRequired,
    selectedCallBack: React.PropTypes.func.isRequired,
    getOtherStorage: React.PropTypes.func.isRequired,
    material: React.PropTypes.object.isRequired,
    selectOtherDialog: React.PropTypes.object.isRequired,
  };

  componentWillMount = () => {

  };

  componentWillReceiveProps = (nextProps) => {
    if (Object.prototype.toString.call(nextProps.selectOtherDialog.storageData) === '[object Array]') {
      this.setState(
        {
          otherStockObject: new ProductStockClass(nextProps.selectOtherDialog.storageData)
        }
      );
    }
  };


  showDialog = () => {
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label='添加库位'
        primary
        onTouchTap={this.handleAddStorage}
      />
    ];

    const dialogTitle = (<div>
      <div style={{ fontFamily: 'SourceHanSansCN-Medium', fontSize: '20px' }}>其他库位</div>
      <div style={{ fontFamily: 'SourceHanSansCN-Regular', fontSize: '18px', color: '#979797' }}>请选择其他库位下的批号</div>
    </div>)

    const tableHeader = [{ title: '物料号' },
      { title: '批号' },
      { title: '生产日期' },
      { title: '数量' },
    ];

    return (
      <Dialog
        title={dialogTitle}
        modal
        actions={actions}
        open={this.state.dialogOpen}
        onRequestClose={this.handleCloseDialog}
        autoScollBodyContent
      >
        <div style={{ height: '600px', overflow: 'auto' }}>
          {
            this.state.otherStockObject.getProductStockByFilter('').map((stock, index) => {
              return (<SelectOtherTable
                key={index}
                stockData={stock}
                headerTitles={tableHeader}
                tableConfig={{ multiSelectable: true }}
                tableHeaderConfig={{ displaySelectAll: false }}
                handleSelectedRows={this.handleSelectedRows(stock)}
              />)
            })
          }
        </div>
      </Dialog>
    )
  };

  handleSelectedRows = stock => (selectedRows) => {
      // 清空当前库位所有数据
    this.state.otherStockObject.setAllBatchKeyByStockId(
        stock.StockPositionID,
        'selected',
        false
      );

      // 设置选中库位数据
    this.state.otherStockObject.setBatchKeyBySelectIndexArray(
        stock.StockPositionID,
        selectedRows,
        'selected',
        true
      )

    this.setState({ otherStockObject: this.state.otherStockObject });
  };


  handleOpenDialog = () => {
    // 发起action
    this.props.getOtherStorage({ CKCK: this.props.outBandStockId,
      KWID: this.props.stockList,
      SPID: this.props.goodsId,
      DDID: this.props.orderId })
    // 打开dialog
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  handleAddStorage = () => {
    this.props.selectedCallBack(this.state.otherStockObject, this.props.material);
    this.setState({ dialogOpen: false });
  };

  render() {
    return (<div>
      <RaisedButton label={this.props.btnText} onTouchTap={this.handleOpenDialog} />
      {
        this.showDialog()
      }
    </div>)
  }
}
