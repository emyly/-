import { fetchAPI } from 'lib/utils'
exports.getData = () => ({
  Code: 0,
  Message: '操作成功',
  Result: {
    JSB2: [
      {
        GUID: 1,
        NAME: '经理',
        PARENT: 0
      },
      {
        GUID: 14,
        NAME: '经理',
        PARENT: 0
      }
    ],
    Total: 10,
    JSB: [
      {
        GUID: 1,
        NAME: '经理',
        PARENT: 0
      },
      {
        GUID: 2,
        NAME: '主管',
        PARENT: 0
      },
      {
        GUID: 3,
        NAME: '雇员',
        PARENT: 0
      },
      {
        GUID: 4,
        NAME: '经理1',
        PARENT: 1,
        WDID: 1336
      },
      {
        GUID: 5,
        NAME: '经理2',
        PARENT: 1,
        WDID: 1335
      }, {
        GUID: 6,
        NAME: '经理3',
        PARENT: 1,
        WDID: 1205
      }, {
        GUID: 7,
        NAME: '主管1',
        PARENT: 2,
        WDID: 120
      }, {
        GUID: 8,
        NAME: '主管2',
        PARENT: 2,
        WDID: 1208
      }, {
        GUID: 9,
        NAME: '雇员1',
        PARENT: 3,
        WDID: 1243
      }, {
        GUID: 10,
        NAME: '雇员2',
        PARENT: 3,
        WDID: 1330
      },
      {
        GUID: 11,
        NAME: '雇员3',
        PARENT: 3
      }, {
        GUID: 14,
        NAME: '雇员4',
        PARENT: 10
      },

    ]
  }
});
