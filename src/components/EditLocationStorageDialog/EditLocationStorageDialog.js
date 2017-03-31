/**
 * Created by chenming on 2016/12/1.
 */
import React, { Component, PropTypes } from 'react'
import Dialog from 'components/StandardUI/StandardDialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import './EditLocationStorageDialog.scss'
import WarningSnackBar from 'components/SnackBar/WarningSnackBar';
import Checkbox from 'material-ui/Checkbox';

export default class EditLocationStorageDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KWBObject: {},
      message: '',
      openError: false,
      isShowAddProductionDialog: false,
      isShowEditDialog: true
    }
  }
  static propTypes = {
    // 调用组件所需参数props
    open: PropTypes.bool.isRequired,
    isEditSubLocationStorage: PropTypes.bool.isRequired,
    closeCallBack: PropTypes.func.isRequired,
    // 传入库位表对象
    KWB: PropTypes.object.isRequired,
    KWID: PropTypes.number.isRequired,
    CurrentKWObj: PropTypes.object.isRequired,

    // 引入外部props
    putEidtLocationStorageData: PropTypes.func,
    postCreateNewLocationStorage: PropTypes.func,
    getLocationStorageDetailData: PropTypes.func,
    editLocationStorageDialog: PropTypes.object,
    createNewLocationStorageData: PropTypes.object,
    initCreateLocationStoragelData: PropTypes.func,
    initEditLocationStoragelData: PropTypes.func
  }
  static defaultProps = {
    isEditSubWarehouse: false
  }
  handleComfirm = () => {
    if (this.state.KWBObject.KWMC === '') {
      this.setState({ message: '请填写库位名称', openError: true });
    }
    if (this.props.isEditSubLocationStorage === true) {
      const params = {KWB: {
        YPTKW: this.state.KWBObject.YPTKW,
        KWMS: this.state.KWBObject.KWMS,
        KWMC: this.state.KWBObject.KWMC },
        KWID: this.state.KWBObject.GUID };
      this.props.putEidtLocationStorageData(params);
    } else {
      let params;
      // 判断是仓库下创建库位还是库位下创建库位
      if (this.props.KWB.isWareHouse) {
        params = { KWB: { KWMS: this.state.KWBObject.KWMS,
          YPTKW: this.state.KWBObject.YPTKW,
          KWMC: this.state.KWBObject.KWMC,
          FJKWID: this.props.KWB.FJKWID || 0,
          CKID: this.props.KWB.GUID } };
      } else {
        params = { KWB: {
          YPTKW: this.state.KWBObject.YPTKW,
          KWMS: this.state.KWBObject.KWMS,
          KWMC: this.state.KWBObject.KWMC,
          FJKWID: this.props.KWB.GUID } };
      }
      this.props.postCreateNewLocationStorage(params);
    }
  }
  handleCloseError = () => {
    this.setState({ openError: false });
  }

  /**
   * 输入框发生改变
   * */
  textFieldChanged = () => (event) => {
    const KWB = this.state.KWBObject;
    switch (event.target.id) {
      case 'KWMC':
        KWB.KWMC = event.target.value;
        break;
      case 'KWMS':
        KWB.KWMS = event.target.value;
        break;
      default:
        break;
    }
    this.setState({ KWBObject: KWB });
  }
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditSubLocationStorage === false && !_.has(nextProps.editLocationStorageDialog.createNewLocationStorageData, 'Result')) {
      const CKBObj = {
        KWMS: '',
        KWMC: '',
        YPTKW: '0'
      };
      this.setState({ KWBObject: CKBObj });
    } else {
      this.setState({ KWBObject: nextProps.CurrentKWObj, isShowEditDialog: true, isShowAddProductionDialog: false });
    }
    if (nextProps.open &&
      !_.isEmpty(nextProps.editLocationStorageDialog.createNewLocationStorageData) &&
      nextProps.editLocationStorageDialog.createNewLocationStorageData.Code === 0) {
      this.props.initCreateLocationStoragelData();
      if (this.state.KWBObject.YPTKW === '1') {
        this.setState({ isShowEditDialog: false, isShowAddProductionDialog: true });
      } else {
        this.handleClose();
      }
    }
    if (nextProps.open === true &&
      !_.isEmpty(nextProps.editLocationStorageDialog.editLocationStorageData) &&
      nextProps.editLocationStorageDialog.editLocationStorageData.Code === 0) {
      this.props.initEditLocationStoragelData()
      this.handleClose();
    }
    if (nextProps.editLocationStorageDialog.error !== 0 && nextProps.editLocationStorageDialog.error) {
      if (_.has(nextProps.editLocationStorageDialog.error, 'response')) {
        this.setState({ message: nextProps.editLocationStorageDialog.error.response.Message, openError: true });
        setTimeout(this.props.closeCallBack, 3000);
        nextProps.editLocationStorageDialog.error = null;
      }
    }
  }
  componentWillMount() {
    const params = { KWID: this.props.KWB.GUID }
    this.props.getLocationStorageDetailData(params);
  }
  checkBoxOnChange = () => {
    const { KWBObject } = this.state;
    KWBObject.YPTKW = KWBObject.YPTKW === '0' ? '1' : '0';
    this.setState({ KWBObject });
  }
  /**
   * 点击添加商品按钮
   * @memberOf EditLocationStorageDialog
  */
  handleAddProduction = () => {
    this.setState({ isShowAddProductionDialog: false });
    this.context.router.push({
      pathname: '',
    });
  }
  handleClose = () => {
    this.setState({ isShowAddProductionDialog: false, isShowEditDialog: true });
    this.props.closeCallBack();
  }
  /**
   * 显示是否添加商品
   * @memberOf EditLocationStorageDialog
  */
  showAddProductionDialog = () => {
    const actions = [
      <FlatButton
        label='取消'
        onTouchTap={this.handleClose}
      />, <FlatButton
        label='添加商品'
        primary
        onTouchTap={this.handleAddProduction}
      />];
    return (
      <Dialog
        open={this.state.isShowAddProductionDialog}
        actions={actions}
        title={'库位为空'}
      >
      当前库位没有商品，是否要去添加商品？
      </Dialog>
    );
  }
  render() {
    const actions = [
      <FlatButton
        label='取消'
        onTouchTap={this.handleClose}
      />, <FlatButton
        label='确认'
        primary
        onTouchTap={this.handleComfirm}
      />];
    if (this.props.open) {
      return (
        <div>
          <Dialog
            actions={actions}
            modal
            open={this.state.isShowEditDialog}
            title={
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ width: '24rem' }}>
                  {this.props.isEditSubLocationStorage ? '编辑库位' : '新建库位'}
                </span>
                <Checkbox
                  onCheck={this.checkBoxOnChange}
                  label={'预配套库位'}
                  labelStyle={{ fontSize: '18px', color: 'rgba(0,0,0,0.54)', fontFamily: 'PingFangSC-Regular' }}
                  style={{ width: '13rem' }}
                  checked={this.state.KWBObject.YPTKW === '1'}
                />
              </div>}
            titleStyle={{ fontSize: '20px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem' }}>
                <div style={{ width: '2.4rem', height: '2.5rem', background: 'url(/warehouseGeneralIcon/storageName.png) no-repeat' }} />
                <div style={{ width: '6.0rem', lineHeight: '2.1rem', height: '2.2rem', marginLeft: '1rem', fontSize: '18px' }}>库位名称</div>
                <div style={{ width: '11.5rem', marginTop: '-1rem', marginLeft: '1rem' }}>
                  <TextField
                    id={'KWMC'}
                    onChange={this.textFieldChanged()}
                    defaultValue={this.props.isEditSubLocationStorage ? this.props.CurrentKWObj.KWMC : ''}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3.2rem' }}>
                <div style={{ width: '1.9rem', height: '2.1rem', background: 'url(/warehouseGeneralIcon/storageDescription.png) no-repeat' }} />
                <div style={{ lineHeight: '2.1rem', height: '2.1rem', marginLeft: '1.5rem', fontSize: '18px' }}>描述</div>
                <div style={{ width: '1.5rem', marginLeft: '4rem', marginTop: '-1rem' }}>
                  <TextField
                    id={'KWMS'}
                    onChange={this.textFieldChanged()}
                    defaultValue={this.props.isEditSubLocationStorage ? this.props.CurrentKWObj.KWMS : ''}
                  />
                </div>
              </div>
            </div>
            <WarningSnackBar message={this.state.message} open={this.state.openError} onRequestClose={this.handleCloseError} />
          </Dialog>
          {this.showAddProductionDialog()}
        </div>
      );
    } else {
      return (<div />);
    }
  }
}
