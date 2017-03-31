/**
 * Created by wangming on 2017/1/5.
 */
import React, {
  Component,
  PropTypes
} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import PageGrid from 'components/PageGrid';
import moment from 'components/Moment';

import {
    FinancialType,
    BillingType,
    VerificationType,
    // BaddebtsAbleOp,
    // NotBaddebtsOp,
    // DiscountAbleOp,
    // NotDiscountOp,
    // LogisticsAbleOp,
    // NotLogisticsOp,
    // GatheringAbleOp,
    // NotGatheringOp,
    // BillingAbleOp,
    // NotBillingOp,
    // UrgentAbleOp,
    // NotUrgentOp,
    // VerAbleOp,
    // NotVerOp
} from './FinancialDataData';
import Constant from 'lib/constant';
/**
* 使用场景:财务列表
* 接口:订单.md (坏账、折扣、物流、开票、收款、核销、加急)
 *  */
export default class FinancialDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DDBArray: [],
      currentPage: 1
      // requredStatus: 0
    }
  }


  static PropTypes = {
    // 列表模式 0为待 1为已
    requredStatus: PropTypes.number.isRequired,
    // 组织机构ID
    // organizationID:PropTypes.number.isRequired,
    // 当前第几页
    currentPageCount: PropTypes.number.isRequired,
    // 每页显示多少条
    pageCountPerPage: PropTypes.number.isRequired,
    // 用于接收点击row的index
    rowClick: PropTypes.func.isRequired,
    // 财务类型
    financialType: PropTypes.string.isRequired,
    ifCheckBox: PropTypes.bool,
    checkCallBack: PropTypes.func,
  }

  static defaultProps = {
    requredStatus: 0,
    MKID: 0,
    ifCheckBox: false,
  }

  handleCheckBack = (row) => {
    const data = this.props.financialDataGrid.financialListData;
    console.debug('handleCheckBack:', data);
    const retVal = [];
    data[row].selected = !data[row].selected;
    data.map((value, index) => {
      if (value.selected) {
        retVal.push(value);
      }
    });

    if (this.props.checkCallBack) {
      this.props.checkCallBack(retVal);
    }
  };


  // BaddebtsAbleOp,
  //   NotBaddebtsOp,
  //   DiscountAbleOp,
  //   NotDiscountOp,
  //   LogisticsAbleOp,
  //   NotLogisticsOp,
  //   GatheringAbleOp,
  //   NotGatheringOp,
  //   BillingAbleOp,
  //   NotBillingOp,
  //   UrgentAbleOp,
  //   NotUrgentOp,
  //   VerAbleOp,
  //   NotVerOp
  adraptTableColOption = () => {
    // 可登记坏账
    const BaddebtsAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:MM')
        )
      }
    ];

    // 历史坏账
    const NotBaddebtsOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '总金额',
        attr: 'JSZJE'
      },
      {
        label: '坏账金额',
        attr: 'HZJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];


    const DiscountAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const NotDiscountOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '折扣金额',
        attr: 'ZKJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const LogisticsAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const NotLogisticsOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '物流金额',
        attr: 'WLFY'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const GatheringAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '未收款金额',
        attr: 'WSZJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const NotGatheringOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '创建日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const BillingAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '未开票金额',
        attr: 'WKPJE'
      },
      {
        label: '下单日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const NotBillingOp = [
      {
        label: '发票号',
        attr: 'FPHM'
      },
      {
        label: '订单号',
        attr: 'DDID'
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'GHDW'
      },
      {
        label: '开票金额',
        attr: 'KPJE'
      },
      {
        label: '开票日期',
        attr: 'KPSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];


    const UrgentAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const NotUrgentOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'CJJXSMC'
      },
      {
        label: '订单金额',
        attr: 'JSZJE'
      },
      {
        label: '加急金额',
        attr: 'JJFY'
      },
      {
        label: '登记日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const VerAbleOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'JSJXSMC'
      },
      {
        label: '购货金额',
        attr: 'JSZJE'
      },
      {
        label: '已收账金额',
        attr: 'YSZJE'
      },
      {
        label: '坏账金额',
        attr: 'HZJE'
      },
      {
        label: '创建日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    const NotVerOp = [
      {
        label: '订单号',
        attr: 'GUID',
        tableHeaderColumnStyle: { width: '174px' },
        style: { width: '174px' },
        render: row => (<div>
          <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
          {row.GUID}
        </div>)
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC || '-'}
        </div>)
      },
      {
        label: '购货单位',
        attr: 'JSJXSMC'
      },
      {
        label: '购货金额',
        attr: 'JSZJE'
      },
      {
        label: '已收账金额',
        attr: 'YSZJE'
      },
      {
        label: '坏账金额',
        attr: 'HZJE'
      },
      {
        label: '创建日期',
        attr: 'CJSJ',
        formater: value => (
          moment(value).format('YYYY-MM-DD HH:mm')
        )
      }
    ];

    switch (this.props.financialType) {
      case Constant.SAAS.financial.BADDEBTS :
        return this.props.requredStatus === 0 ? BaddebtsAbleOp : NotBaddebtsOp;
      case Constant.SAAS.financial.BILLING :
        return this.props.requredStatus === 0 ? BillingAbleOp : NotBillingOp;
      case Constant.SAAS.financial.DISCOUNT :
        return this.props.requredStatus === 0 ? DiscountAbleOp : NotDiscountOp;
      case Constant.SAAS.financial.GATHERING :
        return this.props.requredStatus === 0 ? GatheringAbleOp : NotGatheringOp;
      case Constant.SAAS.financial.LOGISTICS :
        return this.props.requredStatus === 0 ? LogisticsAbleOp : NotLogisticsOp;
      case Constant.SAAS.financial.URGENT :
        return this.props.requredStatus === 0 ? UrgentAbleOp : NotUrgentOp;
      case Constant.SAAS.financial.VERIFICATION :
        return this.props.requredStatus === 0 ? VerAbleOp : NotVerOp;
    }
  };

  orderTypeJudge = (type) => {
    const num = parseInt(type);
    switch (num) {
      case 0:
        return {
          type: '铺货',
          backgroundColor: 'pink'
        };
      case 1:
        return {
          type: '备货',
          backgroundColor: '#00be9c'
        };
      case 2:
        return {
          type: '手术',
          backgroundColor: '#ff625b'
        };
      case 3:
        return {
          type: '借货',
          backgroundColor: '#58909c'
        };
      case 4:
        return {
          type: '调货',
          backgroundColor: '#58909c'
        };
      case 5:
        return {
          type: '铺货补货',
          backgroundColor: '#58909c'
        };
      case 6:
        return {
          type: '铺货销售',
          backgroundColor: '#58909c'
        };
      case 7:
        return {
          type: '调拨',
          backgroundColor: '#58909c'
        };
      case 8:
        return {
          type: '调拨',
          backgroundColor: '#58909c'
        };
      default:
        return {
          type: '无',
          backgroundColor: '#58909c'
        };
    }
  };


  options = () => ({
    columnOptions: this.adraptTableColOption(),
    tableAttrs: {
      displaySelectAll: false,
      selectable: this.props.ifCheckBox,
      multiSelectable: this.props.ifCheckBox,
      onCellClick: (rowId, col) => {
        console.debug('onCellClick:', col, this.props.financialDataGrid.financialListData);
        const data = this.props.financialDataGrid.financialListData;
        if (Object.prototype.toString.call(data) !== '[object Array]' || data.length === 0) {
          return;
        }

        const row = data[rowId];
        if (!this.props.ifCheckBox || col !== -1) {
          this.props.rowClick(row);
        } else {
          this.handleCheckBack(rowId);
        }
      }
    },
    dataSource: this.props.financialDataGrid.financialListData || [],
    tableHeaderAttrs: {
      displaySelectAll: this.props.ifCheckBox,
      adjustForCheckbox: false,
      enableSelectAll: false,
    },
    tableBodyAttrs: {
      displayRowCheckbox: this.props.ifCheckBox,
      stripedRows: true,
      showRowHover: true,
      deselectOnClickaway: false
    },
    showIndex: true,
    pagination: {
      currentPage: this.props.financialDataGrid.currentPage || 1,
      totalCount: this.props.financialDataGrid.totalPage || 0,
      prePageCount: this.props.pageCountPerPage,
      pageLength: 4,
      pageFunc: (page) => {
        console.debug(`page=${page}`);
        this.fetchDataFromServer(this.props.financialType, this.props.requredStatus, page);
      }
    }
  });


  /**
   * 获取数据  在这里调用api
   * {
   * "PageSize": 10,       //每页显示条数
    *"Page": 1,            //第几页
    *"SortBy": "default",  //排序条件
    *"SortOrder": "desc"   //降序还是升序
    *  }
   */
  fetchDataFromServer = (financialType, requredStatus, page) => {
    console.debug('fetchDataFromServer:', financialType, requredStatus, page);
    const params = { type: financialType, param: {} };
    switch (financialType) {
      case FinancialType.baddebts : {
        if (requredStatus === 0) {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                WSZJE: ['>', 0]
              }
            ]
          }
        } else {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                HZJE: ['>', 0]
              }
            ]
          }
        }
      }
        break;
      case FinancialType.logistics : {
        if (requredStatus === 0) {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                YSZJE: 0,
                YKPJE: 0,
                WSZJE: ['>', 0],
                WKPJE: ['>', 0],
              }
            ]
          }
        } else {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                WLFY: ['>', 0]
              }
            ]
          }
        }
      }
        break;
      case FinancialType.urgent : {
        if (requredStatus === 0) {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                YSZJE: 0,
                YKPJE: 0,
                WSZJE: ['>', 0],
                WKPJE: ['>', 0],
              }
            ]
          }
        } else {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                JJFY: ['>', 0]
              }
            ]
          }
        }
      }
        break;
      case FinancialType.discount : {
        if (requredStatus === 0) {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                YSZJE: 0,
                YKPJE: 0,
                WSZJE: ['>', 0],
                WKPJE: ['>', 0],
              }
            ]
          }
        } else {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                ZKJE: ['>', 0]
              }
            ]
          }
        }
      }
        break;
      case FinancialType.gathering : {
        if (requredStatus === 0) {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
			          WSZJE: ['>', 0]
              }
            ]
          }
        } else {
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                WSZJE: 0,
			          YSZJE: ['>', 0]
              }
            ]
          }
        }
      }
        break;
      case FinancialType.billing : {
        if (requredStatus === 0) {
          params.billingType = BillingType.Unbilling;
          params.param.body = {
            DDB: [
              {
                SHJXSID: this.props.globalStore.organizationId,
                WKPJE: ['>', 0]
              }
            ]
          }
        } else {
          params.billingType = BillingType.Already;
          params.param.zzjgid = this.props.globalStore.organizationId;
        }
      }
        break;
      case FinancialType.verification : {
        if (requredStatus === 0) {
          params.verType = VerificationType.UnverificationType;
          params.param.orgId = this.props.globalStore.organizationId;
        } else {
          params.verType = VerificationType.Already;
          params.param.orgId = this.props.globalStore.organizationId;
        }
      }
        break;
      default: {
      }
    }

    params.param.PageSize = this.props.pageCountPerPage;
    params.param.Page = page;
    params.param.SortBy = '';
    params.param.SortOrder = 'desc';
    this.props.getFinancialListData(params);
  }

  componentWillMount() {
    console.debug('FinancialDataGrid:', this.props.globalStore);
    this.setState({ currentPage: this.props.currentPageCount });
    this.fetchDataFromServer(this.props.financialType, this.props.requredStatus, this.props.currentPageCount);
  }

  componentWillReceiveProps(nextProps) {
    console.debug('FinancialDataGrid:', nextProps);
    if (nextProps.requredStatus !== this.props.requredStatus) {
      this.fetchDataFromServer(nextProps.financialType, nextProps.requredStatus, nextProps.currentPageCount);
    }
    // this.setState({requredStatus:nextProps.requredStatus});
    this.setState({ currentPage: nextProps.currentPageCount });
  }

  render() {
    // let options = [];
    // switch (Number(this.props.orderType)) {
    //   case 1:
    //   //备货订单
    //     let BHDD = ['GUIDBH','CJJXSMC','CJSJ'];
    //     BHDD.map((value,index) => {
    //       this.options().columnOptions.map((sub_value,sub_index) => {
    //         if (sub_value === 'GUIDBH') {
    //           sub_value.attr = 'GUID'
    //         }
    //         if (value === sub_value.attr) {
    //           options.push(sub_value);
    //         }
    //       })
    //     })
    //     break;
    //   case 2:
    //     //手术订单
    //     let SSDD = ['GUID','YYMC','SSLXMC','DHRQ','CJSJ'];
    //     SSDD.map((value,index) => {
    //       this.options().columnOptions.map((sub_value,sub_index) => {
    //         if (value === sub_value.attr) {
    //           options.push(sub_value);
    //         }
    //       })
    //     })
    //     break;
    // }
    // let params = this.options();
    // params.columnOptions = options;

    return (
      <div>
        {
          console.debug('FinancialDataGrid:', this.props.financialDataGrid.financialListData)
        }
        <PageGrid options={this.options()} dataSource={this.props.financialDataGrid.financialListData} pagination={this.options().pagination} />
      </div>
    )
  }
}
