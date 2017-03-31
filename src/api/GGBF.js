/**
 * Created by liuyali on 2017/2/21.
 */
import { fetchAPI } from 'lib/utils'

/*
* 查询权限列表
* */
export function getAllMenuBarAPI(body) {
  return fetchAPI('/MKFLB',{
    method: 'GET'
  });
}
