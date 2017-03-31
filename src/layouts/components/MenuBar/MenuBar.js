
import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import './MenuBar.scss';
import AppBar from 'material-ui/AppBar';
import PersonalBasicInformationDialog from 'components/PersonalBasicInformationDialog'
import _ from 'lodash';

export default class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userMenuTree: [],
      menus: [
        {
          url: '/',
          name: '首页',
          position: '-180px -90px',
          isNormalIconShow: true,
          selfId: 99999,                              // 此GUID是虚构出来的,后期以后台真实数据为主
          parentModuleId: 0,
          currentModuleId: 99999,                     // 此模块ID是虚构出来的,后期以后台真实数据为主
          open: false,
        }, {
          url: '/orderlistForDetection',
          name: '验票',
          position: '-30px -180px',
          isNormalIconShow: true,
          selfId: 100000,                              // 此GUID是虚构出来的,后期以后台真实数据为主
          parentModuleId: 0,
          currentModuleId: 100000,                     // 此模块ID是虚构出来的,后期以后台真实数据为主
          open: false,
        },
        {
          name: '订单管理',
          position: '-180px 0',
          selfId: 10002,
          open: false,
          parentModuleId: 0,
          currentModuleId: 10002,
          isNormalIconShow: true,
          subItems: [
            { url: '/surgeryOrder', position: '-120px -120px', selfId: 10006, open: false, parentModuleId: 10002, currentModuleId: 10002, name: '手术订单下单', isNormalIconShow: true, },
            { url: '/stockOrder', position: '-210px 0', selfId: 10007, open: false, parentModuleId: 10002, currentModuleId: 10002, name: '备货订单下单', isNormalIconShow: true, },
            { url: '/orderCheckList', position: '-30px 0', name: '订单审核', isNormalIconShow: true, open: false, selfId: 10010, parentModuleId: 10002, currentModuleId: 10002 },
            { url: '/procurementReview', position: '-150px -120px', selfId: 10008, open: false, parentModuleId: 10002, currentModuleId: 10002, name: '采购复核', isNormalIconShow: true, },
          ]
        },
        {
          name: '仓库管理',
          position: '0 0',
          normalIcon: '/normalIcon/00-01.png',
          checkedIcon: '/checkedIcon/000-01.png',
          isNormalIconShow: true,
          selfId: 10004,
          parentModuleId: 0,
          currentModuleId: 10004,
          open: false,
          subItems: [
            { url: '/orderTrack', position: '-210px -90px', name: '订单跟踪', isNormalIconShow: true, open: false, selfId: 88889, parentModuleId: 10004, currentModuleId: 10004 },  // 此selfId虚构
            {
              name: '拣货/配货',
              position: '-60px 0',
              normalIcon: '/normalIcon/00-03.png',
              checkedIcon: '/checkedIcon/000-03.png',
              isNormalIconShow: true,
              selfId: 10011,
              parentModuleId: 10004,
              currentModuleId: 10004,
              open: false,
              subItems: [
                { url: '/stockOut', position: '-30px -60px', name: '备货出库', isNormalIconShow: true, open: false, selfId: 10012, parentModuleId: 10011, currentModuleId: 10004 },
                { url: '/outWarehouseCheck', position: '-120px 0', name: '出库复核', isNormalIconShow: true, open: false, selfId: 10014, parentModuleId: 10011, currentModuleId: 10004 }, // 由外移入,后台数据库需要更改
                { url: '/distributionOperation', position: '-30px -90px', name: '手术配货', isNormalIconShow: true, open: false, selfId: 10013, parentModuleId: 10011, currentModuleId: 10004 }]
            },
            {
              name: '入库/回收',
              position: '-90px 0',
              normalIcon: '/normalIcon/00-04.png',
              checkedIcon: '/checkedIcon/000-04.png',
              isNormalIconShow: true,
              selfId: 10016,          // 为收货/回收GUID？
              parentModuleId: 10004,
              currentModuleId: 10004,
              open: false,
              subItems: [
                { url: '/receivingWarehousing', position: '-90px -60px', name: '收货入库', isNormalIconShow: true, open: false, selfId: 10017, parentModuleId: 10016, currentModuleId: 10004 },  // 备货入库？
                { url: '/surgeryRecovery', position: '-60px -60px', name: '手术回收', isNormalIconShow: true, open: false, selfId: 10018, parentModuleId: 10016, currentModuleId: 10004 },
                { url: '/surgeryRecoveryRecheck', position: '0 -90px', name: '手术回收复核', isNormalIconShow: true, open: false, selfId: 10051, parentModuleId: 10016, currentModuleId: 10004 }  // 由外移入,后台数据库需要更改
              ]
            },
            { url: '/logisticsDelivery', position: '-150px 0', name: '物流发货', isNormalIconShow: true, open: false, selfId: 10015, parentModuleId: 10004, currentModuleId: 10004 },
            { url: '/warehouseInventory', position: '0 -60px', name: '仓库盘存', isNormalIconShow: true, open: false, selfId: 10019, parentModuleId: 10004, currentModuleId: 10004 },
            { url: '/profitLoss', position: '0 -30px', name: '库存损溢', isNormalIconShow: true, open: false, selfId: 10020, parentModuleId: 10004, currentModuleId: 10004 },
            {
              name: '货物调拨',
              position: '-30px -30px',
              normalIcon: '/normalIcon/00-08.png',
              checkedIcon: '/checkedIcon/000-08.png',
              isNormalIconShow: true,
              selfId: 10021,
              parentModuleId: 10004,
              currentModuleId: 10004,
              open: false,
              subItems: [{
                url: '/dispatchApply', position: '-180px -30px', name: '调拨申请', isNormalIconShow: true, open: false, selfId: 10022, parentModuleId: 10021, currentModuleId: 10004
              }, {
                url: '/dispatchManage', position: '-60px -30px', name: '调拨管理', isNormalIconShow: true, open: false, selfId: 10023, parentModuleId: 10021, currentModuleId: 10004
              }]
            },
            { url: '/individualizationBill', position: '-210px -30px', name: '个性化单据管理', isNormalIconShow: true, open: false, selfId: 10024, parentModuleId: 10004, currentModuleId: 10004 },
            { url: '/warehouseGeneral', position: '0 -120px', name: '仓库概况', isNormalIconShow: true, open: false, selfId: 99998, parentModuleId: 10004, currentModuleId: 10004 },   // 此selfId虚构,后期以实际数据为准
            { url: '/inventorySee', position: '-30px -120px', name: '库存查看', isNormalIconShow: true, open: false, selfId: 10028, parentModuleId: 10004, currentModuleId: 10004 },
          ]
        },
        {
          name: '合作伙伴管理',
          position: '-150px -30px',
          isNormalIconShow: true,
          selfId: 10005,
          parentModuleId: 0,
          currentModuleId: 10005,
          open: false,
          subItems: [
            {
              name: '合作伙伴管理',
              position: '-150px -30px',
              isNormalIconShow: true,
              selfId: 10039,
              parentModuleId: 10005,
              currentModuleId: 10005,
              open: false,
              subItems: [
                { url: '/contractAndAuthorization', position: '-90px -30px', name: '合同与授权管理', isNormalIconShow: true, open: false, selfId: 10041, parentModuleId: 10039, currentModuleId: 10005 },
                { url: '/firstBusinessRegistrationList', position: '-120px -30px', name: '首次经营登记', isNormalIconShow: true, open: false, selfId: 10040, parentModuleId: 10039, currentModuleId: 10005 }
              ]
            },
            {
              name: '信用管理',
              position: '-210px -60px',
              normalIcon: '/normalIcon/00-22.png',
              checkedIcon: '/checkedIcon/000-22.png',
              isNormalIconShow: true,
              selfId: 10042,
              parentModuleId: 10005,
              currentModuleId: 10005,
              open: false,
              subItems: [
                { url: '/homecredit', position: '-180px -60px', name: '我授予的信用', isNormalIconShow: true, open: false, selfId: 10043, parentModuleId: 10042, currentModuleId: 10005 },
                { url: '/gainTempCredit', position: '-150px -60px', name: '我获得的信用', isNormalIconShow: true, open: false, selfId: 10044, parentModuleId: 10042, currentModuleId: 10005 }
              ]
            }
          ]
        },
        {
          name: '企业管理',
          position: '-120px -60px',
          isNormalIconShow: true,
          selfId: 10001,
          parentModuleId: 0,
          currentModuleId: 10001,
          open: false,
          subItems: [
            { url: '/role', position: '-90px -90px', name: '角色权限管理', isNormalIconShow: true, open: false, selfId: 10046, parentModuleId: 10001, currentModuleId: 10001 },
            { url: '/employee', position: '-120px -90px', name: '员工/组织机构管理', isNormalIconShow: true, open: false, selfId: 10045, parentModuleId: 10001, currentModuleId: 10001 },
            { url: '/sale', position: '-150px -90px', name: '销售代表及助理管理', isNormalIconShow: true, open: false, selfId: 10047, parentModuleId: 10001, currentModuleId: 10001 },
            { url: '/basicInformation', position: '-60px -90px', name: '企业基本信息', isNormalIconShow: true, open: false, selfId: 10048, parentModuleId: 10001, currentModuleId: 10001 }
          ]
        },
        {
          name: '我的面板',
          position: '-60px -120px',
          isNormalIconShow: true,
          selfId: 10000,
          parentModuleId: 0,
          currentModuleId: 10000,
          open: false,
          subItems: [
            { url: '/personalizedTemplate', position: '-90px -120px', name: '个性化模板', isNormalIconShow: true, open: false, selfId: 10120, parentModuleId: 10000, currentModuleId: 10000 }
          ]
        },
        {
          name: '财务管理',
          position: '-180px -120px',
          isNormalIconShow: true,
          selfId: 10003,
          parentModuleId: 0,
          currentModuleId: 10003,
          open: false,
          subItems: [
            { url: '/deposit', position: '-210px -120px', name: '押金管理', isNormalIconShow: true, open: false, selfId: 10029, parentModuleId: 10003, currentModuleId: 10003 },
            { url: '/imprest', position: '-0px -150px', name: '预付款管理', isNormalIconShow: true, open: false, selfId: 10030, parentModuleId: 10003, currentModuleId: 10003 },
            { url: '/billing', position: '-30px -150px', name: '开票管理', isNormalIconShow: true, open: false, selfId: 10031, parentModuleId: 10003, currentModuleId: 10003 },
            { url: '/gathering', position: '-60px -150px', name: '收款管理', isNormalIconShow: true, open: false, selfId: 10032, parentModuleId: 10003, currentModuleId: 10003 },
            {
              name: '订单财务管理',
              position: '-180px -120px',
              isNormalIconShow: true,
              selfId: 10033,
              parentModuleId: 10003,
              currentModuleId: 10003,
              open: false,
              subItems: [
                { url: '/logistics', position: '-90px -150px', name: '物流费管理', isNormalIconShow: true, open: false, selfId: 10034, parentModuleId: 10033, currentModuleId: 10003 },
                { url: '/urgent', position: '-210px -150px', name: '加急费管理', isNormalIconShow: true, open: false, selfId: 10035, parentModuleId: 10033, currentModuleId: 10003 },
                { url: '/discount', position: '-120px -150px', name: '折扣管理', isNormalIconShow: true, open: false, selfId: 10036, parentModuleId: 10033, currentModuleId: 10003 },
                { url: '/baddebts', position: '-150px -150px', name: '坏账管理', isNormalIconShow: true, open: false, selfId: 10037, parentModuleId: 10033, currentModuleId: 10003 },
                { url: '/verification', position: '-180px -150px', name: '核销', isNormalIconShow: true, open: false, selfId: 10038, parentModuleId: 10033, currentModuleId: 10003 },
              ]
            },
          ]
        },
        {
          name: 'DEMO',
          position: '0 0',
          isNormalIconShow: true,
          selfId: 99000,                              // 此GUID是虚构出来的
          parentModuleId: 0,
          currentModuleId: 99000,                     // 此模块ID是虚构出来的
          open: false,
          subItems: [
            { url: '/mychart', position: '0 0', name: '图表演示', isNormalIconShow: true, open: false, selfId: 99001, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/bdMapDemo', position: '0 0', name: '百度地图演示', isNormalIconShow: true, open: false, selfId: 99002, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/datagrid', position: '0 0', name: '数据表格演示', isNormalIconShow: true, open: false, selfId: 99003, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/pagegrid', position: '0 0', name: '分页表格演示', isNormalIconShow: true, open: false, selfId: 99004, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/componentsdemo', position: '0 0', name: '公共组件演示', isNormalIconShow: true, open: false, selfId: 99005, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/childRoutesDemo', position: '0 0', name: '内容层子路由演示', isNormalIconShow: true, open: false, selfId: 99006, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/dialogComponentsDemo', position: '0 0', name: 'Dialog公共组件演示', isNormalIconShow: true, open: false, selfId: 99007, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/dataGridComponentsDemo', position: '0 0', name: 'DataGrid公共组件演示', isNormalIconShow: true, open: false, selfId: 99008, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/depotSelectDialogDemo', position: '0 0', name: 'Dialog仓库库位演示', isNormalIconShow: true, open: false, selfId: 99009, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/tableOrderDetailDemo', position: '0 0', name: 'Table订单详情演示', isNormalIconShow: true, open: false, selfId: 99010, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/OrderDetailFormDemo', position: '0 0', name: '订单查看表单', isNormalIconShow: true, open: false, selfId: 99011, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/tableGridUIDemo', position: '0 0', name: '标准流程UI范例-DataGrid', isNormalIconShow: true, open: false, selfId: 99012, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/formUIDemo', position: '0 0', name: '标准流程UI范例-Form', isNormalIconShow: true, open: false, selfId: 99013, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/multiTreeDemo', position: '0 0', name: '3态树演示', isNormalIconShow: true, open: false, selfId: 99014, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/reduxDemo', position: '0 0', name: 'reduxDemo', isNormalIconShow: true, open: false, selfId: 99015, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/WarehousingFormDemo', position: '0 0', name: '只允许扫描入库演示', isNormalIconShow: true, open: false, selfId: 99016, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/cardUIDemo', position: '0 0', name: '详情页列表UI组件', isNormalIconShow: true, open: false, selfId: 99017, parentModuleId: 99000, currentModuleId: 99000 },
            { url: '/ValidationDemo', position: '0 0', name: '表单验证演示', isNormalIconShow: true, open: false, selfId: 99018, parentModuleId: 99000, currentModuleId: 99000 },
          ]
        }
      ],
    };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    handleToggleDrawer: PropTypes.func,
    logo: PropTypes.string,
    getAllMenuBar: PropTypes.func.isRequired,
    getUserMenuBar: PropTypes.func.isRequired,
    globalStore: PropTypes.object.isRequired,
    menuBar: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    this.props.getAllMenuBar();
    this.props.getUserMenuBar(this.props.globalStore.GUID);
  }
  componentDidMount = () => {};
  /**
   * 刷新浏览器时选中当前侧边栏
   */
  RefreshSelectMenuBar = () => {
    const activeObj = {};
    this.handleMenusItemsUrl(this.state.userMenuTree, location.pathname, activeObj);
    this.handleMenuItemsOpenStatus(this.state.userMenuTree, activeObj);
    this.setState({ userMenuTree: this.state.userMenuTree });
  }
  /* 根据所有菜单和业务菜单获取各级菜单*/
  getMenuTreeArr = (allMenu, iDArr, Tree, type) => {
      /* allMenu所有的菜单树，idArr是某个级别菜单的id，tree所有级别菜单数组，FJarr父菜单id*/
      /* 第一次进入时,由业务的GUID匹配菜单的业务id，匹配用户有权限的菜单*/
    let ywArr;
    if (type === 'Y') {
      ywArr = allMenu.filter(element => iDArr.indexOf(element.MKYWID) !== -1);
    } else { // 从所有菜单中目前级别的菜单
      ywArr = allMenu.filter(element => iDArr.indexOf(element.GUID) !== -1);
    } // 从所有菜单中目前级别的菜单
    const FJarr = [];
    const resultArr = ywArr.map((element) => {
        // 获取父级菜单id数组
      if (element.FJMKFLID !== 0) {
        FJarr.push(element.FJMKFLID);
      }

         /* 获取菜单树*/
      const obj = {
        priority: element.YXJ,
        url: element.URL,
        name: element.MKFLMC,
        position: element.STYLE,
        isNormalIconShow: true,
        selfId: element.GUID,                              // 此GUID是虚构出来的,后期以后台真实数据为主
        parentModuleId: element.FJMKFLID,
        currentModuleId: element.MKID,                     // 此模块ID是虚构出来的,后期以后台真实数据为主
        open: false,
      };
      return obj;
    });
    Tree.push(resultArr);

    if (FJarr.length > 0) {
      return this.getMenuTreeArr(allMenu, FJarr, Tree);
    } else {
      return Tree;
    }
  }
    /* 获取用户菜单树*/
  getUserMenuTree = (treeArr) => {
    const userMenuTree = [];

    treeArr.reduce((childArr, curArr) => {
      curArr.map((element) => {
        const subItems = [];
        let beforeItems = []; // element自身也可能在childArr中出现，拷贝之前遍历的子节点
          /* 遍历所有子菜单，如果子菜单的父级id和当前菜单相同，则把该子菜单加入父菜单的subItems中*/
        for (let i = 0; i < childArr.length; i++) {
          if (element.selfId === childArr[i].selfId) {
            beforeItems = childArr[i].subItems || [];
          } else if (element.selfId === childArr[i].parentModuleId) {
            subItems.push(childArr[i]);
          }
        }
        if (element.parentModuleId === 0) {
          userMenuTree.push(element);
        }
        if (subItems.length > 0) {
          element.subItems = subItems.concat(beforeItems);
        }
      });
      return curArr;
    }, []);
    const treeIdArr = [];
    const resultTree = [];
    for (let i = treeArr.length - 1; i >= 0; i--) {
      treeArr[i].map((element) => {
        if (element.parentModuleId === 0 && treeIdArr.indexOf(element.selfId) === -1) {
          resultTree.push(element);
          treeIdArr.push(element.selfId);
        }
      });
    }

    return resultTree;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.menuBar.getAllTreeStatus && nextProps.menuBar.getUserTreeStatus) {
        /* 获取所有业务GUID*/
      const ywArrID = nextProps.menuBar.userTreeArr.map(element => element.GUID);
      const userMenuTreeArr = this.getMenuTreeArr(nextProps.menuBar.allTreeArr, ywArrID, [], 'Y');
      const userMenuTree = this.getUserMenuTree(userMenuTreeArr);
      this.getUserMenuTreeRecursiveSort(userMenuTree);
      this.setState({
        userMenuTree
      });
      this.state.userMenuTree = userMenuTree;   // 此步对浏览器刷新是否可选中侧边栏很重要
      this.checkUserOperatingAuthority(userMenuTree) // 判断此用户是否有操作权限
      this.RefreshSelectMenuBar();              // 选中当前路由侧边栏
    }
  }

  /**
   * 判断当前用户是否有路由权限,没有直接跳转首页
   */
  checkUserOperatingAuthority = (userMenuTree) => {
    const activeObj = {};
    this.handleMenusItemsUrl(userMenuTree, location.pathname, activeObj);
    if (!_.has(activeObj, 'url') && !_.has(activeObj, 'name')) this.context.router.push('/');  //如果没权限跳转至首页
  }
  /**
   * 递归排序
   */
  getUserMenuTreeRecursiveSort = (userMenuTree) => {
    userMenuTree.sort((preValue, nextValue) => (Number(preValue.priority) - Number(nextValue.priority)));
    return userMenuTree.map((item) => {
      if (item.subItems) {
        return this.getUserMenuTreeRecursiveSort(item.subItems);
      }
    })
  }

  // }

  /**
   *  递归根据url获取对应对象
   */
  handleMenusItemsUrl = (menus, url, activeObj) => {
    const newUrl = `/${url.split('/')[1]}`;           // 此处url.split之后一定是访问[1]去数据已测试过
    return menus.map((value) => {
      if (value.subItems) {
        this.handleMenusItemsUrl(value.subItems, url, activeObj);
      } else if (newUrl === value.url) {
        value.isNormalIconShow = false;    // 当前对象状态选中
        value.open = true;                  // 当前list打开,此代码兼容后期如仓库管理listItem带url
        Object.assign(activeObj, value);
      }
    });
  };

  /**
   * 递归把menus中所有item的isNormalIconShow置为true open置为false
   */
  handleMenuItemsIcon = menus => menus.map((item) => {
    if (item.subItems) {
      item.isNormalIconShow = true;
      item.open = false;
      return this.handleMenuItemsIcon(item.subItems);
    } else {
      item.open = false;
      item.isNormalIconShow = true;
    }
  });
  /**
   * 递归处理menus中item-open状态
   */
  handleMenuItemsOpenStatus = (menus, selectedItem) => {
    if (Number(selectedItem.parentModuleId) !== 0) {
      return menus.map((item) => {
        if ((Number(item.selfId) === Number(selectedItem.parentModuleId)) && (Number(item.currentModuleId) === Number(selectedItem.currentModuleId))) {
          item.open = true;
          return this.handleMenuItemsOpenStatus(this.state.userMenuTree, item);   // 继续把当前找到的父级模板递归（重点第一个参数是把整个menus传进去）
        } else if (item.subItems) {    // 如果外层没找到,判断一下是否有subItems,有subItems继续递归
          return this.handleMenuItemsOpenStatus(item.subItems, selectedItem);   // 重点第二个参数要继续把selectedItem传下去
        }
      })
    }
  };
  /**
   * listItem点击事件
   */
  handleNestedListToggle = item => () => {
    if (item.url) {
      this.context.router.push(item.url);
    }
    const openStatus = item.open;
    this.handleMenuItemsIcon(this.state.userMenuTree);
    item.isNormalIconShow = !item.isNormalIconShow;
    item.open = !openStatus;
    this.handleMenuItemsOpenStatus(this.state.userMenuTree, item);

    this.setState({ userMenuTree: this.state.userMenuTree });
  };
  /**
   * 判断当前item是否是最后一级且不是第二级
   */
  handleJudgeItemIsLastOne = (item) => {
    let flag = true;
    if (item.parentModuleId !== 0) {
      item.subItems.map((item) => {                      // 从generateItems过来肯定是有subItems
        if (item.subItems) {
          flag = false;
        }
      });
    } else {
      flag = false;
    }
    return flag;
  };
  /**
   * 遍历整个menus
   */
  generateItems = menus => menus.map((item, index) => {
    if (item.subItems) {
      return (<ListItem
        key={index} primaryText={item.name} open={item.open || false} rightIcon={<img alt='' src={item.open ? '/menuRightIconNormal.png' : '/menuRightIconClick.png'} />}
        leftIcon={<span className='icon' style={{ background: item.isNormalIconShow ? `${item.position} url(/menuIconNormal.png) no-repeat` : `${item.position} url(/menuIconChecked.png) no-repeat`, width: '30px', left: 15, height: '30px', top: -3, opacity: item.isNormalIconShow ? 0.5 : 1 }} />}
        nestedItems={this.generateItems(item.subItems)}
        primaryTogglesNestedList
        onNestedListToggle={this.handleNestedListToggle(item)}
        style={{ color: item.isNormalIconShow ? '#fff' : '#41a1ff', opacity: item.isNormalIconShow ? 0.5 : 1, fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', letterSpacing: '0.23px', marginLeft: 0 }}
        nestedListStyle={{ marginLeft: 0, background: this.handleJudgeItemIsLastOne(item) ? '#001327' : '#1b2639' }}
        innerDivStyle={{ marginLeft: 0 }}
      />)
    } else {
      return (<ListItem
        key={index} primaryText={item.name} open={item.open || false}
        leftIcon={<span className='icon' style={{ background: item.isNormalIconShow ? `${item.position} url(/menuIconNormal.png) no-repeat` : `${item.position} url(/menuIconChecked.png) no-repeat`, width: '30px', left: 15, height: '30px', top: -3, opacity: item.isNormalIconShow ? 0.5 : 1 }} />}
        primaryTogglesNestedList
        onNestedListToggle={this.handleNestedListToggle(item)}
        style={{ color: item.isNormalIconShow ? '#fff' : '#41a1ff', opacity: item.isNormalIconShow ? 0.5 : 1, fontFamily: 'SourceHanSansCN-Medium', fontSize: '16px', letterSpacing: '0.23px' }}
        nestedListStyle={{ marginLeft: 0 }}
        innerDivStyle={{ marginLeft: 0 }}
      />)
    }
  });
  /**
   * 切换左边菜单栏显示状态
   */
  handleToggleDrawer = () => () => {
    this.props.handleToggleDrawer(!this.props.menuBar.open)
  }
  render() {
    return (
      <Drawer open={this.props.menuBar.open} containerStyle={{ background: '#364356', width: '256px', overflow: 'hidden' }}>
        <FlatButton
          label={this.props.title}
          labelStyle={{ paddingLeft: '1.4rem', fontSize: '20px', fontWeight: 400, borderRadius: 0, color: '#fff', backgroundColor: 'transparent', width: '100%', height: 64, fontFamily: 'SourceHanSansCN-Medium', letterSpacing: '0.29px' }}
          style={{ width: '100%', height: '64px', backgroundColor: '#364356', color: '#fff', borderBottom: '1px solid #aaa' }}
          onTouchTap={this.handleToggleDrawer()}
          icon={<img alt='' src={this.props.logo} style={{ marginLeft: 0 }} />}
        />
        <List style={{ width: '100%', height: 'calc(100% - 65px)', overflow: 'auto', backgroundColor: '#364356' }} id='leftList'>
          <div style={{ backgroundColor: '#364356', boxShadow: 'none', height: '80px', width: '100%', overflow: 'hidden' }}>
            <PersonalBasicInformationDialog />
          </div>
          {
            this.generateItems(this.state.userMenuTree)
          }
        </List>
      </Drawer>
    )
  }
}
