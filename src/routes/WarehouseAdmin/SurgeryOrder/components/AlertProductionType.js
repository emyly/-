/**
 * Created by wmt on 2017/02/27.
 */

import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import DataGrid from 'components/DataGrid'
import EditCell from 'components/EditCell'
import FlatButton from 'material-ui/FlatButton';
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import TextField from 'material-ui/TextField'
import _ from 'lodash'

export default class AlertProductionType extends Component {
  constructor(props) {
    super(props);
    this.$$dataSource = this.props.$$dataSource;
    this.$$noList = this.$$dataSource.toSeq().map($$o => $$o.get('no'));
    this.state = {
      dataSource: this.props.$$dataSource.toJS(),
      oldDataSource: this.props.$$dataSource.toJS(),
      searchText: '',
      isSearch: false,
      goodsKinds: 0,
      goodsTotal: 0
    }
  }

  static propTypes = {
    handleAlertProductionType: PropTypes.func,
    $$dataSource: ImmutablePropTypes.list.isRequired,
    open: PropTypes.bool,
    goodsKinds: PropTypes.number,
    goodsTotal: PropTypes.number,
    setChoosedAuthGoods: PropTypes.object,
    setChoosedAuthGood: PropTypes.func.isRequired
  }

  static defaultProps = {
    goodsKinds: 0,
    goodsTotal: 0
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleListener);
  }

  componentWillReceiveProps(nextProps) {
    this.$$dataSource = nextProps.$$dataSource;
    if (Immutable.is(this.props.$$dataSource, nextProps.$$dataSource)) {
      this.$$noList = this.$$dataSource.toSeq().map($$o => $$o.get('no'));
    }
    if (nextProps.setChoosedAuthGoods.choosedGoods !== this.props.setChoosedAuthGoods.choosedGoods ||
      Immutable.is(this.props.$$dataSource, nextProps.$$dataSource)) {
      this.$$dataSource.forEach(($$data, index) => {
        nextProps.setChoosedAuthGoods.choosedGoods.some((good) => {
          if ($$data.get('id') === good.id) {
            this.$$dataSource = this.$$dataSource.set(index, $$data.set('SL', good.SL));
            return true;
          }
        })
      })
      this.setState({
        dataSource: this.$$dataSource.toJS(),
        oldDataSource: this.$$dataSource.toJS(),
        goodsKinds: this.props.goodsKinds,
        goodsTotal: this.props.goodsTotal
      });
    }
    if (nextProps.open === false) {
      this.setState({
        isSearch: false,
        searchText: ''
      })
    }
  }

  handleDialogConfirm =() => {
    let $$choosedGoods = Immutable.fromJS(this.props.setChoosedAuthGoods.choosedGoods);
    this.$$dataSource.forEach(($$data) => {
      if (!$$choosedGoods.some(($$good, index) => {
        if ($$data.get('id') === $$good.get('id')) {
          $$choosedGoods = $$choosedGoods.set(index, $$good.set('SL', $$data.get('SL')))
          return true;
        }
      })) {
        if ($$data.get('SL')) {
          $$choosedGoods = $$choosedGoods.push($$data)
        }
      }
    })

    this.props.setChoosedAuthGood($$choosedGoods.toSeq().filter(o => o.get('SL') > 0).toJS());
    this.props.handleAlertProductionType();
  }

  handleNumberChange =(row, value) => {
    this.$$dataSource.some(($$production, index) => {
      if ($$production.get('id') === row.id) {
        this.$$dataSource = this.$$dataSource.set(index, $$production.set('SL', value));
        return true;
      }
    })
    if (Number(value)) {
      const $$choosedGoods = Immutable.fromJS(this.props.setChoosedAuthGoods.choosedGoods);
      const index = _.findIndex($$choosedGoods, item => item.id === row.id);
      if (index >= 0) {
        this.state.goodsTotal = (Number(this.state.goodsTotal) - Number($$choosedGoods[index].SL)) + Number(value);
      } else {
        let flag = true;
        let num = 0;
        this.state.oldDataSource.map((oldData) => {
          if (oldData.id === row.id && Number(oldData.SL)) {
            flag = false;
            num = Number(oldData.SL);
          }
        });
        if (flag) {
          ++this.state.goodsKinds;
        }
        this.state.goodsTotal = (this.state.goodsTotal - num) + Number(value);
      }
    } else {
      const $$choosedGoods = Immutable.fromJS(this.props.setChoosedAuthGoods.choosedGoods);
      const index = _.findIndex($$choosedGoods, item => item.id === row.id);
      if (index >= 0) {
        --this.state.goodsKinds;
        this.state.goodsTotal = Number(this.state.goodsTotal) - Number($$choosedGoods[index].SL);
      } else {
        let flag = true;
        let num = 0;
        this.state.oldDataSource.map((oldData) => {
          if (oldData.id === row.id && Number(oldData.SL)) {
            flag = false;
            num = Number(oldData.SL);
          }
        });
        if (!flag) {
          --this.state.goodsKinds;
          this.state.goodsTotal = this.state.goodsTotal - num;
        }
      }
    }

    this.state.oldDataSource.map((oldData) => {
      if (oldData.id === row.id) {
        oldData.SL = value
      }
    });
    this.state.dataSource.map((newData) => {
      if (newData.id === row.id) {
        newData.SL = value
      }
    });

    this.setState({
      oldDataSource: this.state.oldDataSource,
      dataSource: this.state.dataSource,
      goodsKinds: this.state.goodsKinds,
      goodsTotal: this.state.goodsTotal
    })
  }
  /**
   * 字符串模糊匹配
   */
  isSearchGoodsInfoLike = (value) => {
    return (String(value.no).indexOf(this.state.searchText) !== -1) ||
            (value.name.indexOf(this.state.searchText) !== -1) ||
            (value.desc.indexOf(this.state.searchText) !== -1);
  }
  /**
   * 搜索商品
   */
  handleSearchGoods = () => {
    const newDataSource = [];
    this.state.oldDataSource.map((value) => {
      if (this.isSearchGoodsInfoLike(value)) {
        newDataSource.push(value);
      }
    })
    this.setState({
      dataSource: newDataSource
    })
  }
  /**
   * 搜索框onChange
   */
  handleSearchInput = (event) => {
    this.state.searchText = event.target.value;
    if (this.state.searchText !== '') {
      this.handleSearchGoods();
    } else {
      this.setState({
        dataSource: this.state.oldDataSource
      })
    }
    this.setState({
      searchText: this.state.searchText
    })
  }
  /**
   * 搜索
   */
  handleIsSearch = () => {
    document.getElementById('textFieldAlertProductionType').focus();
    this.setState({
      isSearch: true
    })
  }
  /**
   * 搜索框失去焦点
   */
  handleSearchInputBlur = () => {
    if (this.state.searchText === '') {
      this.setState({
        dataSource: this.state.oldDataSource,
        isSearch: false
      })
    }
  }

  handleInputFocus = (event, no) => {
    event.target.select();
    window.addEventListener('keydown', this.handleListener);
    this.focusNo = no;
  }

  handleInputBlur = () => {
    window.removeEventListener('keydown', this.handleListener);
  }

  handleListener = (event) => {
    if (event.key === 'Enter') {
      const index = this.$$noList.indexOf(this.focusNo);
      if (index === (this.$$noList.size - 1) || index === -1) {
        return;
      }
      document.getElementById(this.$$noList.get(index + 1)).focus();
    }
  }

  render() {
    const options = {
      tableHeaderAttrs: {
        displaySelectAll: false,
        adjustForCheckbox: false
      },
      tableBodyAttrs: {
        displayRowCheckbox: false,
        stripedRows: true,
        showRowHover: true
      },

      tableAttrs: {
        selectable: false,
        fixedHeader: true,
        height: '444px'
      },
      bodyStyle: {
        overflow: 'auto',
      },
      showIndex: true,
      indexStyle: {
        fontFamily: 'SourceHanSansCN-Bold',
        fontSize: '15px',
        color: '#ffffff',
        background: '#788ba7'
      },
      indexListStyle: {
        fontSize: '12px',
        color: '#607189'
      },
      columnOptions: [{
        label: (() => {
          return (<div>
            <div
              style={{ display: 'flex',
                height: this.state.isSearch ? 'auto' : '0px',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer' }}
            >
              <img onClick={this.handleSearchGoods} src='/CreateOrder/FilterIcon.png' alt='' style={{ width: '25px', height: '25px' }} />
              <TextField
                inputStyle={{
                  height: '30px',
                  backgroundColor: '#647794',
                  borderRadius: '2px',
                  color: '#b5c6e0',
                  fontSize: '14px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                }}
                id='textFieldAlertProductionType'
                ref='textFieldAlertProductionType'
                underlineShow={false}
                hintText={''}
                style={{ width: '120px', height: '30px' }}
                onChange={this.handleSearchInput}
                onBlur={this.handleSearchInputBlur}
              />
            </div>
            <div style={{ display: this.state.isSearch ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
              <img src='/CreateOrder/FilterIcon.png' style={{ width: '30px', height: '30px' }} onClick={this.handleIsSearch} alt='' />
              <span onClick={this.handleIsSearch}>物料号</span>
            </div>
          </div>)
        })(),
        attr: 'no',
        tableHeaderColumnStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '15px',
          color: '#ffffff',
          background: '#788ba7'
        }
      }, {
        label: '名称',
        attr: 'name',
        tableHeaderColumnStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '15px',
          color: '#ffffff',
          background: '#788ba7'
        },
        style: {
          fontSize: '12px',
          color: '#607189'
        }
      }, {
        label: '规格',
        attr: 'desc',
        tableHeaderColumnStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '15px',
          color: '#ffffff',
          background: '#788ba7'
        },
        style: {
          fontSize: '12px',
          color: '#607189'
        }
      }, {
        label: '数量',
        attr: 'SL',
        render: (row, col) => {
          const num = Number(row.SL) || '';
          return <EditCell onBlur={(event) => { this.handleInputBlur() }}
            onFocus={(event) => { this.handleInputFocus(event, row.no) }}
            id={row.no}
            value={num}
            onChange={value => this.handleNumberChange(row, value)}
          />
        },
        style: {
          fontSize: '12px',
          color: '#607189'
        },
        tableHeaderColumnStyle: {
          fontFamily: 'SourceHanSansCN-Bold',
          fontSize: '15px',
          color: '#ffffff',
          background: '#788ba7'
        },
      }]
    }
    // const { organizationId } = this.props.globalStore;
    const actions = [
      <FlatButton
        label={`已加入购物车：${this.state.goodsKinds}种, ${this.state.goodsTotal}件`}
        style={{ float: 'left' }} primary
      />,
      <FlatButton label='确定' onTouchTap={this.handleDialogConfirm} />]

    return (
      <div>
        <Dialog
          title={<div>
            <span className='bigTitle'>预加载商品清单 &nbsp;&nbsp;</span>
            <span className='smallTitle'> 已按照所选产品类型加载出相关产品如下，请修改商品数量添加至购物车</span>
          </div>}
          actions={actions} modal open={this.props.open} onRequestClose={this.props.handleAlertProductionType}
          contentStyle={{ width: '90%', maxWidth: 'none', maxHeight: 'none' }}
        >
          <div style={{ height: '500px', overflow: 'auto' }}>
            <DataGrid
              options={options}
              dataSource={this.state.dataSource}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
