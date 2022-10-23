/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryPlays(
  params: {
    /** keyword */
    nickName?: string;
    date?: string;
    platform?: string|number;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
    console.log('abcd',params)
  return request('/api/play', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/talent */
export async function updateToTalent(
  data: {
    // query
    /** current */
    token: string;
    /** pageSize */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request('/api/user/talent', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}


