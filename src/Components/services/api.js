import axios from "axios";
import constants from "../utils/config/config";
import { toast } from "react-toastify";
import services from "../utils/config/services";

const apiInstance = axios.create({
  baseURL: services.baseURL,
  timeout: 10000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(constants.localStorage.token);
    config.headers[constants.localStorage.authToken] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 500) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 409) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 412) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 401) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId, 
        });
        localStorage.clear();
        window.open("/#" + constants.navigationLink.loginLink, "_self")    
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

const registerUser = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.signup, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const loginUser = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.login, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const logoutUser = async () => {
  try {
    const response = await apiInstance.post(constants.apiName.logout);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const forgotPassword = async (body) => {
  try {
    const response = await apiInstance.get(constants.apiName.forgotpsw, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const verifyOtp = async (body) => {
  try {
    const response = await apiInstance.put(constants.apiName.verifyotp, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};


const api = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOtp
};

export default api;

