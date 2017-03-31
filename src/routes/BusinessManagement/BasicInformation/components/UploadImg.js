/**
 * Created by liuyali on 2017/3/29.
 */
import React, { Component, PropTypes } from 'react';
import ErrorSnackBar from 'components/SnackBar/ErrorSnackBar';
// 上传照片
// 企业证照上传
export default class UploadImg extends Component {
  state = {
    openError: false
  }
  /*
   * 修改图片模块中的图片处理
   * */
  static defaultProps = {
    display: true,
    src: '',
  }
  static propTypes = {
    display: PropTypes.bool,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }
  handleFiles = () => (event) => {
    const file = event.target.files[0];
    const imgType = /\.(gif|jpg|jpeg|tiff|png)$/i;
    const img = document.querySelector(`#${event.target.name}`);
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
    };
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
  handleRequestClose = () => {
    this.setState({
      openError: false
    });
  };
  render() {
    return (
      <div style={{ display: this.props.display ? 'block' : 'none' }} className='BheaderImgWrapper subDivWrapper'>
        <div className='BuploadDiv' >
          <input onChange={this.handleFiles()} multiple style={{ display: 'none' }} type='file' name={this.props.id} />
          <div className='wareAddicon' />
          <p className='Badd'>添加</p>
          {/* 上传完成图标*/}
          <div className='imgComplete completeUp'>
            <img src='/done.png' alt='' />
            <p>完成</p>
          </div>
          {/* 上传失败图标*/}
          <div className='imgComplete errorUp'>
            <img src='/renovate.png' alt='' />
            <p>上传失败，重新上传</p>
          </div>
          <img onClick={this.uploadImg} id={this.props.id} src={this.props.src} alt='' />
        </div>
        <p className='BheaderInfo'>{this.props.text}</p>
        <ErrorSnackBar
          message={this.state.message}
          open={this.state.openError}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
