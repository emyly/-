/**
 * Created by sjf on 2016/11/1.
 */
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import _ from 'lodash'
import './Hospital.scss'

export default class Hospital extends Component {
  constructor(props) {
    super(props);
    // 组织机构：获取与本企业相关联所有机构
    this.state = {
      value: [],
      dataArray: [],
      checked: true,
      newdata: Object.assign({}, this.props.hospital)
    };
  }

  static propTypes = {
    callback: React.PropTypes.func,
    hospital: PropTypes.array,
    agencyList: PropTypes.array,
    title: PropTypes.string
  };
  componentWillMount = () => {

  };
  handleCheckboxOnCheck = value => () => {
    _.remove(this.props.hospital, item => (value.GLJXSID === item.GLJXSID && value.ZZJGB.JGMC === item.GLJXSNAME));
    value.checked = !value.checked;
    this.props.callback(this.state.newdata);
  };
  render() {
    return (
      <List className='HospitalList'>
        {
          (
            () => {
              const editSaleDB = '编辑销售代表信息';
              const editSaleZL = '编辑销售助理信息';
              const createSaleDB = '添加销售代表';
              if (this.props.title === editSaleDB) {
                const dataArray = [];
                this.props.agencyList.map((value, index) => {
                  let flag = false;
                  this.props.hospital.map((data) => {
                    if (value.ZZJGB.JGMC === data.GLJXSNAME) {
                      flag = true;
                      value.checked = true;
                      dataArray.push(<ListItem
                        className='HospitalListItem'
                        primaryText={value.ZZJGB.JGMC}
                        leftIcon={<Checkbox defaultChecked={value.checked} onClick={this.handleCheckboxOnCheck(value)} />}
                        key={`BJXSDB${index}`}
                      />)
                    }
                  });
                  if (!flag) {
                    dataArray.push(<ListItem
                      className='HospitalListItem'
                      primaryText={value.ZZJGB.JGMC}
                      leftIcon={<Checkbox defaultChecked={value.checked} onClick={this.handleCheckboxOnCheck(value)} />}
                      key={`BJXSDB2${index}`}
                    />)
                  }
                });
                return dataArray;
              } else if (this.props.title === editSaleZL) {
                const dataArray = [];
                this.props.agencyList.map((value, index) => {
                  let flag = false;
                  this.props.hospital.map((data) => {
                    if (value.ZZJGB.JGMC === data.GLJXSNAME) {
                      flag = true;
                      value.checked = true;
                      dataArray.push(<ListItem
                        className='HospitalListItem'
                        primaryText={value.ZZJGB.JGMC}
                        leftIcon={<Checkbox
                          defaultChecked={value.checked}
                          onClick={this.handleCheckboxOnCheck(value)}
                        />}
                        key={`BJXSZL${index}`}
                      />)
                    }
                  });
                  if (!flag) {
                    dataArray.push(<ListItem
                      className='HospitalListItem'
                      primaryText={value.ZZJGB.JGMC}
                      leftIcon={<Checkbox defaultChecked={value.checked} onClick={this.handleCheckboxOnCheck(value)} />}
                      key={`BJXSZL2${index}`}
                    />)
                  }
                });
                return dataArray;
              } else if (this.props.title === createSaleDB) {
                return this.props.agencyList.map((value, index) => <ListItem
                  className='HospitalListItem'
                  primaryText={value.ZZJGB.JGMC}
                  leftIcon={<Checkbox onCheck={this.handleCheckboxOnCheck(value)} />}
                  key={`TJXSDB${index}`}
                />)
              }
              return this.props.agencyList.map((value, index) => <ListItem
                className='HospitalListItem'
                primaryText={value.ZZJGB.JGMC}
                leftIcon={<Checkbox onCheck={this.handleCheckboxOnCheck(value)} />}
                key={`TJXSZL${index}`}
              />)
            }
          )()
        }

      </List>
    )
  }
}
