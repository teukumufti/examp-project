// this global call api
import {persistor, store} from '@/redux/store';
import { auth } from './lists/auth';
import axios, { ResponseType } from 'axios';
import {setToken} from '@/redux/action/auth';

export const API = {
  auth,
};

interface PropsRequest {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  payload?: any;
  params?: any;
  exportData?: boolean;
  responseType?: ResponseType;
  type?: 'file' | 'data';
}

export const axiosRequest = async ({
  url, 
  method, 
  payload, 
  params, 
  exportData = false, 
  responseType, 
  type = 'data'
}: PropsRequest) => {
  const stores = store.getState();
  const token = stores.auth?.token;

  try {
    if (exportData) {
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token || null}`,
        },
      });
      return response;
    } if(type === 'file') {
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        params,
        headers: {
          Authorization: `Bearer ${token || null}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      return response;
    } else if(responseType) {
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        params,
        responseType: responseType,
        headers: {
          Authorization: `Bearer ${token || null}`,
        },
      });
      return response;
    } else {
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        params,
        headers: {
          Authorization: `Bearer ${token || null}`,
        },
      });
      return response;
    }
  } catch (error: any) {
    const errorData = error?.response?.data;
    if (errorData?.errors?.type === 'jwt_exception') {
      store.dispatch(setToken(''));
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });

      localStorage.clear();
      window.location.replace('/login');
      return false;
    }

    if ([500].includes(errorData?.status)) {
    //  handling if server error
    }
    else throw error;
  }
};