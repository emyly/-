/**
 * Created by niexq on 17/3/25.
 */
import { fetchAPI } from 'lib/utils'


export function getGoodsTransferListAPI(page) {
  return fetchAPI(`/DDB/SPZY?Page=${page}&SortOrder=desc&PageSize=10&SortBy=`, {
    method: 'GET'
  });
}

export function getGoodsTransferSearchListAPI({ SPBH,CKID }) {
  return fetchAPI('/CKB/KWB/SPCCB/SPZY', {
    method: 'GET',
    body: { SPBH,CKID }
  })
}