import axios, { AxiosRequestConfig } from "axios";

const baseApi = axios.create({
  baseURL: "https://pinterest.paindev.net/",
  headers: {
    authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYXV0aF9jb2RlIjoiUGFpbmRldiIsInJvbGUiOjMsImlhdCI6MTcyNTQxOTg5OSwiZXhwIjoxNzI4MDExODk5fQ.ccwlCoJcF3QAgzVkPCmf_CTj4Kes_VxkvaSR-Xw4zts`,
  },
});

const getNewsAuthorization = async (originalRequest: AxiosRequestConfig) => {
  try {
    const { data } = await axios.get("https://pinterest.paindev.net/");
    if (!originalRequest.headers) return;
    originalRequest.headers[
      "authorization"
    ] = `Bearer ${data.authorizationToken}`;
    baseApi.defaults.headers.common[
      "authorization"
    ] = `Bearer ${data.authorizationToken}`;
  } catch (error) {
    console.log("Get authorization failed: " + error);
  }
};

const getNewUserToken = async (originalRequest: AxiosRequestConfig) => {
  try {
    if (!originalRequest.headers) return;
    const { data } = await axios({
      method: "GET",
      url: "https://pinterest.paindev.net/user/refresh-token",
      headers: {
        accessToken: `${
          JSON.parse(localStorage.getItem("currentUser") || "{}").accessToken
        }`,
      },
    });
    localStorage.setItem("currentUser", JSON.stringify(data.data));
    baseApi.defaults.headers.common[
      "accessToken"
    ] = ` ${data.data.accessToken}`;
    originalRequest.headers["accessToken"] = ` ${data.data.accessToken}`;
  } catch (error) {
    console.log(error);
  }
};

baseApi.interceptors.request.use(
  function (request) {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (currentUser) {
      request.headers.accessToken = `${currentUser.accessToken}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await getNewsAuthorization(originalRequest);
        await getNewUserToken(originalRequest);
        return baseApi(originalRequest);
      } catch (error) {
        console.log("Refresh token failed", error);
        localStorage.removeItem("currentUser");
        window.location.href = "/news";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default baseApi;
