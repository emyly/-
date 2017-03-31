/**
 * Created by NXQ on 10/31/2016.
 */

import React, { Component, PropTypes } from 'react';

import './ContractAdd.scss';

import TextField from 'material-ui/TextField';

import ChineseDatePicker from 'components/ChineseDatePicker';

import RaisedButton from 'material-ui/RaisedButton';

import FlatButton from 'material-ui/FlatButton';

import StandardDataGrid from 'components/StandardDataGrid';
import CardUI from 'components/StandardUI/StandardCard';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Error from 'material-ui/svg-icons/action/report-problem';
import AtSelect from 'components/AtSelect'

export default class ContractAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitCreateObj: {
        authorized_organization_id: '',           // 被授权经销商id
        authorized_organization_name: '',         // 被授权经销商名称
        contract_type: '',                        // 合同类型
        contract_number: '',                      // 合同编号
        authorize_contact_id: '',                // 授权联系人id
        authorize_contact_name: '',              // 授权联系人姓名
        authorize_contact_phone: '',             // 授权联系人电话
        authorized_contact_id: '',               // 被授权联系人id
        authorized_contact_name: '',             // 被授权联系人姓名
        authorized_contact_phone: -1,            // 被授权联系人电话
        contract_signing_time: '',                // 合同签订时间
        start_time: '',                           // 有效期始
        stop_time: ''                             // 有效期止
      },
      createStartTimeError: false,
      createStartTimeErrorMessage: '',
      createStopTimeError: false,
      createStopTimeMessage: '',
      createContractSigningTimeError: false,
      createContractSigningTimeErrorMessage: ''
    }
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentWillReceiveProps = (nextProps) => {
    const currentCreateObj = {
      [this.state.submitCreateObj.contract_type]: {
        start_time: this.state.submitCreateObj.start_time,
        stop_time: this.state.submitCreateObj.stop_time,
        contract_id: '5832852ad65343fe08b11466'   // 等后台接口增加了返回合同id需修改此处
      }
    }
    if (nextProps.contractAdd.createStatus === '1') {
      this.context.router.push({ pathname: '/contractAndAuthorization/authorizationEdit', state: { ...this.props.location.state, ...currentCreateObj }
      });
    }
  };
  /**
   * 确认签约提交
   */
  handleTouchTapSubmitSign = () => {
    if ((Number(this.state.submitCreateObj.start_time) || 0) <= 0) {
      this.setState({
        createStartTimeError: true,
        createStartTimeErrorMessage: '请输入合同起始日期'
      });
      return;
    }
    if ((Number(this.state.submitCreateObj.stop_time) || 0) <= 0) {
      this.setState({
        createStopTimeError: true,
        createStopTimeMessage: '请输入合同截止日期'
      });
      return;
    }
    if ((Number(this.state.submitCreateObj.contract_signing_time) || 0) <= 0) {
      this.setState({
        createContractSigningTimeError: true,
        createContractSigningTimeErrorMessage: '请输入合同签订时间'
      });
      return;
    }

    this.state.submitCreateObj.contract_type = this.props.location.state.type ? '1' : '2';
    this.state.submitCreateObj.authorize_contact_id = Number(this.props.globalStore.userId);
    this.state.submitCreateObj.authorize_contact_name = this.props.globalStore.userName;
    this.state.submitCreateObj.authorize_contact_phone = Number(this.props.globalStore.userPhone);
    this.state.submitCreateObj.authorized_organization_id = Number(this.props.location.state.partnerId);
    this.state.submitCreateObj.authorized_organization_name = this.props.location.state.partnerName;

    this.props.postSingleNewContractData(this.state.submitCreateObj);
    this.setState({ submitCreateObj: this.state.submitCreateObj });
  };
  /**
   * 返回上一页
   */
  handleTouchTapCancelSign = () => {
    this.context.router.push('/contractAndAuthorization');
  };
  /**
   * 合同编号onChange
   **/
  handleContractNumberChange = () => (event) =>　{
    this.state.submitCreateObj.contract_number = Number(event.target.value);
    this.setState({ submitCreateObj: this.state.submitCreateObj });
  };
  /**
   * 乙方联系人Choice,关联出乙方联系人电话
   **/
  handleSecondPartyLinkManChoice = (choiceUser) => {
    if (choiceUser.length) {
      this.setState({
        submitCreateObj: {
          ...this.state.submitCreateObj,
          ...{
            authorized_contact_id: Number(choiceUser[0].id),
            authorized_contact_name: choiceUser[0].name,
            authorized_contact_phone: Number(choiceUser[0].SJHM || 0)
          }
        }
      });
    }
  };
  /**
   * DataPicker事件
   */
  handleDataPickerChange = type => (n, date) => {
    switch (type) {
      case 1:                 // 合同起始日期
        if ((this.state.submitCreateObj.stop_time || 0)) {
          if (Number(date) >= this.state.submitCreateObj.stop_time) {
            this.setState({
              createStartTimeError: true,
              createStartTimeErrorMessage: '起始日期小于截止日期'
            });
            this.state.submitCreateObj.start_time = 0;
          } else {
            this.state.submitCreateObj.start_time = Number(date);
          }
        } else {
          this.state.submitCreateObj.start_time = Number(date);
        }
        break;
      case 2:                 // 合同截止日期
        if (Number(date) > (this.state.submitCreateObj.start_time || 0)) {
          this.state.submitCreateObj.stop_time = Number(date);
        } else {
          this.setState({
            createStopTimeError: true,
            createStopTimeMessage: '截止日期大于起始日期'
          });
          this.state.submitCreateObj.stop_time = 0;
        }
        break;
      case 3:                 // 合同签订日期
        this.state.submitCreateObj.contract_signing_time = Number(date);
        break;
      default:
        break;
    }
    this.setState({
      submitCreateObj: this.state.submitCreateObj
    })
  };
  /**
   * DataPicker获取焦点
   */
  handleDataPickerFocus = () => () => {
    this.setState({
      createStartTimeError: false,
      createStartTimeErrorMessage: '',
      createStopTimeError: false,
      createStopTimeMessage: '',
      createContractSigningTimeError: false,
      createContractSigningTimeErrorMessage: ''
    });
  };
  render() {
    const topStyle = {
      backgroundColor: '#00A0FF'
    }
    console.log('this.props.globalStore.userName',this.props.globalStore)
    return (
      <div className='contract-add'>
        <StandardDataGrid
          iconPosition={'-90px -30px'}
          title='合同与授权管理'
          message={`您正在对:  ${this.props.location.state.partnerName}  新增合同  合同类型为：${this.props.location.state.type ? '备货' : '手术'}`}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 20 }}>
            <FlatButton
              label='取消'
              style={{ marginRight: 15, width: 60 }}
              icon={<NavigationArrowBack />}
              primary
              onTouchTap={this.handleTouchTapCancelSign}
            />
            <RaisedButton
              label='确认签约'
              style={{ marginRight: 15, width: 60 }}
              primary
              onTouchTap={this.handleTouchTapSubmitSign}
            />
          </div>
          <CardUI expanded title='合同基本信息' avatar='/logistIcon/icon-07.png' label='必填' CardStyle={{width:'53.4rem'}} CardTextStyle={{height:'auto',padding:0}} topStyle={topStyle}>
            <div style={{display: 'flex', flexDirection: 'column' }}>
              <div className="ContractWraper">
                <div className="ContractContent">
                  <div className="inforFlex">
                    <span className="atPeson">合同甲方：</span>
                    <span className="atPesonRight" style={{ overflow: 'hidden' }}>{this.props.globalStore.organizationName}</span>
                  </div>
                  <div className="inforFlex">
                    <span className="atPeson">合同编号： </span>
                    <TextField className="AtTextFieldStyle atPesonRight" style={{ overflow: 'hidden' }} type='number' hintText='请输入合同编号' onChange={this.handleContractNumberChange()} />
                  </div>
                  <div className="inforFlex">
                    <span className="atPeson">合同乙方：</span>
                    <span  className="atPesonRight" style={{ overflow: 'hidden' }}>{this.props.location.state.partnerName}</span>
                  </div>
                </div>
              </div>
              <div className="ContractWraper">
                <div className="ContractContent">
                  <div className="inforFlex">
                    <span className="atPeson">甲方联系人： </span>
                    <span className="atPesonRight" style={{ paddingRight: 60, overflow: 'hidden' }}>{this.props.globalStore.YHXM}</span>
                  </div>
                  <div className="inforFlex">
                    <span className="atPeson">甲方联系电话： </span>
                    <span className="atPesonRight" style={{ paddingRight: 60, overflow: 'hidden' }}>{this.props.globalStore.SJHM}</span>
                  </div>
                  <div className="inforFlex">
                    <span className="atPeson">乙方联系人： </span>
                    <AtSelect className="AtTextFieldStyle atPesonRight" organizationId={this.props.location.state.partnerId} isSingle callback={this.handleSecondPartyLinkManChoice} />
                    {/* <AtSelect title='请选择乙方联系人' organizationId={900000000207} isSingle={true} callback={this.handleSecondPartyLinkManChoice}/>*/}
                  </div>
                  <div className="inforFlex">
                    <span className="atPeson">乙方联系电话： </span>
                    {
                      (() => {
                        if (this.state.submitCreateObj.authorized_contact_phone === -1) {
                          return <span className="AtTextFieldStyle atPesonRight" style={{ color: '#bbb', borderBottom: '1px solid #ddd', paddingRight: 60, overflow: 'hidden' }}>选择乙方联系人关联出联系电话</span>
                        } else {
                          return <span className="AtTextFieldStyle atPesonRight" style={{ borderBottom: '1px solid #ddd', paddingRight: 60, overflow: 'hidden' }}>{this.state.submitCreateObj.authorized_contact_phone}</span>
                        }
                      })()
                    }
                  </div>
                </div>
              </div>
             <div className="ContractWraper" style={{borderBottom:'none'}}>
               <div className="ContractContent" style={{position:'relative'}}>
                 <div className="inforFlex">
                   <span className="atPeson">合同起始日期：</span>
                   <ChineseDatePicker className="AtTextFieldStyle atPesonRight" textFieldStyle={{width:'23.2rem'}} hintText='合同起始日期' onChange={this.handleDataPickerChange(1)} onFocus={this.handleDataPickerFocus()} />
                  <span className="warnContent" style={{ height: 40,top:10,right:'-8px',lineHeight: '40px', overflow: 'hidden', color: 'red', fontSize: 12, display: this.state.createStartTimeError ? 'block' : 'none' }}>
                    <FlatButton label={this.state.createStartTimeErrorMessage} labelPosition='before' icon={<Error />} labelStyle={{paddingLeft:0,paddingRight:0}} style={{color: 'red', cursor: 'default'}} hoverColor='#fff' />
                  </span>
                 </div>
                 <div className="inforFlex">
                   <span className="atPeson">合同截止日期： </span>
                   <ChineseDatePicker className="AtTextFieldStyle atPesonRight" textFieldStyle={{width:'23.2rem'}} hintText='合同截止日期' onChange={this.handleDataPickerChange(2)} onFocus={this.handleDataPickerFocus()} />
                    <span className="warnContent" style={{ top:'58px',right:'-8px',height: 40, lineHeight: '40px', overflow: 'hidden', color: 'red', fontSize: 12, display: this.state.createStopTimeError ? 'block' : 'none'}} >
                      <FlatButton label={this.state.createStopTimeMessage} labelPosition='before' icon={<Error />} labelStyle={{paddingLeft:0,paddingRight:0}} style={{color: 'red', cursor: 'default' }} hoverColor='#fff' />
                   </span>
                 </div>
                 <div className="inforFlex">
                   <span className="atPeson">合同签订日期： </span>
                   <ChineseDatePicker className="AtTextFieldStyle atPesonRight" textFieldStyle={{width:'23.2rem'}} hintText='合同截止日期' onChange={this.handleDataPickerChange(3)} onFocus={this.handleDataPickerFocus()} />
                     <span className="warnContent" style={{ top:'105px',right:'-8px',height: 40, lineHeight: '40px', overflow: 'hidden', color: 'red', fontSize: 12, display: this.state.createContractSigningTimeError ? 'block' : 'none'}} >
                      <FlatButton label={this.state.createContractSigningTimeErrorMessage} labelPosition='before' labelStyle={{paddingLeft:0,paddingRight:0}} icon={<Error />} style={{color: 'red', cursor: 'default' }} hoverColor='#fff' />
                   </span>
                 </div>
               </div>
             </div>
            </div>
          </CardUI>
        </StandardDataGrid>
      </div>
    )
  }

}
