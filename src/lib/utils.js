import { put } from 'redux-saga/effects';
import md5 from 'md5';
import qs from 'querystring';
import { getToken } from 'api/global';
import 'whatwg-fetch';

const preFs = '/api_firstgridFS';
const preRa = '/api_firstgridRA';
const preApi = '/api_firstgrid';
const preSFDA = '/api_firstgridSFDA';
let cacheError;

const filterErrorCodeArray = [-700];

export const fetchFS = (...args) => fetchAction(preFs, ...args);

export const fetchRA = (...args) => fetchAction(preRa, ...args);

export const fetchAPI = (...args) => fetchAction(preApi, ...args);

export const fetchSFDA = (...args) => fetchAction(preSFDA, ...args);

function fetchAction(filter, url, options) {
  cacheError = '';
  const queryStr = getSignature(options.body, options.method);
  url += url.indexOf('?') === -1 ? (`?${queryStr}`) : (`&${queryStr}`)
  const bodyType = Object.prototype.toString.call(options.body);
  if (bodyType === '[object FormData]') {
    options.method = 'POST';
    options.headers = Object.assign({}, options.headers, { enctype: 'multipart/form-data' });
  } else {
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    options.body = `Body=${parseBody(options.body)}`
  }
  if (options.method === 'GET') delete options.body;

  return fetch(filter + url, options)
    .then(checkStatus)
    .then(response => response.json())
    .then(checkCode)
}

export const apiMiddleWare = store => next => (action) => {
  if (cacheError) {
    if (cacheError.code === -700) {
      next({
        type: 'TOKEN_INVALID'
      });
    } else {
      next({
        type: 'ERROR',
        error: cacheError
      });
    }
  } else {
    next({
      type: 'GLOBAL_LOADING',
      response: '2'
    });
  }
  next(action)
};

function checkCode(response) {
  if (response.Code !== 0) {
    return handleError(response.Code, response);
  }
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.json().then(json => handleError(response.status, json));
}

function handleError(code, response = '') {
  const error = new Error();
  error.code = code;
  error.response = response;
  if (filterErrorCodeArray.indexOf(code) !== -1) {
    cacheError = error;
  }
  throw error;
}

function parseBody(body) {
  const type = Object.prototype.toString.call(body);
  if (type === '[object Null]' || type === '[object Undefined]' || type === '[object FormData]') {
    body = '';
  }
  if (type === '[object Object]' || type === '[object Array]') {
    body = JSON.stringify(body);
  }
  return body;
}

export function getSignature(body, method) {
  const ApplicationID = 10000;
  const ClientID = 8888888;
  const Timestamp = new Date().getTime();
  const key = ')(*&^%$#@!~';
  const Token = getToken();
  const type = Object.prototype.toString.call(body);
  body = parseBody(body);
  const preMd5String = `Body=${body}&Timestamp=${Timestamp}${key}`;
  const Signature = md5(preMd5String);
  if (type === '[object FormData]' || method !== 'GET') {
    return qs.stringify({ Token, ApplicationID, ClientID, Timestamp, Signature });
  }
  return qs.stringify({ Token, ApplicationID, ClientID, Timestamp, Signature, Body: body });
}

export function handleAPI(fn) {
  return function *(action) {
    try {
      yield put({
        type: 'GLOBAL_LOADING',
        response: '1'
      });
      return yield fn.call(null, action);
    } catch (error) {
      yield put({
        type: 'GLOBAL_LOADING',
        response: '1'
      });
      yield put({
        type: 'ERROR',
        error,
      });
    }
  };
}

export function getImgSrc(wdId) {
  return getUrl(`${preFs}/WDB/${wdId}?`);
}

export function getUrl(path, queryBody) {
  return path + getQueryString(queryBody);
}

export function getQueryString(path, queryBody = '') {
  const constPairs = {
    key: ')(*&^%$#@!~',
    Token: getToken(),
    ApplicationID: 10000,
    ClientID: 8888888,
    Timestamp: new Date().getTime(),
    Body: queryBody,
  };

  const pairs = Object.assign({ ...constPairs, Signature: signature(constPairs) }, { key: undefined });

  if (Object.prototype.toString.call(queryBody) === '[object FormData]') {
    pairs.Body = undefined;
  }
  return qs.stringify({ ...pairs });
}

export function signature({ Timestamp, key, body }) {
  const type = Object.prototype.toString.call(body);
  if (type === '[object Null]' || type === '[object Undefined]' || type === '[object FormData]') {
    body = '';
  }
  if (type === '[object Object]' || type === '[object Array]') {
    body = JSON.stringify(body);
  }

  const preMd5String = `Body=${body}&Timestamp=${Timestamp}${key}`;
  return md5(preMd5String);
}

/**
 * 获取hostname
 */
export function getHostName() {
  let hostname = window.location.hostname

  if (/.fgrid.io/.test(hostname) && !/^www/.test(hostname)) {
    hostname = hostname.replace(/.fgrid.io/, '');
  } else {
    hostname = '';
  }
  return hostname;
}

