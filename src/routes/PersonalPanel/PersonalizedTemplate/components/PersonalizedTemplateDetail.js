/**
 * Created by NXQ on 12/14/2016.
 */

import React, { Component, PropTypes } from 'react';

import './PersonalizedTemplateDetail.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import FilterTabs from 'components/FilterTabs';

import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import DataGrid from 'components/DataGrid';

import FlatButton from 'material-ui/FlatButton';

import _ from 'lodash';

import GoBackButton from 'components/GoBackButton';

/**
 * 使用场景：个性化模板关联商品详情
 */
export default class PersonalizedTemplateDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opennessDegreeType: 0,   // 0表示全部 1表示公开 2表示公司公开 3表示私人
      options: {
        columnOptions: [
          {
            label: '商品ID',
            attr: 'SPID',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 },
            render: row => (<div>
              <button className='typeBtn' style={{ backgroundColor: this.goodsTypeJudge(row.SPLX).backgroundColor }}>{this.goodsTypeJudge(row.SPLX).type}</button>
              {row.SPID}
            </div>)
          },
          {
            label: '商品名称',
            attr: 'SPMC',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '商品编号',
            attr: 'SPBH',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 },
            render: row => (
              <div> { row.SPBH ? row.SPBH : '--' } </div>
            ),
          },
          {
            label: '商品描述',
            attr: 'SPMS',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 },
            render: row => (
              <div> { row.SPMS ? row.SPMS : '--' } </div>
            ),
          },
          {
            label: '商品数量',
            attr: 'SL',
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '创建时间',
            attr: 'CJSJ',
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          }
        ],
        dataSource: [],
        tableHeaderAttrs: {
          displaySelectAll: false,
          adjustForCheckbox: false,
          enableSelectAll: false
        },
        indexStyle: {
          paddingLeft: 20,
          paddingRight: 15,
          width: '60px'
        },
        tableAttrs: {
          selectable: false,
          displaySelectAll: false
        },

        tableBodyAttrs: {
          displayRowCheckbox: false,
          stripedRows: false,
          showRowHover: true,
          deselectOnClickaway: false
        },
        showIndex: true
      },
      allTemplateData: [],
      publicTemplateData: [],
      companyPublicTemplateData: [],
      privateTemplateData: [],
    }
  }
  static propTypes = {

  }
  componentWillMount = () => {
    this.props.getPersonalizedSingleTemplateGoodsData(this.props.location.state.GUID);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.personalizedTemplateDetail.singleTemplateGoodsData.length) {
      this.state.options.dataSource = nextProps.personalizedTemplateDetail.singleTemplateGoodsData;
      this.setState({
        options: this.state.options
      })
    }
  }

  /**
   * 商品类型判断
   */
  goodsTypeJudge = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return {
          type: '商品',
          backgroundColor: '#00be9c'
        };
      case 1:
        return {
          type: '工具',
          backgroundColor: 'pink'
        };
      default:
        return {
          type: '异常',
          backgroundColor: 'red'
        };
    }
  };

  render() {
    const actions = (<nav className='personalized-template-detail-actions'>
      <span className='actions-message'>{`您当前正在查看<${this.props.location.state.SSMBMC}>模板商品关联详情`}</span>
      <GoBackButton />
    </nav>)

    return (
      <div className='personalized-template-detail'>
        <StandardDataGrid
          title='个性化模板商品详情查看'
          actions={actions}
          iconPosition={'-90px -120px'}
        >
          <DataGrid options={this.state.options} />
        </StandardDataGrid>

      </div>
    )
  }

}
