## 开发规范

* 组件模块必须要有注释,参照[jsdoc](http://usejsdoc.org/)
* 源码管理基于git方式，仓库在[osChina](https://git.oschina.net/firstgrid/Firstgrid_Saas_Web_V2.git)上，相关人员需要用firstgrid的企业邮箱注册
* 源码管理工具采用sourcetree
* 禁止删除他人创建的文件,本地删除他人文件一旦push或merge就极可能造成远端服务器上的文件被删除


## 公共组件提取规则

* 多于一个界面使用的组件,可封装成公共组件,例如三分类选择器


## 文件、文件夹命名规则（要细化）

* React组件、文件、文件夹等都遵循[大驼峰式命名](http://baike.baidu.com/view/1165629.htm)规则,既定目录除外
* 组件命名规则：
  * 表单类组件，以Form结尾（含详情页面及添加、编辑页面），
  * 数据表格类组件以DataGrid结尾（常规表格布局的），
  * 数据列表类组件以List结尾（循环输出，但表现形式以特殊列表出现的）
  * 对话框组件以Dialog结尾，
  * 选择器组件以Select或者Picker结尾

## 项目目录结构[参考](https://github.com/davezuko/react-redux-starter-kit)

* bin(dir) : 启动脚本
* blueprints(dir) : redux-cli的蓝图
* build(dir) : 所有打包配置项
    * webpack.config.js : webpack的指定环境配置文件
* config(dir) : 项目配置文件
* dist(dir) : 编译生成
* document(dir) : 开发文档
* server(dir) : Express 程序(使用 webpack 中间件)
    * main.js : 服务端程序入口文件
* src(dir) : 程序源文件
    * api(dir) : 数据后台请求接口函数
    * components(dir) : 全局可复用的表现组件
    * containers(dir) : 全局可复用的容器组件
    * layouts(dir) : 主页结构
    * routes(dir) : 主路由和异步分割点
        * index.js : 用store启动主程序路由
        * Home(dir) : 不规则路由
            * index.js : 路由定义和代码异步分割
            * assets(dir) : 组件引入的静态资源
            * components(dir) : 直观React组件
            * container(dir) : 连接actions和store
            * modules(dir) : reducers/constants/actions的集合
    * sagas(dir) : 注册[Sagas](http://leonshi.com/redux-saga-in-chinese/index.html)监听action的函数
    * static(dir) : 静态文件
    * store(dir) : Redux指定块
        * createStore.js : 创建和使用redux store
        * reducers.js : Reducer注册和注入
    * styles(dir) : 程序样式
    * main.js : 程序启动和渲染
* tests(dir) : 单元测试
* .babelrc : babel配置文件
* .editorconfig : 编辑器配置文件
* .eslintignore : eslint忽略
* .eslintrc : eslint配置文件
* .gitignore : git忽略
* .reduxrc : redux配置文件
* .travis.yml : 持续集成
* nodemon.json : nodemon配置文件
* package.json : npm配置文件


## 控件交付标准
* 必须要有控件使用场景说明
* 必须要有方法及入参说明
* 控件如使用到state属性时, state必须初始化
* 代码中,入参必须要有入参验证(React.PropTypes)
//* 必须要有单元测试
* 经项目组AP人员审核


## 标准事件响应
* 对话框：明确提示“关闭”按钮, 不允许用户点击遮罩区域来关闭对话框, 防止用户误操作


## 代码编写规范
  1. 所有js部分需要执行ES6规范
  2. react组件使用class MyComponent extends Component方式
  3. react组件如使用到state属性时,state必须初始化
  4. react组件如有入参,必须要有入参验证(React.PropTypes)
  5. 书写规范：单引号，tab空2格，结束位置分号时有时无，方法介绍欠缺
  6. 建议多使用let、const，放弃var的使用
  7. 采用===和!==比较
  8. 业务代码中不允许出现console.log(),使用debug()调试
  9. 每份js文件都必须注明作者,在复制文件时注意修改作者和创建时间
  10. 在修改别人的文件时,请注明谁在什么时候修改的
