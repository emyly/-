/**
* Component: ProductSelection
* Description: ProductSelection holds a table list the recommanded
* Product Selection List, and Provide a dialog to selecct more product
* positions
*
* Structure:
* {[ ProductSelectionTable ]}
* { Dialog }
*
* Author: Yechen Huang huangyc@firstgrid.cn
*/
import React from 'react'
import {
  Dialog,
  RaisedButton,
  FlatButton
} from 'material-ui'
import classes from './ProductSelection.scss'
import ProductSelectionTable from './ProductSelectionTable'
import { ProductStockInfo, HeaderInfo } from './StockData'

export default class ProductSelection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      diaglogOpen: false
    }
  }

  handleOpen = () => {
    this.setState({ diaglogOpen: true })
  }

  handleClose = () => {
    this.setState({ diaglogOpen: false })
  }

  stockDialog = () => {
    const actions = [
      <FlatButton
        label = '取消'
        primary = { true }
        onTouchTap = { this.handleClose }
        />,
      <FlatButton
        label = '添加库位'
        primary = { true }
        keyboardFocused = { true }
        onTouchTap = { this.handleClose }
        />
    ]

    return (
      <Dialog
        title = "其他库位"
        modal = { false }
        actions = { actions }
        open = { this.state.diaglogOpen }
        onRequestClose = { this.handleClose }
        autoScollBodyContent = { true }
        >
        <div className = { classes.content }>
          {
            ProductStockInfo.StockPositions.map(
              (stock, index) => (
                <ProductSelectionTable
                  key={ index }
                  stockData={ stock }
                  tableConfig={ { multiSelectable: true } }
                  headerTitles= { HeaderInfo }
                  />
              )
            )
          }
        </div>
      </Dialog>
    )
  }

  render() {
    return (
      <div className={ classes.content }>
        {
          ProductStockInfo.StockPositions.map(
            (stock, index) => (
              <ProductSelectionTable
                key={ index }
                stockData={ stock }
                tableConfig={ { selectable: false } }
                tableHeaderConfig={ { displaySelectAll: false, adjustForCheckbox: false } }
                tableBodyConfig={ { displayRowCheckbox: false } }
                operationColumn={ { name: '操作' } }
                handleOpenDialog={ this.handleOpen }
                headerTitles= { HeaderInfo }
                />
            ),
            this)
          }
          { this.stockDialog() }
        </div>
      )
    }
  }
