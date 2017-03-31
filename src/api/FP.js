/**
 * Created by liuyali on 2016/12/21.
 */
import { fetchAPI } from 'lib/utils'
import { getSignature } from 'lib/utils'

/*
* 上传发票
* */
export function uploadBillingAPI(body) {
  return fetchAPI('/DDFPGL', {
    method: 'POST',
    body
  });
}

/*
* 查看单据id关联发票文档id
* */
export function getBillingDataAPI(djid) {
  return fetchAPI(`/DJ/${djid}/FPWD`, {
    method: 'GET',
  });
}
/* 删除发票*/
export function deleteFPAPI(idArr) {
  return fetchAPI('/FP', {
    method: 'DELETE',
    body: idArr
  });
}
