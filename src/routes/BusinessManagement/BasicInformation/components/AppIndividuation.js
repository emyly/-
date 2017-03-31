/**
 * Created by liuyali on 2017/3/27.
 */
import React, { Component, PropTypes } from 'react';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
/*
 应用程序个性化 模块
 */
export default class AppIndividuation extends Component {
  state = {
    message: '',
    openError: false
  }
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
  }
  /*
   * 添加添加图标触发选择图片
   * */
  uploadImg = (event) => {
    const btnARR = document.querySelector(`input[name=${event.target.id}]`);
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, true);
    btnARR.dispatchEvent(e);
  }
  /*
   * 修改APP模块中的图片处理
   * */
  handleFiles = () => (event) => {
    const file = event.target.files[0];
    const imgType = /\.(gif|jpg|jpeg|tiff|png)$/i;
    const name = event.target.name;
    const img = document.querySelector(`#${name}`);
    if (!imgType.test(file.name)) {
      this.setState({
        message: '请选择正确的图片格式！',
        openError: true
      })
      return;
    }

    const oFReader = new FileReader();
    oFReader.readAsDataURL(file);

    oFReader.onload = function (oFREvent) {
      img.src = oFREvent.target.result;
      document.querySelector(`#${name}_wrapper`).classList.add('ActiveBheaderWrapper')
    };
  }
  render() {
    return (
      <div id={`${this.props.id}_wrapper`} className='BheaderWrapper subDivWrapper'>
        <div className='AppIndividuationDiv'>
          <img src='CorporationInfo/guanli.png' alt='' />
          {
            this.props.text
          }
        </div>
        <div className='AppIndividuationImg'> <div style={{ width: '100%', height: '100%' }} className='BuploadDiv' >
          <input onChange={this.handleFiles()} multiple style={{ display: 'none' }} type='file' name={this.props.id} />
          <div className='wareAddicon' />
          <img onClick={this.uploadImg} id={this.props.id} src='' alt='' />
        </div>
        </div>
        <ErrorSnackBar
          message={this.state.message} open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

}
