/**
 * Created by NXQ on 12/14/2016.
 */

import React, { Component, PropTypes } from 'react';

import './PersonalizedTemplate.scss';

import StandardDataGrid from 'components/StandardDataGrid';

import FilterTabs from 'components/FilterTabs';

import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import DataGrid from 'components/DataGrid';

import FlatButton from 'material-ui/FlatButton';

import _ from 'lodash';

import ReactDOM from 'react-dom'


/**
 * 使用场景：个性化模板
 */
export default class PersonalizedTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opennessDegreeType: 0,   // 0表示全部 1表示公开 2表示公司公开 3表示私人
      options: {
        columnOptions: [
          {
            label: '模板ID',
            attr: 'GUID',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 },
            render: row => (<div>
              <button className='typeBtn' style={{ backgroundColor: this.orderTypeJudge(row.DDLX).backgroundColor }}>{this.orderTypeJudge(row.DDLX).type}</button>
              <button className='typeBtn' style={{ backgroundColor: this.templateTypeJudge(row.GKCD).backgroundColor }}>{this.templateTypeJudge(row.GKCD).type}</button>
              {row.GUID}
            </div>)
          },
          {
            label: '模板名称',
            attr: 'SSMBMC',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '所属业务线ID',
            attr: 'SSYWXID',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '所属类型ID',
            attr: 'SSSSLXID',
            style: { textAlign: 'left', overflow: 'hidden', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '所属经销商ID',
            attr: 'SSJXSID',
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 },
            render: row => (
              <div> { row.SSJXSID ? row.SSJXSID : '-' } </div>
            ),
          },
          {
            label: '总金额',
            attr: 'ZJE',
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '创建时间',
            attr: 'CJSJ',
            style: { overflow: 'hidden', textAlign: 'left', paddingLeft: 10, paddingRight: 10 }
          },
          {
            label: '操作',
            render: row => (
              row.GKCD === '2' ?
                <FlatButton
                  label='删除'
                  secondary
                  icon={<ActionDeleteForever />}
                  onTouchTap={this.handleDeleteTemplate(row)}
                /> : <div>-</div>
            ),
            style: { overflow: 'hidden', textAlign: 'center', paddingLeft: 10, paddingRight: 10 }
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
          onCellClick: (rowId) => {
            let row = {};
            switch (Number(this.state.opennessDegreeType)) {      // 0表示全部 1表示公开 2表示公司公开 3表示私人
              case 0:
                row = this.state.allTemplateData[rowId];
                break;
              case 1:
                row = this.state.publicTemplateData[rowId];
                break;
              case 2:
                row = this.state.companyPublicTemplateData[rowId];
                break;
              case 3:
                row = this.state.privateTemplateData[rowId];
                break;
              default:
                break;
            }
            this.context.router.push({
              pathname: `/personalizedTemplate/${row.GUID}`,
              state: { ...row }
            });
          }
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
  static contextTypes = {
    router: React.PropTypes.object
  };
  componentWillMount = () => {
    this.props.getPersonalizedTemplateData({
      SSJXSID: this.props.globalStore.organizationId,
      CJR: this.props.globalStore.GUID
    });
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.personalizedTemplate.allTemplateData.length ||
        nextProps.personalizedTemplate.publicTemplateData.length ||
        nextProps.personalizedTemplate.companyPublicTemplateData.length ||
        nextProps.personalizedTemplate.privateTemplateData.length) {
      const allTemplateData = nextProps.personalizedTemplate.allTemplateData;
      const privateTemplateData = nextProps.personalizedTemplate.privateTemplateData;

      if (_.has(nextProps.personalizedTemplate.deleteObject, 'GUID')) {
        _.remove(allTemplateData, nextProps.personalizedTemplate.deleteObject);
        _.remove(privateTemplateData, nextProps.personalizedTemplate.deleteObject);
      }

      this.state.options.dataSource = allTemplateData;
      this.setState({
        options: this.state.options,
        allTemplateData,
        publicTemplateData: nextProps.personalizedTemplate.publicTemplateData,
        companyPublicTemplateData: nextProps.personalizedTemplate.companyPublicTemplateData,
        privateTemplateData,
      })
    }
  }

  componentDidMount = () => {
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {   // 终止事件透传
      if (event.target.textContent === '删除') {                         // 删除按钮
        event.preventDefault();
        event.stopPropagation();
      }
    }, false);
  }

  /**
   * 公开程度切换
   */
  handleOpennessDegree = (value) => {
    switch (Number(value)) {      // 0表示全部 1表示公开 2表示公司公开 3表示私人
      case 0:
        this.state.options.dataSource = this.state.allTemplateData;
        break;
      case 1:
        this.state.options.dataSource = this.state.publicTemplateData;
        break;
      case 2:
        this.state.options.dataSource = this.state.companyPublicTemplateData;
        break;
      case 3:
        this.state.options.dataSource = this.state.privateTemplateData;
        break;
      default:
        this.state.options.dataSource = this.state.allTemplateData;
        break;
    }
    this.setState({
      options: this.state.options,
      opennessDegreeType: Number(value)
    });
  };

  /**
   * 模板公开程度判断
   */
  templateTypeJudge = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return {
          type: '公开',
          backgroundColor: 'pink'
        };
      case 1:
        return {
          type: '公司',
          backgroundColor: '#00be9c'
        };
      case 2:
        return {
          type: '私人',
          backgroundColor: '#00669c'
        };
      default:
        return {
          type: '无',
          backgroundColor: '#red'
        };
    }
  };
  /**
   * 订单类型判断
   */
  orderTypeJudge = (type) => {
    const num = Number(type);
    switch (num) {
      case 0:
        return {
          type: '铺货',
          backgroundColor: 'pink'
        };
      case 1:
        return {
          type: '备货',
          backgroundColor: '#00be9c'
        };
      case 2:
        return {
          type: '手术',
          backgroundColor: '#ff625b'
        };
      case 3:
        return {
          type: '借货',
          backgroundColor: '#58909c'
        };
      case 4:
        return {
          type: '调货',
          backgroundColor: '#58909c'
        };
      case 5:
        return {
          type: '铺货补货',
          backgroundColor: '#58909c'
        };
      case 6:
        return {
          type: '铺货销售',
          backgroundColor: '#58909c'
        };
      case 7:
        return {
          type: '调拨',
          backgroundColor: '#58909c'
        };
      default:
        return {
          type: '无',
          backgroundColor: '#58909c'
        };
    }
  };

  /**
   * 删除模板
   */
  handleDeleteTemplate = row => () => {
    this.props.deletePersonalizedSingleTemplateData(row);
  }
  render() {
    const filter = <FilterTabs tabs={['全部', '公开', '公司', '私有']} callback={this.handleOpennessDegree} />;

    return (
      <StandardDataGrid
        title='个性化模板'
        iconPosition={'-90px -120px'}
        filter={filter}
      >
        <DataGrid options={this.state.options} />
      </StandardDataGrid>
    )
  }

}
