/**
 * Created by liuyali on 2017/1/4.
 */
import './DetectionBills.scss'

import React, { Component, PropTypes } from 'react';

/* 公共组件*/
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import DataGrid from 'components/DataGrid'
import Dialog from 'components/StandardUI/StandardBusinessDialog';
import Visibility from 'material-ui/svg-icons/action/visibility'
import FlatButton from 'material-ui/FlatButton';
import Print from 'material-ui/svg-icons/action/print';
import RaisedButton from 'material-ui/RaisedButton';

class CheckGoodBillsDialog extends Component {

  static propTypes = {
    callback: PropTypes.func.isRequired,
    ddid: PropTypes.number.isRequired,
    spid: PropTypes.number.isRequired,
    sl: PropTypes.number.isRequired,
    size: PropTypes.object.isRequired,
  }
  state = {
    dialog: false,
    stages: []
  };
  componentWillMount() {
    this.props.callback(this.props.SHJXSID, this.props.ddid, 2, { SPID: this.props.spid, SL: this.props.sl })
  }
  getCanvas = (FP, index) => {
    /* 55.1rem是dialog宽度，内容padding 24px   canvas父亲有1px的边框*/
    const width = 55.1 * parseInt(window.getComputedStyle(document.documentElement).fontSize) - 48 - 2;
    // const height = width / 2;
    const imgSize = this.props.size[FP.FPFJID];
    let r = 0;

    if (Object.prototype.toString.call(imgSize) === '[object Object]') {
      r = width / imgSize.width;
    }
    return (<div key={index + 1} style={{ width }} className='canvasWrapper'>
      <img src={FP.src} alt='' style={{ width }} />
      <div
        style={{
          width: `${Math.abs(FP.X1 - FP.X2) * r}px`,
          height: `${Math.abs(FP.Y1 - FP.Y2) * r}px`,
          top: `${FP.Y1 * r}px`,
          left: `${FP.X1 * r}px`,
        }}
      />
    </div>)
  }

  checkBills = () => {
    this.setState({
      dialog: true
    });
  }
  dialogClose = () => {
    this.setState({
      dialog: false
    })
  }

  render() {
    const actions = [
      <FlatButton onTouchTap={this.dialogClose} label='确定' />,
    ];
    return (
      <div>
        <FlatButton label='查看发票' onTouchTap={this.checkBills} icon={<Visibility />} />
        <Dialog

          label='Modal Dialog'
          title='查看发票'
          actions={actions}
          open={this.state.dialog}
          onRequestClose={this.checkProfitAndLostDialogClose}
          titleClassName='dialogTitle'
        >
          <div className='canvasList' id='dialog_canvasList'>
            {
              this.props.FPdata.map((FP, index) => this.getCanvas(FP, index))
            }
          </div>
        </Dialog>
      </div>
    )
  }
}

export default class DetectionBills extends Component {
  static propTypes = {
    DetectionBillsData: PropTypes.object.isRequired,
    getOrderGoodsDetailAndBills: PropTypes.func.isRequired
  }
  state = {
    message: '',
    openError: false,
    imgSize: {},
    printStatus: false,
  }
  handleClose = () => {
    this.setState({
      openError: false
    })
  }
  componentWillMount() {
    const ddid = this.props.location.state.ddid;
    this.setState({
      ddid
    });
    if (!this.props.DetectionBillsData.status) { this.props.getOrderGoodsDetailAndBills(this.props.location.state.SHJXSID, ddid, 1); }
  }
  componentWillUnmount() {
    this.props.resetOrderGoodsDetailAndBills();
  }
  renderCanvas = (parent, FPdata, callback) => {
    const athis = this;
    const len = FPdata.length;
    const width = parent.offsetWidth;
    const flagArr = [];
    for (let i = 0; i < len; i++) {
      flagArr.push(false);
    }
    FPdata.map((FP, index) => {
      const promise = new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = FP.src;
        img.onload = function () {
          const imgWrapper = document.createElement('div');
          imgWrapper.classList.add('imgWrapper');
          // if (Object.prototype.toString.call(callback) !== '[object Function]') {
          //   /*
          //   * 非打印，固定高度，图片过高出现滚动条，打印时高度自动*/
          //   imgWrapper.style.overflow = 'scroll';
          //   imgWrapper.style.height = `${width / 2}px`;
          // }
          parent.appendChild(imgWrapper);
          const obj = {
            img, imgWrapper, index
          }
          resolve(obj);
        }
        img.onerror = function () {
          reject('图片加载失败！');
        }
      });

      promise.then((obj) => {
        const imgWrapper = obj.imgWrapper;
        const img = obj.img;
        const index = obj.index;
        let r = 1;

        athis.setState({
          imgSize: { ...athis.state.imgSize, [FP.FPFJID]: { width: img.width } }
        });

        const imgWrapperW = imgWrapper.clientWidth;
        r = imgWrapperW / img.width;
        img.width = imgWrapperW;
        imgWrapper.appendChild(img);

        const goodsArr = FP.WZXQ.map((coords, index) => ({
          x: coords.X1 * r,
          y: Math.abs(coords.Y1) * r,
          height: Math.abs(coords.Y1 - coords.Y2) * r,
          width: Math.abs(coords.X1 - coords.X2) * r
        }));
        for (let i = 0; i < goodsArr.length; i++) {
          const div = document.createElement('div');
          div.style.width = `${goodsArr[i].width}px`;
          div.style.height = `${goodsArr[i].height}px`;
          div.style.left = `${goodsArr[i].x}px`;
          div.style.top = `${goodsArr[i].y}px`;
          imgWrapper.appendChild(div);
        }
        flagArr[index] = true;

        const flag = flagArr.reduce((finF, flag) => flag && finF, true);

        if (Object.prototype.toString.call(callback) === '[object Function]' && flag) {
          callback()
        }
      }, (error) => {
        athis.setState({
          message: error,
          openError: true
        })
      })
    });
  }

  componentDidMount() {
    const athis = this;
    window.addEventListener('resize',function(e){
      let t;
      return function(){
        if(t) clearTimeout(t);
        t = setTimeout(function(){
          const parent = document.getElementById('canvasList');
          if (Object.prototype.toString.call(parent) === '[object HTMLDivElement]') {
            parent.innerHTML = '';
            athis.renderCanvas(parent, athis.props.DetectionBillsData.FPdata);
          }
        },500);
      }
    }());
  }
  componentWillReceiveProps(nextProps) {
    const wrapper = document.getElementById('canvasList');
    wrapper.innerHTML = '';
    /*
     * 防止多次插入图片
     * */
    const parent = document.createElement('div');
    parent.classList.add('imgWrapperList');
    wrapper.appendChild(parent);
    this.renderCanvas(parent, nextProps.DetectionBillsData.FPdata);
  }
  getGoodsTable = () => {
    this.props.DetectionBillsData.data.map((FP, index) => {
      FP.checkIn = <CheckGoodBillsDialog state={this.state.printState} key={index} size={this.state.imgSize} FPdata={this.props.DetectionBillsData.goodFPdata[FP.SPID] || []} callback={this.props.getOrderGoodsDetailAndBills} SHJXSID={this.props.location.state.SHJXSID} ddid={this.state.ddid} spid={FP.SPID} sl={FP.SL} />
    });
    return {
      columnOptions: [
        {
          label: '物料编号',
          attr: 'SPBH',
          style: { textAlign: 'center' }
        },
        {
          label: '品牌',
          attr: 'PPMC',
          render: row => (<div>
          {row.PPMC  ||  '-'}
        </div>),
          style: { textAlign: 'center' }
        },
        {
          label: '商品名称',
          attr: 'SPMC',
          style: { textAlign: 'center' }
        }, {
          label: '商品描述',
          attr: 'SPMS',
          style: { textAlign: 'center' }
        },
        {
          label: '数量',
          attr: 'SL',
          style: { textAlign: 'center' }
        },
        {
          label: '查看商品发票',
          attr: 'checkIn',
          style: { textAlign: 'center' },
        }
      ],
      dataSource: this.props.DetectionBillsData.data || [],
      tableHeaderAttrs: {
        displaySelectAll: false,
        adjustForCheckbox: false
      },
      tableBodyAttrs: {
        displayRowCheckbox: false,
        stripedRows: true,
        showRowHover: true
      },
      showIndex: false,
    };
  }
  getPrintGoodsTable = () => ({
    columnOptions: [
      {
        label: '物料编号',
        attr: 'SPBH',
        style: { textAlign: 'center' }
      },
      {
        label: '品牌',
        attr: 'PPMC',
        render: row => (<div>
          {row.PPMC  ||  '-'}
        </div>),
        style: { textAlign: 'center' }
      },
      {
        label: '商品名称',
        attr: 'SPMC',
        style: { textAlign: 'center' }
      }, {
        label: '商品描述',
        attr: 'SPMS',
        style: { textAlign: 'center' }
      },
      {
        label: '数量',
        attr: 'SL',
        style: { textAlign: 'center' }
      }
    ],
    dataSource: this.props.DetectionBillsData.data || [],
    tableHeaderAttrs: {
      displaySelectAll: false,
      adjustForCheckbox: false
    },
    tableBodyAttrs: {
      displayRowCheckbox: false,
      stripedRows: true,
      showRowHover: true
    },
    showIndex: false,
  })
  print = () => {
    const body = window.document.body.innerHTML;
    document.getElementById('noPrintTable').style.display = 'none';
    document.getElementById('printTable').style.display = 'block';
    const print = document.querySelector('#printContent');
    const content = print.innerHTML;
    window.document.body.innerHTML = content;
    window.document.body.style.width = '1000px';

    const parent = document.getElementById('canvasList');
    parent.innerHTML = '';
    const promise = new Promise((resolve, reject) => {
      this.renderCanvas(parent, this.props.DetectionBillsData.FPdata, resolve);
    });
    promise.then((value) => {
      window.print();
      window.document.body.style.width = '100%';
      window.document.body.innerHTML = body;
      location.reload();
    });
  }
  handleDetect = () => {
    document.querySelector('.canvasList').style.visibility = 'visible';
    document.querySelector('.canvasList').style.height = 'auto';
    this.setState({ printStatus: true })
  }
  render() {
    const actions = (<nav style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
      <FlatButton
        onTouchTap={this.print}
        label='打印'
        disabled={this.state.printStatus ? false : true}
        icon={<Print color={this.state.printStatus ? '#F5A959' : 'rgb(187, 187, 187)'} />}
        labelStyle={{ fontFamily: 'SourceHanSansCN-Medium',
          fontSize: 18,
          color: this.state.printStatus ? '#F5A959' : 'rgb(187, 187, 187)' }}

      />
      <RaisedButton
        label='验票'
        backgroundColor='#00A0FF'
        labelColor='white'
        labelStyle={{ fontFamily: 'PingFangSC-Medium',
          fontSize: '14px' }}
        onTouchTap={this.handleDetect}
      />
    </nav>);

    return (<StandardForm iconPosition='-30px -180px' title='验票'>
      <StandardFormCardList activeStep={0}>
        <StandardFormCard title='' message={`您当前正在处理订单号为<${this.props.location.state.ddid}>的订单`} actions={actions} completed showContent showStep={false} expanded>
          <div id='printContent' style={{ padding: '1rem' }}>
            <div id='noPrintTable'>
              <DataGrid options={this.getGoodsTable()} />
            </div>
            <div style={{ display: 'none' }} id='printTable'>
              <DataGrid options={this.getPrintGoodsTable()} />
            </div>
            <div className='canvasList' style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}>
              <div className='billTitle'>
                <img src='/fixedDateCreditIcon.png' alt='' />
                <span>
                  发票照片
                </span>
              </div>
              <div id='canvasList' />
            </div>
          </div>
          <ErrorSnackBar
            message={this.state.message} open={this.state.openError}
            onRequestClose={this.handleClose}
          />
        </StandardFormCard>
      </StandardFormCardList>
    </StandardForm>)
  }
}
