/**
 * Created by liuyali on 2016/12/2.
 */
import { fetchAPI } from 'lib/utils';

/* 获取所有区域*/
export function getXZQHBAPi() {
  return fetchAPI('/ALL/XZQHB', {
    method: 'GET'
  });
}

/* 获取省份列表*/
export function getProvincesListAPI() {
  return fetchAPI('/XZQHB', {
    method: 'GET'
  });
}

/* 获取市、区列表*/
export function getCitiesListAPI(id) {
  return fetchAPI(`/XZQHB/${id}`, {
    method: 'GET'
  });
}

