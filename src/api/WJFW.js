/**
 * Created by liuyali on 2016/11/5.
 */
import { fetchFS } from 'lib/utils'

export function putFileAPI(formdata) {
  return fetchFS('/WDB', {
    body: formdata
  });
}

export function getFileAPI(wdid) {
  return fetchFS(`/WDB/${wdid}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
  });
}
