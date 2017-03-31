/**
 * Created by NXQ on 17/1/19.
 */

import React, { Component, PropTypes } from 'react';

import './WarehouseOutStockGoodsDialog.scss';

import Dialog from 'components/StandardUI/StandardBusinessDialog';

import FlatButton from 'material-ui/FlatButton';

import DataGrid from 'components/DataGrid';

/**
 * 使用场景：仓库缺货清单
 */
export default class WarehouseOutStockGoodsDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        columnOptions: [
          {
            label: '物料号',
            attr: 'SPBH',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '商品名称',
            attr: 'SPMC',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '商品描述',
            attr: 'SPMS',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          },
          {
            label: '缺少数量',
            attr: 'QHSL',
            style: { overflow: 'hidden', paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
          }
        ],
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false
        },
        tableAttrs: {
          selectable: false,
          fixedHeader: true,
          height: '500px'
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 100,
          prePageCount: 5,
          pageLength: 4
        }
      },
      goodsTotal: 0
    }
  }

  static defaultProps = {

  };

  static propTypes = {
    /**
     * 当前Dailog开关状态
     */
    open: PropTypes.bool.isRequired,
    /**
     * 仓库id(后期可移除此参数)
     */
    warehouseId: PropTypes.number.isRequired,
    /**
     * 仓库名称(后期可移除此参数)
     */
    warehouseName: PropTypes.string.isRequired,
    /**
     * 当前点击的仓库信息
     */
    warehouseValue: PropTypes.object.isRequired,
     /**
     * 订单id
     */
    orderId: PropTypes.number.isRequired,
    /**
     * 仓库路径
     */
    depotPath: PropTypes.array.isRequired,
    getWarehouseOutStockGoodsData: PropTypes.func.isRequired,
    initWarehouseOutStockGoodsData: PropTypes.func.isRequired,
    handleDialogClose: PropTypes.func.isRequired,

  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.orderId !== this.props.orderId ||
        nextProps.warehouseId !== this.props.warehouseId ||
        (nextProps.warehouseOutStockGoodsDialog.goodsData.length <= 0 && nextProps.open === true)) { // 第三种判断后期完善
      this.props.getWarehouseOutStockGoodsData({
        ddid: nextProps.orderId,
        ckid: nextProps.warehouseId
      });
    }
    if (nextProps.warehouseOutStockGoodsDialog.goodsData.length) {
      this.state.options.dataSource = nextProps.warehouseOutStockGoodsDialog.goodsData;
      let goodsTotal = 0;
      nextProps.warehouseOutStockGoodsDialog.goodsData.map(value => (goodsTotal += value.QHSL))
      this.setState({
        options: this.state.options,
        goodsTotal
      })
    }
    if (nextProps.open === false && nextProps.open !== this.props.open) {
      this.props.initWarehouseOutStockGoodsData();
      this.state.options.dataSource = [];
      this.setState({
        options: this.state.options
      })
    }
  };
  componentWillMount = () => {

  };
  /**
   * Dialog close
   */
  handleDialogClose = () => {
    this.props.handleDialogClose();
  }
  render() {
    const actions = (
      <FlatButton
        label='关闭'
        primary
        style={{ marginRight: 10, color: '#00A0FF', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px' }}
        onTouchTap={this.props.handleDialogClose}
      />
    )
    let tempDepotPath = this.props.depotPath;
    if (this.props.depotPath.length &&
        ((this.props.depotPath[this.props.depotPath.length - 1].FJCKID || -1) === (this.props.warehouseValue.FJCKID || -2))) {
      tempDepotPath = this.props.depotPath.slice(0, this.props.depotPath.length - 1);  // 移除同仓库的仓库
    }
    const rightArrow = '>';
    return (
      <Dialog
        title={
          <div>
            <span style={{ fontSize: '20px', color: '#000', fontFamily: 'SourceHanSansCN-Regular' }}>缺货清单</span>
            <span style={{ fontSize: '16px', color: '#41a1ff', fontFamily: 'SourceHanSansCN-Regular', marginLeft: '2rem' }}>
              {`共缺货${this.state.options.dataSource.length}种 共缺少数量${this.state.goodsTotal}件`}
            </span>
          </div>
        }
        actions={actions}
        modal
        open={this.props.open}
        bodyStyle={{ overflowY: 'hidden' }}
        contentStyle={{ width: '90%', height: '90%', maxWidth: 'none', maxHeight: 'none' }}
        childrenStyle={{ height: 'auto' }}
      >
        <div className='warehouse-outStock-goods-dailog'>
          <div className='warehouse-path-content'>
            {
              tempDepotPath.map((value, index) => {
                if (index === 0) {
                  return (<a key={index} className='warehouse-path-name-a'>{value.name}</a>)
                }
                return (<a key={index} className='warehouse-path-name-a'>{`${rightArrow}  ${value.name}`} </a>)
              })
            }
            {
              (() => {
                if (tempDepotPath.findIndex(val =>
                      Number(val.id) === Number(this.props.warehouseId) &&
                      val.name === this.props.warehouseName) === -1) {
                  const name = tempDepotPath.length ? '>' : '';
                  return <a className='warehouse-path-name-a'> {name + this.props.warehouseName} </a>
                }
              })()
            }
          </div>
          <DataGrid options={this.state.options} dataGridStyle={{ marginTop: '20px' }} />
        </div>

      </Dialog>
    )
  }
}
