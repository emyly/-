/**
 * Created by liuyali on 2016/12/2.
 */


import './Location.scss'

import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * 场景：行政区划选择器
 * 参数：1.XZQHID 传入行政区划ID
 *      2.如没有行政区划ID 可传入detailAddress详细地址和location：{S:'XX',SS:'XX',QX:'XX'} 并用callback这个回调来接受
*/
export default class Location extends Component {

  state = {
    value: '',
    location: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      allLocationDara: [],
      cityDataArray: [],
      countyDataArray: [],
      selectedArray: [-1, 0, 0],
      cityArray: [],
      countyArray: []

    }
  }
  static defaultProps = {
    location: {
      QX: '',
      S: '',
      SS: ''
    }
  }
  static propTypes = {
    // 传入行政区划ID
    XZQHID: PropTypes.number,
    location: PropTypes.object,
    style1: PropTypes.object,
    style3: PropTypes.object,
    style2: PropTypes.object,
    detailAddress: PropTypes.string,
    locationData: PropTypes.object,
    getAllLocationData: PropTypes.func,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.XZQHID) {
      if (nextProps.detailAddress !== this.props.detailAddress) {
        this.getCityDataByCityName(nextProps);
      } else {
        nextProps.locationData.allLocationDara.map((father_value, father_index) => {
          father_value.SubSSArray.map((value, index) => {
            value.SubQXArray.map((sub_value, sub_index) => {
              if (nextProps.XZQHID === sub_value.GUID) {
                let selectedArray = this.state.selectedArray;
                selectedArray = [father_index, index, sub_index];
                this.setState({
                  allLocationDara: nextProps.locationData.allLocationDara,
                  selectedArray,
                  cityArray: nextProps.locationData.allLocationDara[father_index].SubSSArray,
                  countyArray: nextProps.locationData.allLocationDara[father_index].SubSSArray[index].SubQXArray
                });
              }
            })
          });
        });
      }
    } else if (nextProps.detailAddress !== this.props.detailAddress) {
      this.getCityDataByCityName(nextProps);
    } else {
      this.setState({ allLocationDara: nextProps.locationData.allLocationDara });
    }
  }
  componentWillMount() {
    const params = { XZQHID: this.props.XZQHID };
    this.props.getAllLocationData(params);
  }
  static defaultProps = {
    location: {
      QX: '',
      S: '',
      SS: ''
    }
  }
  /**
   * 根据城市名称获取获取行政区划ID
  */
  getCityDataByCityName = (nextProps) => {
    nextProps.locationData.allLocationDara.map((father_value, father_index) => {
      father_value.SubSSArray.map((value, index) => {
        value.SubQXArray.map((sub_value, sub_index) => {
          if (nextProps.location.QX === sub_value.QX && value.SSName === nextProps.location.SS) {
            this.props.callback({ QXname: sub_value.QX, QXID: sub_value.GUID });
            let selectedArray = this.state.selectedArray;
            selectedArray = [father_index, index, sub_index];
            this.setState({
              allLocationDara: nextProps.locationData.allLocationDara,
              selectedArray,
              cityArray: nextProps.locationData.allLocationDara[father_index].SubSSArray,
              countyArray: nextProps.locationData.allLocationDara[father_index].SubSSArray[index].SubQXArray
            });
          }
        })
      });
    });
  }
  getCity = (event, key, payload) => {
    let selectedArray = this.state.selectedArray;
    selectedArray = [key, 0, 0];
    this.setState({ selectedArray, cityArray: this.state.allLocationDara[key].SubSSArray, countyArray: this.state.allLocationDara[key].SubSSArray[0].SubQXArray });
    this.props.callback({ QXname: this.state.allLocationDara[key].SubSSArray[0].SubQXArray[0].QX, QXID: this.state.allLocationDara[key].SubSSArray[0].SubQXArray[0].GUID });
  }
  getArea = (event, key, payload) => {
    const selectedArray = this.state.selectedArray;
    selectedArray[1] = key;
    this.setState({ countyArray: this.state.cityArray[key].SubQXArray, selectedArray });
    this.props.callback({ QXname: this.state.allLocationDara[selectedArray[0]].SubSSArray[selectedArray[1]].SubQXArray[key].QX, QXID: this.state.allLocationDara[selectedArray[0]].SubSSArray[selectedArray[1]].SubQXArray[key].GUID });
  }
  setArea = (event, key, payload) => {
    const selectedArray = this.state.selectedArray;
    selectedArray[2] = key;
    this.setState({ selectedArray });
    this.props.callback({ QXname: this.state.allLocationDara[selectedArray[0]].SubSSArray[selectedArray[1]].SubQXArray[key].QX, QXID: this.state.allLocationDara[selectedArray[0]].SubSSArray[selectedArray[1]].SubQXArray[key].GUID });
  }
  handleClick = () => {

  }
  render() {
    const customWidth = { width: 150, position: 'absolute' };
    return (
      <div className={this.props.showError ? 'location showError' : 'location'} style={{ position: 'relative', height: 50, ...this.props.wrapperStyle }}>
        <SelectField
          {...this.props.otherStyles}
          floatingLabelText={this.props.label1 || ''}
          value={this.state.selectedArray[0]}
          onChange={this.getCity}
          style={{ ...customWidth, left: 30, ...this.props.style1 }}
        >
          {
              this.state.allLocationDara.map((SF, index) => <MenuItem key={index} value={index} primaryText={SF.SName} />)
            }
        </SelectField>
        <SelectField
          {...this.props.otherStyles}
          floatingLabelText={this.props.label2 || ''}
          value={this.state.selectedArray[1]}
          onChange={this.getArea}
          onClick={this.handleClick}
          style={{ ...customWidth, left: 200, ...this.props.style2 }}
        >
          {
          this.state.cityArray.map((SF, index) => <MenuItem key={index} value={index} primaryText={SF.SSName} />)
        }
        </SelectField>
        <SelectField
          {...this.props.otherStyles}
          floatingLabelText={this.props.label3 || ''}
          style={{ ...customWidth, left: 370, ...this.props.style3, }}
          value={this.state.selectedArray[2]}
          onChange={this.setArea}
          onClick={this.handleClick}
        >
          {
            this.state.countyArray.map((SF, index) => <MenuItem key={index} value={index} primaryText={SF.QX} />)
          }
        </SelectField>
      </div>
    );
  }
}
