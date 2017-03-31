/**
 * Created by chenming on 2016/10/20.
 */
import React, { Component, PropTypes } from 'react'
import Dialog from 'components/StandardUI/StandardBusinessDialog'
import FlatButton from 'material-ui/FlatButton'
import DataGrid from 'components/DataGrid'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import './InventoryList.scss'

class InventoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      orderGoodsListOptions: {
        columnOptions: [
          { label: '物料号',
            attr: 'SPBH',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '14px',
              color: '#ffffff',
              background: '#788ba7',
              width: '200px',
              minWidth: '200px',
            },
            style: {
              fontSize: '12px',
              color: '#788BA7',
              textAlign: 'left',
              width: '200px',
              minWidth: '200px',
            }
          },
          // { label: '商品名称',
          //   attr: 'SPMC',
          //   tableHeaderColumnStyle: {
          //     fontFamily: 'SourceHanSansCN-Bold',
          //     fontSize: '14px',
          //     color: '#ffffff',
          //     background: '#788ba7',
          //   },
          //   style: {
          //     fontSize: '12px',
          //     color: '#788BA7',
          //     textAlign: 'left',
          //     whiteSpace: 'normal'
          //   }
          // },
          { label: '型号规格',
            attr: 'SPMS',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '14px',
              color: '#ffffff',
              background: '#788ba7',

            },
            style: {
              fontSize: '12px',
              color: '#788BA7',
              textAlign: 'left',
              whiteSpace: 'normal'
            }
          },
          { label: '订购数量',
            attr: 'CKSL',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '14px',
              color: '#ffffff',
              background: '#788ba7',
              width: '80px',
              minWidth: '80px'
            },
            style: {
              fontSize: '12px',
              color: '#788BA7',
              textAlign: 'right',
              width: '80px',
              minWidth: '80px'
            }
          },
          { label: '本次使用',
            attr: 'BCSY',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '14px',
              color: '#ffffff',
              background: '#788ba7',
              width: '70px',
              minWidth: '70px'
            },
            style: {
              fontSize: '12px',
              color: '#788BA7',
              textAlign: 'right',
              width: '70px',
              minWidth: '70px'
            }
          },
          { label: '本次回收',
            attr: 'SL',
            tableHeaderColumnStyle: {
              fontFamily: 'SourceHanSansCN-Bold',
              fontSize: '14px',
              color: '#ffffff',
              background: '#788ba7',
              width: '70px',
              minWidth: '70px'
            },
            style: {
              fontSize: '12px',
              color: '#788BA7',
              textAlign: 'right',
              width: '70px',
              minWidth: '70px'
            }
          },
        ],
        tableAttrs: {
          selectable: false
        },
        indexStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '14px',
          color: '#ffffff',
          background: '#788ba7',
        },
        indexListStyle: {
          fontSize: '12px',
          color: '#788BA7',
        },
        showIndex: true,
        tableHeaderAttrs: {
          displaySelectAll: false,
          showCheckboxes: false,
          adjustForCheckbox: false,
        },
        tableBodyAttrs: {
          displayRowCheckbox: false
        },
        TableRowColumnSpanStyle: {
          whiteSpace: 'normal'
        }
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.closeDialog()
  }

  static defaultProps = {
    detailList: []
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    orderId: PropTypes.number.isRequired,
    logisticsOrderId: PropTypes.number,
    detailList: PropTypes.array.isRequired,
    closeDialog: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
      })
    }
  }

  logisticsOrderInfoList = () => {
    let allNum = 0;
    this.props.detailList.map((value, index) => {
      allNum += Number(value.SL);
    })
    if (this.props.detailList.length > 0) {
      return (
        <List style={{ display: 'flex', flexDirection: 'column' }}>
          <ListItem style={{ fontSize: '14px', color: '#00A0FF' }}>{`回收单号<${this.props.detailList[0].CRKID}>`}
            <span style={{ fontSize: '14px', color: '#808080', lineHeight: '20px', marginLeft: '20px' }}>
              本次回收{this.props.detailList.length}种{allNum}件商品
            </span>
          </ListItem>
        </List>
      )
    }
  }

  render() {
    const actions = [
      <FlatButton label='关闭' onTouchTap={this.handleClose} labelStyle={{ fontSize: '16px', color: '#808080', letterSpacing: '0.57px' }} />
    ]

    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
      height: '800px',
      maxHeight: 'none'
    }

    return (
      <Dialog
        actions={actions} modal open={this.state.open} bodyStyle={customContentStyle}
        autoDetectWindowHeight autoScrollBodyContent onRequestClose={this.handleClose}
        title='回收记录'
        contentStyle={{ width: '90%' }}
      >
        {this.logisticsOrderInfoList()}
        <DataGrid options={this.state.orderGoodsListOptions} dataSource={this.props.detailList} />
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  detailList: state.singleReceivingOrderDetailReducer.detailList
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList)
