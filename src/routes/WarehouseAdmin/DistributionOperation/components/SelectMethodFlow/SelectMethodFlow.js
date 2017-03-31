/**
 * Component: SelectMethodFlow
 * Description: distribution select method business flow
 * Author: wangming
 */

import React from 'react'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import TemporaryDialog from './TemporaryDialog';
import UnCompleteAlertDialog from './UnCompleteAlertDialog';
import SelectMethodDialog from './SelectMethodDialog';
import SelfSelectDepotDialog from './SelfSelectDepotDialog';
import PreMatchingDialog from '../../containers/PreMatchingDialogContainer'

const selectMethod = {
  systemSuggest: 0,
  selfSelect: 1,
  prematchingSuggest: 2,
}

export default class SelectMethodFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temporaryDialogOpen: false,
      temporaryData: [],
      selectMethodDialogOpen: false,
      unCompleteDialogOpen: false,
      preMatchingDialogOpen: false,
      selfSelectOpen: false,
      errorMessage: '',
      openError: false,
      lastMaterial: {}
    };
    this.customSelectFlow = [];
    // 拣货选择流程状态机
    this.selectMethodState = {
      idle: 99,
      error: 98,
      end: 97,
      // 系统推荐流程
      systemSuggestStart: 0,
      systemSuggestWait: 1,
      systemSuggestRecieved: 2,
      systemSuggestHandle: 3,
      systemSuggestEnd: 4,
      // 自选库位流程
      selfSelectStart: 10,
      selfSelectWait: 11,
      selfSelectRecieved: 12,
      selfSelectHandle: 13,
      selfSelectEnd: 14,
      // 预配套流程
      preMatchStart: 20,
      preMatchWait: 21,
      preMatchRecieved: 22,
      preMatchHandle: 23,
      preMatchEnd: 24,
    };
    this.curMethodState = this.selectMethodState.idle; // 保存当前状态机状态
    this.selectMethodHandler = [];
    this.systemRecievedData = []; // 系统推荐返回数据
    this.methodData = []; // 合成数据
    this.selfSelectData = []; // 自选库位数据
    this.prematchData = []; // 预配套数据
  }

  static defaultProps = {

  };

  static propTypes = {
    startMethodFlow: React.PropTypes.bool.isRequired,
    endMethodFlowCallback: React.PropTypes.func.isRequired,
    orderInfo: React.PropTypes.object.isRequired,
    materialList: React.PropTypes.array.isRequired,
    getSelectAdvice: React.PropTypes.func.isRequired,
    getTemporaryStorage: React.PropTypes.func.isRequired,
    selectMethodFlow: React.PropTypes.object.isRequired,
  };

  // 状态机初始化
  initMethodState = () => {
    this.initHandler();
    this.curMethodState = this.selectMethodState.idle;
    this.runMethodStateHandler();
  };

  setMethodState = (state) => {
    this.curMethodState = state;
  };

  idleHandler = () => {
    this.systemRecievedData = [];
    this.methodData = [];
    this.selfSelectData = [];
    this.prematchData = [];
    this.setState({
      temporaryDialogOpen: false,
      selectMethodDialogOpen: false,
      unCompleteDialogOpen: false,
      preMatchingDialogOpen: false,
      selfSelectOpen: false,
      errorMessage: '',
      openError: false,
      lastMaterial: {}
    })
    this.props.endMethodFlowCallback(false);
  }

  errorHandler = (msg) => {
    this.systemRecievedData = [];
    this.methodData = [];
    this.selfSelectData = [];
    this.prematchData = [];
    this.alertError(msg);
    this.setState({
      temporaryDialogOpen: false,
      selectMethodDialogOpen: false,
      unCompleteDialogOpen: false,
      preMatchingDialogOpen: false,
      selfSelectOpen: false,
      errorMessage: '',
      openError: false,
      lastMaterial: {}
    })
  }

  endHandler = () => {
    this.setState({
      temporaryDialogOpen: false,
      selectMethodDialogOpen: false,
      selfSelectOpen: false,
      preMatchingDialogOpen: false,
      // unCompleteDialogOpen: false,
      errorMessage: '',
      openError: false,
    })
  };

  // 开始系统推荐
  systemSuggestStartHandler = () => {
    this.closeSelectDialog();
    this.customSelectFlow.push(selectMethod.systemSuggest);
    this.props.getSelectAdvice(this.props.orderInfo.GUID, { KWID: [] });
    this.setMethodState(this.selectMethodState.systemSuggestWait);
    this.runMethodStateHandler();
  }

  systemSuggestWaitHandler = () => {

  }

  systemSuggestRecievedHandler = () => {

  }

  systemSuggestHandleHandler = () => {
    this.handleAllDataArray();
    this.setMethodState(this.selectMethodState.end);
    this.runMethodStateHandler();
  }

  systemSuggestEndHandler = () => {

  }

  selfSelectStartHandler = () => {
    this.closeSelectDialog();
    this.customSelectFlow.push(selectMethod.selfSelect);
    this.openSelfSelectDialog();
    // this.setMethodState(this.selectMethodState.selfSelectWait);
    // this.runMethodStateHandler();
    // this.props.getSelectAdvice(this.props.orderInfo.GUID, { KWID: [] });
  }

  selfSelectWaitHandler = () => {

  }

  selfSelectRecievedHandler = () => {

  }

  selfSelectHandleHandler = () => {
    this.handleAllDataArray();
    this.closeSelfSelectDialog();
    this.setMethodState(this.selectMethodState.end);
    this.runMethodStateHandler();
  }

  selfSelectEndHandler = () => {

  }

  preMatchStartHandler = () => {
    this.closeSelectDialog();
    this.customSelectFlow.push(selectMethod.prematchingSuggest);
    this.openPrematchingDialog();
  }

  preMatchWaitHandler = () => {

  }

  preMatchRecievedHandler = () => {

  }

  preMatchHandleHandler = (preMatchList) => {
    this.prematchData = this.prematchData.concat(preMatchList.slice(0));
    // this.prematchData.map(pd => {
    //   pd.PHXQ.map(pq => {
    //     pq.YJSL = pq.SL;
    //   })
    // })
    this.handleAllDataArray();
    this.setMethodState(this.selectMethodState.end);
    this.runMethodStateHandler();
  }

  preMatchEndHandler = () => {

  }

  // 状态机初始化函数
  initHandler = () => {
    this.selectMethodHandler[this.selectMethodState.idle]
      = this.idleHandler;
    this.selectMethodHandler[this.selectMethodState.error]
      = this.errorHandler;
    this.selectMethodHandler[this.selectMethodState.end]
      = this.endHandler;

    // 系统推荐状态机
    this.selectMethodHandler[this.selectMethodState.systemSuggestStart]
      = this.systemSuggestStartHandler;
    this.selectMethodHandler[this.selectMethodState.systemSuggestWait]
      = this.systemSuggestWaitHandler;
    this.selectMethodHandler[this.selectMethodState.systemSuggestRecieved]
      = this.systemSuggestRecievedHandler;
    this.selectMethodHandler[this.selectMethodState.systemSuggestHandle]
      = this.systemSuggestHandleHandler;
    this.selectMethodHandler[this.selectMethodState.systemSuggestEnd]
      = this.systemSuggestEndHandler;

    // 自选库位状态机
    this.selectMethodHandler[this.selectMethodState.selfSelectStart]
      = this.selfSelectStartHandler;
    this.selectMethodHandler[this.selectMethodState.selfSelectWait]
      = this.selfSelectWaitHandler;
    this.selectMethodHandler[this.selectMethodState.selfSelectRecieved]
      = this.selfSelectRecievedHandler;
    this.selectMethodHandler[this.selectMethodState.selfSelectHandle]
      = this.selfSelectHandleHandler;
    this.selectMethodHandler[this.selectMethodState.selfSelectEnd]
      = this.selfSelectEndHandler;

    // 预配套状态机
    this.selectMethodHandler[this.selectMethodState.preMatchStart]
      = this.preMatchStartHandler;
    this.selectMethodHandler[this.selectMethodState.preMatchWait]
      = this.preMatchWaitHandler;
    this.selectMethodHandler[this.selectMethodState.preMatchRecieved]
      = this.preMatchRecievedHandler;
    this.selectMethodHandler[this.selectMethodState.preMatchHandle]
      = this.preMatchHandleHandler;
    this.selectMethodHandler[this.selectMethodState.preMatchEnd]
      = this.preMatchEndHandler;
  };

  // 运行状态机函数
  runMethodStateHandler = (...param) => {
    const handler = this.selectMethodHandler[this.curMethodState];
    if (handler) {
      handler(...param);
    }
  };

  componentWillMount = () => {
    this.initMethodState();
    this.props.getTemporaryStorage(this.props.orderInfo.GUID);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ temporaryData: nextProps.selectMethodFlow.temporaryData });
    this.startFlow(nextProps);
    if (this.curMethodState === this.selectMethodState.systemSuggestWait) {
      this.systemRecievedData = nextProps.selectMethodFlow.selectData.slice(0);
      this.setMethodState(this.selectMethodState.systemSuggestHandle);
      this.runMethodStateHandler();
    }
    if (this.curMethodState === this.selectMethodState.selfSelectWait) {
      this.selfSelectData = this.selfSelectData.concat(nextProps.selectMethodFlow.selectData.slice(0));
      this.setMethodState(this.selectMethodState.selfSelectHandle);
      this.runMethodStateHandler();
    }
  };

  alertError = (msg) => {
    this.setState({
      openError: true,
      errorMessage: msg
    });
  };

  handleErrorClose = () => {
    this.setState({
      openError: false,
      errorMessage: '',
    });
  };

  // 获取暂存拣货
  temporarySelectCallback = () => {
    this.closeTemporaryDialog();
    this.props.endMethodFlowCallback(true, this.state.temporaryData, '2');
  };

  // 全新拣货
  openSelectDialogCallback = () => {
    this.closeTemporaryDialog();
    this.openSelectMethodDialog();
  };

  closeTemporaryCallback = () => {
    this.setMethodState(this.selectMethodState.idle);
    this.runMethodStateHandler();
    // this.closeTemporaryDialog();
    // this.props.endMethodFlowCallback(false);
  };

  // 打开暂存对话框
  openTemporaryDialog = () => {
    this.setState({ temporaryDialogOpen: true });
  };

  // 关闭怎存对话框
  closeTemporaryDialog = () => {
    this.setState({ temporaryDialogOpen: false });
  };

  closeSelectCallback =() => {
    this.setMethodState(this.selectMethodState.idle);
    this.runMethodStateHandler();
  };

   // 打开选择方式对话框
  openSelectMethodDialog = () => {
    this.setState({ selectMethodDialogOpen: true });
  };


  // 系统推荐
  systemSuggestCallback = () => {
    this.setMethodState(this.selectMethodState.systemSuggestStart);
    this.runMethodStateHandler();
  };

  // 自选库位
  selfSelectCallback = () => {
    this.setMethodState(this.selectMethodState.selfSelectStart);
    this.runMethodStateHandler();
  };

  // 预配套
  prematchingSuggestCallback = () => {
    this.setMethodState(this.selectMethodState.preMatchStart);
    this.runMethodStateHandler();
  };

  // 关闭拣货方式对话框
  closeSelectDialog = () => {
    this.setState({ selectMethodDialogOpen: false });
  };

  startFlow = (nextProps) => {
    if (this.props.startMethodFlow !== nextProps.startMethodFlow
      && nextProps.startMethodFlow) {
        // 有无暂存
      if (this.state.temporaryData.length > 0) {
        // 打开是否暂存对话框
        this.openTemporaryDialog();
      } else {
        // 打开拣货方式对话框
        this.openSelectMethodDialog();
      }
    }
  }

  closeUnCompleteCallback = () => {
    this.setMethodState(this.selectMethodState.idle);
    this.runMethodStateHandler();
    // this.closeUnCompleteDialog();
    // this.props.endMethodFlowCallback(false);
  };

  openUnCompleteDialog = () => {
    this.setState({ unCompleteDialogOpen: true });
  };

  closeUnCompleteDialog = () => {
    this.setState({ unCompleteDialogOpen: false });
  }

  goonMatchCallback = () => {
    this.closeUnCompleteDialog();
    this.openSelectMethodDialog();
  }

  gotoSelectCallback = () => {
    this.closeUnCompleteDialog();
    this.props.endMethodFlowCallback(true, this.methodData, '2');
    // this.setMethodState(this.curMethodState.idle);
    // this.runMethodStateHandler();
  };

  clearMethodDataAndFlowState = () => {
    // this.setState({methodData: []});
    this.methodData = [];
  }

  handleAllDataArray = () => {
    // 1、合并库位
    this.combinArrayData();
    // 2、判断是否满足需求
    const lastData = this.judgeRequirement();
    if (lastData.lastNumber > 0) {
      this.setState({ lastMaterial: lastData });
      this.openUnCompleteDialog();
    } else {
      this.gotoSelectCallback();
    }
  };

  combinArrayData = () => {
    const sideSelfData = [].concat(this.systemRecievedData)
    .concat(this.prematchData);

    // 从当前系统推荐与预配货中筛选自选库位
    const sideSelfSetData = new Set(sideSelfData.map(md => md.KWID));
    const sideSelfIdArray = Array.from(sideSelfSetData);
    const newSelfData = [];

    this.selfSelectData.map((sd) => {
      if (!(sideSelfIdArray.some((si) => {
        return Number(si) === Number(sd.KWID);
      }))) {
        newSelfData.push(sd);
      }
    });

    this.selfSelectData = newSelfData;

    // 合并所有库位
    this.methodData = [].concat(this.systemRecievedData)
    .concat(this.selfSelectData)
    .concat(this.prematchData);
  };

  judgeRequirement = () => {
    let lastNeed = 0;
    let lastNumber = 0;
    this.props.materialList.map((ml) => {
      const need = Number(ml.WPHSL);
      const materialId = ml.SPID;
      let have = 0;
      this.methodData.some((md) => {
        if (Number(md.SPID) === Number(materialId)) {
          have += Number(md.ZSL);
        }
        if (have >= need) {
          return true;
        }
      })

      if (have < need) {
        lastNeed++;
        lastNumber += need - have;
      }
    })

    return { lastNeed, lastNumber };
  };

  getMethodDataIdArray = () => {
    const setData = new Set(this.methodData.map(md => md.KWID));
    return Array.from(setData);
  };

  openSelfSelectDialog = () => {
    this.setState({ selfSelectOpen: true });
  };

  closeSelfSelectDialog = () => {
    this.setState({ selfSelectOpen: false });
  };

  selfSelectDialogSubmitCallback = (addStorageId) => {
    if (this.selectMethodState.selfSelectStart === this.curMethodState) {
      this.props.getSelectAdvice(this.props.orderInfo.GUID, { KWID: addStorageId });
      this.setMethodState(this.selectMethodState.selfSelectWait);
      this.runMethodStateHandler();
    }
  };

  openPrematchingDialog = () => {
    this.setState({ preMatchingDialogOpen: true });
  };

  getPrematchedStorageId = () => {
    return this.prematchData.map(pd => pd.KWID)
  };

  preMatchingDialogCloseCallback = () => {
    this.setMethodState(this.selectMethodState.idle);
    this.runMethodStateHandler();
  };

  preMatchingDialogSubmitCallback = (preStorageList) => {
    if (this.selectMethodState.preMatchStart === this.curMethodState) {
      this.setMethodState(this.selectMethodState.preMatchHandle);
      this.runMethodStateHandler(preStorageList);
    }
  };

  getPrematchNeedMaterialList = () => {
    const newMaterialList = Object.assign([], this.props.materialList);
    this.props.materialList.map((ml, index) => {
        // const totalnum = ml.
      this.prematchData.some((pd) => {
        newMaterialList[index].WPHSL -= pd.ZSL;
        newMaterialList[index].WPHSL = newMaterialList[index].WPHSL >= 0 ? newMaterialList[index].WPHSL : 0;
      })
    })

    return newMaterialList;
  }

  render() {
    // this.startFlow();
    return (
      <div style={{ height: '100%' }}>
        <TemporaryDialog
          dialogOpen={this.state.temporaryDialogOpen}
          temporarySelectCallback={this.temporarySelectCallback}
          openSelectDialogCallback={this.openSelectDialogCallback}
          closeTemporaryCallback={this.closeTemporaryCallback}
        />
        <SelectMethodDialog
          dialogOpen={this.state.selectMethodDialogOpen}
          closeSelectCallback={this.closeSelectCallback}
          systemSuggestCallback={this.systemSuggestCallback}
          selfSelectCallback={this.selfSelectCallback}
          prematchingSuggestCallback={this.prematchingSuggestCallback}
        />
        <UnCompleteAlertDialog
          dialogOpen={this.state.unCompleteDialogOpen}
          goonMatchCallback={this.goonMatchCallback}
          gotoSelectCallback={this.gotoSelectCallback}
          closeUnCompleteCallback={this.closeUnCompleteCallback}
          lastMaterial={this.state.lastMaterial}
        />
        <SelfSelectDepotDialog
          dialogOpen={this.state.selfSelectOpen}
          orderId={this.props.orderInfo.GUID}
          storageId={this.getMethodDataIdArray()}
          selfSelectDialogSubmitCallback={this.selfSelectDialogSubmitCallback}
        />
        <PreMatchingDialog
          dialogOpen={this.state.preMatchingDialogOpen}
          orderId={this.props.orderInfo.GUID}
          matchedStorages={this.getPrematchedStorageId()}
          materialList={this.getPrematchNeedMaterialList()}
          preMatchingDialogCloseCallback={this.preMatchingDialogCloseCallback}
          preMatchingDialogSubmitCallback={this.preMatchingDialogSubmitCallback}
        />
        <ErrorSnackBar
          message={this.state.errorMessage} open={this.state.openError}
          onRequestClose={this.handleErrorClose}
        />
      </div>
    )
  }
}

