/**
 * Created by sjf on 2016/11/1.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import AtSelect from 'components/AtSelect';
import Hospital from './Hospital';
import FlatButton from 'material-ui/FlatButton';
import Error from 'material-ui/svg-icons/action/report-problem';
import './SaleInfoDialog.scss'

/**
 * 企业管理：销售人员编辑和添加的弹窗
 * */
const createSaleDB = '添加销售代表';
const createSaleZL = '添加销售助理';
export default class SaleInfoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencyList: [],
      Index: this.props.Index,
      agencys: this.props.agencys,
      requredStatus: '',
      hospital: [],
      verify: this.props.verify,
      dataArray: [],
      saleId: this.props.saleId,
      identifier: true,
      newdata: ''
    };
  }
  static propTypes = {
    Index: PropTypes.string,
    organizationId: PropTypes.number,
    title: PropTypes.string,
    CreatList: PropTypes.func,
    handleSaleDialogToggle: PropTypes.func,
    saleId: PropTypes.number,
    verify: PropTypes.bool,
    open: PropTypes.bool,
    name: PropTypes.string,
    requredStatus: PropTypes.number,
    EditList: PropTypes.func,
    agencys: PropTypes.array,
  };

  static defaultProps = {
    agencys: []
  };
  componentWillMount = () => {

  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.agencyList.length) {
      this.setState({ agencyList: nextProps.agencyList });
    }
    this.setState({
      requredStatus: nextProps.requredStatus,
      hospital: nextProps.hospital,
      saleId: nextProps.saleId,
      verify: nextProps.verify,
      Index: nextProps.Index
    });
  };
  handleCallback = (returnValue) => {
    this.setState({ Index: returnValue[0].id });
  };
  callback = (val) => {
    const dataArray = [];
    this.state.agencyList.map((val) => {
      if (val.checked) {
        dataArray.push(val.ZZJGB.GUID);
      }
    });
    this.setState({ dataArray, identifier: false, newdata: val })
  };
  validator = (component) => {
    const verify = {
      Index: !!this.state.Index,
      dataArray: !!this.state.dataArray.length
    };
    return component === 'ALL' ? verify : verify[component];
  };
  handleOnClick = () => {
    this.setState({
      verify: true
    });
    if (this.props.title === createSaleDB || this.props.title === createSaleZL) {
      const validatorList = this.validator('ALL');
      let dealfn = true;
      for (const property in validatorList) {
        if (!validatorList[property]) (dealfn = false);
      }
      if (dealfn) {
        this.props.CreatList(this.state.dataArray, Number(this.state.Index), String(this.state.requredStatus));
        this.props.handleSaleDialogToggle();
        this.setState({
          dataArray: [],
          Index: '',
          requredStatus: '',
          identifier: true
        })
      }
    } else {
      this.props.EditList(this.state.dataArray, this.state.saleId, String(this.props.requredStatus));
      this.props.handleSaleDialogToggle();
    }
  };

  render() {
    const actionsEdit = [
      <FlatButton
        label='取消'
        style={{ color: '#979797', fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', letterSpacing: '0.57px' }}
        onTouchTap={this.props.handleSaleDialogToggle}
      />,
      <FlatButton
        label='保存'
        disabled={
          this.props.title === createSaleDB ||
          this.props.title === createSaleZL ? !this.validator('Index') && !this.validator('dataArray') : this.state.identifier}
        style={{
          fontFamily: 'SourceHanSansCN-Medium',
          fontSize: '16px',
          letterSpacing: '0.57px',
          color: (this.props.title === createSaleDB ||
          this.props.title === createSaleZL ? !this.validator('Index') && !this.validator('dataArray') : this.state.identifier) ?
          '#c4c4c4' : '#00A0FF' }}
        onTouchTap={this.handleOnClick}
      />,
    ];
    return (
      <Dialog
        title={this.props.title}
        actions={actionsEdit}
        modal={false}
        open={this.props.open}
      >
        <div className='saleDialog'>
          {
            (() => {
              const editSaleDB = '编辑销售代表信息';
              const editSaleZL = '编辑销售助理信息';
              const createSaleDBs = '添加销售代表';
              if (this.props.title === editSaleDB) {
                return (<div>
                    销售代表：
                    <div style={{ display: 'inline-block', lineHeight: '40px' }}>
                      {
                        this.props.name
                      }
                    </div>
                  <br />
                    关联医院：<Hospital
                      title={this.props.title} agencyList={this.state.agencyList}
                      hospital={this.state.hospital} callback={this.callback}
                    />
                </div>)
              } else if (this.props.title === editSaleZL) {
                return (<div>
                    销售助理：
                    <div style={{ display: 'inline-block', lineHeight: '40px' }}>
                      {
                        this.props.name
                      }
                    </div>
                  <br />
                    关联医院：<Hospital
                      title={this.props.title} agencyList={this.state.agencyList}
                      hospital={this.state.hospital} callback={this.callback}
                    />
                </div>)
              } else if (this.props.title === createSaleDBs) {
                return (<div>
                  <div style={{ height: 73 }}>
                      销售代表：
                      <div style={{ height: 48 }}>
                        <div style={{ display: 'inline-block', position: 'relative' }}>
                          <AtSelect
                            organizationId={Number(this.props.organizationId)} isSingle
                            callback={this.handleCallback} title='选择员工姓名'
                          />
                        </div>
                        <span>
                          <FlatButton
                            label='请选择员工姓名' labelPosition='before' icon={<Error />}
                            style={{
                              display: this.state.verify && !this.validator('Index') ? 'inline-block' : 'none',
                              color: 'red',
                              cursor: 'default'
                            }}
                          />
                        </span>
                      </div>

                  </div>
                  <div style={{ height: 36, lineHeight: '36px' }}>
                      关联医院： <span>
                        <FlatButton
                          label='请选择关联医院' labelPosition='before' icon={<Error />} style={{
                            display: this.state.verify && !this.validator('dataArray') ? 'inline-block' : 'none',
                            color: 'red',
                            cursor: 'default'
                          }}
                        />
                      </span>
                  </div>
                  <Hospital agencyList={this.state.agencyList} title={this.props.title} callback={this.callback} />
                </div>)
              }
              return (<div>
                    销售助理：
                    <div>
                      <div style={{ display: 'inline-block', position: 'relative' }}>
                        <AtSelect
                          organizationId={Number(this.props.organizationId)} isSingle
                          callback={this.handleCallback} title='选择员工姓名'
                        />
                        <span className='atSelectIcon' />
                      </div>
                      <span>
                        <FlatButton
                          label='请选择员工姓名' labelPosition='before' icon={<Error />}
                          style={{
                            display: this.state.verify && !this.validator('Index') ? 'inline-block' : 'none',
                            color: 'red',
                            cursor: 'default'
                          }}
                        />
                      </span>
                    </div>
                <br />
                    关联医院： <span>
                      <FlatButton
                        label='请选择关联医院' labelPosition='before' icon={<Error />} style={{
                          display: this.state.verify && !this.validator('dataArray') ? 'inline-block' : 'none',
                          color: 'red',
                          cursor: 'default'
                        }}
                      />
                    </span>
                <Hospital agencyList={this.state.agencyList} title={this.props.title} callback={this.callback} />
              </div>)
            })()
          }

        </div>
      </Dialog>
    )
  }
}
