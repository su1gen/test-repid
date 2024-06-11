import axios from "axios";
import Cookies from 'js-cookie'
import { toast } from 'sonner';

type AxiosOptions = {
  headers?: object
  withJWT?: boolean
  withToastErrors?: boolean
}

const showToastErrors = (messages: string | string[] | undefined) => {
  if (typeof messages === 'string'){
    toast.error(messages);
  } else if (Array.isArray(messages)){
    messages.forEach((message: string) => {
      toast.error(message);
    })
  }
}

export default function axiosInstance(options: AxiosOptions = {}) {
  const {
    headers = {},
    withJWT = true,
    withToastErrors = true,
  } = options;

  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    if (withJWT){
      const token = Cookies.get(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME!);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => {
    // Handle request errors here
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      // Modify the response data here
      return response;
    },
    (error) => {
      if (withToastErrors){
        const errorMessages = error?.response?.data?.message
        showToastErrors(errorMessages)
      }

      return Promise.reject(error);
    }
  );


  return axiosInstance
}

