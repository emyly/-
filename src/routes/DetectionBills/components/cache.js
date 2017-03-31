/**
 * Created by liuyali on 2017/1/13.
 */
import './DetectionBills.scss'

import React, { Component, PropTypes } from 'react';

/* 公共组件*/
import StandardForm from 'components/StandardForm';
import StandardFormCard from 'components/StandardForm/StandardFormCard'
import StandardFormCardList from 'components/StandardForm/StandardFormCardList'
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
import DataGrid from 'components/DataGrid'
import { Layer, Rect, Stage, Group, Image } from 'react-konva';

import Dialog from 'components/StandardUI/StandardBusinessDialog';
import Visibility from 'material-ui/svg-icons/action/visibility'
import FlatButton from 'material-ui/FlatButton';

class GetImg extends Component {
  state = {
    image: null
  }
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src;
    image.onload = () => {
      this.setState({
        image
      });
    }
  }
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        image={this.state.image}
      />
    );
  }
}

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
    this.props.callback(this.props.ddid, 2, { SPID: this.props.spid, SL: this.props.sl })
  }

  getCanvas = (FP, index) => {
    /* 55.1rem是dialog宽度，内容padding 24px   canvas父亲有1px的边框*/
    const width = 55.1 * parseInt(window.getComputedStyle(document.documentElement).fontSize) - 48 - 2;
    const height = width / 2;
    const reactW = Math.abs(FP.X1 - FP.X2);
    const reactH = Math.abs(FP.Y1 - FP.Y2);
    // console.log('imgSize===',this.props.imgSize);
    const imgSize = this.props.size[FP.FPFJID];

    let imgWidth = width;
    let imgHeight = height;
    let vectorX = 0;
    let vectorY = 0;
    let r = 1;

    if (Object.prototype.toString.call(imgSize) === '[object Object]') {
      // console.log('2 imgSize===',imgSize);
      const imgW = imgSize.width;
      const imgH = imgSize.height;
      if (width / height > imgW / imgH) {
        r = height / imgH;
        vectorX = (width - r * imgW) / 2;
        imgWidth = r * imgW;
      } else {
        r = width / imgW;
        vectorY = (height - r * imgH) / 2;
        imgHeight = r * imgH;
      }
    }
    // console.log('vectorX===',vectorX,' vectorY===',vectorY);
    return (<div key={index + 1} style={{ width, height: height + 1 }} className='canvasWrapper'>
      <Stage width={width} height={height}>
        <Layer>
          <GetImg
            x={vectorX}
            y={vectorY}
            width={imgWidth}
            height={imgHeight}
            src={FP.src}
          />
          <Rect
            x={FP.X1 * r + vectorX}
            y={Math.abs(FP.Y1 * r + vectorY)}
            ref='rect'
            width={reactW * r}
            height={reactH * r}
            stroke='red'
          />
        </Layer>
      </Stage>
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
    // console.log('this.props.imgSize===',this.props);
    // 查看损溢dialog按钮
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
    imgSize: {}
  }
  handleClose = () => {
    this.setState({
      openError: false
    })
  }
  componentWillMount() {
    const ddid = 900000000593;
    this.setState({
      ddid
    })
    this.props.getOrderGoodsDetailAndBills(ddid, 1);
  }

  renderCanvas = (parent, FPdata, callback) => {
    const athis = this;
    const len = FPdata.length;
    let width = parent.offsetWidth;
    const flagArr = [];
    /*
     * 先向页面加入所有的canvas，将滚动条显出，之后从新设置canvas高度，解决滚动条出现导致的canvas宽度不适应的问题
     * */
    for (let i = 0; i < len; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = width - 10;
      canvas.height = width / 2;
      parent.appendChild(canvas);
      flagArr.push(false);
    }
    width = parent.offsetWidth;
    FPdata.map((FP, index, cb) => {
      const canvases = document.querySelectorAll('canvas');
      const promise = new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = FP.src;
        img.onload = function () {
          const obj = {
            img, canvas: canvases[index], index
          }
          resolve(obj);
        }
        img.onerror = function () {
          reject('图片加载失败！');
        }
      });

      promise.then((obj) => {
        const canvas = obj.canvas;
        const img = obj.img;
        const index = obj.index;
        canvas.width = width - 12;
        canvas.height = width / 2;

        const ctx = canvas.getContext('2d');
        let vectorX = 0;
        let vectorY = 0;
        let r = 1;

        athis.setState({
          imgSize: { ...athis.state.imgSize, [FP.FPFJID]: { width: img.width, height: img.height } }
        });

        if (canvas.width / canvas.height > img.width / img.height) {
          r = canvas.height / img.height;
          vectorX = (canvas.width - r * img.width) / 2;
          ctx.drawImage(img, 0, 0, img.width, img.height, vectorX, 0, r * img.width, canvas.height);
        } else {
          r = canvas.width / img.width;
          vectorY = (canvas.height - r * img.height) / 2;
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, vectorY, canvas.width, r * img.height);
        }
        const goodsArr = FP.WZXQ.map((coords, index) => ({
          x: coords.X1 * r,
          y: Math.abs(coords.Y1) * r,
          height: Math.abs(coords.Y1 - coords.Y2) * r,
          width: Math.abs(coords.X1 - coords.X2) * r
        }));

        for (let i = 0; i < goodsArr.length; i++) {
          ctx.strokeStyle = 'red';
          ctx.lineWidth = '3px';
          ctx.strokeRect(goodsArr[i].x + vectorX, goodsArr[i].y + vectorY, goodsArr[i].width, goodsArr[i].height);
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
    window.onresize = function () {
      const parent = document.getElementById('canvasList');
      if (Object.prototype.toString.call(parent) === '[object HTMLDivElement]') {
        parent.innerHTML = '';
        athis.renderCanvas(parent, athis.props.DetectionBillsData.FPdata);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.DetectionBillsData.status !== this.props.DetectionBillsData.status) {
      const parent = document.getElementById('canvasList');
      parent.innerHTML = '';
      this.renderCanvas(parent, nextProps.DetectionBillsData.FPdata);
    }
  }
  getGoodsTable = () => {
    this.props.DetectionBillsData.data.map((FP, index) => {
      FP.checkIn = <CheckGoodBillsDialog key={index} size={this.state.imgSize} FPdata={this.props.DetectionBillsData.goodFPdata[FP.SPID] || []} callback={this.props.getOrderGoodsDetailAndBills} ddid={this.state.ddid} spid={FP.SPID} sl={FP.SL} />
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
      showIndex: true,
    };
  }

  print = () => {
    const body = window.document.body.innerHTML;
    const parent = window.document.body;
    window.document.body.innerHTML = '';
    /*
     * 全屏下打印，布局不正确？
     * */
    parent.style.width = '1280px';

    const promise = new Promise((resolve, reject) => {
      this.renderCanvas(parent, this.props.DetectionBillsData.FPdata, resolve);
    });
    promise.then((value) => {
      window.print();
      parent.style.width = 'auto';
      window.document.body.innerHTML = body;
      location.reload();
    });
  }
  render() {
    return (<StandardForm iconPosition='-60px -60px' title='验票'>
      <StandardFormCardList activeStep={0}>
        <StandardFormCard message={'您当前正在处理订单号为<900000000302>的订单'} title='手术' stepName='待回收信息查看' completed showContent showStep={false} expanded>
          <div style={{ padding: '1rem' }}>
            <DataGrid options={this.getGoodsTable()} />
            <div className='canvasList'>
              <div className='billWrapper'>
                <p className='billTitle'>
                  <img style={{ cursor: 'pointer' }} onTouchTap={this.print} src='/print.png' alt='' />
                </p>
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
