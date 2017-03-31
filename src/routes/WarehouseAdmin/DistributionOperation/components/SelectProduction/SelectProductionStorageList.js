/**
 * Author: wangming 2017/2/20
 */
import React from 'react'
import SelectProductionCss from './SelectProduction.scss'
import SelectProductionTable from './SelectProductionTable'
import { HeaderInfo } from './SelectProductionData'

export default class SelectProductionStorageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  static defaultProps = {
    // ifShowAllStock: true
  };

  static propTypes = {
    stockDataList: React.PropTypes.array.isRequired,
    // ifShowAllStock: React.PropTypes.bool,
    handleSelectProduction: React.PropTypes.func,
    ifShowOtherStock: React.PropTypes.bool,
    batchAlreadySelectTextChange: React.PropTypes.func,
    outBandStockId: React.PropTypes.number,
    orderId: React.PropTypes.number,
    getAllStockByGoodsId: React.PropTypes.func,
    otherStockCallback: React.PropTypes.func,
  };

  componentWillMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {
  };

  show = () => {
    if (this.props.ifShowOtherStock) { // 是否显示其他库位操作
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            marginLeft: '1.5%',
            marginRight: '1.5%',
            marginBottom: '53px'
          }}
          className={SelectProductionCss.scroll_t}
        >
          {
            this.props.stockDataList.map((stock, index) => (
              <SelectProductionTable
                key={Number(stock.StockPositionID)}
                stockData={stock}
                tableConfig={{ selectable: false }}
                tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
                tableBodyConfig={{ displayRowCheckbox: false, stripedRows: false }}
                headerTitles={HeaderInfo}
                handleSelectProduction={this.props.handleSelectProduction(stock, index)}
                ifActive={stock.ifActive}
                operationSelect={{ name: '点击拣货' }}
                BatchAlreadySelectTextChange={this.props.batchAlreadySelectTextChange}
                flexOrder={Number(stock.orderByFlex)}
                operationColumn={{ name: '操作' }}
                outBandStockId={this.props.outBandStockId}
                orderId={this.props.orderId}
                getAllStockByGoodsId={this.props.getAllStockByGoodsId}
                otherStockCallback={this.props.otherStockCallback}
              />
            ))
          }
        </div>)
    } else {
      return (<div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          marginLeft: '1.5%',
          marginRight: '1.5%',
          marginBottom: '53px'
        }}
        className={SelectProductionCss.scroll_t}
      >
        {
           this.props.stockDataList.map((stock, index) => (
             <SelectProductionTable
               key={Number(stock.StockPositionID)}
               stockData={stock}
               tableConfig={{ selectable: false }}
               tableHeaderConfig={{ displaySelectAll: false, adjustForCheckbox: false }}
               tableBodyConfig={{ displayRowCheckbox: false, stripedRows: false }}
               headerTitles={HeaderInfo}
               handleSelectProduction={this.props.handleSelectProduction(stock, index)}
               ifActive={stock.ifActive}
               operationSelect={{ name: '点击拣货' }}
               BatchAlreadySelectTextChange={this.props.batchAlreadySelectTextChange}
               flexOrder={Number(stock.orderByFlex)}
             />
          ))
        }
      </div>)
    }
  }
  render() {
    return (
      this.show()
    )
  }
}
