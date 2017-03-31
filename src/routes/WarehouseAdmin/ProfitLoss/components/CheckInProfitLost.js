/**
 * Created by liuyali on 2016/10/21.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CheckInTable from './CheckInTable'
import CheckRecordsSel from './CheckRecordsSel'

import AtSelect from 'components/AtSelect'
// 公共组件部分
import AtMessage from 'components/AtMessage'
import ChooseGoodsStoreDialog from 'components/ChooseGoodsStoreDialog';
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import moment from 'moment'
import './ProfitLoss.scss';
import CardUI from 'components/StandardUI/StandardCard';
import GoBackButton from 'components/GoBackButton'
import Dialog from 'components/StandardUI/StandardDialog';
/* 自定义组件*/
/* 下拉框组件*/

/*
* 选择商品后发送dispatch，修改商品列表中的内容
* */
export default class CheckInProfitLost extends Component {
  state = {
    ChooseGoodsStoreDialogOpen: false,
    PCJLID: null,
    PDCK: null,
    chooseGoodsFlag: false,
    KWMC: {},
    tableData: {},
    informPersons: [],
    informContent: '',
    message: '',
    openError: false,
    sureDialogOpen: false
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  static propTypes = {
    checkInProfitLoss: PropTypes.func.isRequired,
    clearStore: PropTypes.func.isRequired,
    getEndInventoryRecords: PropTypes.func.isRequired,
    checkInProfitLossData: PropTypes.object.isRequired,
    globalStore: PropTypes.object.isRequired,
  }
  handleCallBackChooseGoodsStore = (locationResultArray) => {
    /*
    * 发送action，修改state的值，重新渲染商品列表
    * */
    let newKW = { ...this.state.tableData };
    let newKWMC = {};
    locationResultArray.map((kw, index) => {
      newKWMC = { ...newKWMC, [kw.GUID]: kw.KWMC };
      if (kw.GUID in newKW) {
        /* 库位已经存在
         * */
        const ALLSP = newKW[kw.GUID].map((SP, index) => SP.SPPH);

        const newAddSP = kw.dataSource.filter((SP, index) => ALLSP.indexOf(SP.SPPH) === -1);
        newKW[kw.GUID] = newKW[kw.GUID].concat(newAddSP);
      } else {
        newKW = { ...newKW, [kw.GUID]: kw.dataSource };
      }
    });
    this.setState({
      tableData: newKW,
      KWMC: { ...this.state.KWMC, ...newKWMC }
    });
    // this.setState({tableData:locationResultArray});
  };
  handleTouchTapStoreDialogOpen = () => {
    this.setState({ ChooseGoodsStoreDialogOpen: !this.state.ChooseGoodsStoreDialogOpen });
  }

  nextInform = (user) => {
    this.setState({
      informPersons: user
    })
  }

  informContent = (value) => {
    this.setState({
      informContent: value
    });
  }

  dealSubData=(key, index) => (event) => {
    if (event.target.value >= 0) {
      this.state.tableData[key][index].XZSL = event.target.value;
      this.setState({
        tableData: this.state.tableData
      });
    }
  }
  setPCJLID = (value, pdck, PDCKMC) => {
    this.setState({
      PCJLID: value,
      chooseGoodsFlag: true,
      PDCK: pdck,
      PDCKMC,
      tableData: {}
    });
  }
  submitData = () => {
    if (!Object.keys(this.state.tableData).length > 0) {
      this.setState({
        message: '损溢详情不能为空！',
        openError: true
      });
      return;
    }
    if (!this.state.PCJLID) {
      this.setState({
        message: '请选择关联的仓库盘存！',
        openError: true
      });
      return;
    }
    this.setState({ sureDialogOpen: true })
  }
  closeDialog = () => {
    this.setState({ sureDialogOpen: false })
  }
  sureSubmitData = () => {
    this.setState({ sureDialogOpen: false })
    const subData = {
      data: this.state.tableData,
      message: this.state.informContent,
      person: this.state.informPersons,
      PDID: this.state.PCJLID
    }
    this.props.checkInProfitLoss(subData);
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  getTime = () => moment().format('YYYY-MM-DD')
  goback = () => this.context.router.push('/profitLoss')
  componentWillReceiveProps(nextProps) {
    if (nextProps.checkInProfitLossData.checkInStatus) {
      this.context.router.push('/profitLoss');
      this.props.clearStore();
    } else if (!nextProps.checkInProfitLossData.checkInStatus && nextProps.checkInProfitLossData.error) {
      this.setState({ message: nextProps.checkInProfitLossData.error.response.Message, openError: true })
    }
  }
  componentWillMount() {
    this.props.getEndInventoryRecords();
  }
  render() {
    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    const CardHeight = {
      height: '21.4rem'
    }
    const actions = [<GoBackButton />, <RaisedButton
      key='1'
      disabled={!this.state.chooseGoodsFlag}
      label='添加商品'
      backgroundColor='#00BE9C'
      labelStyle={{ color: '#FFFFFF', fontFamily: 'PingFangSC-Medium', fontSize: '14px', letterSpacing: '0.5px', lineHeight: '14px' }}
      buttonStyle={{ boxShadow: ' 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: '2px' }}
      onTouchTap={this.handleTouchTapStoreDialogOpen}
    />,
      <RaisedButton
        onTouchTap={this.submitData}
        key='2'
        label='确定'
        labelStyle={{ color: '#FFFFFF', fontFamily: 'PingFangSC-Medium', fontSize: '14px', letterSpacing: '0.5px', lineHeight: '14px' }}
        buttonStyle={{ background: '#00A0FF', boxShadow: ' 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)', borderRadius: '2px' }}
      />
    ];
    const sureActions = [<FlatButton
      key='3'
      label='取消'
      onTouchTap={this.closeDialog}
    />, <RaisedButton
      backgroundColor=''
      onTouchTap={this.sureSubmitData}
      key='4'
      label='确定'
    />
    ];
    const houseObj = this.state.PDCK && this.state.PDCKMC ? { isWareHouse: true, GUID: this.state.PDCK, name: this.state.PDCKMC } : {};
    return (
      <div style={{ height: '100%' }}>
        <StandardForm
          iconPosition='0px -30px'
          title='损溢登记'
        >
          <StandardFormCardList>
            <StandardFormCard title='' message='' stepName='' actions={actions} showContent showStep={false} expanded>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <CardUI expanded title='盘存信息' avatar='/logistIcon/icon-07.png' label='必填' CardStyle={CardHeight} topStyle={topStyle}>
                  <div style={{ width: '80%' }} className='CardOptionalContent'>
                    <CheckRecordsSel text='盘存记录' callback={this.setPCJLID} checkRecords={this.props.checkInProfitLossData.data} />
                    <div className='inforFlex'>
                      <span className='CardSelecttext' >登记日期：</span>
                      <span className='ContentColorTow'>{this.getTime()}</span>
                    </div>
                    <div className='inforFlex'>
                      <span className='CardSelecttext'>处理人：</span>
                      <span className='ContentColorTow'>{this.props.globalStore.YHXM}</span>
                    </div>
                    <ChooseGoodsStoreDialog
                      callback={this.handleCallBackChooseGoodsStore}
                      CurrentOrganizationId={Number(this.props.globalStore.organizationId)}
                      ParentWareHouseId={0} open={this.state.ChooseGoodsStoreDialogOpen}
                      handleDailog={this.handleTouchTapStoreDialogOpen}
                      beginWareHouseObj={houseObj}
                    />
                  </div>
                </CardUI>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <CardUI
                  title='@谁' message=''
                  CardTextStyle={{ width: '100%', textAlign: 'center', position: 'relative' }}
                  expanded avatar='/logistIcon/icon-07.png' label='必填'
                  CardStyle={CardHeight} topStyle={topStyle}
                >
                  <div style={{ marginTop: '-100px' }} className='whoName'>
                    <div className='choseSb'>
                      <div className='who' >选择@谁：</div>
                      <div style={{ position: 'relative' }}>
                        <AtSelect
                          organizationId={Number(this.props.globalStore.organizationId)}
                          callback={this.nextInform} underlineStyle={{ width: '99%' }} inputStyle={{ width: 'inherit' }}
                        />
                      </div>
                    </div>
                    <div className='choseSb'>
                      <div className='who' >填写备注：</div>
                      <div>
                        <AtMessage callback={this.informContent} hintText='' divStyle={{ width: '99%', overflow: 'hidden' }} />
                      </div>
                    </div>
                  </div>
                </CardUI>
              </div>
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <CheckInTable callback={this.dealSubData} KWMC={this.state.KWMC} tableData={this.state.tableData} />
              </div>
              <Dialog
                title='登记损溢'
                open={this.state.sureDialogOpen}
                onRequestClose={this.closeDialog}
                actions={sureActions}
              >
                <div style={{ paddingTop: '3rem' }}>
                  您确定登记该次损溢吗？
                </div>
              </Dialog>
            </StandardFormCard>
          </StandardFormCardList>
        </StandardForm>
        <ErrorSnackBar
          message={this.state.message} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
