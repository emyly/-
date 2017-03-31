// const users = [
//   {
//     TOKEN: '31e160b929e2bc380b30db4a3aa5a589',
//     GUID: 9000000000015,
//     SJHM: 13888888216,
//     SSJG: 900000000206,
//     organizationName: '杭州鼎盛医疗器械有限公司',
//     organizationId: 900000000206,
//     WDID: 1205,
//     YHXM: '鼎盛医疗2'
//   },
//   {
//     TOKEN: '6c176f35df9059f80fd2414a9d9cd079',
//     GUID: 9000000000016,
//     SJHM: 13888888217,
//     SSJG: 900000000207,
//     organizationName: '浙江泰昌医疗器械有限公司',
//     organizationId: 900000000207,
//     WDID: 1336,
//     YHXM: '我是江e号2'
//   },
//   {
//     TOKEN: '661a2b83e59bbef7ade4d19f371c8abe',
//     GUID: 9000000000002,
//     SJHM: 13888888206,
//     SSJG: 900000000206,
//     organizationName: '杭州鼎盛医疗器械有限公司',
//     organizationId: 900000000206,
//     WDID: 1205,
//     YHXM: '鼎盛医疗'
//   },
//   {
//     TOKEN: 'a5e49f4c195f647305b22c3cc05ff925',
//     GUID: 9000000000003,
//     SJHM: 13888888207,
//     SSJG: 900000000207,
//     organizationName: '浙江泰昌医疗器械有限公司',
//     organizationId: 900000000207,
//     WDID: 1336,
//     YHXM: '我是江e号'
//   }
// ];

// export let currentUser = (process.env.NODE_ENV === 'development') ? users[1] : undefined;
let currentUser = JSON.parse(sessionStorage.getItem('USER_INFO')) || {};

const refreshUser = () => {
  currentUser = JSON.parse(sessionStorage.getItem('USER_INFO')) || {};
}
export function setCurrentUser(user) {
  currentUser = user;
}

export function getCurrentUser() {
  refreshUser()
  return currentUser;
}

export function getToken() {
  refreshUser()
  return currentUser.TOKEN;
}

export function getTokenAPI() {
  currentUser = JSON.parse(sessionStorage.getItem('USER_INFO')) || {};
  return currentUser;
  // 开发环境保持原来方式
  // if (process.env.NODE_ENV === 'development') {
  //   return currentUser;
  // }
  // 测试和生产环境采用线上的web获取token
  // if (process.env.NODE_ENV === 'production') {
  // const webUrl = process.env.JSONP_WEB_URL;
  // return fetchJsonp(`${webUrl}/getLoginUser`)
  //   .then(response => response.json())
  //   .then((json) => {
  //     currentUser = json.result;
  //     return currentUser;
  //   })
  // }
}
// export { users }
