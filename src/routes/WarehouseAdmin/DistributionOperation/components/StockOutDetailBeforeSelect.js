/**
 * Created by wangming on 2016/10/29.
 */

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './StockOutDetailBeforeSelect.scss';
import StockOutDetail from './StockOutDetail';
import HistoryOutBoundDetail from './HistoryOutBoundDetail';
import RaisedButton from 'material-ui/RaisedButton';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import GoBackButton from 'components/GoBackButton';
import { Dialog } from 'material-ui';
import SelectMethodFlow from '../containers/SelectMethodFlowContainer';

const debug = require('debug')('app: sodbs');

export default class StockOutDetailBeforeSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_index: 0,
      status: false,
      ifShowButton: true,
      currentOrderState: 0,
      action: '',
      filter: '',
      currrentOrder: { GUID: 0 },
      selectData: [],
      orderInfo: {},
      dialogOpen: false,
      curWarehouseId: 0,
      selectDialogOpen: false,
      temporaryDialogOpen: false,
      goToNextFlag: false, // 判断是否进入下一步流程
      preMatchingDialogOpen: false,
      startMethodFlow: false,
    };
    this.prematchingData = [];
  }

  static propTypes = {
    location: React.PropTypes.object,
    // getTemporaryStorage: React.PropTypes.func,
    stockOutDetailBefore: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object
  };
  /**
   * 退出组件前，数据清理
   */
  componentWillUnmount = () => {
    debug('componentWillUnmount DO1');
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ orderInfo: nextProps.stockOutDetailBefore.orderData });
    if (this.state.goToNextFlag) {
      if (nextProps.stockOutDetailBefore.temporaryData.length > 0) {
        this.openTemporaryDialog();
      } else {
        this.openSelectDialog();
      }
      this.setState({ goToNextFlag: false });
    }
  };

  /**
   * 数据初始化
   */
  componentWillMount = () => {
    debug('componentWillMount DO1');
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
    this.setState({ currrentOrder: this.props.location.state.orderInfo });
    this.setState({ currentOrderState: this.props.location.state.state });
  };

  goNextDetail = (returnValue) => {
    this.setState({ dialogOpen: true });
    this.setState({ curWarehouseId: returnValue.GUID });
  };

  getDistributionData = (value) => {
    this.setState({ selectData: value });
  };

  getUndistributionNum = (num) => {
    if (!this.state.currentOrderState) {
      if (num > 0) {
        this.setState({ ifShowButton: true });
      } else {
        this.setState({ ifShowButton: false });
      }
    }
  };

  openSelectDialog = () => {
    this.setState({ selectDialogOpen: true });
  };

  openPreMatchingDialog = () => {
    this.setState({ preMatchingDialogOpen: true });
  };

  prematchingSuggest = () => {
    this.closeSelectDialog();
    this.openPreMatchingDialog();
    // this.setState({preMatchingDialogOpen: true});
    // this.context.router.push({
    //   pathname: `/distributionOperation/selectingGoods/${this.state.currrentOrder.GUID}`,
    //   state: { orderId: this.state.currrentOrder.GUID,
    //     selectData: this.state.selectData,
    //     orderInfo: this.state.orderInfo,
    //     type: '0' }
    // });
  };

  systemSuggest = () => {
    this.closeSelectDialog();
    this.context.router.push({
      pathname: `/distributionOperation/selectingGoods/${this.state.currrentOrder.GUID}`,
      state: { orderId: this.state.currrentOrder.GUID,
        selectData: this.state.selectData,
        orderInfo: this.state.orderInfo,
        type: '0' }
    });
  };

  selfSelect = () => {
    this.closeSelectDialog();
    this.context.router.push({
      pathname: `/distributionOperation/selectingGoods/${this.state.currrentOrder.GUID}`,
      state: { orderId: this.state.currrentOrder.GUID,
        selectData: this.state.selectData,
        orderInfo: this.state.orderInfo,
        type: '1' }
    });
  };

  // 发起暂存拣货
  temporarySelect = () => {
    this.context.router.push({
      pathname: `/distributionOperation/selectingGoods/${this.state.currrentOrder.GUID}`,
      state: { orderId: this.state.currrentOrder.GUID,
        selectData: this.state.selectData,
        orderInfo: this.state.orderInfo,
        type: '2' }
    });
  };

  closeSelectDialog = () => {
    this.setState({ selectDialogOpen: false });
  };

  showSelectDialog = () => {
    const contentStyle = { width: '750px', height: '335px' };
    const bodyStyle = { height: '100%', padding: '2.1rem 3.57rem' };
    const actions = [
      <FlatButton
        label='取消'
        primary
        onTouchTap={this.closeSelectDialog}
      />,
    ];
    return (<Dialog
      modal
      open={this.state.selectDialogOpen}
      onRequestClose={this.closeSelectDialog}
      actions={actions}
      autoScollBodyContent
      contentStyle={contentStyle}
      bodyStyle={bodyStyle}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
        <div
          style={{ marginRight: '20px',
            fontFamily: 'SourceHanSansCN-Medium',
            fontSize: '20px',
            color: 'rgba(0,0,0,0.87)',
            letterSpacing: '0px',
            lineHeight: '20px' }}
        ><span>手术配货</span></div>
        <div
          style={{ fontFamily: 'PingFangSC-Regular',
            fontSize: '16px',
            color: 'rgba(0,0,0,0.54)',
            lineHeight: '16px' }}
        ><span>请选择拣货推荐单生成方式</span></div>
      </div>
      <div
        style={{ marginTop: '2.1rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between' }}
      >
        <div
          style={{ width: '183px', height: '160px', background: 'rgba(0,160,255,0.09)', paddingTop: '1.5rem', cursor: 'pointer' }}
          onClick={this.systemSuggest}
        >
          <div style={{ width: '95px', height: '95px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src='/WarehouseAdmin/DistributionOperation/xitongtuijian.png' alt={'系统推荐'} />
          </div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '16px', color: 'rgba(0,0,0,0.54)', lineHeight: '16px' }}>系统推荐</div>
        </div>
        <div
          style={{ width: '183px', height: '160px', background: 'rgba(0,190,156,0.09)', paddingTop: '1.5rem', cursor: 'pointer' }}
          onClick={this.selfSelect}
        >
          <div style={{ width: '95px', height: '95px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src='/WarehouseAdmin/DistributionOperation/zixuankuwei.png' alt={'自选库位'} />
          </div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '16px', color: 'rgba(0,0,0,0.54)', lineHeight: '16px' }}>自选库位</div>
        </div>
        <div
          style={{ width: '183px', height: '160px', background: 'rgba(0,190,156,0.09)', paddingTop: '1.5rem', cursor: 'pointer' }}
          onClick={this.prematchingSuggest}
        >
          <div style={{ width: '95px', height: '95px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src='/prematching.png' alt={'预配套库位'} />
          </div>
          <div style={{ fontFamily: 'PingFangSC-Regular', fontSize: '16px', color: 'rgba(0,0,0,0.54)', lineHeight: '16px' }}>预配套库位</div>
        </div>
      </div>
    </Dialog>)
  };

  // 发起获取暂存action
  handleGetTemporary = () => {
    this.setState({ goToNextFlag: true });
    // this.props.getTemporaryStorage(this.state.currrentOrder.GUID);
  };

  // 打开暂存对话框
  openTemporaryDialog = () => {
    this.setState({ temporaryDialogOpen: true });
  };

  // 关闭怎存对话框
  closeTemporaryDialog = () => {
    this.setState({ temporaryDialogOpen: false });
  };

  // 继续暂存拣货
  handleGoOnTemporary = () => {
    this.closeTemporaryDialog();
    this.temporarySelect();
  };

  // 全新拣货
  handleNewSelect = () => {
    this.closeTemporaryDialog();
    this.openSelectDialog();
  };


  // 显示暂存对话框
  showTemporaryDialog = () => {
    const contentStyle = { width: '35.7rem', height: '20.1rem' };
    const bodyStyle = { height: '100%', padding: '2.1rem 3.57rem' };
    const actions = [
      <FlatButton
        label='全新拣货'
        primary={false}
        onTouchTap={this.handleNewSelect}
      />,
      <FlatButton
        label='继续拣货'
        primary
        onTouchTap={this.handleGoOnTemporary}
      />,
    ];

    return (<Dialog
      modal
      open={this.state.temporaryDialogOpen}
      onRequestClose={this.closeSelectDialog}
      actions={actions}
      autoScollBodyContent
            // style ={{width: '25%', left:'50%', marginLeft: '-12%'}}
      contentStyle={contentStyle}
      bodyStyle={bodyStyle}
      title='继续拣货提醒'
    >
        是否继续之前中断了的拣货操作?
      </Dialog>)
  };

  showButton = () => {
    if (this.state.currentOrderState === 0) {
      return (<nav>
        <GoBackButton />
        <RaisedButton
          label='下一步'
          style={{ marginLeft: '5px' }}
          onTouchTap={this.startMethodFlow}
        />
      </nav>)
    } else {
      return ''
    }
  };

  showFilter = () => {
    if (this.state.ifShowButton) {
      return <div />
    } else {
      return ''
    }
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  /* 表头固定函数*/
  tableHeaderFixed = (e, fixDom, fixGateDis, fixTop) => {
    if (document.querySelector('#scrollWrapper').scrollTop >= fixGateDis) {
      fixDom.style.position = 'fixed';
      fixDom.style.top = `${fixTop}px`;
    } else {
      fixDom.style.position = 'relative';
      fixDom.style.top = 'auto';
    }
  };
  componentDidUpdate() {
    const athis = this;
    const fixDom = document.querySelector('.tableHeader').parentNode.parentNode;
    const fixGateDis = fixDom.offsetParent.offsetTop + fixDom.offsetTop;
    const fixTop = document.querySelector('#scrollWrapper').offsetTop;
    const parent = fixDom.offsetParent;
    const PL = Number(document.defaultView.getComputedStyle(parent, null)
    .paddingLeft.slice(0, document.defaultView.getComputedStyle(parent, null)
    .paddingLeft.length - 2));
    const PR = Number(document.defaultView.getComputedStyle(parent, null)
    .paddingLeft.slice(0, document.defaultView.getComputedStyle(parent, null)
    .paddingLeft.length - 2));
    const fixWidth = parent.offsetWidth - PL - PR;
    fixDom.style.width = `${fixWidth}px`;
    document.querySelector('#scrollWrapper').addEventListener('scroll', (e) => {
      athis.tableHeaderFixed(e, fixDom, fixGateDis, fixTop, fixWidth);
    }, false);
  }

  showStandard = () => {
    const actions = this.showButton();
    if (this.state.currentOrderState === 1) {
      return (<StandardForm iconPosition='-30px -90px' title='手术配货' message='...'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard title='拣货详情' message='...' actions={''} showStep={false} expanded>
            <StockOutDetail
              orgId={0}
              orderId={this.state.currrentOrder.GUID}
              rowClickCallback={this.goNextDetail}
              selectCallback={this.getDistributionData}
            />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>)
    } else {
      return (<StandardForm iconPosition='-30px -90px' title='手术配货' message='...'>
        <StandardFormCardList activeStep={0}>
          <StandardFormCard
            title='拣货详情' message='...'
            stepName='查看拣货详情' actions={actions} completed={false} showContent expanded id='scrollWrapper' style={{ position: 'relative' }}
          >
            <StockOutDetail
              orgId={0}
              className='tableHeader'
              orderId={this.state.currrentOrder.GUID}
              rowClickCallback={this.goNextDetail}
              selectCallback={this.getDistributionData}
            />
          </StandardFormCard>
          <StandardFormCard
            title='拣货提示单' message='请选择库位拣货' stepName='拣货' actions={actions} completed={false}
            showContent={false} expanded={false}
          >
            <div />
          </StandardFormCard>
          <StandardFormCard
            title='拣货提交' message='提交拣货记录或点击记录查看详情' stepName='拣货提交' completed={false}
            actions={actions} showContent={false} expanded={false}
          >
            <div />
          </StandardFormCard>
        </StandardFormCardList>
      </StandardForm>)
    }
  };

  preMatchingCallback = () => {

  }

  // showPrematchingDialog = () => {
  //   return <PrematchingDialog
  //     matchedStorages={this.prematchingData}
  //     dialogOpen={this.state.preMatchingDialogOpen}
  //     callback={this.preMatchingCallback}
  //   />
  // }

  //
  selectMethodFlow = () => {

  }

  endMethodFlowCallback = (flag, dataArray, type) => {
    this.setState({ startMethodFlow: false });
    if (flag) {
      const dataClone = dataArray.slice(0);
      this.context.router.push({
        pathname: `/distributionOperation/selectingGoods/${this.state.currrentOrder.GUID}`,
        state: {
          orderId: this.state.currrentOrder.GUID,
          storageData: dataClone,
          selectData: this.state.selectData,
          orderInfo: this.state.orderInfo,
          type
        }
      });
    }
  };

  startMethodFlow = () => {
    this.setState({ startMethodFlow: true });
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        {
          this.showStandard()
        }

        <HistoryOutBoundDetail
          orderId={this.state.currrentOrder.GUID}
          warehouseId={String(this.state.curWarehouseId)}
          open={this.state.dialogOpen}
          handleClose={this.handleClose}
        />
        <SelectMethodFlow
          startMethodFlow={this.state.startMethodFlow}
          endMethodFlowCallback={this.endMethodFlowCallback}
          orderInfo={this.state.currrentOrder}
          materialList={this.state.selectData}
        />
      </div>
    )
  }

}
