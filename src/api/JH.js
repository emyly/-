import { fetchAPI } from 'lib/utils'

// #### 手术订单，预配套推荐

// |接口   | /DDB/:ddid/SPCCB/JHTJDB/YPT     |
// |:------|:----------:|
// |方法    |GET    |
// |HTTP返回值|200          |
// |入参    |订单ID|
// |返回值  |前一次暂存的拣货数据|
// |所属服务|主服务        |
// |业务场景|对暂存的订单继续拣货|
// |下一步骤|等待用下一步操作|

// 入参示例：

// ~~~json
// {
//   YPTKW: []  // 已选择的预配套库位，没有传入空数组
// }
// ~~~

export function getPrematchingStorageAPI(params) {
  // const body = JSON.stringify({ YPTKW: storage })
  return fetchAPI(`/DDB/${params.orderId}/SPCCB/JHTJDB/YPT`, {
    method: 'GET',
    body: { YPTKW: params.storage }
  })
}
