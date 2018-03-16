//封装数据请求
import axios from 'axios';
import {stringify} from 'qs';

import * as FinaceApi from '../tool/api';
export  const getFinace=()=> {
	return axios.get(`${FinaceApi.api}/api/v1/ww`)
}

export  const plusData=(body)=> {
	return axios.post(`${FinaceApi.api}/api/v1/ww`,body)
}
export  const upData=(id,body)=> {
	return axios.put(`${FinaceApi.api}/api/v1/ww/${id}`,body)
}
export  const delData=(id)=> {
	return axios.delete(`${FinaceApi.api}/api/v1/ww/${id}`)
}