/**
 * Component: ProductSelectionTable
 * Description: Constuct a ProductSelection table within data passed in and
 * some other configurations
 *
 *
 * Author: Yechen Huang huangyc@firstgrid.cn
 * modify: wangming for stockout
 */
import React from 'react'
import {
Table,
TableHeader,
TableBody,
TableRow,
TableRowColumn,
TableHeaderColumn
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectProductionStyle from './SelectProduction.scss';
import SelectOtherDialog from '../../containers/SelectOtherDialogContainer';

export default class SelectProductionTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockData: []
    };
    this.curFocusBatchTextIndex = {
      materialIndex: 0,
      batchIndex: 0,
    }; // 当前激活的已检输入框索引

    // 当前定时器
    this.objTimer = {
      timer: null,
      item: null,
    };
  }

  componentWillMount = () => {
    this.setState({ stockData: this.props.stockData });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ stockData: nextProps.stockData })
  };

  constructOptionalColumn = () => {
    if (this.props.operationColumn) {
      return (<TableHeaderColumn
        style={{ fontFamily: 'SourceHanSansCN-Bold',
          backgroundColor: 'rgba(53,67,87,0.10)',
          paddingLeft: 3,
          paddingRight: 3,
          fontSize: '18px',
          color: '#6D93C1',
          letterSpacing: '0.26px',
          textAlign: 'center',
          width: '15%',
        }}
      >{ this.props.operationColumn.name }</TableHeaderColumn>)
    }
  };

  constructSelectColumn = () => {
    if (this.props.operationSelect) {
      if (this.props.ifActive) {
        return (<TableHeaderColumn
          colSpan={2}
          style={{ textAlign: 'right',
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '20px',
            color: '#FFFFFF',
            letterSpacing: '0.71px' }}
        >
        正在对此库位拣货
      </TableHeaderColumn>)
      }
      return (<TableHeaderColumn colSpan={2} style={{ textAlign: 'right' }}>
        <RaisedButton
          labelStyle={{ fontFamily: 'PingFangSC-Medium',
            fontSize: '14px',
            color: '#FFFFFF',
            letterSpacing: '0.5px',
            lineHeight: '14px' }} backgroundColor={'#00A0FF'}
          label={this.props.operationSelect.name} onTouchTap={this.props.handleSelectProduction}
        />
      </TableHeaderColumn>)
    }
  };

  showStockName = (value) => {
    const data = value.split('-');
    return data[data.length - 1];
  };

  showCheckBox = (index, item) => {
    if (this.props.ifSelectble) {
      if (Object.prototype.toString.call(item.checked) === '[object Undefined]') {
        item.checked = false;
      }
      return (<TableRowColumn className={SelectProductionStyle.SelectStyle} key={`${index}0`} >
        <Checkbox
          label=''
          checked={item.checked}
        /></TableRowColumn>)
    }
  };


  constructHeader = () => {
    let StyleShowStockName;
    if (this.props.ifActive) {
      StyleShowStockName = { background: '#00A0FF' };
    } else {
      StyleShowStockName = { background: '#CACACA' };
    }


    return (<TableHeader {...this.props.tableHeaderConfig} >
      <TableRow style={StyleShowStockName} onClick={this.props.handleSelectProduction}>
        <TableHeaderColumn
          style={{ fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '20px',
            color: '#FFFFFF',
            letterSpacing: '0.71px' }}
          colSpan={
            (this.props.operationColumn || this.props.ifSelectble) ?
            this.props.headerTitles.length - 1 :
            this.props.headerTitles.length - 2
          }
        >{
          this.showStockName(this.state.stockData.StockPositonName)
        }
        </TableHeaderColumn>
        {
          this.constructSelectColumn()
        }
      </TableRow>
      <TableRow>
        { this.props.headerTitles.map((column, index) => {
          let colStyle;
          if (column.title === '商品描述') {
            colStyle = {
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: 'rgba(53,67,87,0.10)',
              fontSize: '18px',
              color: '#6D93C1',
              letterSpacing: '0.26px',
              textAlign: 'center',
              width: this.props.operationColumn ? '25%' : '30%',
            };
          } else if (column.title === '物料号') {
            colStyle = {
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: 'rgba(53,67,87,0.10)',
              fontSize: '18px',
              color: '#6D93C1',
              letterSpacing: '0.26px',
              textAlign: 'center',
              width: this.props.operationColumn ? '10%' : '20%'
            };
          } else if (column.title === '批号') {
            colStyle = {
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: 'rgba(53,67,87,0.10)',
              fontSize: '18px',
              color: '#6D93C1',
              letterSpacing: '0.26px',
              textAlign: 'center',
              width: '20%'
            };
          } else if (column.title === '库存') {
            colStyle = {
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: 'rgba(53,67,87,0.10)',
              fontSize: '18px',
              color: '#6D93C1',
              letterSpacing: '0.26px',
              textAlign: 'center',
              width: '10%',
            };
          } else if (column.title === '已拣') {
            colStyle = {
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: 'rgba(53,67,87,0.10)',
              fontSize: '18px',
              color: '#6D93C1',
              letterSpacing: '0.26px',
              textAlign: 'center',
              width: '10%',
            };
          } else if (column.title === '未拣') {
            colStyle = {
              fontFamily: 'SourceHanSansCN-Bold',
              backgroundColor: 'rgba(53,67,87,0.10)',
              fontSize: '18px',
              color: '#6D93C1',
              letterSpacing: '0.26px',
              textAlign: 'center',
              width: '10%',
            };
          }
          return (<TableHeaderColumn
            key={index} style={colStyle}
          >
            {column.title}
          </TableHeaderColumn>)
        })
        }
        { this.constructOptionalColumn() }
      </TableRow>
    </TableHeader>)
  }

  changeTextStyleFocus = (item, mtIndex, btIndex) => (event) => {
    item.style = { textAlign: 'center', border: '1px solid #00A0FF', borderRadius: '4px' }
    this.setTextFieldFocus({ materialIndex: mtIndex, batchIndex: btIndex });
    this.setState({ stockData: this.state.stockData });
  };

  changeTextStyleBlur = item => (event) => {
    item.style = { textAlign: 'center', border: '1px solid #d2d6de', borderRadius: '4px' }
    this.setState({ stockData: this.state.stockData });
  };


  showbatchContent = (batchContent) => {
    if (batchContent.length > 0) {
      return batchContent.map((bt) => {
        return <span>{bt.SPPH},</span>;
      })
    } else {
      return '请选择...'
    }
  };

  // 缩拢的表格
  constructRowByFlexed = (item, index, orderIndex, productObject) => {
    let itemAlreadySelectColumn;
    let itemLastNumberColumn;
    const batchContent = [];
    item.ProductListByBatchID.map((bt) => {
      bt.match = false;
      if ((Number(bt.AlreadySelect) || 0) > 0) {
        batchContent.push(bt);
      }
    });

    const batchShow = this.showbatchContent(batchContent);

    const styleMatched = {
      background: '#00a0ff',
      width: '4rem',
      height: '2.0rem',
      lineHeight: '2.0rem',
      borderRadius: '4px',
      paddingLeft: '4px',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '14px',
      margin: 'auto',
    };

    const styleUnmatch = {
      background: '#fff',
      width: '4rem',
      height: '2.0rem',
      lineHeight: '2.0rem',
      borderRadius: '4px',
      paddingLeft: '4px',
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: '14px',
      margin: 'auto',
    };

    item.style = styleUnmatch;

    if (item.match) {
      item.style = styleMatched;
      this.startTimer(item);
    }

    if (!this.props.ifSelectble) {
      itemAlreadySelectColumn = (
        <TableRowColumn className={SelectProductionStyle.SelectStyle} style={{ width: '10%' }}>
          <div style={item.style} >
            { String(productObject.AlreadySelect) }
          </div>
        </TableRowColumn>
      )

      itemLastNumberColumn = (
        <TableRowColumn className={SelectProductionStyle.SelectStyle} style={{ width: '10%' }}>{ String(productObject.UnselectNum) }</TableRowColumn>
      );
    }

    return (
      <TableRow key={`${orderIndex}+${index}`} >
        { this.showCheckBox(`${orderIndex}+${index}`, item)}
        <TableRowColumn className={SelectProductionStyle.SelectStyle} style={{ width: this.props.operationColumn ? '10%' : '20%' }} >
          <span>{ productObject.MaterialID }</span>
        </TableRowColumn>
        <TableRowColumn
          className={SelectProductionStyle.SelectStyle}
          style={{ width: this.props.operationColumn ? '25%' : '30%' }}
        >
          {productObject.GoodsDestribution || '-'}
        </TableRowColumn>
        <TableRowColumn className={SelectProductionStyle.SelectStyle} style={{ cursor: 'pointer', width: '20%' }} >
          <img src='/spread.png' alt='展开' />
          {batchShow}
        </TableRowColumn>
        <TableRowColumn className={SelectProductionStyle.SelectStyle} style={{ width: '10%' }}>{productObject.TotalNum}</TableRowColumn>
        { itemAlreadySelectColumn }
        { itemLastNumberColumn }
        {
          (() => {
            if (this.props.operationColumn) {
              return (<TableRowColumn className={SelectProductionStyle.SelectStyle} style={{ width: '15%' }}>
                <SelectOtherDialog
                  stockList={this.props.getAllStockByGoodsId(item.GoodsId)}
                  outBandStockId={this.props.outBandStockId}
                  goodsId={item.GoodsId}
                  orderId={this.props.orderId}
                  selectedCallBack={this.props.otherStockCallback}
                  material={item}
                />
              </TableRowColumn>)
            }
          })()
      }
      </TableRow>
    )
  };

  // 展开的表格
  constructRowByexpand = (item, index, orderIndex, productObject) => {
    return item.ProductListByBatchID.map(
      (node, nodeIndex, array) => this.constructBatchRow(item, node, nodeIndex, orderIndex, {
        MaterialID: item.MaterialID,
        LastNumber: item.LastNumber,
        AlreadySelect: item.AlreadySelect
      }, array.length)
    )
  };

  // 设置已检输入框的焦点
  setTextFieldFocus = (objTextIndex) => {
    const ele = document.getElementById(`AlreadySelectText${objTextIndex.materialIndex}+${objTextIndex.batchIndex}`);
    if (ele) {
      this.curFocusBatchTextIndex.materialIndex = objTextIndex.materialIndex;
      this.curFocusBatchTextIndex.batchIndex = objTextIndex.batchIndex;
      ele.focus();
    }
  };

  // 获取下一个输入框
  getNextTextField = () => {
    const mtIndex = this.curFocusBatchTextIndex.materialIndex;
    const btIndex = this.curFocusBatchTextIndex.batchIndex;
    const st = this.state.stockData;
    const mt = st.ProductListByMaterialID[mtIndex];
    let bt = null;
    const nextMtIndex = mtIndex;
    let nextBtIndex = btIndex;

    if (mt) {
      bt = mt.ProductListByBatchID[btIndex];
    }

    if (bt) {
      const btNext = Number(btIndex) + 1;
      const nextEle = document.getElementById(`AlreadySelectText${mtIndex}+${btNext}`)
      if (nextEle) {
        nextBtIndex = btNext;
      }
    }
    return { materialIndex: nextMtIndex, batchIndex: nextBtIndex };
  };

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      const nextText = this.getNextTextField();
      this.setTextFieldFocus(nextText);
    }
  };

  handleMatchTimer = () => {
    this.clearTimer();
    this.objTimer.item.match = false;
    this.setState({ stockData: this.state.stockData });
  };

  startTimer = (item) => {
    this.clearTimer();

    if (this.objTimer.item) {
      this.objTimer.item.match = false;
      this.objTimer.item = null;
    }

    this.objTimer.item = item;
    this.objTimer.timer = setTimeout(this.handleMatchTimer, 1000);
  };

  clearTimer = () => {
    if (this.objTimer.timer) {
      clearTimeout(this.objTimer.timer);
      this.objTimer.timer = null;
    }
  };


  constructBatchRow = (product, item, index, orderIndex, productObject, listLength) => {
  /* Has to stay here since it check index of the row */
    let itemIDColumn;
    let itemNumColumn;
    let tableRowColumnStyle;
    let itemAlreadySelect;
    // 商品名称
    // 商品描述
    let itemGoodsDestribution;
    let itemBatchNumber;

    product.match = false;

    if (index === 0) {
      tableRowColumnStyle = SelectProductionStyle.SelectStyle;
    } else {
      tableRowColumnStyle = SelectProductionStyle.SelectStyleNew;
    }
    if (index === 0) {
      itemIDColumn = (
        <TableRowColumn className={tableRowColumnStyle} rowSpan={listLength} style={{ width: this.props.operationColumn ? '10%' : '20%' }}>
          <span>{ product.MaterialID }</span>
        </TableRowColumn>
      )
    }

    if (index === 0) {
      if (!this.props.ifSelectble) {
        itemNumColumn = (
          <TableRowColumn className={tableRowColumnStyle} rowSpan={listLength} style={{ width: '10%' }}>{product.UnselectNum}</TableRowColumn>
        )
      }
    }

    if (index === 0) {
      if (!this.props.ifSelectble) {
        itemNumColumn = (
          <TableRowColumn className={tableRowColumnStyle} rowSpan={listLength} style={{ width: '10%' }}>{product.UnselectNum}</TableRowColumn>
        )
      }
    }

    if (index === 0) {
      if (!this.props.ifSelectble) {
        itemGoodsDestribution = (
          <TableRowColumn
            className={tableRowColumnStyle}
            rowSpan={listLength}
            style={{ width: this.props.operationColumn ? '25%' : '30%' }}
          >
            {product.GoodsDestribution || '-'}
          </TableRowColumn>
        )
      }
    }

    if (index === 0 && listLength !== 1) {
      itemBatchNumber = (
        <TableRowColumn className={tableRowColumnStyle} style={{ cursor: 'pointer', width: '20%' }}>
          <img src='/retract.png' alt='收起' />
          {item.SPPH}
        </TableRowColumn>
      )
    } else {
      itemBatchNumber = (
        <TableRowColumn className={tableRowColumnStyle} style={{ cursor: 'pointer', width: '20%' }}>
          <span style={{ paddingLeft: 15 }}>{item.SPPH}</span>
        </TableRowColumn>
      )
    }

    const styleMatched = { textAlign: 'center', border: '1px solid #d2d6de', borderRadius: '4px', background: '#00a0ff' };
    const styleUnmatch = { textAlign: 'center', border: '1px solid #d2d6de', borderRadius: '4px', background: '#ffffff' };
    item.style = styleUnmatch;

    if (item.match) {
      item.style = styleMatched;
      this.startTimer(item);
    }

    if (this.props.ifActive && ((Number(product.UnselectNum) > 0) || (Number(item.AlreadySelect) > 0))) {
      itemAlreadySelect = (<TableRowColumn className={tableRowColumnStyle} style={{ width: '10%' }}>
        <TextField
          style={{
            background: '#fff',
            color: '#C4C4C4',
            width: '4rem',
            height: '2.0rem',
            borderRadius: '4px',
            paddingLeft: '4px',
            position: 'relative',
            fontFamily: 'SourceHanSansCN-Regular',
          }}
          underlineShow={false} value={Number(item.AlreadySelect) || 0}
          ref={`AlreadySelectText${orderIndex}+${index}`}
          id={`AlreadySelectText${orderIndex}+${index}`}
          inputStyle={{ textAlign: 'center', border: '1px solid #d2d6de', borderRadius: '4px', ...(item.style || {}) }}
          onChange={this.props.BatchAlreadySelectTextChange(product, item)}
          onFocus={this.changeTextStyleFocus(item, orderIndex, index)}
          onBlur={this.changeTextStyleBlur(item)}
          onKeyUp={this.onKeyUp}
        />
      </TableRowColumn>)
    } else {
      itemAlreadySelect = <TableRowColumn className={tableRowColumnStyle} style={{ width: '10%' }}>{ Number(item.AlreadySelect) || 0}</TableRowColumn>
    }
    return (
      <TableRow key={`${orderIndex}+${index}`} >
        { this.showCheckBox(`${orderIndex}+${index}`, item)}
        { itemIDColumn }
        { itemGoodsDestribution }
        { itemBatchNumber }
        <TableRowColumn className={tableRowColumnStyle} style={{ width: '10%' }}>{ item.SL }</TableRowColumn>
        { itemAlreadySelect }
        { itemNumColumn }
        {
          (() => {
            if (this.props.operationColumn) {
              return (<TableRowColumn className={tableRowColumnStyle}>
                <SelectOtherDialog
                  stockList={this.props.getAllStockByGoodsId(product.GoodsId)}
                  outBandStockId={this.props.outBandStockId}
                  goodsId={product.GoodsId}
                  orderId={this.props.orderId}
                  selectedCallBack={this.props.otherStockCallback}
                  material={product}
                />
              </TableRowColumn>)
            }
          })()
      }
      </TableRow>
    )
  }

  constructRow = (item, index, orderIndex, productObject) => {
    /* Has to stay here since it check index of the row */
    if (item.ProductListByBatchID.length === 1) {
      return this.constructRowByexpand(item, index, orderIndex, productObject);
    } else if (item.flexible !== true) {
      item.flexible = false;
      return this.constructRowByFlexed(item, index, orderIndex, productObject);
    } else {
      return this.constructRowByexpand(item, index, orderIndex, productObject);
    }
  }

  constructBody = () => (
    <TableBody {...this.props.tableBodyConfig}>
      {
        /* first map material by ID */
        this.state.stockData.ProductListByMaterialID.map(
        /* Second map material list by BatchID */
        (product, index) => {
          const orderIndex = index;
          return this.constructRow(product, index, orderIndex, {
            MaterialID: product.MaterialID,
            LastNumber: product.LastNumber,
            UnselectNum: product.UnselectNum,
            AlreadySelect: product.AlreadySelect,
            TotalNum: product.TotalNum,
            GoodsName: product.GoodsName,
            GoodsDestribution: product.GoodsDestribution
          })
        }
        )
      }
    </TableBody>
  )

  findNodeByRow = (row) => {
    const tpArray = [];
    const stateStock = this.state.stockData;
    stateStock.ProductListByMaterialID.map(
      (product, index) => {
        tpArray.push(product);
      }
    );

    tpArray[row].checked = !tpArray[row].checked;
    this.setState({ stockData: stateStock });

    return tpArray[row];
  };

  getStockData = (row, col, outData) => {
    if (this.props.ifSelectble) {
      this.findNodeByRow(row);
    } else if (col === 4) {
      this.switchBatchRow(row);
    }
  };

  findMarcNodeByRow = (row) => {
    let retIndex = 0;
    let retData = {};
    const retVal = this.state.stockData.ProductListByMaterialID.some((data) => {
      if (data.flexible) {
        if (row === retIndex) {
          retData = data;
          return true;
        } else {
          retIndex += data.ProductListByBatchID.length;
        }
      } else if (row === retIndex) {
        retData = data;
        return true;
      } else {
        retIndex += 1;
      }
    });

    if (retVal) {
      return retData;
    } else {
      return {};
    }
  };

  initAllTableNodeFlex = (value) => {
    this.state.stockData.ProductListByMaterialID.map((data) => {
      data.flexible = value;
    })
  };

  switchBatchRow = (row) => {
    const item = this.findMarcNodeByRow(row);
    const tpFlexible = item.flexible;
    this.initAllTableNodeFlex(false);
    if (tpFlexible !== true) {
      item.flexible = true; // 展开 true , 缩隆 false
    } else {
      item.flexible = false // 缩隆
    }
    // this.props.handleSelectProduction();
    this.setState({ stockData: this.state.stockData });
  };

  cellClick = (row, col) => {
    const outData = [];
    this.getStockData(row, col, outData);
  };

  render() {
    let tableStyle = {};
    const activeTableStyle = { border: '2px solid #00A0FF', marginTop: '17px', marginBottom: '10px' };
    const unActiveTableStyle = { border: '2px solid #CACACA', marginTop: '17px', marginBottom: '10px' };
    if (this.props.ifActive) {
      tableStyle = activeTableStyle;
    } else {
      tableStyle = unActiveTableStyle;
    }

    return (
      <div style={{ order: this.props.flexOrder }}>
        <div style={tableStyle} id={this.props.tableId}>
          <Table {...this.props.tableConfig} onCellClick={this.cellClick} className='SelectProductionTable' >
            { this.constructHeader() }
            { this.constructBody() }
          </Table>
        </div>
      </div>
    )
  }
}

SelectProductionTable.propTypes = {
  stockData: React.PropTypes.object.isRequired,
  headerTitles: React.PropTypes.array.isRequired,
  tableConfig: React.PropTypes.object,
  tableHeaderConfig: React.PropTypes.object,
  tableBodyConfig: React.PropTypes.object,
  operationColumn: React.PropTypes.object,
  handleSelectProduction: React.PropTypes.func,
  operationSelect: React.PropTypes.object,
  ifActive: React.PropTypes.bool,
  tableId: React.PropTypes.string,
  flexOrder: React.PropTypes.number,
  BatchAlreadySelectTextChange: React.PropTypes.func,
  outBandStockId: React.PropTypes.number, // 出库仓库id
  orderId: React.PropTypes.number, // 订单id
  getAllStockByGoodsId: React.PropTypes.func, // 根据商品id获取所有库位
  otherStockCallback: React.PropTypes.func,
  ifSelectble: React.PropTypes.bool,
}

