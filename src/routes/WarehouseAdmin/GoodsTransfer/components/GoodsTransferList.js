/**
 * Created by niexq on 17/3/25.
 */

import React, { Component, PropTypes } from 'react';

import './GoodsTransferList.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import PageGrid from 'components/PageGrid';

import RaisedButton from 'material-ui/RaisedButton';

import DepotSelectDialog from 'components/DepotSelectDialog';

import moment from 'lib/moment'

import InformationSnackBar from 'components/SnackBar/InformationSnackBar';

/**
 * 使用场景：商品转移记录列表
 */
export default class GoodsTransferList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openMessageBar: false,
      message: '',
      options: {                                     // 商品转移记录options
        columnOptions: [
          {
            label: '记录编号',
            attr: 'GUID',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '转移仓库',
            attr: 'CKMC',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          },
          {
            label: '操作时间',
            attr: 'CJSJ',
            style: {
              height: '40px',
              cursor: 'pointer'
            },
            formater: (value, row) => {
              if (value) return moment(value).formatStandard('Y', 'M', 'D')
              return ('-')
            }
          },
          {
            label: '操作人',
            attr: 'YHXM',
            style: {
              height: '40px',
              cursor: 'pointer'
            }
          }
        ],
        tableAttrs: {
          displaySelectAll: false,
          selectable: false,
          onCellClick: (rowId) => {
            if (this.props.goodsTransferList.goodsTransferListData.length) {
              this.context.router.push({
                pathname: `/goodsTransfer/${this.props.goodsTransferList.goodsTransferListData[rowId].GUID}`
              });
            }
          }
        },
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          style: {
            fontFamily: 'SourceHanSansCN-Bold',
            fontSize: '16px',
            color: '#5B83B4',
            background: '#eaecee',
            height: '3.1rem'
          }
        },
        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: true,
          showRowHover: true
        },
        showIndex: true,
        pagination: {
          currentPage: 1,
          totalCount: 0,
          prePageCount: 10,
          pageLength: 5,
          totalLabel: '记录总数',
          pageFunc: (page) => {
            this.props.getGoodsTransferListData(page);
          }
        }
      },
      selectOpen: false,    // 仓库选择器Dialog开关
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
  static defaultProps = {

  };
  static propTypes = {
    goodsTransferList: PropTypes.object,
    getGoodsTransferListData: PropTypes.func,
    goodsTransferOperating: PropTypes.object,
    globalStore: PropTypes.object,
    initPostOrder: PropTypes.func,
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.goodsTransferOperating.postStatus === '1' &&
        nextProps.goodsTransferOperating.postStatus !== this.props.goodsTransferOperating.postStatus) {
      this.setState({
        openMessageBar: true,
        message: '操作成功'
      })
    }
    if (nextProps.goodsTransferList.goodsTransferListData.length) {
      this.state.options.dataSource = nextProps.goodsTransferList.goodsTransferListData || [];
      this.state.options.pagination.currentPage = nextProps.goodsTransferList.currentPage || 1;
      this.state.options.pagination.totalCount = nextProps.goodsTransferList.totalCount || 0;
      this.setState({
        options: this.state.options
      });
    }
  };
  componentWillMount = () => {
    this.props.getGoodsTransferListData();
  };
  /**
   * 新建商品转移
   */
  handleCreateGoodsTransfer = () => () => {
    this.setState({
      selectOpen: true
    });
  };
  /**
   * 仓库选择器Dialog开关状态选择
   */
  handleSelectDialogToggle = () => {
    this.setState({ selectOpen: !this.state.selectOpen });
  };
  /**
   * 仓库选择器callback
   */
  handleWarehouseSelectCallback = (value) => {
    this.context.router.push({
      pathname: '/goodsTransfer/operating/space',
      state: {
        id: value.id,
        name: value.name
      }
    });
  };
  // 提示信息框开关
  handleRequestClose = () => {
    this.setState({
      openMessageBar: !this.state.openMessageBar
    });
    this.props.initPostOrder();
  };
  render() {
    const actions = (
      <nav>
        <RaisedButton
          label='新建' onTouchTap={this.handleCreateGoodsTransfer()}
          style={{ width: '95px' }} backgroundColor='#00a0ff' labelColor='#fff'
          buttonStyle={{ fontFamily: 'SourceHanSansCN-Regular' }}
        />
      </nav>
    )
    return (
      <StandardDataGrid
        title='商品转移'
        actions={actions}
        iconPosition={'0px 0px'}
      >
        <PageGrid
          dataGridStyle={{ height: '100%', width: '100%' }}
          options={this.state.options}
        />
        <DepotSelectDialog
          handleButtonClick={this.handleSelectDialogToggle} open={this.state.selectOpen}
          currentOrg={this.props.globalStore.organizationId} ifStorage={false}
          ifChildDepotId callback={this.handleWarehouseSelectCallback}
        />
        <InformationSnackBar
          message={this.state.message || ''}
          autoHideDuration={1000}
          open={this.state.openMessageBar}
          onRequestClose={this.handleRequestClose}
        />
      </StandardDataGrid>
    )
  }
}
