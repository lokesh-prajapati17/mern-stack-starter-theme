import axiosInstance from "./AxiosService";

const callGetService = (url, params = {}, config = {}) => {
  return axiosInstance.get(url, { params, ...config });
};

const callPostService = (url, data = {}, config = {}) => {
  return axiosInstance.post(url, data, config);
};

const callPutService = (url, data = {}, config = {}) => {
  return axiosInstance.put(url, data, config);
};

const callPatchService = (url, data = {}, config = {}) => {
  return axiosInstance.patch(url, data, config);
};

const callDeleteService = (url, config = {}) => {
  return axiosInstance.delete(url, config);
};

const callFormDataPostService = (url, formData, config = {}) => {
  return axiosInstance.post(url, formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(config.headers || {}),
    },
  });
};

const callFormDataPutService = (url, formData, config = {}) => {
  return axiosInstance.put(url, formData, {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(config.headers || {}),
    },
  });
};

const ApiServices = {
  callGetService,
  callPostService,
  callPutService,
  callPatchService,
  callDeleteService,
  callFormDataPostService,
  callFormDataPutService,
};

export default ApiServices;
