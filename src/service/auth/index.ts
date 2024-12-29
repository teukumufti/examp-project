// this how to handling call api
import { API, axiosRequest } from '@/service/api';
import { LoginPayload } from '@/utils/types/auth';


export const login = async (payload: LoginPayload) => {
  const response = await axiosRequest({
    url: API.auth.login,
    method: 'POST',
    payload,
  });

  if (response) {
    return response.data;
  }
};