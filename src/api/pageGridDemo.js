// import {fetchAPI} from 'lib/utils';
exports.pageGridDemoGetDataAPI = (page = 1) => {
  console.log(page % 2);
  if (page % 2 === 1) {
    return {
      Code: 0,
      Message: '操作成功',
      Result: {
        YHB: [
          {
            name: '小明',
            status: '经理',
            age: 10,
          },
          {
            name: '小强',
            age: 12,
            status: '雇员',
          },
          {
            name: '小新',
            age: 13,
            status: '销售',
          },
        ],
        Total: 398,
      },
    };
  }
  return {
    Code: 0,
    Message: '操作成功',
    Result: {
      YHB: [
        {
          name: '张三',
          status: '经理',
          age: 11,
        },
        {
          name: '李四',
          age: 12,
          status: '雇员',
        },
        {
          name: '王五',
          age: 14,
          status: '销售',
        },
      ],
      Total: 398,
    },
  };
};
