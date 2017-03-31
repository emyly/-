/**
 * Created by wangming on 2016/10/28.
 */
import React, { Component, PropTypes } from 'react';
import './DistributionSummary.scss';
import DataGrid from 'components/DataGrid';

/**
 * 表头
 */
const tableHeader = [
  {
    name: '物料号'
  },
  {
    name: '品名'
  },
  {
    name: '商品描述'
  },
  {
    name: '订购总数量'
  },
  {
    name: '已拣货数量'
  },
  {
    name: '未配货数量'
  },
  {
    name: '已复核数量'
  },
  {
    name: '待复核数量'
  }
];


export default class DistributionSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: '0',
      tableHeader: [],
      tableData: [],
      title: '配货商品汇总'
    }
  }

  static propTypes = {
    /**
     * 当前组织机构id
     */
    orgId: React.PropTypes.number.isRequired,
    /**
     * 订单id
     */
    orderId: React.PropTypes.number.isRequired,
    /**
     * 回调,返回未配货数量
     */
    callback: React.PropTypes.func,
    /**
     * 回调,提交
     */
    submitCallback: React.PropTypes.func,
    /**
     * 传入数据
     */
    dataArray: React.PropTypes.array,
    dataInArrayByMatch: React.PropTypes.array,
    className: PropTypes.string,
    getWarehouseInOutGoodsSummary: React.PropTypes.func,
    rowClickCallback: React.PropTypes.func,
    distributionSummary: React.PropTypes.object.isRequired,
  };

  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
  };
  /**
   * 数据初始化
   */
  componentWillMount = () => {
    /**
     * 订单类型：
     * 0：铺货订单，
     * 1：备货订单
     * 2：手术订单
     * 3: 借货订单
     * 4: 调货订单
     * 5: 铺货补货订单
     * 6: 铺货销售订单
     */
    this.setState({ tableHeader });
    if (this.props.dataArray && this.props.dataInArrayByMatch) {
      const sendData = [];
      const outData = [];
      this.adraptDataArray(this.props.dataArray, this.props.dataInArrayByMatch, sendData, outData);
      this.setState({ tableData: outData });
      if (this.props.submitCallback) {
        this.props.submitCallback(sendData);
      }
    } else {
      this.props.getWarehouseInOutGoodsSummary(this.props.orderId);
    }
  };

  adraptDataArray = (inData, inDataMatch, sendData, outData) => {
    inDataMatch.map((iM) => {
      const sendObject = Object.assign({}, iM);
      inData.map((inNode) => {
        inNode.ProductListByMaterialID.map((PL) => {
          if (Number(iM.SPID) === Number(PL.GoodsId)) {
            sendObject.YJHSL = Number(sendObject.YJHSL) + Number(PL.AlreadySelect);
            sendObject.WPHSL = Number(sendObject.WPHSL) - Number(PL.AlreadySelect);
            PL.ProductListByBatchID.map((PD) => {
              if (Number(PD.AlreadySelect) > 0) {
                const tpObject = {};
                tpObject.SPBH = iM.SPBH;
                tpObject.SPMC = iM.SPMC;
                tpObject.SPMS = iM.SPMS;
                tpObject.DGSL = iM.DGSL;
                tpObject.YJHSL = Number(iM.YJHSL) + Number(PL.AlreadySelect);
                tpObject.WPHSL = Number(iM.WPHSL) - Number(PL.AlreadySelect);
                tpObject.YFHSL = Number(iM.YFHSL);
                tpObject.DFHSL = Number(iM.DFHSL);
                tpObject.KWID = inNode.StockPositionID;
                tpObject.SPPH = PD.SPPH;
                tpObject.SL = Number(PD.AlreadySelect) || 0;
                tpObject.WQJXSID = PD.JXSID || PD.WQJXSID;
                tpObject.SPLX = PD.SPLX || 0;
                tpObject.SPID = PD.SPID;
                tpObject.SPPHID = PD.SPPHID;
                sendData.push(tpObject);
              }
            });
          }
        })
      })
      outData.push(sendObject);
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ tableData: nextProps.distributionSummary.summaryData });
    this.props.callback(nextProps.distributionSummary.summaryData);
  };

  handleCellClick = (index) => {
    if (this.props.rowClickCallback) {
      const returnValue = this.state.tableData[index];
      this.props.rowClickCallback(returnValue)
    } else {
      (() => {})();
    }
  };

  showTable = () => (
        // <Table displaySelectAll={false} selectable={false}>
        //   {
        //     this.showTableHeader()
        //   }
        //   {
        //     this.showTableBody()
        //   }
        // </Table>

    <DataGrid
      options={this.options()}
      dataSource={this.state.tableData}
      dataGridStyle={{ boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' }}
    />
    );

  options = () => ({
    columnOptions: [
      {
        label: '物料号',
        attr: 'SPBH',
      },
      {
        label: '品名',
        attr: 'SPMC',
      },
      {
        label: '商品描述',
        attr: 'SPMS',
      },
      {
        label: '订购总数量',
        attr: 'DGSL',
      },
      {
        label: '已拣货数量',
        attr: 'YJHSL',
      },
      {
        label: '未配货数量',
        attr: 'WPHSL',
      },
      {
        label: '已复核数量',
        attr: 'YFHSL',
      },
      {
        label: '待复核数量',
        attr: 'DFHSL',
      }
    ],
    tableAttrs: {
      displaySelectAll: false,
      selectable: false,

    },
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false,
      className: this.props.className

    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    dataSource: this.state.tableData || [],
    showIndex: true,
  });

  render() {
    return (
      <div>
        {
          this.showTable()
        }
      </div>
    )
  }

}
