/**
* Created by SJF on 2016/11/11.
*/
import React, { Component, PropTypes } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import {
  setSelectedReturnOrderLogistics
} from '../module/selectedReturnOrderLogistics'
import {
  updateSurgeryReturnReceivingRecheck
} from '../module/surgeryReturnReceivingRecheck'
import StandardForm from 'components/StandardForm'
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import { connect } from 'react-redux'
import './WarehousingGuide.scss'
import _ from 'lodash'
import GoBackButton from 'components/GoBackButton';

class WarehousingGuide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockInformation: {},

    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    // goodsList: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object
  }

  constructStockInfoFromGoodsList = (goodsArray) => {
    const stockInfo = {}
    _.forEach(goodsArray, (good) => {
      if (stockInfo[good.KWLJ]) {
        stockInfo[good.KWLJ].push(good)
      } else {
        stockInfo[good.KWLJ] = [good]
      }
    })
    return stockInfo
  }

  componentWillMount() {
    this.setState({
      stockInformation: this.constructStockInfoFromGoodsList(this.props.location.state.goodsList)
    })
  }

  print = () => {
    const body = window.document.body.innerHTML;
    const printContent = document.querySelector('#printWrapper').innerHTML;
    window.document.body.innerHTML = printContent;
    window.document.body.style.height = 'auto';
    const WarehousingGuideTable = document.querySelectorAll('.WarehousingGuideTable');
    for (let i = 0; i < WarehousingGuideTable.length; i++) {
      WarehousingGuideTable[i].classList.add('tableA4');
    }
    document.getElementsByTagName('title')[0].innerHTML = `订单编号：${this.props.params.id}`;
    window.print();
    window.document.body.innerHTML = body;
    window.document.body.style.height = '100%';
    document.getElementsByTagName('title')[0].innerHTML = '医捷云综合医疗供应链管理平台';
    location.reload()
  }

  displayStockInfo = () => {
    const stockKeys = Object.keys(this.state.stockInformation)
    if (stockKeys.length > 0) {
      return (
        <table className='WarehousingGuideTable'>
          {
            stockKeys.map((stockName, stockIndex) => (
              <thead key={stockIndex} >
                <thead key='1' >
                  <tr key='0'>
                    <th
                      className='WarehousingGuideTableHeaderColumn' colSpan='5' id={stockIndex === 0 ? 'ware_tableTow' : 'ware_tableOne'}
                    >
                      {stockName}</th>
                  </tr>
                  <tr id='tableHederStyle'>
                    <th className='tableWidth' >物料号</th>
                    <th className='tableWidth' >商品名称</th>
                    <th className='tableWidth' >商品描述</th>
                    <th className='tableWidth'>批号</th>
                    <th className='tableWidth'>本次入库数量</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.stockInformation[stockName].map((value, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className='tableWidth'>{value.SPBH}</td>
                        <td className='tableWidth'>{value.SPMC}</td>
                        <td className='tableWidth'>{value.SPMS}</td>
                        <td className='tableWidth'>{value.SPPH}</td>
                        <td className='tableWidth'>{value.SL}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </thead>
            ))
          }
        </table>
      )
    }
    return <div />
  }

  displayOrderInfo = () => (
    <div>
      <Table displaySelectAll={false} selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>物料号</TableHeaderColumn>
            <TableHeaderColumn className='TableHeaderColumn'>批号</TableHeaderColumn>
            <TableHeaderColumn className='TableHeaderColumn'>数量</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows showRowHover>
          {
            this.state.goodsList.map((value, index) => (
              <TableRow key={`table_body_data_${index}`}>
                <TableHeaderColumn>{value.SPBH}</TableHeaderColumn>
                <TableRowColumn>{value.SPPH}</TableRowColumn>
                <TableRowColumn>{value.SL}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );

  returnToSurgeryOrderRecheck = () => {
    this.context.router.push('/surgeryRecoveryRecheck')
  };

  render() {
    const printButton = {
      width: '10rem',
      cursor: 'pointer',
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: '18px',
      color: '#F5A959',
      letterSpacing: '0.64px'
    }
    const actions = (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
        <GoBackButton />
        <div style={printButton} onClick={this.print}><i className='printBottonIcon' />打印</div>
      </div>
    );

    return (
      <StandardForm iconPosition='-0px -90px' title='手术回收订单复核' >
        <StandardFormCardList activeStep={0} >
          <StandardFormCard title='复核通过' actions={actions} showStep={false} completed showContent expanded>
            <div id='printWrapper' style={{ height: 'auto', padding: 16 }}>
              <h4 style={{ textAlign: 'center', fontFamily: 'SourceHanSansCN-Medium', fontSize: 24, color: '#364356', letterSpacing: 0.85 }}>
                入库引导单
              </h4>
              {this.displayStockInfo()}
            </div>
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>
    )
  }
}

const mapStateToProps = state => ({
  // goodsList: state.returnOrderRecheckReducer.goodsList,
  selectedOrderId: state.selectedReturnOrderLogisticsReducer.orderId
})

const mapDispatchToProps = {
  setSelectedReturnOrderLogistics,
  updateSurgeryReturnReceivingRecheck
}
export default connect(mapStateToProps, mapDispatchToProps)(WarehousingGuide)
